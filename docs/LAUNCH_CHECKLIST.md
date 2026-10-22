# Launch checklist

Local build complete. Publication has not been requested. The current site uses preview navigation, noindex metadata and a disallow-all robots file.

- [x] Owner-approved main price: **₦4,900**, stored in `offer.config.json` → `main.price`.
- [x] Owner-approved companion price: **₦2,900**, stored in `offer.config.json` → `upsell.price` (corrected from the initial ₦2,999 response).
- [ ] Supply the confirmed HTTPS Selar checkout URL for the main guide; `main.checkoutUrl` is still null.
- [ ] Supply the seller or publisher's name and support email.
- [ ] Confirm delivery/access instructions and refund terms for the main product.
- [ ] Provide appropriate privacy and terms URLs, or approved text for local policy pages.
- [ ] Verify the checkout product identity, total price and inclusion of exactly the main guide and free planner.
- [ ] Supply the companion's separate checkout URL, delivery description and refund terms. Its approved offer is enabled for display; `upsell.checkoutUrl` is still null and `includedWithMain` remains false.
- [ ] Supply the public site URL for canonical and social-image metadata.
- [ ] Set `mode` to `live` only after confirming these details. Run the build and tests again. The build refuses an incomplete live main offer. Confirmed prices are visible in preview; purchase buttons remain disabled until their respective checkout requirements are met.
- [ ] Verify delivery and support/refund details on the actual checkout; do not purchase during verification.
- [ ] Authorise deployment separately; deploy only `dist/`.
- [ ] Recheck the published page, support and policy links, and actual mobile devices.

Tracking and email capture are absent. If later requested, supply the relevant IDs, consent approach and privacy text. Full paid PDFs belong in the authorised delivery system, never in public assets.
