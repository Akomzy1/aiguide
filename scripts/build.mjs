import { readFile, mkdir, writeFile, cp, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { render } from './render.mjs';
import { offerState, httpsUrl } from './offer.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
export async function build() {
  const config = JSON.parse(await readFile(path.join(root, 'offer.config.json'), 'utf8'));
  const state = offerState(config);
  if (config.mode === 'live' && !state.mainReady) throw new Error(`Live main offer is incomplete: ${state.mainMissing.join(', ')}`);
  for (const key of ['privacyUrl', 'termsUrl']) {
    const value = config.site[key];
    if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) await access(path.join(root, 'src', value));
  }
  const out = path.join(root, 'dist');
  await mkdir(out, { recursive: true });
  await writeFile(path.join(out, 'index.html'), render(config));
  for (const name of ['styles.css', 'app.js', 'favicon.svg']) await cp(path.join(root, 'src', name), path.join(out, name));
  for (const dir of ['covers', 'previews', 'editorial']) await cp(path.join(root, 'assets', dir), path.join(out, 'assets', dir), { recursive: true });
  for (const key of ['privacyUrl', 'termsUrl']) {
    const value = config.site[key];
    if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
      const target = path.join(out, value);
      await mkdir(path.dirname(target), { recursive: true });
      await cp(path.join(root, 'src', value), target);
    }
  }
  await mkdir(path.join(out, 'design'), { recursive: true });
  await cp(path.join(root, 'design', 'style-tile.html'), path.join(out, 'design', 'style-tile.html'));
  // Robots remains private-preview-friendly until the commercial offer and URL are supplied.
  await writeFile(path.join(out, 'robots.txt'), state.mainReady && httpsUrl(config.site.publicUrl) ? 'User-agent: *\nAllow: /\n' : 'User-agent: *\nDisallow: /\n');
  console.log(`Built dist/index.html · ${state.mainReady ? 'live offer' : 'preview'} · companion ${state.upsellCheckoutReady ? 'checkout connected' : 'information only'}`);
  return { config, state };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
