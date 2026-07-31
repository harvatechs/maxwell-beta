# MaxWell — End-to-End Build Playbook
### From Zero to Public Launch
**Powered by HarVa**

| | |
|---|---|
| **Document Type** | Execution Playbook (companion to the MaxWell PRD) |
| **Status** | Draft v1.0 |
| **Audience** | Founders, designers, and engineers actually building the platform |
| **Date** | July 2026 |

---

## 0. How to Use This Playbook

The PRD told you **what** MaxWell is and **why** it's built the way it is. This document tells you **exactly how to build it, in what order, with what tools, and how to know when each stage is actually done.**

Every phase below has:
- A **goal** (what "done" means)
- **Tasks**, written as checklists you can paste directly into GitHub Projects/Linear
- **Concrete artifacts** (config files, code snippets, templates) where relevant, not just prose

Follow the phases roughly in order. Phases 0–2 are strictly sequential (you can't build features on infrastructure that doesn't exist). From Phase 3 onward, features can be parallelized across a small team.

---

## 1. Team & Roles

Even a solo founder needs to consciously wear each of these hats — listed so nothing gets silently skipped:

| Role | Responsible for | Minimum viable owner |
|---|---|---|
| **Product/Founder** | Scope, prioritization, this playbook | You |
| **Designer** | Logo execution, Figma design system, prototypes | 1 dedicated designer, or a strong generalist founder + Figma Community base kits |
| **Frontend Engineer** | Next.js app, design system implementation, wizard UX | 1–2 engineers |
| **Backend/Platform Engineer** | GitHub App, webhooks, caching layer, search index pipeline | Can be the same person as Frontend for MVP |
| **Community/Ops Lead** | Founding Expert recruitment, moderation, policy content | Can be the Founder pre-launch |
| **QA/Accessibility** | Pre-launch audit (§11) | Can be contracted for a short audit sprint |

---

## 2. Master Timeline Overview

| Phase | Name | Duration | Depends on |
|---|---|---|---|
| 0 | Brand & Design Foundation | Weeks 1–3 | — |
| 1 | Infrastructure & Repo Setup | Weeks 2–4 (overlaps Phase 0) | — |
| 2 | Core Platform Engineering (Auth, API client, caching) | Weeks 4–6 | Phase 1 |
| 3 | Feature Build (all core features) | Weeks 5–12 | Phase 2, Phase 0 (design system) |
| 4 | Design System Implementation | Weeks 4–10 (parallel to Phase 3) | Phase 0 |
| 5 | Content & Policy Writing | Weeks 6–10 (parallel) | — |
| 6 | Founding Expert Recruitment | Weeks 8–12 (parallel) | — |
| 7 | QA, Security & Accessibility Audit | Weeks 11–13 | Phase 3 substantially complete |
| 8 | Launch (Soft → Public) | Weeks 13–15 | Phase 7 |
| 9 | Post-Launch Operations | Ongoing | Phase 8 |

**Total: ~13–15 weeks to public launch** with a small, focused team. This is aggressive but realistic precisely *because* there's no backend/database to build — the GitHub-as-backend decision is what makes this timeline possible.

---

## 3. Prerequisites Checklist

Set these up **before** Phase 0 kicks off — nothing below costs money at MVP scale.

- [ ] Register the `maxwell-hq` GitHub Organization (this owns the `reviews`, `moderation`, and `registry` repos referenced throughout)
- [ ] Register the primary domain (e.g. `maxwell.sh`, `usemaxwell.com`, or similar — a short, dev-friendly TLD fits the GitHub-native brand)
- [ ] Create accounts: Vercel (or Netlify/Cloudflare Pages), Figma, Resend/Postmark, Cloudflare (for KV + DNS)
- [ ] Set up a shared 1Password/Bitwarden vault for the team — GitHub App private keys and API secrets will live here, never in Slack/email
- [ ] Set up the project tracker (GitHub Projects is the natural choice given the stack — dogfood it)
- [ ] Reserve social handles matching the brand name (`@maxwell` variants), even if launch is months out

---

## 4. Phase 0 — Brand & Design Foundation

**Goal:** A finished Figma design system + logo + 3 clickable prototype screens (Landing, Publish Wizard, Paper Reading Page), signed off before any production UI code is written.

