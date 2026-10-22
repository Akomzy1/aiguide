# Project instructions

Build a premium, mobile-first sales landing page for **Practical AI for Nigerian Small Businesses**. The product is a downloadable illustrated PDF, not a video course, software subscription or AI service. The visitor should understand the offer, inspect real sample pages and continue to the seller's confirmed Selar checkout.

## Read first

1. Read `SKILL.md` for the build workflow.
2. Read `references/PRODUCT_BRIEF.md` for authoritative product facts and the section plan.
3. Read `references/CONTENT_DRAFT.md` before writing customer-facing copy.
4. Read `references/ASSET_GUIDE.md` before using images.
5. Inspect `offer.config.example.json`. Create the working config only if one does not already exist; never overwrite confirmed values with this example.
6. Inspect the existing repository, instructions, package manager, lockfile, framework, routes and available tools before changing code.

These files are portable project instructions. Do not assume a root `SKILL.md` is automatically loaded by the VS Code agent. Read it explicitly. Preserve applicable existing repository instructions when merging this pack.

## Product and offer boundaries

- Main product: **Practical AI for Nigerian Small Businesses**, 44-page illustrated PDF.
- Included bonus: **Business & Content Planner**, 8-page fillable and printable PDF.
- Optional, separately priced upsell: **The 30-Day Content Campaign**, 21-page PDF. It is not included in the main purchase unless the owner explicitly changes the offer.
- Audience: Nigerian small-business owners across food, retail, beauty, services, creative work and freelancing. Do not narrow the entire site to fashion.
- Main topics: writing, graphics, short-video planning and Google Flow guidance, customer replies, everyday administration and reusable prompts.
- The guide includes visual examples and simplified teaching diagrams. Do not describe every illustration as a live software screenshot.
- Do not present the PDF as an app, interactive course, video library, certification or personal coaching.
- Tool plans, free credits and interfaces change. Describe free access as limited and subject to availability. Do not promise permanently free or unlimited video generation.
- No real testimonials, customer counts, sales results, publisher identity, price, guarantee, refund terms or checkout URL have been supplied.
- Never invent them. Do not add fake reviews, countdowns, crossed-out prices, sales notifications, official partnerships or earnings claims.
- Use the exact cover assets. Never redraw, retype or regenerate their artwork.

## Work autonomously within scope

Make reversible design and implementation decisions and continue through the requested stage. Ask only when a missing fact blocks a consequential action. Missing price, support details or checkout links should not block layout and preview work.

Preserve unrelated code and working dependencies. Do not replace the framework to satisfy a stylistic preference. Do not introduce accounts, a cart, a CMS, a custom payment backend or a database for this page.

If the repository is empty, use semantic HTML, shared CSS tokens and minimal JavaScript by default. A small static build setup is acceptable where it simplifies reusable content. Keep primary copy and navigation in the initial HTML. If the repository already uses a framework, follow its conventions and use its static or server rendering where available.

Do not install a personal skill, change VS Code/model settings, publish the site, connect paid services or make purchases as part of the build. Deployment requires a separate instruction unless already authorized.

## Design requirements

- Premium editorial publishing: forest green, warm cream, deep ink and restrained gold.
- Real covers and sample pages provide the main visual evidence.
- Main guide and free planner may appear together in the hero. Show the campaign companion in a separate optional-upgrade section.
- Use a serif heading family and a readable sans-serif body family, with local/system fallbacks.
- Use deliberate whitespace and varied section composition. Avoid repeating a generic card grid throughout.
- Keep the primary action understandable on a 360px-wide phone without waiting for animation.
- Make motion subtle and optional. Do not add scroll hijacking, autoplay video, heavy 3D libraries or pinned cinematic sequences.
- Keep essential text in HTML, not baked into an image.
- Use images from this pack. The generated lifestyle image is illustrative, not a customer testimonial or author portrait.

## Content and configuration

Keep product copy, prices, checkout destinations and contact links in one editable data source. Share it across all CTAs and offer summaries. Treat `offer.config.example.json` as a schema example, not final business information.

Preview state:

- Unknown prices stay null in data.
- The hero action can read “Explore the guide” and lead to the contents or offer section.
- Explain a missing checkout briefly in the offer section: “Checkout is not open yet.”
- Never link a purchase button to `#`, a fabricated Selar URL or a simulated success page.
- Hide the upsell purchase action until its own verified offer is configured.

Live state:

- Use only the confirmed price and HTTPS checkout URL.
- State clearly that the product is digital and the planner is included.
- Display the optional companion's separate price beside its separate CTA.
- Keep the Selar amount, product identity and included files consistent with the page.
- Confirm delivery, support, refund terms and privacy information before publication.
- Never store the paid PDFs under public assets or expose their direct file URLs.

## Accessibility, reliability and loading

Use semantic landmarks, one H1, descriptive links, visible keyboard focus and logical heading order. Provide a skip link. Aim for at least 44px touch controls. Check contrast and support 200% zoom. Respect `prefers-reduced-motion`.

Use native links for navigation and native disclosure elements for simple FAQs. Make any image dialog accessible with focus return and Escape support. Reserve image dimensions, use responsive sources, lazy-load offscreen images and avoid loading duplicate desktop/mobile media.

Keep the initial page light enough for mobile data connections. Treat the budgets in `SKILL.md` as project targets and measure them rather than claiming scores.

No Meta Pixel, analytics script or email capture should be added by default. If tracking is requested later, use supplied IDs, confirm the consent approach and privacy copy, and distinguish a checkout click from a confirmed purchase. Never fire a Purchase event on a button click.

## Verification and handoff

Run relevant existing checks and the production build where applicable. Use browser inspection if available. Check at 320, 360, 390, 768 and 1440 CSS pixels, plus a short landscape phone.

Exercise all links, the menu, FAQs, sample previews and both offer states. Follow checkout links only far enough to confirm the correct product and displayed price; do not buy anything. Recheck desktop after mobile changes.

Record checks as passed, failed or not tested with evidence in `docs/QA.md`. Do not invent screenshots, device testing, performance scores or accessibility certification. Record launch dependencies in `docs/LAUNCH_CHECKLIST.md`.

Finish with the run command, editing paths, completed work, measured checks and specific remaining owner inputs. A local preview is not a published site.
