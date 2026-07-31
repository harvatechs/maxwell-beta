# MaxWell — Product Requirements Document
### The Community-Driven Scientific Paper & Ideas Publishing Platform
**Powered by HarVa**

| | |
|---|---|
| **Document Type** | End-to-End Product Requirements Document (PRD) |
| **Status** | Draft v1.0 — Ready for design & engineering scoping |
| **Owner** | Product / Founding Team |
| **Date** | July 2026 |
| **Confidentiality** | Internal |

---

## 0. How to Read This Document

This PRD is written so that three different people can each get what they need from it:

- A **designer** can go straight to Sections 4–6 and 9–10 (brand, design system, landing page, page-by-page specs).
- An **engineer** can go straight to Sections 11–14 (architecture, stack, data model, APIs).
- A **founder/PM** should read start to finish — it's written as the source of truth for what MaxWell is, why it exists, and how it gets built without a traditional backend or storage budget.

---

## 1. Vision & Product Summary

**MaxWell** is an open, minimal, world-class platform for publishing and reviewing scientific papers, research notes, and technical/scientific articles — built entirely on top of **GitHub as the backend**, so the platform itself never has to own, host, or pay for a database or file storage.

The name **MaxWell** is a deliberate nod to James Clerk Maxwell — a scientist whose work unified seemingly separate fields (electricity, magnetism, light) into one elegant, simple set of equations. That's the product's design ethos too: unify "publishing," "peer review," "version control," and "community discussion" into one clean, simple surface — instead of the fragmented, ugly, paywalled mess that scientific publishing is today.

**One sentence pitch:**
> MaxWell is GitHub for scientific ideas — sign in with GitHub, publish a paper in minutes, get reviewed by the community in the open, and own your work forever in your own GitHub repository.

**What makes this different from arXiv, Medium, ResearchGate, PLOS, journals, etc.:**

| Problem with the status quo | MaxWell's answer |
|---|---|
| Papers live behind paywalls or on for-profit platforms that own your content | Every paper lives in **the author's own GitHub repo** — MaxWell just renders and indexes it |
| Peer review is slow, opaque, and gatekept | Review happens in the open via a **GitHub Issues-based review protocol**, visible to everyone, run by community-vetted experts |
| Submission is bureaucratic, ugly, PDF-upload-into-a-black-box | A **guided, form-like wizard** (inspired by clean government e-filing UX, not journal submission portals) |
| Design feels like 1998 academic software | **Apple-Zen minimalism** with an **origami-paper visual motif** — this is a knowledge platform that also happens to be beautiful |
| Infra costs scale with content | **Zero proprietary storage** — GitHub *is* the database, the file store, the version history, and the review workflow engine |

---

## 2. Goals & Non-Goals

### 2.1 Goals
1. Make publishing a paper or article feel as fast and frictionless as filling out a well-designed form — minutes, not weeks.
2. Make every author's GitHub identity **be** their MaxWell identity — no separate profile to maintain.
3. Make peer review **transparent, public, and asynchronous** — modeled on how open-source software gets reviewed, not how journals do it.
4. Make the platform **free to run at scale** by never owning storage — content lives in user-owned GitHub repositories.
5. Make the visual design good enough that a scientist would be proud to link it in their university bio, and a designer would screenshot it for inspiration.
6. Make browsing and reading **fully open** — no login wall for readers, ever.
7. Ship an MVP that is production-credible, not a prototype.

### 2.2 Non-Goals (explicitly out of scope for v1)
- MaxWell will **not** build or pay for its own database, object storage, or file CDN — GitHub + a thin static/edge layer only.
- MaxWell will **not** support non-GitHub sign-in in v1 (no email/password, no Google/ORCID — GitHub OAuth only, ORCID linking considered for v2).
- MaxWell will **not** attempt to replace formal DOI-issuing journals — it positions itself as a **preprint + open-review + ideas** layer, complementary to (not a replacement for) formal indexed journals, at least in v1.
- MaxWell will **not** monetize via ads. (Future monetization, if any, is a v2+ conversation — sponsorships, institutional accounts, or optional paid "Pro" author tools.)
- MaxWell will **not** build in-house PDF typesetting/LaTeX compilation in v1 — authors upload a rendered PDF or write in Markdown/MathJax directly.

---

## 3. Target Users & Personas

| Persona | Who they are | What they need from MaxWell |
|---|---|---|
| **The Author** ("Ada") | Grad student, independent researcher, or scientist with a paper, preprint, or idea to share | Fast publishing, clean citation-ready page, visibility, honest feedback, permanent ownership of their work |
| **The Reader** ("Rahul") | Anyone curious — student, journalist, engineer, hobbyist scientist | Zero-friction reading, no login wall, beautiful reading experience, trustworthy content |
| **The Reviewer / Expert** ("Dr. Chen") | Domain expert who wants to review, vet, and tag quality work | A lightweight, GitHub-native review workflow, credit for reviews done, reputation building |
| **The Lurker-Turned-Commenter** | A reader who wants to ask a question or leave a critique | One-click GitHub sign-in to unlock commenting, nothing more |
| **The Institution / Lab (v2)** | A university lab or research group | Org-level presence, verified badges, aggregated publication feed |

---

## 4. Brand Identity

### 4.1 Naming & Lockup

