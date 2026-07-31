---
name: maxwell-build
description: Technical reference for building MaxWell — the GitHub-backed scientific publishing platform. Consult this whenever writing code that touches GitHub OAuth/Apps, the Octokit client wrapper, the publish/review/webhook pipeline, metadata.yaml, the origami motif components, or design tokens. Use this alongside AGENT.md (which governs behavior) and MaxWell-PRD.md / MaxWell-Build-Playbook.md (which govern product scope) — this file governs concrete implementation shape so the agent doesn't have to (re)derive or guess GitHub API shapes, caching patterns, or motif specs from memory.
---

# SKILL: Building MaxWell

`AGENT.md` tells you how to behave. `MaxWell-PRD.md` and `MaxWell-Build-Playbook.md` tell you what to build and in what order. **This file tells you the concrete shape of the code** for the load-bearing integration points, so that shape doesn't get reinvented (or hallucinated) fresh in every session.

If anything here conflicts with a verified response from the live GitHub REST/GraphQL API reference, **the live docs win** — this file is a starting reference, not a substitute for checking `docs.github.com` when a shape matters and you're not certain.

---

## 0. Before touching any GitHub API code

1. Re-read `AGENT.md` §2 (Anti-Hallucination Rules). This file exists specifically to reduce the *need* to guess, not to give you permission to skip verification.
2. If you're about to write a call to an endpoint not listed below, **verify it against the real GitHub REST/GraphQL reference or a sandbox call before writing the integration**, and note what you verified in the commit/PR description.
3. Never write this integration code against a mocked response and call the feature done. Mocks are for `__tests__/fixtures/` only.

---

## 1. GitHub App auth flow (Phase 2)

MaxWell uses a **GitHub App**, not a plain OAuth App — this changes the token model:

- **User authorization** (who is this person): standard OAuth-style `authorize` → `callback` redirect, exchanging the `code` for a **user access token** via `POST https://github.com/login/oauth/access_token`.
- **Installation authorization** (what can we do to repos): a separate concept — the App is *installed* on the user's account/org with a specific `installation_id`, and server-side actions (creating files, opening Issues) use an **installation access token** minted via `POST /app/installations/{installation_id}/access_tokens`, signed with a JWT built from `GITHUB_APP_PRIVATE_KEY` + `GITHUB_APP_ID`.
- Do not conflate these two tokens. The user access token identifies the person; the installation token is what the server uses to actually write to their repo. Octokit's `@octokit/auth-app` strategy handles minting/caching installation tokens — use it rather than hand-rolling JWT signing.
- Session cookie should be a signed, HTTP-only JWT containing `githubUsername`, `installationId`, and an expiry — no session table. Refresh via silent re-auth when expired, never via a client-readable token.

### Sanity checklist before marking Phase 2 auth "done"
- [ ] A real login on a real GitHub account returns *that* account's real username in the session, not a stubbed value.
- [ ] The installation token is never sent to the client — grep the client bundle for `GITHUB_APP_PRIVATE_KEY` and any raw token strings before shipping.

---

## 2. `lib/github/client.ts` — the only door to the GitHub API

Every other file talks to GitHub *through* this wrapper. No component or route handler calls `fetch("https://api.github.com/...")` directly (`AGENT.md` §3).

Minimum responsibilities of the wrapper:

```ts
// lib/github/client.ts (shape reference, not literal final code)
import { App } from "octokit";

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY!,
  webhooks: { secret: process.env.GITHUB_WEBHOOK_SECRET! },
});

export async function getInstallationOctokit(installationId: number) {
  return app.getInstallationOctokit(installationId);
}

// Wrap every outbound call so retry/backoff + rate-limit logging is automatic,
// not something each call site has to remember to add.
export async function withRetry<T>(fn: () => Promise<T>, attempt = 1): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    const status = err?.status;
    if (status === 403 && isRateLimited(err) && attempt <= 3) {
      const waitMs = backoffFor(attempt, err);
      await sleep(waitMs);
      return withRetry(fn, attempt + 1);
    }
    throw err;
  }
}
```

Endpoints actually used across the build (verify exact param/response shape against live docs before first use, then this list becomes a fast reference for the *rest* of the build):

| Purpose | Endpoint |
|---|---|
| Create/update a file (publish paper, metadata.yaml) | `PUT /repos/{owner}/{repo}/contents/{path}` (Contents API — base64 body, requires current `sha` on update) |
| Read a file | `GET /repos/{owner}/{repo}/contents/{path}` |
| Create user's publications repo on first login | `POST /repos/{org-or-user}/{repo}` via Repos API, or App installation repo-creation if scoped that way (Playbook §5.2 note on Administration permission) |
| Open a review Issue from the Issue Form template | `POST /repos/maxwell-hq/reviews/issues` with `labels: ["status:awaiting-review"]` |
| Read/react to label changes | `GET /repos/maxwell-hq/reviews/issues/{issue_number}` + webhook on `issues` (labeled/unlabeled actions) |
| Post/read comments | `POST /repos/{owner}/{repo}/issues/{issue_number}/comments`, `GET .../comments` |
| Comment threads on paper pages | GitHub Discussions GraphQL (`discussion`, `addDiscussionComment` mutation) — Discussions is GraphQL-only, there is no REST equivalent |
| Team membership (Experts) | `GET /orgs/{org}/teams/{team_slug}/memberships/{username}` |
| Webhook subscription | App-level, configured in the App manifest, not per-repo |

