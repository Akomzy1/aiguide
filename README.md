# Practical AI landing page

A responsive, dependency-free sales page for **Practical AI for Nigerian Small Businesses**, built from the supplied starter ZIP. The 44-page guide and free 8-page planner form the main offer. The 21-page campaign companion is optional and separate.

## Run locally

Requires Node.js 24 or newer. No package installation is needed.

```powershell
npm.cmd run dev
```

Open **http://127.0.0.1:4173**. On shells without PowerShell's script restriction, `npm run dev` also works. The server builds once when it starts; after editing source, run `npm.cmd run build` and refresh, or restart the server. Use `PORT` to choose a different port.

```powershell
npm.cmd run build
npm.cmd test
```

The production site is generated in `dist/`. Serve this directory only. The page is local and has not been deployed.

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

The default is `mode: "preview"`; no price or checkout is invented. The live build fails if the main offer is incomplete. A companion checkout is shown only when its own offer is complete and enabled. Approved local policy pages can be placed under `src/` and configured with paths such as `/privacy.html`.

See [handoff](docs/HANDOFF.md), [QA evidence](docs/QA.md) and [launch checklist](docs/LAUNCH_CHECKLIST.md). Keep paid PDFs outside the repository's public build. Original PNG masters and the starter ZIP are not included in `dist/`.