### 4.1 Tasks
- [ ] Execute the folded-paper "W" logo concept (PRD §4.2) in Illustrator/Figma — full construction, not just a sketch
- [ ] Produce all lockup variants: full wordmark+mark, mark-only (favicon down to 16px), monochrome, "Powered by HarVa" sub-lockup
- [ ] Build the Figma color/type/spacing token library exactly matching PRD §4.3–4.5 (name tokens identically to what engineering will use in Tailwind config — this avoids translation drift between design and code)
- [ ] Design and document the three motif components precisely (PRD §4.5): Corner Fold, Crease Line, Fold-in motion (export as a Lottie/After Effects reference or a documented easing curve + keyframe spec engineering can implement in CSS/Framer Motion)
- [ ] Build core component library in Figma: buttons, inputs, tag/pill (per origami color), paper card, status badge, nav bar, footer
- [ ] Prototype: Landing page (full scroll), Publish Wizard (all 5 steps), Paper Reading Page — clickable, presented for stakeholder sign-off
- [ ] Accessibility pass on the palette itself: verify every text/background pairing (especially `origami.amber` on white) hits WCAG AA contrast **before** it becomes a hardcoded Tailwind token engineers copy everywhere

### 4.2 Exit Criteria
Design system file is versioned (Figma "Design System v1.0" published library), prototypes are approved, and a **design tokens export** (JSON) exists that Phase 4 engineering will consume directly.

---

## 5. Phase 1 — Infrastructure & Repo Setup

**Goal:** A running "Hello World" Next.js app deployed to production hosting, a registered GitHub App, and all environment variables wired — before a single MaxWell feature is coded.

### 5.1 Repository Structure

```
maxwell/
├── apps/
│   └── web/                     # Next.js app (App Router)
│       ├── app/
│       │   ├── (marketing)/     # Landing, About, Guidelines, Policy
│       │   ├── explore/
│       │   ├── p/[username]/[slug]/
│       │   ├── u/[username]/
│       │   ├── publish/
│       │   ├── dashboard/
│       │   ├── experts/
│       │   └── api/
│       │       ├── auth/[...nextauth]/   (or custom GitHub App OAuth handler)
│       │       ├── webhooks/github/
│       │       └── search/
│       ├── components/
│       │   ├── ui/              # primitives: Button, Tag, Card, Badge
│       │   ├── motifs/          # CornerFold, CreaseLine, FoldIn
│       │   └── wizard/          # Publish wizard steps
│       ├── lib/
│       │   ├── github/          # GitHub API client wrapper
│       │   ├── cache/           # edge caching helpers
│       │   └── search/          # client-side search index loader
│       └── styles/
│           └── tokens.css       # generated from Phase 0's design tokens export
├── packages/
│   ├── design-tokens/           # shared token package (colors, spacing, type)
│   └── config/                  # shared eslint/tsconfig
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       └── rebuild-search-index.yml   # scheduled Action, see Phase 3.8
└── infra/
    └── github-app-manifest.json
```

### 5.2 GitHub App Registration — Exact Steps

1. Go to `github.com/organizations/maxwell-hq/settings/apps/new`
2. **GitHub App name:** `MaxWell` (must be globally unique on GitHub — have `MaxWell Platform` as a fallback)
3. **Homepage URL:** your production domain
4. **Callback URL:** `https://yourdomain.com/api/auth/callback/github`
5. **Webhook URL:** `https://yourdomain.com/api/webhooks/github`
6. **Webhook secret:** generate a strong random secret, store in the shared vault immediately
7. **Permissions (repository):**
   - Contents: **Read & write** (to commit papers)
   - Metadata: Read-only (mandatory default)
   - Issues: **Read & write** (review threads)
   - Pull requests: Read-only (v1; not writing PRs yet)
   - Administration: **Read & write** *only if* MaxWell auto-creates the `maxwell-publications` repo on the user's behalf (needed for repo creation via the Apps API in some flows) — otherwise Read-only
8. **Permissions (account):** Email addresses: Read-only (for notifications)
9. **Subscribe to events:** `issues`, `issue_comment`, `push`, `installation`
10. **Where can this GitHub App be installed:** "Any account" (public installs — this is what lets any author connect their own GitHub)
11. Generate a **private key** (`.pem`) immediately after creation, store in the vault, never commit to any repo
12. Note the **App ID** and **Client ID/Secret** — these go into environment variables next

### 5.3 Environment Variables