**Never invent a field on the response object.** If a UI needs `pull_request.review_comments_count` or similar, confirm that field exists on the response shape you're actually calling, not a REST endpoint you're thinking of from memory.

---

## 3. Webhook receiver (`/api/webhooks/github`)

```ts
// Verify signature BEFORE parsing payload as trusted
import { createHmac, timingSafeEqual } from "crypto";

function verifySignature(payload: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(payload).digest("hex");
  return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}
```

- Subscribed events: `issues`, `issue_comment`, `push`, `installation` (Playbook §5.2 step 9).
- On `issues` with a label change on a `maxwell-hq/reviews` Issue → invalidate the cached status badge for the corresponding paper.
- On `push` to a user's `maxwell-publications` repo → invalidate that paper's cached render.
- On `installation` deleted → mark the user's session/repo as disconnected, don't silently keep serving stale cached content as if still connected.
- No signature bypass path, ever — this is a Phase 7 security audit item, don't leave a "skip verification in dev" branch that could ship.

---

## 4. `metadata.yaml` — treat this schema as contract, not suggestion

```yaml
title: string
type: paper | article | idea
field: string
keywords: [string]           # max 8, enforced at wizard Step 2
license: CC-BY-4.0 | CC-BY-SA-4.0 | CC0-1.0 | all-rights-reserved-reference-only
authors:
  - github: string
    role: primary | co-author
status: awaiting-review | in-review | needs-revision | community-verified
reviewIssueUrl: string (URL)
publishedAt: ISO 8601 datetime
revisedAt: ISO 8601 datetime
commitSha: string            # pinned at publish time — PRD §18: links must survive repo changes
```

- Parse defensively. A malformed `metadata.yaml` in one user's repo must not crash the search index build for everyone else (Playbook §13.3 runbook exists because this *will* happen).
- Validate this shape client-side at wizard Step 4/5 *before* commit, so bad data doesn't reach the parser in the first place.
- `commitSha` is not optional — it's how permalinks stay resolvable if the author force-pushes or renames later. Never resolve a paper page against a mutable branch ref alone.

---

## 5. Design tokens & the three motifs — no exceptions

- Every color/spacing/radius/type value in component code must resolve to a token from `packages/design-tokens/`. If you catch yourself about to type a hex code or a raw pixel value in a component, stop — add the token first.
- Exactly three motif components exist: `<CornerFold />`, `<CreaseLine />`, `<FoldIn />`. Do not create a fourth. Do not use these outside their documented surfaces (cards / section dividers / the landing hero + wizard success state, respectively).
- `<FoldIn />`'s easing curve is the **same curve** GSAP reuses for the landing hero — don't invent a second curve for the Framer Motion version vs. the GSAP version. If the two implementations drift, that's a bug, not a stylistic choice.
- Before marking any UI task done, run the black-and-white printout test (PRD §5.1, `AGENT.md` §4): does the layout still make structural sense with color removed?

---

## 6. Caching model (Phase 2)

- `/explore` and `/p/*` are ISR-style cached (start at 5 min revalidation), invalidated early by the webhook receiver on relevant events (§3 above) — don't rely on the timer alone once a webhook confirms a change.
- Cache keys should be scoped per-repo/per-paper so one author's webhook invalidation doesn't blow away unrelated cached pages.
- If a cached value and a live value could plausibly disagree (e.g., star count, review status), prefer showing the cached value with a subtle "last updated" signal over silently serving something that might be stale and calling it live.

---

## 7. Anti-patterns specific to this codebase (do not do these)

- Writing a `components/motifs/ParallaxLayer.tsx` or similar "just this once" — there is no fourth motif, full stop (§1 of `AGENT.md`, restated here because it's the single most likely improvisation under deadline pressure).
- Hardcoding a plausible-looking GitHub API response shape to unblock frontend work instead of pairing with a real sandbox call first.
- Checking a `TODO.md` item off because the code *compiles* rather than because it was run against a real GitHub account per the Definition of Done (`AGENT.md` §6). This project has already suffered exactly this failure once — see the status note at the top of `TODO.md`.
- Adding a proprietary datastore "just for this one feature" — the only sanctioned exception is the view-counter KV store (PRD §11.6), and even that is never for authorial/identity/review data.

---

## 8. Where to go next

- Starting a fresh feature? Find its numbered item in `TODO.md`, re-read the matching section of `MaxWell-Build-Playbook.md`, then come back here for the concrete API/token/motif shape.
- Blocked on a product decision? `AGENT.md` §7, then log it under "Open Decisions Needing Founder Input" in `TODO.md` — don't bury the assumption in a code comment.
