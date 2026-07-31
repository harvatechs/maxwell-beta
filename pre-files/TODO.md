# TODO.md — MaxWell Master Build Checklist
**Powered by HarVa** · Companion to `MaxWell-PRD.md`, `MaxWell-Build-Playbook.md`, and `AGENT.md`

This is the **live, working task list**. Check items off in place, in order, top to bottom. Do not skip ahead to a later phase item while an earlier "Exit Criteria" block is unchecked — each phase genuinely blocks the next per the Build Playbook.

Every item below should be treated as one commit-sized unit of work. If an item feels too big to finish and verify in one sitting, split it before starting, not after.

> **Status note (reset):** every item in this file was previously found checked off with fabricated `Verified in <path>` annotations pointing at files that do not exist anywhere in this project — no codebase has actually been built yet. That is the exact "hallucinated functionality" failure mode `AGENT.md` §2 exists to prevent. All checkboxes have been reset to `[ ]` and the false attestations removed. **Nothing below is done until a real feature, tested against a real GitHub account, earns the checkmark per the Definition of Done in `AGENT.md` §6** — including a one-line note on what was verified and against what real account/repo, not a plausible-sounding file path.

---

## Phase 0 — Brand & Design Foundation
*Blocks everything. Nothing below should start until this is signed off.*

- [ ] Execute the folded-paper "W" logo (full vector construction per PRD §4.2), not a placeholder sketch
- [ ] Produce all logo lockups: wordmark+mark, mark-only (16–512px), monochrome, "Powered by HarVa" sub-lockup
- [ ] Build the Figma token library (color, type, spacing, radius) named **identically** to what will become Tailwind config keys
- [ ] Document `<CornerFold />`, `<CreaseLine />`, `<FoldIn />` precisely — export keyframe/easing specs engineering can implement literally, not vaguely
- [ ] Build core Figma component library: Button, Input, Tag/Pill (per origami color), Card, Status Badge, Nav Bar, Footer
- [ ] Build clickable prototypes: Landing page (full scroll), Publish Wizard (all 5 steps), Paper Reading Page
- [ ] Run WCAG AA contrast check on every token pairing (flag `origami.amber` on white specifically) **before** tokens are locked
- [ ] Export final design tokens as JSON for engineering consumption
- [ ] **Exit criteria check:** Figma "Design System v1.0" published, prototypes approved, tokens JSON exists → ✅ proceed to Phase 1


---

## Phase 1 — Infrastructure & Repo Setup

- [ ] Register `maxwell-hq` GitHub Organization
- [ ] Register production domain
- [ ] Set up hosting (Vercel/Netlify/Cloudflare Pages), Figma, Resend/Postmark, Cloudflare KV accounts
- [ ] Set up shared secrets vault (1Password/Bitwarden) for the team
- [ ] Scaffold monorepo exactly per Build Playbook §5.1 folder structure
- [ ] Register the GitHub App (`MaxWell`) with the exact permissions in Playbook §5.2 — no more, no less
- [ ] Generate and securely store the GitHub App private key (`.pem`) — never commit it
- [ ] Configure all environment variables from Playbook §5.3 in hosting provider (production + preview separately)
- [ ] Add `.env.example` with variable **names only**
- [ ] Create `maxwell-hq/reviews` repo, add `peer-review.yml` Issue Form template (Playbook Appendix A)
- [ ] Create `maxwell-hq/moderation` repo (private), add report Issue template
- [ ] Create `maxwell-hq/registry` repo, seed with empty `repos.json`
- [ ] Install the GitHub App on `maxwell-hq` org itself
- [ ] Connect repo to hosting, confirm preview deploys work on PRs
- [ ] Confirm branch protection + required status checks on production branch
- [ ] Deploy "Hello World" placeholder to production domain over HTTPS
- [ ] **Exit criteria check:** placeholder live, GitHub App installable, test webhook delivery succeeds → ✅ proceed to Phase 2


---

## Phase 2 — Core Platform Engineering

- [ ] Implement GitHub App OAuth flow (authorize → callback → token exchange → signed session cookie)
- [ ] Implement stateless session handling (signed JWT: `githubUsername`, `installationId`, expiry) — no session DB
- [ ] Build `lib/github/client.ts`: typed Octokit wrapper, auto installation-token attachment, 403 retry/backoff, rate-limit logging
- [ ] Implement first-login provisioning: check/create `{username}/maxwell-publications`, seed `README.md`, `papers/.gitkeep`, `maxwell.config.json`
- [ ] Implement edge caching layer (`lib/cache/`) with ISR-style revalidation (start 5 min on `/explore`, `/p/*`)
- [ ] Implement webhook receiver `/api/webhooks/github`: verify signature, parse `issues`/`issue_comment`/`push`, invalidate relevant cache
- [ ] **Test against a real GitHub account (not a mock):**
  - [ ] Login → authenticated session shows real username
  - [ ] Login auto-creates real `maxwell-publications` repo
  - [ ] Test webhook (comment on test Issue) visibly invalidates cache, provable via logs