- **Product name:** `MaxWell` (always styled with the internal capital W — "Max**W**ell" — this becomes a signature typographic detail across the brand, similar to how "eBay" or "PayPal" use internal caps as a brand mark, not just a name).
- **Master brand line:** `Powered by HarVa` — always appears as a small, quiet footer/badge lockup, never competing with the MaxWell wordmark. Think "Powered by Stripe" or "Built on Vercel" — a trust badge, not a co-brand.
- **Tagline options** (pick one for launch, A/B the rest):
  1. *"Publish ideas. Not paywalls."*
  2. *"Where science ships in the open."*
  3. *"Your research. Your repo. Your rules."*
  4. *"Science, reviewed in the open."*

### 4.2 Logo Concept (no existing mark was supplied — this is the recommended direction)

Since no logo file exists yet, the direction below is what a designer should execute in Figma/Illustrator:

- **Core motif: a single folded square of paper unfolding into a "W".**
  The negative space between two origami folds naturally forms the "W" of MaxWell — this ties the *origami* visual language directly into the *wordmark*, rather than treating origami as decoration bolted onto a generic logo.
- **Construction logic:**
  - Start with a square (representing a sheet of paper — the atomic unit of a "paper").
  - Apply two diagonal folds, mountain-fold style, so the crease lines form the two strokes of a "W".
  - Render in a single accent color on white, with one crease shown as a subtle gradient/shadow to suggest a literal paper fold (this is the *only* place gradients are allowed in the entire design system — everything else is flat).
- **Lockup variants needed:** full wordmark + mark (nav bar), mark alone (favicon/app icon at 16–512px), monochrome (for dark surfaces, print, GitHub README badges), and a horizontal "Powered by HarVa" sub-lockup for footers.
- **What to avoid:** no beakers, no atoms, no graduation caps, no globe icons — these are the clichés of every "science platform" logo since 2005. The folded-paper "W" is distinctive and literally *about* the product (a paper).

### 4.3 Color Palette — "Cleaner White, Origami Accents"

The base UI is **overwhelmingly white/near-white** — origami color only appears in intentional, restrained moments (accent lines, category tags, chart/data-viz colors, illustration). This keeps it "Apple-Zen minimal" while still being described as "artistically colorful" where it counts: illustration and iconography, not chrome.

| Token | Hex | Usage |
|---|---|---|
| `paper.white` | `#FFFFFF` | Primary background |
| `paper.off` | `#FAFAF8` | Secondary surface (cards, sidebars) |
| `ink.900` | `#14171A` | Primary text |
| `ink.600` | `#4B5259` | Secondary text |
| `ink.300` | `#9AA1A8` | Placeholder / disabled |
| `hairline` | `#E7E5E0` | Borders, dividers — warm gray, not cold gray, to feel "paper" not "software" |
| `origami.crimson` | `#E14B4B` | Physics / hard sciences tag, primary CTA on hover accents |
| `origami.amber` | `#F2A93B` | Life sciences tag, "under review" status |
| `origami.teal` | `#2FA79B` | Computer science / math tag, "verified" status |
| `origami.indigo` | `#4F5FE0` | Social science / humanities tag, links |
| `origami.moss` | `#6B9B5E` | Environmental / earth sciences tag, "published" status |

Design rule: **one origami color per content category, used only as a thin fold-accent (a 3–4px corner-fold shape, a tag pill, or a chart color) — never as a full-bleed background.** This is what keeps "colorful, artistic, origami-inspired" compatible with "clean, minimal, white-themed."

### 4.4 Typography

- **Display/Headline:** A refined serif with humanist warmth for editorial gravitas — e.g. **"Fraunces"** or **"Source Serif 4"** (both open-source, Google Fonts). Serif signals "this is a publication," not "this is a SaaS dashboard."
- **UI/Body:** A clean, highly-legible grotesk — e.g. **"Inter"** or **"Public Sans"** for all UI chrome, forms, and body paragraphs.
- **Monospace (for metadata, DOIs, repo paths, code):** **"JetBrains Mono"** or **"IBM Plex Mono"**.
- Pairing rule: serif is used **only** for paper titles, article headlines, and the marketing site's big statements. Everything functional (buttons, nav, forms, dashboards) is grotesk. This mirrors how NYT, The Atlantic, and Nature balance editorial serif with functional sans.

### 4.5 The Origami Motif, Precisely Defined

To avoid the trap of "origami" becoming a vague, overused mood board word, define it as **three concrete, reusable design elements**:

1. **The Corner Fold** — every card (paper card, article card, profile card) has a small triangular "folded corner" in the top-right, rendered as a subtle diagonal crease with a soft inner shadow. This is the single most repeated motif in the product — it should appear on paper cards, the logo, loading states, and empty states.
2. **The Crease Line** — section dividers on the landing page and dashboard use a thin diagonal or angled line (never a plain horizontal `<hr>`) to imply a fold rather than a hard cut.
3. **Fold-in Motion** — page transitions and card entrances use a subtle "unfold" animation (scale + slight rotate from a folded state to flat), used sparingly (hero section, publish-success screen) — never applied to routine list scrolling, which must stay instant and un-precious.

---

## 5. Design Philosophy

**"Apple-Zen Minimalism, applied to a library, not a store."**

### 5.1 Core Principles
1. **Whitespace is the primary design tool.** Generous margins, large type scale jumps, nothing crowded — inspired by Apple's product pages and Stripe's docs.
2. **Content is the hero.** UI chrome (nav, buttons, badges) recedes; the paper title, abstract, and author recede *less* than the chrome but never compete with the actual research content once you're reading it.
3. **One accent color per screen context.** Never rainbow the UI — the origami palette is used systematically (by category), not decoratively.
4. **Real typography over icons where possible.** Prefer well-set text and numerals over icon soup — this is what makes it feel "editorial" (like a publication) rather than "app-like" (like a SaaS tool).
5. **Motion is quiet.** 150–250ms ease-out transitions only. No bouncy, no parallax scroll gimmicks. The one exception is the "fold-in" motif above, used as a signature moment, not a constant.
6. **Every screen should look correct as a black-and-white print-out.** This is the internal test for "is this actually minimal" — color and imagery are additive polish, not structural crutches.

