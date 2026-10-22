---
name: build-ai-guide-landing-page
description: Plan, write, build and verify the landing page for Practical AI for Nigerian Small Businesses using the supplied product brief, exact ebook covers, sample pages and offer configuration. Use for initial creation, conversion copy, responsive refinement, checkout wiring and launch-readiness checks in this project.
---

# Build the AI guide landing page

Read `AGENTS.md` and the relevant files in `references/` before each stage. Treat the product brief as the factual source, the content draft as editable copy and the example config as unconfirmed commercial data. Read this file explicitly when it lives in the project root; do not rely on automatic skill discovery.

## 1. Inspect and plan

Inspect the repository and available build/browser tools. Preserve its stack and existing instructions. If empty, use a small static implementation with semantic HTML, CSS tokens and minimal JavaScript. Do not add a framework solely for an accordion or image preview.

Write a concise `docs/BUILD_PLAN.md` covering:

- Existing stack and commands, or the chosen minimal setup.
- The main purchase journey and optional-upsell journey.
- Section order and content source.
- Asset choices and their roles.
- Unknown commercial fields and useful preview behavior.
- Implementation steps and proportionate validation.

Separate confirmed facts from draft copy and missing owner inputs. Continue through the requested stage without asking for aesthetic approval.

## 2. Establish the visual system

Create one editable style tile at `design/style-tile.html` or the existing project's equivalent. Reuse its tokens in the final page.

Use this starting palette:

- Forest: `#174E43`.
- Deep ink: `#182E2B`.
- Cream: `#F8F4EB`.
- Gold: `#D39B48`.
- Pale green: `#E9EFE9`.
- Muted text: `#62706C`.

Check actual contrast for every text/background combination. Gold is primarily an accent; do not assume it is readable as small text on cream.

Prefer Noto Serif or a comparable editorial serif for headings and Rubik or a clear sans-serif for body text. Use only available, properly licensed fonts. If they are absent, use Georgia and a system sans-serif rather than blocking the build or hotlinking unknown files.

Use a restrained spacing scale, comfortable paragraph line lengths and a readable mobile body size around 16–18px. Treat 44px as the minimum touch-target design goal.

Define button states, links, price treatment, a sample-page caption and an FAQ row. Verify contrast.

## 3. Compose the page around the actual offer

Follow `references/PRODUCT_BRIEF.md`. Build these sections:

1. Compact navigation and hero.
2. Practical outcomes across several business types.
3. Real inside-page previews.
4. What the main guide covers.
5. Included free planner.
6. Main offer and purchase action.
7. Optional campaign companion.
8. FAQs, final action and footer.

Keep the first screen focused on the main guide. State “44-page illustrated PDF” and show the main cover prominently. Put the planner in a smaller secondary position. Do not make the optional companion look included.

Use one distinctive composition: a large cover with a shallow CSS perspective and a small planner alongside it on cream, with editorial text on the opposite side. Keep a flat-cover fallback on small screens and for reduced motion. Preserve cover pixels and label the digital format nearby so the mockup does not imply physical shipping.

Use the supplied lifestyle image sparingly in supporting sections. Use exact sample pages as evidence. Give each sample a visible page number and useful caption. Do not invent results, before-and-after outcomes or customer quotes.

Compose desktop and mobile separately within one semantic page. Keep headline, product format and CTA early; do not let a giant mockup push all useful information below the fold.

## 4. Write concise, honest conversion copy

Start from `references/CONTENT_DRAFT.md`. Explain practical tasks and what the buyer receives. Use Nigerian business context naturally and include examples from several sectors.

Use British/Nigerian English consistently. Avoid “revolutionise”, “unlock limitless potential”, guaranteed earnings, guaranteed ad approval and vague AI hype.

Explain the difference between the PDF purchase and access to third-party tools. Do not promise a permanent credit allowance or a paid subscription. Do not call the diagrams exact current interfaces.