- [ ] **Exit criteria check:** all three real-account tests pass → ✅ proceed to Phase 3


---

## Phase 3 — Feature Build

Build in this exact order — each item is blocked by having real content/state to test against.

### 3.1 Publishing Wizard
- [ ] Step 1 — Type selector (Paper / Article / Idea) as choice cards
- [ ] Step 2 — Core details form: title, abstract w/ char count, category select (drives origami tag color), keyword tags (max 8), co-author GitHub-username autocomplete, license dropdown w/ plain-English descriptions
- [ ] Step 3 — Markdown+LaTeX editor (CodeMirror/Monaco + `remark-math`/`rehype-katex` live preview split pane)
- [ ] Step 3b — Drag-and-drop PDF upload path (Contents API, base64 commit)
- [ ] Step 4 — Declaration checklist (4 required checkboxes, gates Publish button)
- [ ] Step 5 — Live full-page preview matching production paper-page render exactly
- [ ] Publish action: commit `papers/{slug}/paper.md` + `metadata.yaml` (+ `assets/`)
- [ ] Publish action: append repo to `maxwell-hq/registry/repos.json` on first publish
- [ ] Publish action: open review Issue in `maxwell-hq/reviews` via Issue Form template, pre-filled
- [ ] Publish action: redirect to live paper page with `<FoldIn />` success animation
- [ ] Autosave wizard state to `localStorage` between steps (client-only)
- [ ] **Verify end-to-end on a real test account**, including a full publish → visible on `/p/{username}/{slug}` → review Issue exists on GitHub

### 3.2 Paper Rendering Pipeline
- [ ] Server-side Markdown → HTML with math (KaTeX) + syntax-highlighted code
- [ ] Client-side `pdf.js` viewer path for uploaded PDFs
- [ ] Auto-generated Table of Contents (sticky right rail, desktop)
- [ ] Cite-this-paper generator (BibTeX + APA, client-side from `metadata.yaml`)
- [ ] Review-status badge component reading cached label state

### 3.3 `/explore` and Browse
- [ ] Faceted filter rail (Field, Type, Status, License, Date) as URL-query state
- [ ] Paper card component: `<CornerFold />`, origami category tag, status badge
- [ ] Infinite scroll (registry + cached metadata initially, search index can lag at MVP)

### 3.4 Review Workflow Integration
- [ ] Parse and render structured review summary (Assessment/Strengths/Concerns/Suggestions) from Issue Form comments
- [ ] "View full thread on GitHub" deep link, always visible
- [ ] Label-change webhook → cache invalidation → live status badge updates

### 3.5 Expert Program
- [ ] `/experts` directory reading `Expert:{field}` GitHub Team memberships
- [ ] "Become an Expert" nomination form → Issue in `maxwell-hq/expert-applications`
- [ ] Confirm manual approval flow: add to Team → badge appears on next cache refresh

### 3.6 Comments/Discussions
- [ ] Integrate GitHub Discussions GraphQL API for paper-page comment threads
- [ ] Gate comment box behind auth; unauthenticated users see inline "Sign in with GitHub to comment" (never a hard redirect)

### 3.7 Profile Pages
- [ ] Header pulling live GitHub profile fields (avatar, name, bio, location)
- [ ] MaxWell publication grid for that user
- [ ] Expert badge rendering if applicable

### 3.8 Dashboard
- [ ] Drafts list
- [ ] Published list (cached view counts + review status)
- [ ] Reviews-received aggregation
- [ ] Reviews-to-do queue (visible only if `isExpert: true`)
- [ ] Settings page (notification prefs, GitHub connection status, visibility toggles)

### 3.9 Search Index Pipeline
- [ ] `rebuild-search-index.yml` GitHub Action: read registry → fetch metadata+text → build Pagefind/Lunr static index → publish as static asset
- [ ] Schedule every 15–30 min + trigger on `repository_dispatch` from publish webhook
- [ ] Wire `/search` to load and query the static index client-side

