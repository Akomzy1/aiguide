# QA — 22 October 2026

## Pricing revision

Owner approved **₦4,900** for the main guide and **₦2,900** for the optional companion. Both are in `offer.config.json`. The updated build and all **9 tests passed**, including new tests for displaying confirmed prices without checkout URLs and for keeping every live CTA's amount and original product URL consistent.

Headless Chrome rechecked 320×568, 360×800, 390×844, 768×1024, 1440×1000 and 844×390: both displayed amounts matched configuration, both unavailable purchase buttons were disabled, and no page/element/button horizontal overflow was found. Mobile and desktop pricing screenshots were inspected. Existing menu, dialogs, FAQs, reduced-motion and no-JavaScript checks still passed. Computed contrast checked 160 visible text nodes with no failures; CSS 200% zoom had no horizontal overflow. No browser runtime or resource errors were reported.

Initial mobile transfer in this run: **175,093 bytes**, approximately 171 KiB. Hero actions end around 616px at 360×800 and 632px at 390×844. Pricing screenshots are `.preview/pricing-main-*.png` and `.preview/pricing-companion-*.png`; the latest machine-readable results are `.preview/browser-qa.json`.

**Checkout comparison not tested:** both configured checkout URLs are null, so there is no Selar product page against which to verify a price mismatch. Existing URL fields were retained unchanged. Missing delivery, seller/support and policy details remain on the launch checklist. No site was published and no Selar settings were changed.

The following measurements describe the original build before the pricing revision.

## Results

| Check | Result | Evidence / method |
| --- | --- | --- |
| Production build | Passed | `npm.cmd run build` generates the preview in `dist/` without dependencies. |
| Offer and content tests | Passed | `npm.cmd test`: 7 tests; preview state, all required main-offer fields, valid live main offer, independent companion gating, unsafe URLs/prices/currency, HTML escaping, unique anchors and single H1. |
| Responsive rendering | Passed | Installed headless Chrome, viewport emulation at 320×568, 360×800, 390×844, 768×1024, 1440×1000 and short landscape 844×390. No page or element horizontal overflow reported. |
| First-screen action | Passed | At 360×800 the hero action ends around 566px; at 390×844 around 576px. At 320×568 normal scrolling is needed to see the complete action row. No sticky overlay obstructs it. |
| Visual inspection | Passed | Desktop and phone screenshots inspected; page sections use varied layouts and exact supplied covers. Removed a decorative caption that overlapped the main cover. |
| Mobile menu | Passed | Open, Escape to close, focus on trigger, and close after section selection, at 390px. |
| Sample dialogs | Passed | All three preview links opened with simulated pointer input; Escape closed each; focus returned to its opener. Full-size image link remains available. |
| FAQs | Passed | Native disclosure opened and closed with simulated pointer input. |
| Reduced motion | Passed | Browser-emulated preference disables smooth scrolling and cover transforms. |
| No JavaScript | Passed | Browser script execution disabled: initial content and mobile navigation remain visible, sample links retain their direct image destinations. |
| Text contrast | Passed within checked scope | Computed text-node audit: 148 visible text nodes, no failures at 4.5:1 for ordinary text or 3:1 for large text. Darkened muted text and chapter numbers after initial measurements. Does not audit pixels within supplied images or certify overall accessibility. |
| 200% enlargement | Passed within checked scope | CSS zoom at 200% in a 1440px viewport: no horizontal overflow; screenshot inspected. Actual browser UI zoom and screen-reader testing were not performed. |
| Resources and errors | Passed | 10 directly referenced public resources returned HTTP 200. Browser reported no runtime exceptions, HTTP errors or broken loaded images. |
| Links and preview safety | Passed | All generated local anchors resolve; purchase destinations are absent in preview; separate companion has no purchase action. Live destinations tested only with synthetic fixtures, never presented as real offers. |
| Public-file boundary | Passed | 15 generated public files; no paid PDF, PNG master, starter ZIP or offer configuration file in the public output. |
| Actual Selar checkout | Not tested | Owner has not supplied verified URLs, prices or fulfilment details. |
| Physical phones / Safari / Firefox / screen reader | Not tested | Validation used Chrome viewport emulation. |
| Publication | Not performed | Local build only, as required by the supplied project instructions. |

## Measurements

Measured against the local, uncompressed HTTP preview with Chrome cache disabled. Figures are transfer/file measurements, not Lighthouse scores or network-speed claims.

- Initial mobile view: approximately **172 KB / 168 KiB** transferred at 320, 360 and 390px, below the 800 KB project target. Browser lazy loading can change later-page transfer totals.
- Main cover plus planner: **116,338 bytes / 113.6 KiB** of supplied WebP files, below the 400 KB first-screen image target.
- Browser JavaScript: **2,128 bytes raw; 716 bytes gzip**, below the 100 KB compressed target. Gzip is a local compression measurement; the development server does not serve gzip.
- No downloaded fonts, external runtime libraries, autoplay media, tracking or email collection.

## Reproduction and evidence

The provided browser tool failed to start its runtime. Installed Chrome was used through its local debugging protocol instead. The initial Node test runner also hit the environment's child-process restriction; the committed test command uses in-process execution and passes.

`scripts/browser-qa.mjs` documents the repeatable browser checks. It expects a local preview at port 4173 and a dedicated headless Chrome instance with remote debugging on port 9224. Do not expose that debug port publicly. Browser automation screenshots and JSON are local, ignored artifacts under `.preview/`: `browser-qa.json`, `desktop-full.png`, `mobile-full.png`, six `viewport-*.png` files and `zoom-200.png`.

The automated contrast check covers rendered text colours against CSS backgrounds; it is not an accessibility certification. Image artwork remains untouched. Remaining commercial launch requirements are in `LAUNCH_CHECKLIST.md`.
