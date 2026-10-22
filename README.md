# Practical AI landing page

A responsive, dependency-free sales page for **Practical AI for Nigerian Small Businesses**, built from the supplied starter ZIP. The 44-page guide and free 8-page planner form the main offer. The 21-page campaign companion is optional and separate.

## Run locally

Uses Node.js 24.x. No package installation is needed.

```powershell
npm.cmd run dev
```

Open **http://127.0.0.1:4173**. On shells without PowerShell's script restriction, `npm run dev` also works. The server builds once when it starts; after editing source, run `npm.cmd run build` and refresh, or restart the server. Use `PORT` to choose a different port.

```powershell
npm.cmd run build
npm.cmd test
```

The production site is generated in `dist/`. Serve this directory only. `vercel.json` sets the Vercel framework to Other, runs `npm run build`, and serves `dist/`; it overrides an incorrect `public` output-directory setting. Node is pinned to the 24.x major release. A successful local build does not verify a hosted deployment.

## Edit

| Path | Purpose |
| --- | --- |
| `offer.config.json` | Product facts, all main editorial copy, offer prices, checkout URLs, seller and policies |
| `src/styles.css` | Shared design tokens, layout and responsive styling |
| `scripts/render.mjs` | Semantic page structure and generated offer state |
| `src/app.js` | Accessible mobile menu and sample dialogs |
| `design/style-tile.html` | Visual system, available at `/design/style-tile.html` in the preview |
| `assets/` | Exact covers, real sample pages and illustrative editorial image |
| `references/` | Original factual brief, draft copy and asset provenance |

The default is `mode: "preview"`; no price or checkout is invented. The owner's Selar checkout is connected and its ₦4,900 main-guide price is verified. The companion is an optional ₦2,900 upsell in that same checkout (`upsell.checkoutMode: "main"`); both offers use the single URL in `main.checkoutUrl`. Supplied HTTPS checkout links and confirmed prices can work in local preview while launch validation remains incomplete. The live build still fails if required support, delivery/refund or policy details are missing. Approved local policy pages can be placed under `src/` and configured with paths such as `/privacy.html`.

See [handoff](docs/HANDOFF.md), [QA evidence](docs/QA.md) and [launch checklist](docs/LAUNCH_CHECKLIST.md). Keep paid PDFs outside the repository's public build. Original PNG masters and the starter ZIP are not included in `dist/`.