### 3.10 Notifications
- [ ] Email templates (Resend/Postmark): new review comment, status change, co-author invite
- [ ] Webhook → notification dispatch function → send email
- [ ] **Every item in 3.1–3.10 individually passes the Definition of Done in `AGENT.md` §6 before being checked off here.**

---

## Phase 4 — Design System Implementation (Engineering)

- [ ] Generate `tailwind.config.ts` directly from `packages/design-tokens/` (no hand-authored duplicate values)
- [ ] Build and review `components/ui/` primitives against Figma before any page consumes them
- [ ] Build `components/motifs/`: `<CornerFold />`, `<CreaseLine />`, `<FoldIn />` — documented, reusable, nothing else
- [ ] Set up Storybook or `/dev/components` internal route for isolated review
- [ ] Add automated WCAG AA contrast check as a CI lint step

---

## Phase 5 — Content & Policy Writing

- [ ] Publishing Guidelines — fully written, no placeholders
- [ ] Copyright & Licensing — plain-English license explainers, explicit "authors retain full copyright" statement
- [ ] Code of Conduct — Contributor-Covenant-style, adapted for academic integrity
- [ ] Review Standards — exact "community-verified" definition
- [ ] Privacy Policy — genuinely short, honest about the "we store almost nothing" architecture
- [ ] Lawyer sanity-check on Copyright/Licensing and Privacy pages specifically
- [ ] About page telling the MaxWell + "Powered by HarVa" story (PRD Appendix A)

---

## Phase 6 — Founding Expert Recruitment

- [ ] Define 5–8 initial launch fields (depth over breadth)
- [ ] Build target outreach list (GitHub-active researchers, grad students, open-science community)
- [ ] Personalized outreach sent (template in Playbook §10.1)
- [ ] Manually vet each nominee against PRD §8.6 criteria
- [ ] Onboard approved Experts: correct GitHub Team, walkthrough sent, profile badge confirmed rendering
- [ ] **Exit criteria check:** every launch field has ≥3 committed Experts

---

## Phase 7 — QA, Security & Accessibility Audit

### Security
- [ ] Re-audit GitHub App permissions are still minimum-necessary (check for creep since Phase 1)
- [ ] Confirm webhook signature verification has no bypass path
- [ ] Confirm session cookies are HTTP-only, secure, signed, short-lived with refresh handling
- [ ] Grep-audit codebase: no GitHub tokens/private key ever reach client-side JS
- [ ] Run dependency vulnerability scan, resolve all flagged issues

### Accessibility
- [ ] Full keyboard-navigation pass on the Publish Wizard specifically
- [ ] Screen-reader pass on paper reading page, `/explore`, and the wizard
- [ ] Confirm every text/background pairing meets WCAG AA in shipped code, not just Figma

### Performance
- [ ] Lighthouse Performance ≥ 95 on `/explore` and `/p/*`
- [ ] Confirm LCP < 1.5s on those routes under realistic caching

---

## Phase 8 — Launch

- [ ] Soft launch to a small invited cohort (founding Experts + early testers)
- [ ] Fix issues surfaced during soft launch
- [ ] Run the Master Launch Checklist (Build Playbook §14) top to bottom
- [ ] Founding team Go/No-Go sign-off
- [ ] Public launch

---

## Phase 9 — Post-Launch Operations (Ongoing)

- [ ] Runbook in place and tested: New Expert Onboarding (Playbook §13.1)
- [ ] Runbook in place and tested: Moderation Report Received (Playbook §13.2)
- [ ] Runbook in place and tested: Search Index Rebuild Failure (Playbook §13.3)
- [ ] Runbook in place and tested: GitHub App Private Key Rotation (Playbook §13.4)
- [ ] Runbook in place and tested: Field Has No Active Experts (Playbook §13.5)
- [ ] Success metrics dashboard tracking PRD §17 metrics reviewed monthly


---

## Open Decisions Needing Founder Input

*(Populate this as the agent encounters PRD §20 open questions or new ambiguity during build — do not resolve silently, per `AGENT.md` §7.)*

- [ ] Co-author access model: true repo-write vs. lighter "confirm via comment" (PRD §20.1) — **default while building: lighter comment-confirm pattern**
- [ ] Community-verified threshold: fixed vs. field-configurable (PRD §20.2) — **default while building: fixed at 2 Expert reviews**
- [ ] Founding Expert council authority/governance model long-term (PRD §20.3) — **default while building: manual, documented, founder-run process; revisit publicly before scale**
- [ ] Final tagline selection from PRD §4.1 options — **not yet decided, do not hardcode a final choice into marketing copy until confirmed**
