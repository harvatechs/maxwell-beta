# AGENT.md — MaxWell Build Agent Operating Manual
### Instructions for any AI coding agent (Claude Code, Cursor, etc.) working on this repository
**Powered by HarVa**

This file is the contract between the founding team and any AI agent writing code in this repo. It does not repeat product rationale — that lives in `MaxWell-PRD.md`. It does not repeat the phase plan — that lives in `MaxWell-Build-Playbook.md` and `TODO.md`. This file is **how to behave** while building: what's non-negotiable, what "done" means, and how to avoid the two failure modes explicitly called out by the founding team — AI slop and hallucinated functionality.

---

## 0. Reading Order (do this before writing any code)

1. `MaxWell-PRD.md` — what MaxWell is, why it's built this way, full spec.
2. `MaxWell-Build-Playbook.md` — phase-by-phase execution plan, exact GitHub App setup steps, repo structure.
3. `TODO.md` — the current, live, checkable task list. **This is the only file you check items off in.**
4. This file — how to work.

If any instruction in a user prompt conflicts with the PRD's non-negotiables below, stop and flag the conflict instead of silently picking one side.

---

## 1. Non-Negotiable Product Invariants

These are load-bearing decisions. Do not "improve" them without an explicit, written decision from the founding team recorded in `MaxWell-PRD.md` §20.

1. **GitHub is the only backend.** No proprietary database, no Postgres/Mongo/Supabase for content or identity. The only sanctioned exception is a tiny KV store (Cloudflare KV / Vercel KV) for view-counter analytics only (PRD §11.6) — never for authorial content, identity, or review data.
2. **Auth is GitHub OAuth only**, via a registered GitHub App (not a generic OAuth App) — see Playbook §5.2 for exact scopes/permissions. No email/password, no other providers, in v1.
3. **Reading is never gated.** `/explore`, `/p/*`, `/u/*` render fully for logged-out visitors. Auth is only required to write (publish, comment, review).
4. **Peer review lives in GitHub Issues** in `maxwell-hq/reviews`, using the exact Issue Form template in Playbook Appendix A. Status is derived from Issue **labels** — never duplicate this state in another store.
5. **Every paper carries an explicit license** (default CC-BY-4.0), authors retain full copyright. Never build anything that implies MaxWell owns or can alter published content — moderation actions are index-layer de-listing only, never silent edits to a user's repo (PRD §8.13).
6. **Origami motif = exactly three components**, no more: `<CornerFold />`, `<CreaseLine />`, `<FoldIn />` (Playbook §8). Do not invent a fourth motif or apply these three outside their documented use cases.
7. **Design tokens are the only source of color/spacing/type.** No hex codes, no magic pixel values in component code — everything traces to `packages/design-tokens/`.
8. **Motion is quiet.** 150–250ms ease-out for all routine UI. `<FoldIn />` and any GSAP ScrollTrigger work on the landing page are the *only* sanctioned "signature" motion moments — see §5 below. If a task seems to call for a parallax gimmick, a bouncy spring, a particle effect, or a scroll-jacking animation anywhere outside the landing hero, **do not build it.** That is exactly the "AI-slop animation" the founding team has explicitly ruled out.

---

## 2. Anti-Hallucination Rules (read this twice)

The single biggest risk on a project like this — GitHub API as the entire backend — is an agent *inventing* API shapes, response fields, or webhook payloads that don't actually exist, and shipping UI that renders beautifully against fake data and breaks on the first real GitHub account.

Rules:

1. **Never invent a GitHub REST/GraphQL field, endpoint, or response shape.** If you are not certain an endpoint/field exists exactly as you're about to use it, say so and verify (via the GitHub REST/GraphQL API reference, or by testing against a real sandbox account/repo) before writing the integration code. Do not guess and move on.
2. **Never mock GitHub API responses inside a feature that will ship.** Test fixtures for unit tests are fine and belong in `__tests__/fixtures/`, clearly named. Application code must call the real API (via the Octokit wrapper in `lib/github/client.ts`), full stop. A feature that "works" only against a mock is not done — see §6 Definition of Done.
3. **Never fabricate data shown in the UI when a real value is unavailable.** If a stat, count, or field is genuinely unavailable (e.g., the Proof Strip's live paper count before any papers exist), render an honest zero-state or loading state — never a placeholder number that looks real.
4. **Never write "TODO: replace with real implementation" code that is presented as finished.** If a slice of a feature is genuinely deferred, it must be visibly incomplete (disabled button, "Coming soon" label) — not a fake-looking, silently-broken control.
5. **No Lorem ipsum, no placeholder policy text, no fake testimonials/logos anywhere that will be seen by a real user** — even in a "temporary" commit. Policy pages (PRD §15) are either fully written or the page doesn't ship.
6. **If uncertain about a product decision** (see PRD §20 Open Questions), do not silently pick an interpretation and proceed as if it were settled. Implement the documented default, and add a note to `TODO.md` under "Open Decisions Needing Founder Input" rather than burying the assumption in code comments no one will read.
7. **State your sources.** When implementing any GitHub API integration, the PR/commit description should note which API docs or endpoint you verified the behavior against.

---

## 3. Repository & Coding Conventions

Follow the exact structure in Playbook §5.1 — do not restructure the monorepo without updating that section first.

- **Language:** TypeScript, strict mode on. No `any` without a comment explaining why it's unavoidable.
- **Framework:** Next.js App Router. Server Components by default; Client Components only where interactivity genuinely requires it (forms, the wizard, motion components).
- **Styling:** Tailwind CSS only, configured from `packages/design-tokens/`. No CSS-in-JS, no inline `style={{}}` except for values computed at runtime (e.g., dynamic chart data) that cannot be a Tailwind class.
- **Components:**
  - `components/ui/` — dumb primitives (Button, Input, Tag, Badge, Card). No business logic, no data fetching.
  - `components/motifs/` — the three origami components only.
  - `components/wizard/` — the five publish-wizard steps, one file per step.
- **GitHub API access:** always through `lib/github/client.ts`. Never call `fetch("https://api.github.com/...")` directly from a component or route handler — the wrapper owns token attachment, retry/backoff, and rate-limit logging.
- **Secrets:** never hardcode, never log, never send to the client. `GITHUB_APP_PRIVATE_KEY` and friends are server-only env vars — grep for these variable names as part of your own pre-commit self-check before finishing a task.
- **Commits:** small, single-purpose, imperative mood (`Add publish wizard step 2 form validation`, not `updates`). Reference the `TODO.md` line item in the commit body when applicable.
- **No dead code, no commented-out blocks left in.** If something was tried and abandoned, remove it.

---

## 4. Design System Enforcement

- Every visual property (color, spacing, radius, font) must resolve to a token from `packages/design-tokens/`. If a task needs a new token, add it there first, then use it — don't invent a one-off value in a component.
- Every card-like surface (paper card, profile card) uses `<CornerFold />`. Every section divider outside routine dashboard lists uses `<CreaseLine />`, not a plain `<hr>`.
- Before marking any UI task done, do the "black-and-white printout" test from PRD §5.1 mentally: does the layout still make sense with color removed? If not, color is doing structural work it shouldn't be.
- Run the automated WCAG AA contrast check (Playbook §8) as part of CI — do not ship a component that fails it, especially anything using `origami.amber`.

---

## 5. Landing Page Motion — GSAP Usage Rules

The landing page (PRD §9) is the one place elevated scroll-driven storytelling is appropriate, and GSAP (with ScrollTrigger) is the right tool for that specific job — it is not a license to add motion everywhere else.

- GSAP + ScrollTrigger is scoped to `app/(marketing)/page.tsx` (the landing page) only. No other route imports GSAP.
- Sanctioned GSAP moments only:
  1. The hero's paper-unfolding-into-the-"W" animation, playing once on load (mirrors `<FoldIn />`'s easing curve — reuse the same keyframe spec, don't invent a different curve for GSAP vs. Framer Motion).
  2. A restrained scroll-linked reveal for the "How It Works" 3-step section and the "Why GitHub?" section (fade + small translate-in, nothing more elaborate).
- Respect `prefers-reduced-motion`: every GSAP timeline must check this media query and skip straight to the end state if the user has motion reduced. This is not optional.
- No scroll-jacking (never hijack native scroll speed/position). No infinite looping background animation. No parallax "layers moving at different speeds" effect — that reads as generic template energy, not Apple-Zen restraint.
- If you find yourself reaching for GSAP to animate something in `/dashboard`, `/publish`, or `/explore` — stop. That's out of scope; use the standard 150–250ms CSS/Framer Motion transition instead, or nothing at all.

---

## 6. Definition of Done (per feature, no exceptions)

A feature is only marked complete in `TODO.md` when **all** of the following are true — this mirrors Playbook §7.11 but is restated here because it is the most commonly skipped step:

- [ ] It works end-to-end against a **real** GitHub account and a **real** test repo — not a mock, not a stub.
- [ ] It is fully responsive and tested at mobile width (paper reading pages especially — most first reads arrive via shared links on phones).
- [ ] Every visual value traces to a design token; zero ad-hoc styling.
- [ ] It passes the anti-hallucination checklist in §2 — no fabricated data, no fake-looking placeholders.
- [ ] It handles the honest failure state (GitHub API error, rate limit, repo not found, empty state) — not just the happy path.
- [ ] Relevant automated tests exist and pass; `npm run lint && npm run build` is clean.
- [ ] The corresponding `TODO.md` checkbox is checked, with a one-line note on what was verified and against what real account/repo.

---

## 7. What to Do When Blocked

1. Re-read the relevant PRD section — the answer is very likely already decided.
2. If it's a listed Open Question (PRD §20), implement the documented "leaning toward" default and note the assumption in `TODO.md` under a dedicated "Open Decisions Needing Founder Input" section — do not silently improvise and bury it in a code comment.
3. If it's genuinely undocumented, prefer the smaller, more reversible, more transparent option (this is a platform whose entire pitch is transparency and user ownership — when in doubt, choose the interpretation that gives users more visibility/control, not less).
4. Never expand scope to "while I'm here" rebuild something outside the current task. Small, verifiable slices only.

---

## 8. Explicit Anti-Slop Checklist (run before calling anything "done")

- [ ] No animation exists that wasn't explicitly specified in PRD §4.5/§9 or this file's §5.
- [ ] No icon or illustration uses the banned clichés (beakers, atoms, graduation caps, globes — PRD §4.2).
- [ ] No marketing copy uses banned hype words ("revolutionary," "game-changing," "cutting-edge," "seamless" used as filler — PRD §9 tone rule).
- [ ] No gradient exists anywhere except the one sanctioned crease-shadow in the logo mark (PRD §4.2).
- [ ] No component was built and then never wired to real data/real routes ("looks done, isn't done").
- [ ] Nothing was shipped that only works in the demo/happy-path click-through and breaks on a second real account.