### 5.2 Layout System
- 12-column responsive grid, **max content width 1120px** for reading contexts (papers/articles) — narrower than typical dashboards, because long-form reading needs a constrained line length (60–75 characters per line, per classic editorial typesetting).
- 8px base spacing unit; spacing scale: 8 / 16 / 24 / 32 / 48 / 64 / 96.
- Border radius: 12px for cards, 8px for buttons/inputs, 4px for tags/pills — soft but not bubbly.

---

## 6. Information Architecture (Sitemap)

```
MaxWell
├── / (Landing / Marketing Home)
├── /explore                      → Browse all papers & articles (public, no auth)
│   ├── /explore?field=physics
│   ├── /explore?type=paper|article|idea
│   └── /explore/trending
├── /search                       → Full-text + metadata search
├── /p/{username}/{paper-slug}    → Individual paper/article reading page
├── /review/{paper-id}            → Public review thread (GitHub Issue mirror)
├── /publish                      → The publishing wizard (auth required)
├── /u/{username}                 → Public author profile (mirrors GitHub profile + MaxWell pubs)
├── /dashboard                    → Logged-in author's private control center
│   ├── /dashboard/drafts
│   ├── /dashboard/published
│   ├── /dashboard/reviews-received
│   ├── /dashboard/reviews-to-do   (if user is an Expert/Reviewer)
│   └── /dashboard/settings
├── /experts                      → Public directory of vetted community reviewers
├── /guidelines                   → Publishing guidelines
├── /policy
│   ├── /policy/copyright-licensing
│   ├── /policy/code-of-conduct
│   ├── /policy/review-standards
│   └── /policy/privacy
├── /about                        → Story of MaxWell, "Powered by HarVa"
└── /login                        → GitHub OAuth entry
```

---

## 7. Core User Flows

### 7.1 Guest Browsing (No Account)
Visitor lands → browses `/explore` freely → opens any paper at `/p/username/slug` → reads full content, sees review status, sees comments → hits **"Sign in with GitHub to comment"** only when attempting to interact (comment, upvote a review, follow an author). Reading is **never** gated.

### 7.2 Sign Up / Login
1. Click **"Continue with GitHub"** (primary CTA, top-right nav, always visible).
2. Standard GitHub OAuth consent screen requests:
   - `read:user` — pull name, bio, avatar, existing public profile
   - `public_repo` (or fine-grained equivalent scoped to a `maxwell-publications` repo) — needed to create/commit papers into the user's GitHub
   - `read:org` (optional, v2) — for institutional/lab affiliation
3. On first login, MaxWell auto-provisions a repo in the user's account: `github.com/{username}/maxwell-publications` (if it doesn't exist), seeded with a `README.md`, `papers/` folder, and a `maxwell.config.json`.
4. User lands on `/dashboard` with an empty state prompting **"Publish your first paper →"**.

### 7.3 Publishing Flow — "Like a Well-Designed Government e-Filing Form"
A single-page, multi-step wizard (not a scattered multi-page form), with a persistent left-side progress rail (Step 1 of 5, etc.), autosave at every step, and a live preview pane on desktop.