| Variable | Purpose |
|---|---|
| `GITHUB_APP_ID` | GitHub App identifier |
| `GITHUB_APP_PRIVATE_KEY` | Signs installation tokens (base64-encoded in env) |
| `GITHUB_APP_CLIENT_ID` / `GITHUB_APP_CLIENT_SECRET` | OAuth login flow |
| `GITHUB_WEBHOOK_SECRET` | Verifies incoming webhook payloads |
| `NEXTAUTH_SECRET` (or equivalent session-signing secret) | Signs the session cookie |
| `RESEND_API_KEY` | Transactional email |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | View counters only (PRD §11.6) |
| `MAXWELL_ORG` | `maxwell-hq` — the org owning `reviews`/`moderation`/`registry` repos |
| `SEARCH_INDEX_URL` | Public URL of the built static search index asset |

- [ ] Add all of the above to the hosting provider's environment variable settings (production + preview environments separately)
- [ ] Add a `.env.example` to the repo with variable **names only**, never values

### 5.4 Bootstrap the `maxwell-hq` Org Repos
- [ ] Create `maxwell-hq/reviews` — add the Issue Form template from PRD §8.5 as `.github/ISSUE_TEMPLATE/peer-review.yml`
- [ ] Create `maxwell-hq/moderation` — private repo, add a simple report Issue template
- [ ] Create `maxwell-hq/registry` — seed with an empty `repos.json` (`[]`)
- [ ] Install the MaxWell GitHub App on the `maxwell-hq` org itself (needed for the App to act on these repos)

### 5.5 Deploy Pipeline
- [ ] Connect the repo to Vercel (or chosen host); confirm preview deploys work on PRs
- [ ] Set up `deploy.yml` for production branch protection + required status checks
- [ ] Confirm the "Hello World" deploy is live at the production domain with HTTPS