Describe the optional upsell as a deeper planning companion, not a prerequisite for getting value from the main guide. Never invent anchor values or discounts.

## 5. Implement a complete purchase handoff

Create one working offer config from `offer.config.example.json` only if none exists. Validate required fields for live state. Accept HTTPS checkout destinations only. Treat `mode: "live"` as launch intent, not proof that the fields are valid.

For the main purchase, require a confirmed price, currency, seller identity, checkout URL, delivery description, support contact, refund terms and appropriate privacy details before calling the site launch-ready. The optional upsell must pass its own price and checkout checks.

In preview, keep useful navigation to contents and sample pages. Use an honest unavailable-checkout message instead of a fake Buy button. A missing upsell must not disable the main offer. When `upsell.enabled` is false, its information-only section may remain, clearly labelled optional, but omit its price and purchase action.

Link directly to the authorized external checkout. Do not build a card form or fake payment flow. Prefer same-tab navigation for predictable mobile behavior; if a new tab is chosen, indicate it and set safe link attributes.

Match every price and CTA to the same data source. Do not put paid PDFs in the public web tree. Publish only the limited sample images supplied in this pack.

If the owner supplies policy text instead of policy URLs, create real local pages from that approved text and store their routes in the config. Preserve the supplied meaning; do not invent legal terms. The example config can be extended where the actual project requires it.

Add a descriptive page title, meta description and social-sharing metadata using the real product identity. Set a canonical URL only after the public URL is confirmed. Do not add fabricated ratings, reviews, availability or prices to structured data. Preserve the preview's existing indexing/audience settings until publication is authorized.

Implement simple FAQs with native disclosure elements. Add a mobile sticky CTA only if it improves access without obscuring content, browser controls or focused elements. Account for safe areas and bottom padding.

## 6. Refine phone and desktop behavior

Test narrow and short screens before adding motion. Use intrinsic content heights, flexible grids and bounded image widths. Avoid absolute positioning for body copy and horizontally scrolling price cards.

Check:

- 320 × 568 and 360 × 800: wrapping, readability and no horizontal overflow.
- 390 × 844: first-screen hierarchy and CTA access.
- 768px wide: intermediate layout.
- 1440px wide: line lengths, balance and cover scale.
- Short landscape phone: menu, sticky elements and content access.

Use responsive image selection. Set dimensions and lazy-load offscreen samples. Load essential content immediately. Respect reduced motion from first paint; content must remain visible if scripts fail.

Project budgets, to measure rather than advertise:

- Aim for no more than 800KB transferred for the initial mobile view.
- Aim for no more than 100KB compressed initial JavaScript.
- Aim for combined first-screen images of 400KB or less.
- Use no autoplay media or animation-sequence downloads.

These are design targets, not measured results. If an existing stack cannot meet one, document the observed result and reason instead of changing unrelated architecture.

## 7. Validate and hand off

Use existing checks; add focused tests only for meaningful behavior such as config validation and preview/live CTA states. Do not create tests that merely repeat static marketing copy.

Inspect rendered output and exercise the visitor journey. Verify anchor offsets, focus states, sample-image fallbacks, menu behavior, FAQs, checkout URLs and missing-config behavior. Confirm that sample assets load but paid PDFs are not publicly exposed.

Record each check as passed, failed or not tested in `docs/QA.md`, with viewport, method and evidence. Include a measured asset/transfer summary if tools support it. Distinguish browser emulation from physical-device tests.

Fix observed defects and rerun affected checks. After mobile refinements, recheck desktop. Stop optional testing once relevant risks are resolved.

Write `docs/HANDOFF.md` with start/build commands, content/config/token paths, asset provenance, remaining owner fields and verification status. Keep publication separate from local completion unless the owner has already authorized deployment.

Do not claim the skill has been installed into a VS Code agent. This file is a project-local workflow and can be used simply by asking the agent to read it.
