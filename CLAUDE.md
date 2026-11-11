# CLAUDE.md — ooya-th.com (seed)
> Version 1.1 — 2026-11-11
> Changes: constraint 1 rewritten (JavaScript is a situational choice, owner 2026-11-11); JS files under 800 lines; read path `.claude/rules/` → `rules/` (CC_SESSION_ooya_js_glass_bg_v1)
> Previous: Version 1.0 — 2026-11-10 (Initial seed (CC_SESSION_ooya_site_setup_v1))

Project: Ooya — stand-alone shop site, Thai main (`/`), English second (`/en/`). Hosted on Cloudflare Pages, output directory `public`.
Owner: Chairit Smittee (Csmittee) — one person, GitHub browser only, no local terminal.

Governance and rules live in the owner's central rules repo: Csmittee/janishammer-central. Read in order every CC session:
  1. janishammer-central: CLAUDE.md → RULES.md → CC_SKILL.md → relevant rules/RULES-[domain].md → CC_CHAT_LOG.md (last 3)
  2. This repo: CLAUDE.md → PROJECT_STATE.md → CC_CHAT_LOG.md (last 3)

Constraints (always):
  1. Vanilla HTML, CSS and JS: no framework, no library, no injector. JavaScript is a situational choice (owner 2026-11-11), never mandatory: the page must stay complete if it fails; motion off under prefers-reduced-motion; no tracking, no network calls, no cookies. JS files stay under 800 lines.
  2. Images via Cloudinary only (cloud dfiomi0lb); never commit image files. Folder `Business/Ooya project/ooya_website_donotmove` is never moved, renamed or deleted.
  3. No secrets, keys or tokens in any file.
  4. Never invent contact data: no phone, email, address, social links, prices or names that the owner did not give.
  5. No health, skin-benefit or "natural / safe / organic" claims.
  6. No Janishammer wording on any file under public/ (Ooya is not a Janishammer brand).
  7. Canonical extensionless with trailing slash; HTML files under 800 lines; no workflows without an order.