**Step 1 — What are you publishing?**
Choice cards: `Research Paper` | `Article / Essay` | `Idea / Preprint Note`
(Each choice adjusts which fields appear later — e.g., papers require an Abstract + References section; Ideas don't.)

**Step 2 — Core Details**
- Title
- Abstract / Summary (with live character count, like a grant form)
- Field/Category (single-select from a fixed taxonomy, drives the origami color tag)
- Keywords (tag input, max 8)
- Co-authors (type a GitHub username → autocomplete → they get an email/notification to confirm co-authorship — mirrors GitHub's "add collaborator" pattern)
- License selection (CC-BY 4.0 default, dropdown for alternatives — explained inline in plain English, not legalese)

**Step 3 — Upload / Write**
Two tabs:
- **"Write in MaxWell"** — a clean Markdown editor with live LaTeX/MathJax rendering for equations, split-pane preview.
- **"Upload a file"** — drag-and-drop PDF/DOCX (stored as-is in the repo; MaxWell extracts text where possible for search indexing).

**Step 4 — Metadata Confirmation ("Declaration" step — the govt-form-inspired moment)**
A clean, honest checklist mirroring an official filing's declaration section:
- ☐ I confirm this work is my own or I have rights to publish it
- ☐ I understand this will be publicly visible and open for community review
- ☐ I agree to the Publishing Guidelines and Code of Conduct
- ☐ I've selected the correct license
This is intentionally the *one* moment in the flow that feels formal and serious — a deliberate contrast to the otherwise light, fast wizard, because scientific integrity deserves a moment of weight.

**Step 5 — Review & Publish**
Full live preview of the exact paper page as it will appear → **"Publish to GitHub"** button → behind the scenes:
1. MaxWell commits a new Markdown/PDF file + `metadata.yaml` frontmatter into `{username}/maxwell-publications/papers/{slug}/`.
2. MaxWell opens a corresponding **GitHub Issue** in a shared `maxwell-hq/community-review` repo (or an org-wide review repo — see §8.5), tagged with the category and a `status:awaiting-review` label, linking back to the commit.
3. User is redirected to their new live paper page with a success state (this is where the "fold-in" motion signature plays).

### 7.4 Community Peer Review Flow
1. New submission → auto-filed as a GitHub Issue in the review repo, titled `[Physics] Title of Paper — by @username`, with the abstract and a link to the rendered paper.
2. Vetted **Experts** (see §8.6) in that field are auto-notified/subscribed based on their declared expertise tags.
3. Experts leave structured review comments directly on the Issue, using a **Review Comment Template** (Strengths / Concerns / Suggested Revisions / Recommendation).
4. When enough qualifying reviews are in (configurable threshold, e.g., 2 Expert reviews), Experts can apply labels:
   - `status:needs-revision`
   - `status:reviewed — minor issues`
   - `status:community-verified` ✅
5. MaxWell's rendering layer reads the Issue's labels via the GitHub API and reflects them live as a **status badge on the paper's public page** — this is the "GitHub Issue-as-review-workflow" made visible to end users without them ever needing to visit GitHub Issues directly (though the link is always available for transparency — "View full review thread on GitHub").
6. Author can push revision commits; the Issue thread tracks the full history, exactly like a pull request review does for code.

### 7.5 Dashboard
Logged-in home base, entirely populated by live GitHub API reads (no separate DB):
- **Drafts** (unpublished commits in a `drafts/` branch or folder)
- **Published works** with live view counts (via a lightweight self-hosted analytics ping, see §11.6) and review status
- **Reviews received** (aggregated from linked GitHub Issues)
- **If the user is a vetted Expert:** a "Reviews To Do" queue, pulled from open Issues matching their expertise tags
- **Settings**: GitHub connection status, notification preferences, public profile visibility toggles

---

## 8. Feature Specifications

### 8.1 GitHub OAuth & Identity
- Single sign-on method for v1: **GitHub OAuth App** (not a GitHub App, unless fine-grained per-repo permissions are preferred — see engineering tradeoff note in §11.2).
- MaxWell profile fields are **read directly from GitHub** at login and on a refresh interval: avatar, display name, bio, company/affiliation, location, and pinned repos (optionally cross-linked as "related work").
- Users may add MaxWell-only supplementary fields (ORCID iD, academic affiliation if different from GitHub bio, ResearchGate link) — these are stored in the user's own `maxwell.config.json` in their publications repo (see §13), **not** in a MaxWell-owned database.

### 8.2 GitHub-as-Backend Architecture (Product-Level Description)
This is the single most important product decision, so it's worth stating plainly for non-engineering stakeholders too:

> **MaxWell owns no user data and no files.** Every paper, every profile field, every draft lives in a GitHub repository owned by the author. MaxWell is a rendering, indexing, and workflow layer on top of the GitHub API. If MaxWell disappeared tomorrow, every author would still have 100% of their published work, fully intact, in their own GitHub account — because that's where it always lived.

This is both a **cost strategy** (no storage bill scales with content) and a **trust/values statement** (true researcher ownership, aligned with open-source norms).

### 8.3 Publishing Wizard — see §7.3 (full spec above)

### 8.4 Paper/Article Data Model — see §13 (Data Model) for the exact schema

### 8.5 Community Peer Review System
- Reviews live as **GitHub Issues** in a dedicated, MaxWell-HQ-owned repo (e.g. `maxwell-hq/reviews`), one Issue per submission, auto-created via the GitHub API at publish time using a saved Issue Template.
- **Why Issues, not Pull Requests:** Issues map cleanly to "this needs discussion/evaluation," while PRs imply "this needs a code-style diff-approval," which is the wrong mental model for a review that's about scientific merit, not line-by-line diffs. (Revisions to the paper itself *do* happen via commits, which the Issue thread references — so the PR-like "see what changed" experience still exists, just nested under the Issue.)
- Structured review template (enforced via a GitHub Issue Form / YAML template):
  ```yaml
  name: Peer Review
  fields:
    - Overall Assessment (select: Accept / Minor Revisions / Major Revisions / Reject)
    - Strengths (textarea)
    - Concerns (textarea)
    - Suggested Revisions (textarea)
    - Conflict of Interest Declaration (checkbox)
  ```
- Review status badges (`awaiting-review`, `in-review`, `needs-revision`, `community-verified`) are GitHub Issue **labels**, kept as the literal single source of truth — MaxWell's frontend just polls/caches label state.

### 8.6 Expert / Reviewer Program
- **Becoming an Expert:** self-nominate with GitHub-verifiable signals (existing publications, GitHub contribution history in relevant repos, institutional email verification) → reviewed by a small founding council (manual, v1) → granted an `Expert:{field}` GitHub team membership in the `maxwell-hq` org, which the platform reads as the authorization signal (again — no separate roles database).
- Experts get a visible badge on their MaxWell profile and are listed at `/experts`, filterable by field — this is both a credibility signal for readers and a reputation incentive for reviewers, similar to how Stack Overflow reputation works but applied to scientific vetting.
- Review quality itself can be lightly gamified in v2 (helpful-review upvotes from authors, a public review count) without turning into a popularity contest — reviews remain primarily qualitative.

### 8.7 Comments & Discussion
- Comment threads on each paper page are, again, **GitHub Issues or Discussions** (recommend **GitHub Discussions** for reader comments specifically, reserving Issues for formal peer review) — same "forum, but it's actually GitHub" pattern.
- Guests can read every comment. Posting requires GitHub sign-in (§7.1) — enforced by simply requiring an authenticated GitHub token to post via the API, exactly mirroring "sign up via GitHub to comment on this forum," as requested.

### 8.8 Search & Discovery
- Since there's no proprietary database, search is powered by a **static, periodically-rebuilt search index** (e.g., a JSON/Lunr or Pagefind index generated by a scheduled GitHub Action that crawls all known publication repos via the GitHub API and rebuilds the index as a static asset). This keeps search fast and free, at the cost of near-real-time-but-not-instant indexing (acceptable — new papers appear in search within minutes, not milliseconds).
- Faceted browse on `/explore`: filter by Field, Type (Paper/Article/Idea), Review Status, Date, License.
- `/explore/trending` ranks by a simple, transparent formula (views + review engagement + recency decay) — the formula itself is published on the page for transparency, in keeping with the platform's open ethos.

### 8.9 User Dashboard — see §7.5

### 8.10 Profile Pages (`/u/{username}`)
- Header mirrors GitHub profile (avatar, name, bio, location, pinned/related repos) with a MaxWell-specific strip beneath showing: publication count, Expert badge (if applicable), fields of interest, and a clean grid of their published papers/articles as origami-corner cards.
- Fully public, fully readable without login — profile pages are a key SEO and credibility surface (a scientist should be comfortable putting `maxwell.sh/u/adalovelace` in their email signature).

### 8.11 Notifications
- v1: **Email-based**, triggered by GitHub webhook events (new review comment, status label change, co-author invite) routed through a lightweight serverless function — no in-house notification database needed, just transactional email (e.g., via Resend/Postmark free tier).
- v2: optional in-app notification bell, still backed by polling GitHub's notification API rather than a proprietary store.

### 8.12 Licensing, Copyright, Guidelines & Policy
Dedicated, plainly written (not legalese-first) policy pages — see §15 for full content requirements. Every published paper **must** carry an explicit license (default: CC-BY 4.0), selected during Step 2 of publishing, and the chosen license is both written into the paper's `metadata.yaml` and rendered visibly on the paper page footer.

### 8.13 Moderation & Trust/Safety
- Because content lives in GitHub, **removal requests are handled at the index layer**: MaxWell can de-list a paper from `/explore` and search instantly (a moderation action on MaxWell's index), while the underlying commit history remains exactly as durable/immutable as any GitHub repo — consistent with open-source norms and avoiding MaxWell ever being a silent content-alterer.
- A visible **"Report"** action on every paper/comment routes to a moderation queue (initially a private GitHub Issue in a `maxwell-hq/moderation` repo — reusing the same "GitHub as backend" pattern even for internal ops).

---

## 9. Landing Page Specification

The landing page is the single most important design surface — it has to read as "world-class," not "hackathon project." Structure below, in order:

1. **Nav bar** — Logo (folded-paper "W" mark + wordmark) left; `Explore`, `Guidelines`, `Experts`, `About` center-left; `Continue with GitHub` primary button top-right, always visible, never hidden behind a hamburger on desktop.

2. **Hero Section**
   - Large serif headline (e.g., *"Where research gets published, reviewed, and owned — in the open."*)
   - Subheadline in grotesk, one sentence, explaining GitHub-native ownership.
   - Primary CTA: `Continue with GitHub` (creates account) — Secondary CTA: `Explore Papers` (no-friction browse path for the skeptical visitor).
   - Visual: an animated/static origami-fold illustration of a paper unfolding into the MaxWell "W" mark — this is the single hero visual moment, playing the "fold-in" motion once on load.

3. **Proof Strip** — a quiet row of live, real stats pulled from the GitHub API (`{X} papers published · {Y} community reviews · {Z} experts across {N} fields`) — numbers, not logos, since there's no institutional customer base to name-drop at launch. This *is* the trust signal for a knowledge platform.

4. **"How It Works" — 3-step horizontal section**
   Step cards with a corner-fold motif, icons kept to simple line-art:
   1. *Sign in with GitHub* — "Your profile, your identity, already set up."
   2. *Publish in minutes* — "A clean form, not a bureaucratic portal."
   3. *Reviewed in the open* — "Real experts, transparent feedback, public record."

5. **Featured / Trending Work** — a horizontally scrollable or 3-column grid of real paper cards (title, author avatar+name, field tag in origami color, review-status badge, one-line abstract snippet) — this section does double duty as social proof and as a taste of the actual reading experience.

6. **"Why GitHub?" Explainer Section**
   A visually distinct, slightly editorial section (could use a subtle off-white `paper.off` background block to separate it) that plainly explains the zero-lock-in, you-own-your-data pitch — this is a genuine differentiator and deserves real screen real estate, written in confident, plain language, not corporate-speak.

7. **For Experts / Reviewers Section**
   A secondary CTA aimed at recruiting the reviewer side of the two-sided marketplace: *"Are you an expert in your field? Help vet the next generation of research."* → links to `/experts` and the nomination flow.

8. **Guidelines / Trust Strip** — three small link-cards: Publishing Guidelines, Copyright & Licensing, Code of Conduct — signaling seriousness/legitimacy before the footer.

9. **Footer**
   - Left: Logo + one-line mission statement.
   - Middle columns: Platform (Explore, Publish, Experts), Resources (Guidelines, Policy, About), Community (GitHub org link, Discussions).
   - Right/bottom: **`Powered by HarVa`** lockup, quietly placed, plus copyright line and license note ("MaxWell's own codebase is open source — view it on GitHub").

**Tone of all landing copy:** confident, plain-spoken, zero hype-adjectives ("revolutionary," "game-changing" are banned words) — let the clean design and the "GitHub-native" mechanic speak for itself, the same way Stripe or Linear's marketing sites earn trust through restraint rather than superlatives.

---

## 10. Page-by-Page Specs (Beyond the Landing Page)

### 10.1 `/explore`
Left filter rail (Field, Type, Status, License, Date) + right content grid of paper cards. Default sort: Recent. Toggle: Recent / Trending. Infinite scroll, not pagination (keeps the "endless library" feeling appropriate to a knowledge platform).

### 10.2 `/p/{username}/{slug}` — Paper Reading Page
- Serif title, author byline with avatar (linking to `/u/username`), co-authors listed, field tag, license badge, review-status badge, "published" + "last revised" dates.
- Constrained reading column (max 720px) for the abstract and body — full MathJax/LaTeX rendering, code blocks with syntax highlighting for CS papers.
- Right-side sticky rail (desktop only): Table of Contents (auto-generated from headings), Cite This Paper (BibTeX/APA export, generated client-side from metadata), Download Original File, View on GitHub (deep link to the exact commit).
- Bottom of page: Review status panel (expandable — shows the structured review summary, with a "View full thread on GitHub" link) and the comment/discussion section.

### 10.3 `/publish` — see §7.3 in full.

### 10.4 `/u/{username}` — see §8.10.

### 10.5 `/dashboard` — see §7.5.

### 10.6 `/experts`
Grid of Expert profile cards grouped/filterable by field, each showing review count and a "View reviews" link. Includes a visible **"Become an Expert"** CTA card at the top of the grid.

### 10.7 `/guidelines` and `/policy/*`
Long-form editorial pages using the serif typeface for headers, generous line-height, a sticky in-page table of contents on the left — designed to be read, not skimmed past, since these pages carry real institutional trust weight.

---

## 11. Technical Architecture

### 11.1 Architecture Principle
**"Static-first, GitHub-backed, serverless-glue."** No app server owns persistent state. Three layers:

```
┌─────────────────────────────────────────────────────────┐
│  CLIENT (Next.js / React — static + client-side render)  │
│  Hosted on Vercel/Netlify/Cloudflare Pages free tier      │
└───────────────┬─────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  EDGE / SERVERLESS FUNCTIONS (auth callback, webhooks,    │
│  search-index rebuild trigger, notification dispatch)     │
│  Hosted on the same platform's free serverless tier        │
└───────────────┬─────────────────────────────────────────┘
                 │  (all reads/writes go through here)
┌────────────────▼────────────────────────────────────────┐
│  GITHUB (the actual backend)                               │
│  • User repos: {username}/maxwell-publications             │
│      → papers/{slug}/paper.md + metadata.yaml + assets/    │
│  • Org repo: maxwell-hq/reviews (Issues = review workflow) │
│  • Org repo: maxwell-hq/search-index (GitHub Actions builds│
│      a static JSON index on a schedule, published to Pages │
│      or fetched by the client at runtime)                  │
│  • Org repo: maxwell-hq/moderation (Issues = report queue) │
└─────────────────────────────────────────────────────────┘
```

### 11.2 GitHub App vs. OAuth App (Engineering Decision Point)
Recommend a **GitHub App** (not a classic OAuth App) for production, because:
- Fine-grained, repository-scoped permissions (only touches the `maxwell-publications` repo it created, not a user's entire account) — better trust signal during OAuth consent, and better security posture.
- Higher API rate limits than OAuth Apps at scale (5,000/hr per-installation vs. lower shared limits).
- Installation tokens are short-lived, reducing blast radius of any token leak.

### 11.3 Content Storage & Rendering
- Papers authored in Markdown are rendered server-side (at request time, cached at the edge) via `remark`/`rehype` with a MathJax/KaTeX plugin for equations and a syntax-highlighter for code.
- Uploaded PDFs are stored as-is in the repo (via the GitHub Contents API, base64-encoded commit) and rendered client-side with `pdf.js`; MaxWell additionally attempts text extraction at publish time (for search indexing only, not for display) using a serverless function.

### 11.4 Review Workflow Sync
- A GitHub webhook (installed at the org level on `maxwell-hq/reviews`) pushes Issue/label/comment events to a serverless endpoint, which updates the cached "review status" used by the paper page (cache layer only — GitHub Issues remain the source of truth; the cache just avoids hammering the GitHub API on every page view).

### 11.5 Search Index Build
- A scheduled GitHub Action (e.g., every 15–30 minutes, or triggered on webhook) walks all known `maxwell-publications` repos (tracked via a lightweight registry file in `maxwell-hq/registry`, appended to at publish time), extracts metadata + text, and writes a static search index (Pagefind or a custom Lunr.js index) published as a static asset the frontend fetches and queries entirely client-side — genuinely free, genuinely fast, no search server to run.

### 11.6 Analytics (View Counts, Trending)
- A minimal, privacy-respecting first-party pixel/serverless endpoint increments a lightweight counter (can itself be stored back as a JSON file commit in an internal repo, or in a free-tier edge KV store like Cloudflare KV/Vercel KV if a tiny amount of "real" storage is acceptable for this one non-critical, easily-rebuildable dataset — flagged here as the one place a small managed store is pragmatic, since view counters are not authorial content and don't threaten the "you own your data" promise).

### 11.7 Rate Limiting & Resilience
- All GitHub API calls go through the GitHub App's higher rate-limit tier; aggressive edge caching (ISR-style, revalidate every N minutes) on all read paths (`/explore`, `/p/*`, `/u/*`) means most traffic never touches the GitHub API directly at all.

---

## 12. Recommended Tech Stack

| Layer | Recommendation | Why |
|---|---|---|
| Frontend framework | **Next.js (React)**, App Router, ISR/SSG hybrid | Best-in-class static + dynamic hybrid, huge ecosystem, free-tier-friendly hosting |
| Styling | **Tailwind CSS** + a small custom design-token layer for the origami palette/type scale | Fast to build a disciplined, consistent design system |
| Hosting | **Vercel** (or Netlify/Cloudflare Pages) free/hobby tier to start | Zero-cost static hosting + serverless functions in one place |
| Auth | **GitHub App OAuth flow**, session via signed HTTP-only cookie (JWT), no session DB needed (stateless) | No auth database required |
| Markdown/LaTeX rendering | `remark`, `rehype`, `remark-math` + `rehype-katex` | Standard, fast, free |
| PDF rendering | `pdf.js` (client-side) | No server-side conversion cost |
| Search | **Pagefind** (static search index, zero server) or a custom Lunr.js build | Genuinely free, no search infra |
| Email/notifications | **Resend** or **Postmark** free tier | Transactional email without managing SMTP |
| Optional tiny KV (view counters only) | **Cloudflare KV** or **Vercel KV** free tier | The one pragmatic exception noted in §11.6 |
| CI / Search-index builder | **GitHub Actions** (scheduled workflow) | Free compute already inside the GitHub ecosystem being used everywhere else |
| Design tool | Figma (for the design system + logo execution described in §4) | Standard |

---

## 13. Data Model

Everything below lives as files inside GitHub repos — there is no proprietary schema/database migration story, which is itself worth stating as a feature.

### 13.1 `maxwell.config.json` (one per user, root of `maxwell-publications` repo)
```json
{
  "displayName": "Ada Lovelace",
  "orcid": "0000-0000-0000-0000",
  "affiliation": "Independent Researcher",
  "fields": ["mathematics", "computer-science"],
  "isExpert": false,
  "expertFields": []
}
```

### 13.2 `papers/{slug}/metadata.yaml` (one per published paper)
```yaml
title: "On the Analytical Engine's Capacity for Abstraction"
type: paper            # paper | article | idea
field: computer-science
keywords: [computation, algorithms, history-of-computing]
license: CC-BY-4.0
authors:
  - github: adalovelace
    role: primary
  - github: cbabbage
    role: co-author
status: community-verified   # mirrored from the linked review Issue's labels
reviewIssueUrl: https://github.com/maxwell-hq/reviews/issues/482
publishedAt: 2026-06-01T00:00:00Z
revisedAt: 2026-07-10T00:00:00Z
```

### 13.3 `papers/{slug}/paper.md`
The full Markdown (or a pointer/embed reference to an uploaded PDF in `assets/`) body content, including the abstract as the first section.

### 13.4 Review Issue (GitHub Issue in `maxwell-hq/reviews`)
- Title: `[computer-science] On the Analytical Engine's Capacity for Abstraction — by @adalovelace`
- Body: auto-populated abstract + link to the live MaxWell paper page + link to the exact commit.
- Labels: `field:computer-science`, `status:awaiting-review` → updated over time.
- Comments: structured reviews via the Issue Form template in §8.5.

### 13.5 Registry entry (`maxwell-hq/registry/repos.json`)
A single append-only index of every known `{username}/maxwell-publications` repo, written to at first-publish time — this is what makes the search-index builder (§11.5) able to discover all content without scanning all of GitHub.

---

## 14. API & Integration Map

| MaxWell Function | GitHub API Used |
|---|---|
| Sign in / identity | GitHub App OAuth `/login/oauth/authorize`, `GET /user` |
| Create publications repo | `POST /user/repos` (or check-then-create) |
| Publish a paper | `PUT /repos/{owner}/{repo}/contents/{path}` (Contents API commit) |
| Open a review thread | `POST /repos/maxwell-hq/reviews/issues` |
| Read review status | `GET /repos/maxwell-hq/reviews/issues/{id}` + labels |
| Post a comment (reader) | `POST /repos/maxwell-hq/reviews/issues/{id}/comments` or Discussions GraphQL mutation |
| Co-author invite | `PUT /repos/{owner}/{repo}/collaborators/{username}` (or a lighter-weight confirm-via-comment pattern if full repo write access isn't desired for co-authors) |
| Webhook events | GitHub App webhook subscription on `issues`, `issue_comment`, `push` |
| Search index build | GitHub Actions scheduled workflow + Contents/Search API reads across registered repos |

---

## 15. Content, Governance & Policy Requirements

Each of these needs a real, plainly-written page at launch (not a placeholder) — bullet requirements per page:

- **Publishing Guidelines** — what counts as a valid paper/article/idea, formatting expectations, what gets a submission auto-rejected before it even reaches review (plagiarism, hate speech, no abstract, etc.).
- **Copyright & Licensing** — plain-English explanation of each supported license (CC-BY 4.0 default, CC-BY-SA, CC0, "All Rights Reserved — Reference Only"), and an explicit statement that **authors retain full copyright**; MaxWell only ever has a display license, never ownership — this is a direct extension of the GitHub-as-backend ownership promise.
- **Code of Conduct** — standard, direct, enforced-not-decorative anti-harassment and academic-integrity policy, modeled on the tone of the Contributor Covenant (widely trusted in the GitHub-native developer audience MaxWell is courting first).
- **Review Standards** — what "community-verified" actually means (thresholds, Expert qualification bar, conflict-of-interest rules), published openly so the badge carries real, legible weight rather than being a black box.
- **Privacy Policy** — since MaxWell stores almost nothing itself (identity + content both live on GitHub), this should be genuinely short and should say so plainly — itself a selling point.

---

## 16. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Largest Contentful Paint < 1.5s on `/explore` and `/p/*` via aggressive ISR caching; Lighthouse Performance score ≥ 95 |
| **Accessibility** | WCAG 2.1 AA minimum across all pages — real semantic HTML, full keyboard navigation, color contrast ratios verified against the origami palette (some accent colors, e.g. `amber`, need a darker text-pairing variant to pass AA — flag for design QA) |
| **SEO** | Every paper/profile page server-rendered with full metadata, JSON-LD `ScholarlyArticle` structured data, OpenGraph cards using the origami corner-fold card style for social sharing |
| **Responsiveness** | Fully responsive mobile reading experience is a first-class requirement, not an afterthought — many readers will arrive via shared links on mobile |
| **Reliability** | Since there's no proprietary DB, "reliability" mostly reduces to GitHub's own uptime + MaxWell's caching layer — document this dependency explicitly in the risk section (§18) |
| **Internationalization** | v1 English-only; architecture should not hard-code English strings in a way that blocks future i18n |

---

## 17. Success Metrics (What "Working" Looks Like)

| Metric | Why it matters |
|---|---|
| Time from "Sign in" to "First paper published" | Directly measures the "frictionless publishing" promise — target under 10 minutes |
| % of published papers that receive ≥1 Expert review within 14 days | Measures whether the open-review engine actually works, not just exists |
| Weekly returning readers (no login required) | Measures whether the platform earns a real audience, not just a submission funnel |
| Number of active Experts per field | Health metric for the review marketplace — thin coverage in a field is a real risk to flag early |
| GitHub stars / forks of the MaxWell platform repo itself | Since MaxWell is positioned as GitHub-native and open, community trust in the *platform's own* openness is a meaningful signal |

---

## 18. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| GitHub API rate limits under real traffic | GitHub App (higher limits) + aggressive edge caching so most reads never hit the live API |
| Users uncomfortable granting repo-write access | GitHub App with narrowly scoped, per-repo permissions (not full-account OAuth scopes) + very clear consent-screen copy explaining exactly what's created and why |
| Low initial Expert reviewer supply → slow reviews | Manually recruit a founding cohort of ~20–30 Experts across core fields pre-launch; make the "Become an Expert" path visible and low-friction from day one |
| Spam / low-quality submissions | Lightweight auto-checks at publish time (min abstract length, required fields) + community reporting (§8.13) + Expert-driven status labels that make quality visible rather than gatekeeping submission itself |
| Perceived legitimacy gap vs. established journals | Be explicit in all copy that MaxWell complements, not replaces, formal indexed journals — position clearly as an open preprint + review layer, not a DOI-issuing authority (at least in v1) |
| A user deletes/renames their GitHub repo, breaking links | Store the exact commit SHA at publish time (not just a branch pointer) in metadata, so citations and permalinks remain resolvable even if the repo later changes, and design a clear "content unavailable — was removed by the author" fallback state |

---

## 19. Roadmap & Phasing

### Phase 0 — Design Foundation (2–3 weeks)
Finalize logo execution, full design system (Figma library: colors, type, components, the corner-fold/crease-line/fold-in motion specs), and click-through prototypes of the landing page + publish wizard + paper page.

### Phase 1 — MVP (6–10 weeks)
- GitHub App OAuth + auto-provisioned publications repo
- Publishing wizard (Markdown path only; PDF upload can follow immediately after)
- Paper reading page + `/explore` + basic search (even a simple client-side filter before the full Pagefind index)
- Review Issue auto-creation + status badge rendering
- Landing page, guidelines/policy pages, profile pages
- Manually onboarded founding cohort of Experts

### Phase 2 — V1 Public Launch (following 4–6 weeks)
- Full static search index pipeline (§11.5)
- PDF upload + rendering path
- Comments/Discussions integration
- Email notifications
- `/experts` directory + self-nomination flow
- Citation export (BibTeX/APA)

### Phase 3 — V2 (post-launch, prioritized by adoption data)
- ORCID linking, institutional/lab org pages
- In-app notifications
- Review reputation system refinements
- Optional "MaxWell Pro" author tools (private drafts collaboration, advanced analytics) — the only conceivable monetization surface, and only if it doesn't compromise the open-reading promise

---

## 20. Open Questions for Founding Team Decision

1. Should co-authors get true GitHub repo-write access, or a lighter "confirm authorship via comment" pattern that avoids granting broad repo permissions to multiple people? (Leaning toward the lighter pattern for v1 — simpler consent story.)
2. Should the "community-verified" threshold be fixed (e.g., always 2 Expert reviews) or field-configurable (some fields may reasonably need more scrutiny)? Recommend starting fixed, revisit with real data.
3. Where exactly does the "founding Expert council" authority live in v1 — a manual, transparent process is fine at launch, but the governance model for *who admits new Experts* needs to be written down publicly before it becomes a trust question.
4. Confirm final tagline (§4.1) and logo execution (§4.2) with design before Phase 0 sign-off.

---

## Appendix A — One-Paragraph Summary (for pitch decks / About page)

> MaxWell is where science gets published the way software gets shipped: sign in with GitHub, publish a paper through a clean, guided form, and have it reviewed in the open by real experts — with the full record living permanently in your own GitHub repository, not locked inside a paywall or a platform you don't control. Powered by HarVa, MaxWell is built to be beautiful, fast, transparent, and free to run forever, because the backend is the same open infrastructure researchers already trust.
