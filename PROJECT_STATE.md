# PROJECT_STATE.md — ooya-th.com
> Version 1.1 — 2026-11-11
> Changes: design pass (CC_SESSION_ooya_design_pass_v1): richer one-page landing in both languages, Prompt font, fixed background, CSS-only scroll effects, butterflies, favicon, AI notes, Facebook link and QR, hero og:image
> Previous: Version 1.0 — 2026-11-10 (Initial state (CC_SESSION_ooya_site_setup_v1))

Status words follow WF-6.

## Status
| Item | Status |
|---|---|
| First page (public/index.html Thai, public/en/index.html English, css/style.css) | DONE (verified live 2026-11-10 — owner QA passed, ticks read by CC) — ooya-th.com#1 |
| Design pass (hero 1, five steps, fixed background, butterflies, logo, favicon, Facebook QR) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–5 on the design-pass PR |
| 404, robots.txt, _headers | DONE (pending owner QA) — NOT VERIFIED LIVE |
| sitemap.xml | DONE (pending owner QA) — hand-written, 2 pages (no generator in this repo; SEO-8 amendment) |
| Cloudflare Pages output directory `public` | QUEUED — owner does the taps after merge (Chat gives them) |
| Indexing | PARTIAL — pages are indexable from day one; Search Console not yet set up |
| Pictures | DONE (pending owner QA) — AI hero + 5 step pictures, transparent logo, Facebook QR, favicon in Cloudinary (versions below); no image file committed |

## Open markers
- SEO-3 DEBT — Organization schema only; no address, hours or geo given.
- SEO-1 DEBT closed in this order: og:image / twitter:image = hero crop (`c_fill,w_1200,h_630,f_jpg`), og:image:alt set. Pending Chat head check (H2).
- Favicon linked (32, 192, apple-touch 180) from the Cloudinary favicon; no image file committed.
- Thai wording (key message, button, QR caption) is a draft; a Thai reader checks it before launch.
- Colour tokens kept as they are (green #3F6B4F, deep green #2F5039, soft green #E4EEE6, gold #C9A24B, soft gold #F3E7C6, cream #FBF8F1, ink #2B2A26); `--green-deep #2F5039` added for the dark band (green #3F6B4F with gold text was too light).
- Cloudinary folder `Business/Ooya project/ooya_website_donotmove` is "do not move".

## SEO-10 baseline
none yet — site new (no pages known / indexed, no impressions or clicks, sitemap not yet submitted, no audit).

## Design pass facts (2026-11-11, CC_SESSION_ooya_design_pass_v1)
- **No JavaScript. Scroll effects are CSS only** (`animation-timeline: view()` for the block bounce-in and `scroll(root)` for the butterfly drift, both inside `@supports`; unsupported browsers show every block plainly). `prefers-reduced-motion: reduce` = no motion, butterflies hidden, smooth scroll off. The only `<script>` per page is the existing ld+json.
- **Font:** Prompt only (Google Fonts, weights 300, 400, 500, display=swap). Cormorant Garamond, Inter and both Noto families removed.
- **Fixed background:** `.bg` layer (position fixed, z-index -1), never `background-attachment: fixed`. Blocks are floating rounded cards; glass (`backdrop-filter`) only inside `@supports`, solid cream fallback.
- **Cloudinary** (cloud dfiomi0lb; GEN = `Business/Ooya%20project/ooya_website_generated/`): hero v1794405439 `hero_top_v1.jpg` · step 1 v1794405554 `step_1_prepare_v1.jpg` · step 2 v1794405556 `step_2_blend_v1.jpg` · step 3 v1794405559 `step_3_cure_v1.jpg` · step 4 v1794405563 `step_4_slice_v1.jpg` · step 5 v1794405566 `step_5_pack_v1.jpg` · logo v1794405626 `ooya_logo_transparent_v1.png` · Facebook QR v1794405632 `ooya_facebook_QR_v1.png` · favicon v1794405748 `ooya_favicon_512_v1.png` · LINE QR v1794249996 (donotmove folder, unchanged). Favicon links use `f_png,c_limit,w_N`.
- Old logo JPG (`ooya_logo_wcltuo.jpg`) no longer referenced; old logo-card and hero shapes removed from the CSS.
- Facebook page: https://www.facebook.com/profile.php?id=61586230212883 (owner-given in this order).
- AI note on the hero and all five step pictures (6 per page), same words.
