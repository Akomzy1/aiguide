import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { offerState, httpsUrl, policyUrl, money } from '../scripts/offer.mjs';
import { render } from '../scripts/render.mjs';

const config = JSON.parse(await readFile(new URL('../offer.config.json', import.meta.url), 'utf8'));
function liveFixture() {
  const result = structuredClone(config);
  result.mode = 'live';
  result.upsell.enabled = false;
  result.upsell.price = null;
  result.seller = { displayName: 'Test seller', supportEmail: 'support@example.test' };
  result.site.privacyUrl = 'https://example.test/privacy';
  result.site.termsUrl = 'https://example.test/terms';
  Object.assign(result.main, { price: 5000, checkoutUrl: 'https://example.test/main', deliveryDescription: 'Test delivery description.', refundTerms: 'Test refund terms.' });
  return result;
}

test('unconfigured preview has working section links and no purchase destination', () => {
  const preview = structuredClone(config);
  preview.mode = 'preview';
  preview.main.price = null;
  preview.main.checkoutUrl = null;
  preview.upsell.enabled = false;
  preview.upsell.price = null;
  const state = offerState(preview);
  assert.equal(state.mainReady, false);
  assert.equal(state.upsellReady, false);
  const html = render(preview);
  assert.match(html, /Checkout is not open yet\./);
  assert.match(html, /href="#contents"/);
  assert.doesNotMatch(html, /href="#"|Get the campaign companion|class="price"/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
});

test('launch intent alone cannot activate checkout', () => {
  const live = liveFixture();
  for (const field of ['price', 'checkoutUrl', 'deliveryDescription', 'refundTerms']) {
    const incomplete = structuredClone(live);
    incomplete.main[field] = null;
    assert.equal(offerState(incomplete).mainReady, false, field);
  }
  for (const field of ['displayName', 'supportEmail']) {
    const incomplete = structuredClone(live);
    incomplete.seller[field] = null;
    assert.equal(offerState(incomplete).mainReady, false, field);
  }
  for (const field of ['privacyUrl', 'termsUrl']) {
    const incomplete = structuredClone(live);
    incomplete.site[field] = null;
    assert.equal(offerState(incomplete).mainReady, false, field);
  }
});

test('valid main checkout works independently of unconfigured companion', () => {
  const live = liveFixture();
  assert.equal(offerState(live).mainReady, true);
  assert.equal(offerState(live).upsellReady, false);
  const html = render(live);
  assert.equal((html.match(/href="https:\/\/example.test\/main"/g) || []).length, 4);
  assert.doesNotMatch(html, /Checkout is not open yet|Get the campaign companion/);
  assert.match(html, /Test delivery description/);
});

test('companion needs its own complete offer and never replaces main checkout', () => {
  const live = liveFixture();
  live.upsell.enabled = true;
  assert.equal(offerState(live).upsellReady, false);
  Object.assign(live.upsell, { price: 2000, checkoutUrl: 'https://example.test/companion', deliveryDescription: 'Test companion delivery.', refundTerms: 'Test companion terms.' });
  assert.equal(offerState(live).upsellReady, true);
  const html = render(live);
  assert.equal((html.match(/href="https:\/\/example.test\/companion"/g) || []).length, 1);
  assert.match(html, /Optional upgrade · Sold separately/);
  live.upsell.includedWithMain = true;
  assert.equal(offerState(live).upsellReady, false);
});

test('reject unsafe URLs, credentials, bad currency and invalid prices', () => {
  for (const value of ['http://example.test', 'javascript:alert(1)', '//example.test', '#', 'https://user:secret@example.test']) assert.equal(httpsUrl(value), false);
  for (const value of ['//evil.test', '/../../private.html', 'javascript:alert(1)']) assert.equal(policyUrl(value), false);
  assert.equal(policyUrl('/privacy.html'), true);
  for (const price of [-1, 0, Infinity, '5000', null]) {
    const live = liveFixture();
    live.main.price = price;
    assert.equal(offerState(live).mainReady, false);
  }
  const live = liveFixture();
  live.currency = 'not-a-currency';
  assert.equal(offerState(live).mainReady, false);
  assert.doesNotThrow(() => render(live));
});

test('configured copy and seller details are HTML escaped', () => {
  const preview = structuredClone(config);
  preview.copy.hero.headline = '<script>alert("x")</script>';
  preview.seller.displayName = '<img src=x onerror=alert(1)>';
  const html = render(preview);
  assert.doesNotMatch(html, /<script>alert|<img src=x/);
  assert.match(html, /&lt;script&gt;/);
});

test('generated page has unique anchors, working local navigation and one H1', () => {
  const html = render(config);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(target), `Missing ${target}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.doesNotMatch(html, /\.pdf["']/);
});

test('confirmed preview prices appear without creating checkout destinations', () => {
  const priced = structuredClone(config);
  priced.mode = 'preview';
  priced.main.price = 4900;
  priced.upsell.price = 2900;
  priced.upsell.enabled = true;
  priced.main.checkoutUrl = null;
  priced.upsell.checkoutUrl = null;
  const html = render(priced);
  assert.match(html, /data-price="main">₦4,900<span>/);
  assert.match(html, /data-price="upsell">₦2,900<span>/);
  assert.equal((html.match(/Get the guide — <span class="button-price">₦4,900/g) || []).length, 4);
  assert.equal((html.match(/href="#offer"/g) || []).length, 3);
  assert.equal((html.match(/type="button" disabled aria-describedby="(?:main|upsell)-checkout-status"/g) || []).length, 2);
  assert.doesNotMatch(html, /href="(?:null|#)"|selar\./);
});

test('live CTAs use the same configured amount and retain each checkout URL', () => {
  const live = liveFixture();
  live.main.price = 6150;
  Object.assign(live.upsell, { enabled: true, price: 3100, checkoutUrl: 'https://example.test/companion?ref=retained', deliveryDescription: 'Test delivery.', refundTerms: 'Test terms.' });
  const html = render(live);
  assert.equal((html.match(/Get the guide — <span class="button-price">₦6,150/g) || []).length, 4);
  assert.match(html, /data-price="main">₦6,150/);
  assert.match(html, /data-price="upsell">₦3,100/);
  assert.equal((html.match(/href="https:\/\/example.test\/main"/g) || []).length, 4);
  assert.match(html, /href="https:\/\/example.test\/companion\?ref=retained"/);
  assert.doesNotMatch(html, /disabled aria-describedby=/);
  assert.equal(money(4900), '₦4,900');
  assert.equal(money(4900.25), '₦4,900.25');
});
