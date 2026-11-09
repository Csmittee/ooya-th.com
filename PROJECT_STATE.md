# PROJECT_STATE.md — ooya-th.com
> Version 1.0 — 2026-11-10
> Changes: Initial state (CC_SESSION_ooya_site_setup_v1)
> Previous: NONE

Status words follow WF-6.

## Status
| Item | Status |
|---|---|
| First page (public/index.html Thai, public/en/index.html English, css/style.css) | DONE (pending owner QA) — NOT VERIFIED LIVE — owner QA steps 1–8 on the site PR |
| 404, robots.txt, _headers | DONE (pending owner QA) — NOT VERIFIED LIVE |
| sitemap.xml | DONE (pending owner QA) — hand-written, 2 pages (no generator in this repo; SEO-8 amendment) |
| Cloudflare Pages output directory `public` | QUEUED — owner does the taps after merge (Chat gives them) |
| Indexing | PARTIAL — pages are indexable from day one; Search Console not yet set up |
| Pictures | PARTIAL — logo and LINE QR only; AI hero picture is order 2 |

## Open markers
- SEO-3 DEBT — Organization schema only; no address, hours or geo given.
- SEO-1 DEBT — og:image / twitter:image is the logo; replace with the hero picture.
- No favicon asset exists; none linked.
- Thai wording (key message, button, QR caption) is a draft; a Thai reader checks it before launch.
- Colour tokens are a first guess; `--green-deep #2F5039` added for the dark band (green #3F6B4F with gold text was too light).
- Image sizes read from Cloudinary: logo 1408 x 768, QR 540 x 540.
- Cloudinary folder `Business/Ooya project/ooya_website_donotmove` is "do not move".

## SEO-10 baseline
none yet — site new (no pages known / indexed, no impressions or clicks, sitemap not yet submitted, no audit).
