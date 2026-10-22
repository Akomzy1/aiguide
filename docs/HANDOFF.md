# Handoff

## Completed

Explored and extracted the starter ZIP. Retained its instructions, references and original image masters. Built a complete static landing page with the exact guide and planner covers, four practical outcomes, three real page previews, six contents topics, a planner section, a main offer, a separately labelled optional companion, FAQs and a final action.

The visual system uses forest, warm cream, ink and gold accents, Georgia headings and system sans-serif text. No external font downloads or runtime dependencies. The shared style tile is at `/design/style-tile.html`. Sample links work without JavaScript and are enhanced to a native dialog with Escape and focus return. Mobile navigation supports expanded state and Escape. FAQs use native disclosures. Motion respects reduced-motion preferences.

## Commands

Use Node.js 24+. In PowerShell, use `npm.cmd run dev`, `npm.cmd run build` and `npm.cmd test` to avoid this machine's restriction on `npm.ps1`. No dependency installation is needed. The preview serves `http://127.0.0.1:4173`. The dev command builds once on startup; rebuild and refresh after source edits. Tests run in-process because the environment blocks the default test runner's child process.

## Editing and offer behaviour

Edit `offer.config.json` for product copy, prices, checkout destinations and business details. Unknown values remain null. `scripts/offer.mjs` validates offer state; `scripts/render.mjs` renders consistent CTAs and initial HTML. Styles live in `src/styles.css`; browser enhancements in `src/app.js`. `scripts/build.mjs` generates `dist/` and copies an explicit list of public asset directories.

Owner-approved prices are **₦4,900** for `main.price` and **₦2,900** for `upsell.price`, both in `offer.config.json`. The main card explicitly includes the 44-page PDF and FREE 8-page planner. The optional 21-page companion remains a separate offer. Amounts use Nigerian naira with thousands separators, and every main CTA shares the main amount.

Preview remains the default. The header, hero, main-offer and final CTAs use the owner's supplied `https://selar.com/1h92g1w281` URL. Its main guide + free planner, ₦4,900 NGN price and seller name (Tokunbo Akomolede) were verified on the public product page. The original URL is retained exactly. The owner clarified that the companion is an upsell within the same checkout. Its “Add the companion at checkout” button therefore uses that same URL, through `upsell.checkoutMode: "main"`; no second checkout URL is needed. The companion remains priced separately at ₦2,900 and is not included in the guide price. A known price and supplied HTTPS destination allow checkout navigation in local preview; this does not mark the site launch-ready. Support, delivery/access instructions, refund terms and policy details are still required for launch validation. The site remains noindex and unpublished.

Approved policy text can be implemented as `src/privacy.html` or `src/terms.html` and referenced with root-relative paths; the build verifies that configured local files exist. External policy destinations must use HTTPS. No legal terms have been invented.

## Assets and provenance

Exact WebP covers and PDF sample pages are from the supplied ZIP. The supporting workspace image is the supplied AI-generated fictional illustration, visibly identified as such. It is not a testimonial or author portrait. See `references/ASSET_GUIDE.md` for provenance. PNG masters remain under `assets/masters/` and are excluded from `dist/`. No paid PDFs, trackers, external scripts, fake prices or fabricated testimonials are shipped.

## Verification and next steps

See `QA.md` for measured checks and browser evidence. Browser verification uses installed headless Chrome through its local debugging protocol after the provided browser tool failed to start. It is emulation, not physical-device testing.

Supply the commercial fields in `LAUNCH_CHECKLIST.md` before enabling sales. Deployment and Git commit/push have not been performed. The original ZIP and extracted handoff directory are preserved locally and ignored by Git; promoted source assets and instructions are part of the working tree.
