# CC_CHAT_LOG.md — ooya-th.com
> Version 1.2 — 2026-11-11
> Changes: CC_SESSION_ooya_mascot_leaves_v1 entry added
> Previous: Version 1.1 — 2026-11-11 (CC_SESSION_ooya_design_pass_v1 entry added)

---

## 2026-11-11 — CC_SESSION_ooya_mascot_leaves_v1
**Did:** 5 files: public/index.html and public/en/index.html (mascot stage as first child of `.hero`, leaf symbol and 8 leaf spans; `<head>` byte-identical), public/css/style.css 2.1 (mascot + leaves CSS before the reduced-motion block, which now hides leaves and words), PROJECT_STATE.md 1.2, this log 1.2. Mascot SVG and CSS exactly as ordered.
**Updated:** NONE (no rules in this repo)
**New files:** NONE (no JS, sound or image file)
**Pending Chat verify:** H1 raw HTML of both pages after the merge (mascot markup, 8 leaves, text and links unchanged); H2 style.css keyframes and reduced-motion block. Not seen by CC: the real motion on a phone (a local render at 3.3 s showed the soap mid-jump with both words and the leaves).
**Flags:** NOT VERIFIED LIVE. Leaf colours outside the six tokens are intended by the order.
**Previous PR QA:** ooya-th.com#2 PASS (steps 1, 2, 4, 5 ticked PASS, ALL DONE; step 3 on the owner's report in chat 2026-11-11, per Chat)
**Owner QA:** this order's site PR, Part 1 steps 1–5 PENDING
---

## 2026-11-11 — CC_SESSION_ooya_design_pass_v1
**Did:** 5 files: public/index.html, public/en/index.html (rebuilt: hero 1, five steps, band, footer contact with LINE + Facebook QR; new logo, favicon links, hero og:image/twitter:image 1200x630 crop; stray space before DOCTYPE removed), public/css/style.css (Prompt font, fixed `.bg`, glass in @supports, CSS-only scroll bounce, three butterflies), PROJECT_STATE.md 1.1, this log 1.1.
**Updated:** NONE (no rules in this repo)
**New files:** NONE (no image or JS file committed)
**Pending Chat verify:** H1 raw HTML of both pages after the merge; H2 head check (title, description, canonical, hreflang unchanged; og:image = hero crop). Not seen by CC: the real look (Cloudinary not reachable from the sandbox), Thai line breaks with the real Prompt font, butterfly motion on a phone.
**Flags:** SEO-3 DEBT stays open (Organization only). saycheer-website not attached, so its `.bg` code was not read; the idea was taken from docs/WEB_DESIGN_PATTERNS.md section 8. NOT VERIFIED LIVE.
**Previous PR QA:** ooya-th.com#1 PASS (closed by CC from ticks, read with the GitHub API: steps 1–8 PASS, ALL DONE, no comments)
**Owner QA:** this order's site PR, Part 1 steps 1–5 PENDING
---

## 2026-11-10 — CC_SESSION_ooya_site_setup_v1
**Did:** 12 files: README, CLAUDE (seed), PROJECT_STATE, this log, .github/pull_request_template.md (Block A), public/index.html (TH), public/en/index.html (EN), public/404.html, public/css/style.css, public/robots.txt, public/sitemap.xml, public/_headers. Indexable (no noindex on the two pages); hreflang block byte-identical; x-default = Thai.
**Updated:** NONE (no rules in this repo)
**New files:** all 12 (README replaced)
**Pending Chat verify:** owner sets Pages output directory to `public` after merge; owner QA steps 1–8; Thai wording read by a Thai speaker.
**Flags:** SEO-3 DEBT — Organization only. SEO-1 DEBT — og:image is the logo. No favicon asset. NOT VERIFIED LIVE — owner QA steps 1–8. Added token --green-deep. Injector not used.
**Previous PR QA:** n/a — no earlier order in this repo
**Owner QA:** this order's site PR PENDING (steps 1–8)
---