### 5.6 Exit Criteria
Visiting the production URL shows a placeholder page; the GitHub App exists and can be installed; a test webhook delivery succeeds (visible in the App's "Advanced" → "Recent Deliveries" tab).

---

## 6. Phase 2 — Core Platform Engineering

**Goal:** A logged-in user can authenticate via GitHub, and the app can make an authenticated call to the GitHub API on their behalf. This phase has no visible UI polish yet — it's plumbing.

### 6.1 Tasks
- [ ] Implement the GitHub App OAuth login flow (authorize → callback → exchange code for user access token → set signed session cookie)
- [ ] Implement session handling: **stateless** signed JWT cookie containing `githubUsername`, `installationId`, and token expiry — no session database (per PRD §11.2)
- [ ] Build the `lib/github/client.ts` wrapper: a typed helper around Octokit (or raw REST) that automatically attaches the correct installation token, retries on `403` rate-limit responses with backoff, and logs rate-limit headroom
- [ ] Implement **first-login provisioning**: on first successful auth, check if `{username}/maxwell-publications` exists; if not, create it via the Contents API, seeded with `README.md`, `papers/.gitkeep`, and a starter `maxwell.config.json` (schema per PRD §13.1)
- [ ] Implement the **edge caching layer**: a thin wrapper (`lib/cache/`) that wraps all read-path GitHub API calls with ISR-style revalidation (start with a 5-minute revalidate window on `/explore` and paper pages; tune post-launch)
- [ ] Implement the webhook receiver at `/api/webhooks/github`: verify signature using `GITHUB_WEBHOOK_SECRET`, parse `issues`/`issue_comment`/`push` events, and invalidate the relevant cached entries

### 6.2 Exit Criteria
- [ ] A test user can click "Continue with GitHub," land back on the app authenticated, and see their own GitHub username rendered
- [ ] That login automatically creates a real `maxwell-publications` repo in a test GitHub account
- [ ] A manually-triggered test webhook (e.g., commenting on a test Issue in `maxwell-hq/reviews`) visibly invalidates a cache entry, provable via logs

---

## 7. Phase 3 — Feature Build (in recommended build order)

Build in this order — each feature is genuinely blocked by the one before it in terms of having something real to test against.

### 7.1 Publishing Wizard (highest priority — nothing else works without content existing)
- [ ] Step 1 — Type selector (Paper / Article / Idea) as large choice cards
- [ ] Step 2 — Core details form (title, abstract with live char count, category select driving the origami tag color, keyword tag input max 8, co-author GitHub-username autocomplete, license dropdown with plain-English descriptions)
- [ ] Step 3 — Markdown+LaTeX editor (integrate a CodeMirror/Monaco-based editor + `remark-math`/`rehype-katex` live preview split pane) **and** the drag-and-drop PDF upload path (store raw file via Contents API, base64-encoded)
- [ ] Step 4 — Declaration checklist (four checkboxes per PRD §7.3, all required to enable the Publish button)
- [ ] Step 5 — Live full-page preview matching the exact production paper-page render, then the **Publish** action, which on submit:
  1. Commits `papers/{slug}/paper.md` + `metadata.yaml` (+ `assets/` if PDF) to the user's repo
  2. Appends the new repo to `maxwell-hq/registry/repos.json` if this is the user's first publish
  3. Opens the review Issue in `maxwell-hq/reviews` via the API, using the Issue Form template, pre-filled with title/abstract/link
  4. Redirects to the new live paper page with the Fold-in success animation
- [ ] Autosave: persist wizard state to `localStorage` (client-only, not GitHub) between steps so a refresh doesn't lose in-progress work pre-publish

### 7.2 Paper Rendering Pipeline
- [ ] Server-side Markdown → HTML render with math/code support
- [ ] Client-side PDF viewer path (`pdf.js`) for uploaded-file papers
- [ ] Auto-generated Table of Contents from headings for the sticky right rail
- [ ] Cite-this-paper generator (BibTeX + APA, computed client-side from `metadata.yaml` fields — no server round-trip needed)
- [ ] Review-status badge component reading cached Issue label state

### 7.3 `/explore` and Browse
- [ ] Faceted filter rail (Field, Type, Status, License, Date) as URL-query-driven state (shareable/bookmarkable filtered views)
- [ ] Paper card component with Corner Fold motif, origami category tag, status badge
- [ ] Infinite scroll list, backed initially by the registry + cached metadata reads (search index can lag slightly behind at MVP)

### 7.4 Review Workflow Integration
- [ ] Render the structured review summary (Strengths/Concerns/Suggestions/Recommendation) parsed from Issue Form comment bodies
- [ ] "View full thread on GitHub" deep link, always visible, never hidden — this is a trust/transparency requirement, not optional polish
- [ ] Label-change webhook → cache invalidation → status badge updates live on the paper page

### 7.5 Expert Program
- [ ] `/experts` directory page, populated by reading `maxwell-hq` GitHub Team memberships (`Expert:{field}` teams)
- [ ] "Become an Expert" nomination form → creates an Issue in an internal `maxwell-hq/expert-applications` repo for the founding council to manually review (manual process is correct for v1 — see PRD §20.3)
- [ ] Manual founding-council step: add approved nominee to the relevant GitHub Team → their MaxWell profile badge appears automatically on next cache refresh (no separate roles DB, per architecture principle)

### 7.6 Comments/Discussions
- [ ] Integrate GitHub Discussions GraphQL API for reader comment threads on paper pages
- [ ] Gate the comment box behind auth state; unauthenticated visitors see a "Sign in with GitHub to comment" prompt inline, never a hard page redirect

### 7.7 Profile Pages (`/u/{username}`)
- [ ] Header pulling live GitHub profile fields
- [ ] MaxWell publication grid for that user
- [ ] Expert badge rendering if applicable

### 7.8 Dashboard
- [ ] Drafts list (unpublished, from a `drafts/` folder or branch)
- [ ] Published list with cached view counts + review status
- [ ] Reviews-received aggregation
- [ ] Reviews-to-do queue (visible only if `isExpert: true` in the user's config)
- [ ] Settings page (notification prefs, GitHub connection status, profile visibility toggles)

### 7.9 Search Index Pipeline
- [ ] Write the GitHub Action (`rebuild-search-index.yml`) that: reads `maxwell-hq/registry/repos.json` → fetches each repo's papers' metadata + extracted text → builds a Pagefind (or Lunr) static index → publishes the built index as a static asset (GitHub Pages or committed to a `dist` branch the frontend fetches)
- [ ] Schedule: every 15–30 minutes, plus trigger on `repository_dispatch` from the publish-webhook for near-real-time indexing of new papers
- [ ] Wire the frontend `/search` page to load and query the static index client-side

### 7.10 Notifications
- [ ] Email templates (Resend): new review comment, status change, co-author invite, weekly digest (v2 optional)
- [ ] Webhook → notification dispatch function → send email

### 7.11 Feature Exit Criteria (applies to every item above)
A feature isn't "done" until: it works end-to-end against a **real** GitHub account (not a mock), it's responsive on mobile, and it matches the Phase 0 design tokens exactly (no ad-hoc hex codes in component code).

---

## 8. Phase 4 — Design System Implementation (Engineering Side)

**Goal:** Every visual element in the product traces back to a named design token — zero one-off styling.

- [ ] Import the Phase 0 token export into `packages/design-tokens/` and generate the Tailwind config (`tailwind.config.ts`) directly from it — colors, spacing scale, radius scale, font families all sourced from one file
- [ ] Build the `components/ui/` primitive library first (Button, Input, Select, Tag, Badge, Card) — these should be finished and reviewed against Figma **before** any page is built on top of them
- [ ] Build the `components/motifs/` library: `<CornerFold />`, `<CreaseLine />`, `<FoldIn />` (wrapping Framer Motion) as reusable, documented components — every paper card, profile card, and section divider in the app should consume these rather than reimplementing the effect
- [ ] Set up Storybook (or a lightweight `/dev/components` internal route) so design and engineering can review every component in isolation against the Figma spec before it ships inside a real page
- [ ] Run the WCAG AA contrast check (already done on paper in Phase 0) again in code, programmatically, as a CI lint step — catches regressions if colors drift

---

## 9. Phase 5 — Content & Policy Writing Sprint

**Goal:** Every policy/guideline page (PRD §15) is fully written, reviewed, and legally sanity-checked before launch — these cannot be placeholder "Lorem ipsum" pages at any point, even in soft launch.

- [ ] Draft Publishing Guidelines
- [ ] Draft Copyright & Licensing page (plain-English license explainers + the "authors retain full copyright" statement)
- [ ] Draft Code of Conduct (base it on the Contributor Covenant structure, customized for academic-integrity concerns specific to research publishing)
- [ ] Draft Review Standards (exact definition of what "community-verified" requires)
- [ ] Draft Privacy Policy (should be genuinely short — reflect the "we store almost nothing" architecture honestly)
- [ ] Have a lawyer (even a single paid consultation) sanity-check the Copyright/Licensing and Privacy pages specifically — these carry real legal weight even for an open platform
- [ ] Write the About page telling the MaxWell + "Powered by HarVa" story per PRD Appendix A

---

## 10. Phase 6 — Founding Expert Recruitment Playbook

**Goal:** 20–30 vetted Experts across your core launch fields, onboarded and ready to review, *before* public launch — a platform with zero reviewers on day one fails its own core promise immediately.

### 10.1 Recruitment Steps
- [ ] Define the 5–8 initial fields you'll launch with (don't try to cover all of science on day one — depth in a few fields beats shallow coverage everywhere)
- [ ] Build a target list: researchers active on GitHub (existing signal of comfort with the platform's mechanic), grad students, open-science advocates, people active in relevant subreddits/Discords/Twitter-X academic communities
- [ ] Personalized outreach (not a mass email) — a short template:
  > *Subject: Would you help vet the first wave of papers on MaxWell?*
  > *Hi {name} — I'm building MaxWell, an open, GitHub-native platform for publishing and reviewing research in the open. I'd love for you to be one of our founding Experts in {field} — meaning your reviews carry real weight in what gets marked "community-verified." No commitment beyond reviewing what genuinely interests you. Would you be open to a 15-minute call?*
- [ ] Manually vet each nominee against the criteria in PRD §8.6 (existing publications, GitHub activity, institutional signal)
- [ ] Onboard approved Experts: add to the correct `Expert:{field}` GitHub Team, send a short "how review works on MaxWell" walkthrough (screen recording or doc), confirm their profile badge renders correctly

### 10.2 Exit Criteria
Every launch field has at least 3 committed Experts (so no single reviewer becomes a bottleneck or single point of failure/bias).

---

## 11. Phase 7 — QA, Security & Accessibility Audit

**Goal:** Catch what a rushed feature-building sprint misses, before real users and real GitHub accounts are on the line.

### 11.1 Security
- [ ] Confirm GitHub App permissions are the **minimum necessary** (re-audit against §5.2 — permission creep is easy to accumulate during feature building)
- [ ] Confirm webhook signature verification is enforced on every payload, no bypass path
- [ ] Confirm session cookies are HTTP-only, secure, signed, and short-lived with refresh handling
- [ ] Confirm no GitHub tokens are ever exposed to client-side JS (server-only usage, verified by grep-auditing the codebase for the private key/token variable names)
- [ ] Run a dependency vulnerability scan (`npm audit` / Dependabot alerts resolved)

### 11.2 Accessibility
- [ ] Full keyboard-navigation pass across the Publish Wizard specifically (multi-step forms are the highest-risk a11y surface in this product)
- [ ] Screen reader pass on the paper reading page (heading structure, math/equation alt-text handling, ToC landmark roles)
- [ ] Automated Lighthouse + axe-core CI checks passing ≥ 95 / zero critical violations

### 11.3 Performance
- [ ] Confirm ISR caching is actually reducing GitHub API call volume under simulated load (log rate-limit headroom during a load test)
- [ ] Confirm LCP targets (PRD §16) are met on `/explore` and `/p/*` from a cold cache

### 11.4 Content/Legal
- [ ] Final read-through of all policy pages (Phase 5) by someone who did **not** write them
- [ ] Confirm license selection during publishing correctly propagates into both `metadata.yaml` and the visible page footer for every license option, not just the CC-BY default

---

## 12. Phase 8 — Launch Playbook

### 12.1 Soft Launch (invite-only, 1–2 weeks before public)
- [ ] Invite the founding Expert cohort (§10) plus a small group of friendly authors to publish real first papers
- [ ] Watch the full loop end-to-end on real accounts: publish → review Issue created → Expert reviews → status badge updates → author sees it live
- [ ] Fix anything broken in that loop before it's public — this is the single most important dress rehearsal

### 12.2 Public Launch
- [ ] Publish the About/Story post explaining the MaxWell + HarVa mission (this doubles as your launch announcement content)
- [ ] Launch channels: Hacker News (Show HN), relevant academic Twitter/X and Mastodon communities, GitHub's own trending/discovery surfaces (since your own platform repo is open source per the footer promise), relevant subreddits (r/AcademicPublishing, field-specific subs)
- [ ] Have your founding Experts primed to publicly vouch for and review early submissions in the first 48 hours — momentum here matters disproportionately
- [ ] Monitor GitHub API rate-limit headroom and hosting function logs closely for the first 72 hours; have the on-call engineer actually on call

### 12.3 Launch-Week Checklist (Go/No-Go)
- [ ] All Phase 7 audits passed
- [ ] All Phase 5 policy pages finalized and legally reviewed
- [ ] Founding Expert cohort onboarded and primed (§10.2 exit criteria met)
- [ ] Soft launch loop completed successfully with zero broken steps
- [ ] Support channel exists (even just a monitored email or a GitHub Discussions category) for early user issues
- [ ] Rollback plan documented: since content lives in user repos, a bad deploy is low-risk to *content*, but confirm the hosting provider's instant-rollback-to-previous-deploy is tested and works

---

## 13. Phase 9 — Post-Launch Operations Runbooks

These are the recurring, operational playbooks the team runs **after** launch — write these down now so they don't live only in one person's head.

### 13.1 Runbook: New Expert Onboarding
1. Nomination arrives in `maxwell-hq/expert-applications`
2. Founding council reviews against published criteria (PRD §8.6) within 5 business days
3. If approved: add to `Expert:{field}` GitHub Team → confirm badge renders → send welcome email
4. If declined: send a respectful, specific explanation (never a silent close)

### 13.2 Runbook: Moderation Report Received
1. Report lands as an Issue in `maxwell-hq/moderation` (via the in-app Report action)
2. Triage within 24 hours: content-policy violation vs. plagiarism/copyright claim vs. harassment
3. If action needed: de-list from `/explore`/search index (index-layer action only — never silently alter the user's underlying GitHub repo)
4. Notify the affected author with the specific policy citation
5. Log resolution in the Issue and close

### 13.3 Runbook: Search Index Rebuild Failure
1. Check the scheduled GitHub Action run logs first
2. Common cause: a malformed `metadata.yaml` in a newly published paper breaking the parser — add defensive parsing + a validation step at publish time (Step 4 of the wizard) to prevent this at the source going forward
3. Manually re-trigger the workflow once fixed; confirm the static index asset timestamp updates

### 13.4 Runbook: GitHub App Private Key Rotation
1. Generate a new private key in the GitHub App settings (old key remains valid until manually revoked — no downtime)
2. Update the secret in the hosting provider's environment variables
3. Redeploy
4. Confirm a test authenticated action succeeds
5. Revoke the old key

### 13.5 Runbook: A Field Has No Active Experts (Coverage Gap)
1. Flagged automatically when a field's open review Issues exceed a threshold (e.g., 3+) with zero Expert engagement in 14 days
2. Community/Ops lead runs a targeted recruitment pass for that specific field (reuse §10.1 outreach template)
3. Consider temporarily surfacing a "this field needs reviewers" call-to-action on relevant paper pages in that field

---

## 14. Master Launch Checklist (Consolidated)

- [ ] GitHub App registered, scoped correctly, private key stored securely (§5.2)
- [ ] `maxwell-hq` org repos (`reviews`, `moderation`, `registry`) live with correct templates (§5.4)
- [ ] Auth + first-login repo provisioning working end-to-end on real accounts (§6)
- [ ] Publishing Wizard fully functional, all 5 steps, both Markdown and PDF paths (§7.1)
- [ ] Paper rendering, `/explore`, search index pipeline live (§7.2, 7.3, 7.9)
- [ ] Review workflow — Issue creation, structured template, label sync, live status badges (§7.4)
- [ ] Expert directory + founding cohort onboarded, ≥3 Experts per launch field (§7.5, §10)
- [ ] Comments/Discussions gated correctly behind auth (§7.6)
- [ ] Profile pages, Dashboard fully functional (§7.7, §7.8)
- [ ] Notifications sending correctly (§7.10)
- [ ] Design system fully implemented, zero ad-hoc styling (§8)
- [ ] All policy/guideline pages written and legally reviewed (§9)
- [ ] Security, accessibility, and performance audits passed (§11)
- [ ] Soft launch completed successfully (§12.1)
- [ ] Go/No-Go checklist signed off by the founding team (§12.3)

---

## Appendix A — GitHub Issue Form Template (`peer-review.yml`)

```yaml
name: Peer Review
description: Structured review for a MaxWell submission
title: "[Review] "
labels: ["status:in-review"]
body:
  - type: dropdown
    id: assessment
    attributes:
      label: Overall Assessment
      options:
        - Accept
        - Minor Revisions
        - Major Revisions
        - Reject
    validations:
      required: true
  - type: textarea
    id: strengths
    attributes:
      label: Strengths
    validations:
      required: true
  - type: textarea
    id: concerns
    attributes:
      label: Concerns
    validations:
      required: true
  - type: textarea
    id: suggestions
    attributes:
      label: Suggested Revisions
  - type: checkboxes
    id: coi
    attributes:
      label: Conflict of Interest
      options:
        - label: I have no conflict of interest with the author(s)
          required: true
```

## Appendix B — `metadata.yaml` Schema (Reference)

```yaml
title: string
type: paper | article | idea
field: string
keywords: [string]
license: CC-BY-4.0 | CC-BY-SA-4.0 | CC0-1.0 | all-rights-reserved-reference-only
authors:
  - github: string
    role: primary | co-author
status: awaiting-review | in-review | needs-revision | community-verified
reviewIssueUrl: string (URL)
publishedAt: ISO 8601 datetime
revisedAt: ISO 8601 datetime
commitSha: string   # pinned for permalink stability, per PRD §18
```

## Appendix C — Suggested Sprint Cadence

Two-week sprints, demo every Friday, mapped roughly to playbook phases:

| Sprint | Focus |
|---|---|
| 1–2 | Phase 0 + Phase 1 |
| 3 | Phase 2 |
| 4–5 | Phase 3.1–3.2 (Wizard + Rendering) + Phase 4 (design system catching up) |
| 6 | Phase 3.3–3.4 (Explore + Review workflow) |
| 7 | Phase 3.5–3.7 (Experts + Comments + Profiles) |
| 8 | Phase 3.8–3.10 (Dashboard + Search index + Notifications) |
| 9 | Phase 5 + Phase 6 kickoff (content + recruitment, running in parallel) |
| 10 | Phase 7 (QA/Security/Accessibility) |
| 11 | Bug-fix buffer + Phase 12.1 Soft Launch |
| 12 | Phase 12.2 Public Launch |
