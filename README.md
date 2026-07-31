# MaxWell: Scientific Publishing, Reimagined
### *Where publishing research is as simple, fast, and satisfying as deploying a website.*
**Powered by HarVa**

[![License: CC-BY-4.0](https://img.shields.io/badge/License-CC--BY--4.0-6C4FE0.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Architecture: GitHub-Native](https://img.shields.io/badge/Architecture-GitHub--Native-1A1A1A.svg)](https://github.com/harvatechs/maxwell-beta)
[![Build Status](https://img.shields.io/badge/Build-Passing-4ECDC4.svg)](https://github.com/harvatechs/maxwell-beta/actions)
[![Deploy: GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-6C4FE0.svg)](https://harvatechs.github.io/maxwell-beta/)

---

## 1. Executive Summary

Where **Vercel** took website deployment (historically slow, bureaucratic, gatekept by ops teams) and turned it into a simple `git push`, **MaxWell** takes research publishing (historically slow, bureaucratic, gatekept by journals) and turns it into a `git push`.

Inspired by James Clerk Maxwell's unification of electricity, magnetism, and light into a single set of equations, MaxWell unifies **writing**, **peer review**, **version control**, and **community discussion** into one elegant platform built entirely on **GitHub as the backend**.

---

## 2. The Philosophical Core

1. **Unification over Fragmentation**:
   Writing, reviewing, versioning, and discussing research are not four separate tools wearing one skin; they are one continuous act. When a paper is published on MaxWell, its text, raw data, computational figures, and review lineage inhabit the exact same object: a public, version-controlled repository in the author’s own GitHub account.

2. **Openness as a Scientific Value**:
   Verifiability is the core commitment of both open-source software and open science. A result you cannot inspect is not a result you can trust. A `git blame` on a dataset and a peer review thread on an equation serve the exact same master: transparency of provenance.

3. **Minimalism as Respect for Time**:
   Every layer of process that doesn’t serve rigor is a tax on discovery. MaxWell rejects hype adjectives ("revolutionary", "game-changing") in favor of plain, exact, understated precision.

4. **Zero Proprietary Database Lock-in**:
   Every paper lives in **the author’s own GitHub repo** (`github.com/{username}/maxwell-papers`). MaxWell renders and indexes content while authors own their work forever under open licensing (default CC-BY-4.0).

---

## 3. How MaxWell Works (The 4-Step Architecture)

```
 [ 01. Write ] ─────────► [ 02. Review ] ─────────► [ 03. Version ] ─────────► [ 04. Discuss ]
 Clean Markdown &          Structured Issues in       Immutable git commits      Inline annotations
 MathJax or uploaded       maxwell-hq/reviews with    with line-by-line diffs    beside author-owned
 PDF preprints.            expert verification.       and release tags.          repositories.
```

1. **Write (GitHub-Powered Publishing)**:
   Authors write in clean Markdown with live MathJax rendering or upload preprints. On submission, MaxWell commits the manuscript directly to a public repository in the author’s own GitHub account.

2. **Review (Open Peer Review Protocol)**:
   Peer review threads live as structured GitHub Issues in `maxwell-hq/reviews`. Vetted domain experts evaluate claims, discuss revisions, and issue verified status badges (`status:community-verified`) reflected live on the public paper.

3. **Version (Version Control Lineage)**:
   Revisions, errata, and updated figures are pushed as commits. Readers can inspect exact line-by-line diffs across paper versions, ensuring complete historical integrity.

4. **Discuss (Community Idea Layer)**:
   Community members sign in with GitHub to annotate equations, ask clarification questions, or cite follow-up work directly alongside author-owned repositories.

---

## 4. Brand & Design System Specification

MaxWell uses an **Apple-Zen Minimalist aesthetic** with a **tactile origami paper motif**:

### Color Palette Tokens
| Token | Hex | Role |
|---|---|---|
| `Primary Purple` | `#6C4FE0` | Primary brand color (CTAs, logo, key accents) |
| `Deep Black` | `#1A1A1A` | Primary headlines, dark surface background |
| `Charcoal` | `#4A4A4A` | Secondary & body text |
| `Light Gray` | `#E5E5E5` | Borders, subtle section backgrounds, dividers |
| `White` | `#FFFFFF` | Base background surface |
| `Accent Teal` | `#4ECDC4` | Data-viz accents & verified status highlights |

### Signature Origami Motifs
- **`<CornerFold />`** (`.corner-fold-container`): A tactile 3D folded paper corner flap with drop shadows (`box-shadow: -4px 4px 8px rgba(0,0,0,0.15)`) applied to cards.
- **`<CreaseLine />`** (`.crease-line`): A subtle 1px angled crease line with a centered 45° diamond divider separating sections.
- **`<FoldIn />`** (`.fold-in`): A 350ms 3D unfolding entrance keyframe animation (`rotateX(-8deg) translateY(12px) -> rotateX(0deg)`).
- **3D Page Flip** (`.animate-page-flip`): A 480ms 3D paper page turn transition (`perspective: 1200px`) used in tabbed preview components.

---

## 5. Technology Stack & Project Structure

### Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v3.4 + Custom CSS Design System
- **Iconography**: Lucide React + Official 3D MaxWell Origami Butterfly Vector Mark
- **Fonts**: Google Fonts (`Inter` for UI, `Fraunces` for serif pull-quotes, `JetBrains Mono` for code/math)
- **Forms & Integration**: Async Google Sheets Webhook Dispatcher + LocalStorage Cache
- **CI/CD & Hosting**: GitHub Actions (`.github/workflows/deploy.yml`) -> GitHub Pages

### Repository Layout
```
maxwell-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   └── favicon.png               # Official 3D MaxWell Origami Butterfly logo mark
├── src/
│   ├── components/
│   │   ├── BrandLogos.tsx        # Vector SVG & 3D logo lockups
│   │   ├── ExpertModal.tsx       # Founding Expert reviewer application modal
│   │   ├── FinalCTA.tsx          # Full-bleed dark surface waitlist CTA
│   │   ├── Footer.tsx            # Footer with Powered by HarVa sub-lockup & social links
│   │   ├── FoundingExperts.tsx   # Early reviewer recruitment section
│   │   ├── Hero.tsx              # First fold with Maxwell equations background grid
│   │   ├── HowItWorks.tsx        # 4-step workflow preview with 3D paper page flip
│   │   ├── Manifesto.tsx         # Serif display pull-quote & W-fold construction diagram
│   │   ├── Navbar.tsx           # Sticky glassmorphic header navigation
│   │   └── WhyGitHub.tsx         # Technical credibility & zero database lock-in section
│   ├── lib/
│   │   └── googleSheets.ts       # Google Sheets Webhook dispatcher for pre-registration
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Core design system tokens, 3D paper fold, page flip CSS
│   └── main.tsx                  # React entrypoint
├── .env                          # Local environment variables
├── index.html                    # HTML entrypoint with Meta OG tags & Google Fonts
├── postcss.config.js             # PostCSS plugin configuration
├── tailwind.config.js            # Tailwind CSS brand color tokens & font families
├── tsconfig.json                 # TypeScript strict compiler configuration
└── vite.config.ts                # Vite bundler configuration (base: './')
```

---

## 6. Quickstart & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Setup Commands

```bash
# 1. Clone the repository
git clone https://github.com/harvatechs/maxwell-beta.git
cd maxwell-beta

# 2. Install dependencies
npm install

# 3. Start local development server (with HMR)
npm run dev

# 4. Build production bundle
npm run build

# 5. Preview production build locally
npm run preview
```

The dev server will launch locally at `http://localhost:3000/`.

---

## 7. Google Sheets Pre-Registration Integration

Form submissions (Waitlist email requests and Founding Expert applications) automatically dispatch to the **`MaxWell Pre-Registration`** Google Sheet (`1TPKSciKNeelUYq1b8Hy6pCl__Kls377TVWnbzMdsq8I`).

### Apps Script Deployment (15-Line Snippet)

In your Google Sheet, navigate to **Extensions -> Apps Script** and paste:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Submission Type", "Email", "Name / GitHub", "Institution / Details", "Full Details"]);
  }
  
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.type || "Waitlist",
    data.email || "",
    data.nameGithub || "N/A",
    data.institutionField || "",
    data.details || ""
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result": "success"})).setMimeType(ContentService.MimeType.JSON);
}
```

Deploy as a **Web App** (Execute as: *Me*, Access: *Anyone*) and set the Webhook URL in `.env`:
```env
VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwlmjoBVb4dr4whpZONr0qSdHGcr1v32lpuLkosf7omhbBy1JLL4DIaK8SSoScuQm7sTQ/exec
```

---

## 8. Master Build Playbook Roadmap Overview

According to `MaxWell-Build-Playbook.md`, the full platform is scheduled across 9 execution phases (approximately 13 to 15 weeks to public launch):

```
Phase 0 ---> Phase 1 ---> Phase 2 ---> Phase 3 ---> Phase 4 ---> Phase 5 ---> Phase 6 ---> Phase 7 ---> Phase 8
Brand &     Infra &     Core Auth   Feature     Design      Policy      Expert      QA &        Public
Design      GitHub      & Octokit   Build       System      Sprint      Cohort      Security    Launch
Foundation  App Setup   Client      (Wizard)    Tokens      Docs        Recruit     Audit       Event
```

| Phase | Name | Focus |
|---|---|---|
| **Phase 0** | Brand & Design Foundation | Logo execution, Figma design system, 3D paper motifs |
| **Phase 1** | Infrastructure & Repo Setup | Next.js/Vite, `maxwell-hq` GitHub Org, GitHub App registration |
| **Phase 2** | Core Platform Engineering | GitHub OAuth, Octokit API wrapper, edge caching layer |
| **Phase 3** | Feature Build | Publish Wizard, Paper Renderer, Explore, Issue Review Protocol |
| **Phase 4** | Design System Implementation | Tailwind token package, `<CornerFold />`, `<CreaseLine />` primitives |
| **Phase 5** | Content & Policy Sprint | Copyright, licensing, review standards, code of conduct |
| **Phase 6** | Founding Expert Recruitment | Onboard inaugural cohort of 50 vetted peer reviewers |
| **Phase 7** | QA & Security Audit | GitHub App permission audit, WCAG AA accessibility, Lighthouse ≥ 95 |
| **Phase 8** | Launch (Soft -> Public) | Invite-only soft launch followed by public announcement |
| **Phase 9** | Post-Launch Operations | Expert onboarding runbooks, moderation triage, search index maintenance |

---

## 9. Contact & Social Channels

- **Email**: [maxwell.publication@outlook.com](mailto:maxwell.publication@outlook.com)
- **LinkedIn**: [linkedin.com/in/techharva](https://www.linkedin.com/in/techharva/)
- **Twitter / X**: [@techharva](https://x.com/techharva)
- **GitHub Repository**: [github.com/harvatechs/maxwell-beta](https://github.com/harvatechs/maxwell-beta)

---

**© 2026 MaxWell. Inspired by James Clerk Maxwell. Powered by HarVa.**
