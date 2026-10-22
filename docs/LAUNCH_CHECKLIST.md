# Launch checklist

Local build complete. Publication has not been requested. The current site uses preview navigation, noindex metadata and a disallow-all robots file.

- [x] Owner-approved main price: **₦4,900**, stored in `offer.config.json` → `main.price`.
- [x] Owner-approved companion price: **₦2,900**, stored in `offer.config.json` → `upsell.price` (corrected from the initial ₦2,999 response).
- [x] Main checkout: `https://selar.com/1h92g1w281`. Product, included planner and current NGN price of ₦4,900 verified on Selar on 22 October 2026.
- [x] Seller display name: Tokunbo Akomolede, verified on the supplied Selar page.
- [ ] Supply the support email.
- [ ] Confirm delivery/access instructions and refund terms for the main product.
- [ ] Provide appropriate privacy and terms URLs, or approved text for local policy pages.
- [x] Verify the checkout listing's product identity, NGN price and stated inclusion of the main guide and free planner. No purchase was made.
- [x] Use one checkout for both offers, as clarified by the owner. `upsell.checkoutMode` is `main`; the companion inherits `main.checkoutUrl` and remains excluded from the base purchase.
- [ ] Verify the optional companion upsell is offered at ₦2,900 in the Selar checkout flow, including its delivery and refund details. Its checkout-flow amount was not independently verified; no purchase was made.
- [ ] Supply the public site URL for canonical and social-image metadata.
- [ ] Set `mode` to `live` only after confirming these details. The build still refuses an incomplete live main offer. The single supplied HTTPS checkout and confirmed prices can be linked in preview without claiming publication readiness. Both purchase routes are now connected to the owner's same Selar URL.
- [ ] Verify delivery and support/refund details on the actual checkout; do not purchase during verification.
- [ ] Authorise deployment separately; deploy only `dist/`.
- [ ] Recheck the published page, support and policy links, and actual mobile devices.

Tracking and email capture are absent. If later requested, supply the relevant IDs, consent approach and privacy text. Full paid PDFs belong in the authorised delivery system, never in public assets.
