import { offerState, money, httpsUrl, policyUrl, supportEmail } from './offer.mjs';

export const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const e = escape;
export const icon = (name, extra = '') => {
  const shapes = {
    arrow: '<path d="M4 12h15M13 5l7 7-7 7"/>',
    diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
    book: '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15"/>',
    pen: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0 0-3l-1-1a2 2 0 0 0-3 0L5 15l-1 5Z"/>',
    layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
    play: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 8 6 4-6 4V8Z"/>',
    check: '<path d="m8 5 2 2 4-4M8 12l2 2 4-4M8 19l2 2 4-4M17 6h4M17 13h4M17 20h4"/>',
    tick: '<path d="m5 12 4 4L19 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  return `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || shapes.arrow}</svg>`;
};

export function render(config) {
  const c = config.copy;
  const state = offerState(config);
  const mainLabel = state.mainPriced ? `<span class="button-label">Get the guide — <span class="button-price">${e(money(config.main.price, config.currency))}</span></span>` : 'Get the guide';
  const mainCta = (extra = '', previewLabel = 'Explore the guide', previewHref = '#contents') => `<a class="button ${extra}" href="${state.mainReady ? e(config.main.checkoutUrl) : state.mainPriced ? '#offer' : previewHref}">${state.mainPriced ? mainLabel : previewLabel}${icon('arrow')}</a>`;
  const priceBlock = (product, name) => `<p class="price" data-price="${name}">${e(money(product.price, config.currency))}<span>${e(c.offer.paymentNote)}</span></p>`;
  const cover = (product, className = '', eager = false) => `<img class="${className}" src="${e(product.cover)}" alt="${e(product.title)}, ${e(product.pages)}-page ${e(product.format)}." width="720" height="1008" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const policyLinks = [['Privacy', config.site.privacyUrl], ['Terms', config.site.termsUrl]].filter(([, url]) => policyUrl(url)).map(([label, url]) => `<a href="${e(url)}">${label}</a>`).join('');
  const canonical = httpsUrl(config.site.publicUrl) ? `<link rel="canonical" href="${e(config.site.publicUrl)}"><meta property="og:url" content="${e(config.site.publicUrl)}"><meta property="og:image" content="${e(new URL(config.main.cover, config.site.publicUrl.endsWith('/') ? config.site.publicUrl : config.site.publicUrl + '/').href)}">` : '';
  return `<!doctype html>
<html lang="en-NG">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(config.main.title)} | The illustrated business guide</title>
  <meta name="description" content="${e(c.metaDescription)}">
  <meta name="theme-color" content="#174e43">
  ${state.mainReady ? '' : '<meta name="robots" content="noindex, nofollow">'}
  <meta property="og:type" content="website"><meta property="og:title" content="${e(config.main.title)}"><meta property="og:description" content="${e(c.metaDescription)}"><meta name="twitter:card" content="summary_large_image">
  ${canonical}
  <link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="styles.css">
  <script src="app.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="wordmark" href="#top" aria-label="Practical AI, back to top"><span class="brand-icon">${icon('book')}</span>Practical <span class="brand-ai">AI</span><span class="brand-dot">.</span></a>
    <button class="menu-toggle" type="button" aria-controls="navigation" aria-expanded="false" hidden>${icon('menu')}<span>Menu</span></button>
    <nav id="navigation" aria-label="Main navigation"><a href="#inside">Inside the guide</a><a href="#included">What you get</a><a href="#faqs">FAQs</a>${mainCta('button-small', 'Explore the guide', '#offer')}</nav>
  </header>
  <main id="main">
    <section class="hero wrap" id="top" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="tiny-rule"></span>${e(c.hero.eyebrow)}</p>
        <h1 id="hero-title">${e(c.hero.headline)} <em>${e(c.hero.accent)}</em></h1>
        <p class="hero-description">${e(c.hero.description)}</p>
        <p class="format-line">${icon('book')}${e(c.hero.format)}</p>
        <div class="hero-actions">${mainCta()}<a class="text-link" href="#inside">Take a look inside${icon('diagonal')}</a></div>
        <p class="hero-footnote">A reading-and-doing guide. At your own pace.</p>
      </div>
      <figure class="hero-product">
        <div class="product-stage">
          <div class="stage-orbit" aria-hidden="true"></div>
          <span class="edition-label">The illustrated business field guide <span>${e(config.main.pages)} pages / PDF</span></span>
          <div class="main-book">${cover(config.main, '', true)}</div>
          <div class="bonus-book"><span class="bonus-tag">Free planner included${icon('plus')}</span>${cover(config.bonus, '', true)}</div>
        </div>
        <figcaption>${e(config.main.title)}<span>Digital PDF guide + planner · No physical shipping</span></figcaption>
      </figure>
    </section>

    <div class="audience-band"><div class="wrap audience-inner"><p>${e(c.hero.audience)}</p><ul>${c.sectors.map(s => `<li>${e(s)}</li>`).join('')}</ul></div></div>

    <section class="section wrap outcomes" aria-labelledby="outcomes-title">
      <div class="section-heading split-heading"><div><p class="eyebrow">${e(c.outcomes.eyebrow)}</p><h2 id="outcomes-title">${e(c.outcomes.heading)}</h2></div><p class="section-intro">${e(c.outcomes.intro)}</p></div>
      <div class="outcome-grid">${c.outcomes.items.map((item, i) => `<article class="outcome"><div class="outcome-top">${icon(item.icon)}<span>0${i + 1}</span></div><h3>${e(item.title)}</h3><p>${e(item.text)}</p><p class="use-case">${e(item.example)}</p></article>`).join('')}</div>
    </section>

    <section class="inside-section section" id="inside" aria-labelledby="inside-title"><div class="wrap">
      <div class="section-heading preview-heading"><div><p class="eyebrow">${e(c.previews.eyebrow)}</p><h2 id="inside-title">${e(c.previews.heading)}</h2></div><p class="section-intro">${e(c.previews.intro)}</p></div>
      <div class="preview-grid">${c.previews.items.map(item => `<article class="preview-card"><a class="sample-link" data-sample data-title="Page ${e(item.page)} · ${e(item.title)}" href="${e(item.src)}" aria-label="Open page ${Number(item.page)}: ${e(item.title)}"><div class="sample-sheet"><img src="${e(item.src)}" alt="${e(item.alt)}" width="1080" height="1512" loading="lazy" decoding="async"></div><span class="sample-open">Open page ${Number(item.page)}${icon('diagonal')}</span></a><div class="sample-meta"><span>Page ${e(item.page)}</span><span>${e(item.category)}</span></div><h3>${e(item.title)}</h3><p>${e(item.description)}</p></article>`).join('')}</div>
      <p class="preview-note">${icon('plus')}Select a page for a closer look. These are actual pages from the PDF.</p>
    </div></section>

    <section class="section wrap contents-section" id="contents" aria-labelledby="contents-title">
      <div class="contents-intro"><p class="eyebrow">${e(c.contents.eyebrow)}</p><h2 id="contents-title">${e(c.contents.heading)}</h2><p>${e(c.contents.intro)}</p><figure class="workspace-image"><img src="assets/editorial/business-workspace-768.webp" srcset="assets/editorial/business-workspace-768.webp 768w, assets/editorial/business-workspace-1200.webp 1200w, assets/editorial/business-workspace-1536.webp 1536w" sizes="(max-width: 760px) calc(100vw - 40px), 440px" alt="Illustrative image of a small-business owner planning work at her desk." width="1536" height="1024" loading="lazy" decoding="async"><figcaption>A little space to think. A practical place to begin.<span>AI-generated illustration</span></figcaption></figure></div>
      <ol class="contents-list">${c.contents.items.map((item, i) => `<li><span class="chapter-number">0${i + 1}</span><div><h3>${e(item.title)}</h3><p>${e(item.description)}</p></div>${icon('diagonal')}</li>`).join('')}</ol>
    </section>

    <section class="planner-section" id="included" aria-labelledby="planner-title"><div class="wrap planner-inner"><div class="planner-visual"><span class="round-label">A place to<br><em>make a start.</em></span>${cover(config.bonus)}<span class="planner-format">8 pages · Fillable + printable</span></div><div class="planner-copy"><span class="pill">Free with the main guide</span><p class="eyebrow">${e(c.planner.eyebrow)}</p><h2 id="planner-title">${e(c.planner.heading)}</h2><p>${e(c.planner.description)}</p><ul class="check-list">${c.planner.items.map(item => `<li>${icon('tick')}${e(item)}</li>`).join('')}</ul><p class="small-note">${e(c.planner.note)}</p></div></div></section>

    <section class="section wrap offer-section" id="offer" aria-labelledby="offer-title">
      <div class="offer-intro"><p class="eyebrow">${e(c.offer.eyebrow)}</p><h2 id="offer-title">${e(c.offer.heading)}</h2><p>${e(c.offer.description)}</p><span class="offer-mark" aria-hidden="true">${icon('book')}<span>Read it.<br>Try it.<br>Make it yours.</span></span></div>
      <div class="offer-card">
        <div class="offer-card-top"><span class="eyebrow">The main guide + your free bonus</span>${icon('book')}</div>
        <h3>${e(config.main.title)}</h3>
        ${state.mainPriced ? priceBlock(config.main, 'main') : ''}
        <ul class="bundle-list">
          <li>${icon('tick')}<span><strong>${e(config.main.pages)}-page illustrated PDF guide</strong><span>Writing, graphics, video & everyday work</span></span></li>
          <li>${icon('tick')}<span><strong>FREE ${e(config.bonus.pages)}-page ${e(config.bonus.title)}</strong><span>Fillable and printable · Included with the guide</span></span></li>
        </ul>
        <div class="offer-checkout">${state.mainReady ? `${mainCta('button-full')}<p class="small-note">${e(config.main.deliveryDescription)}</p><p class="small-note">${e(config.main.refundTerms)}</p>` : `<p class="checkout-status" id="main-checkout-status"><span></span>${e(c.offer.unavailable)}</p>${state.mainPriced ? `<button class="button button-full" type="button" disabled aria-describedby="main-checkout-status">${mainLabel}${icon('arrow')}</button><a class="text-link" href="#inside">Explore the sample pages${icon('diagonal')}</a>` : `<p>${e(c.offer.previewNote)}</p><a class="button button-full" href="#inside">Explore the sample pages${icon('arrow')}</a>`}`}</div>
        <p class="digital-note">${e(c.offer.digitalNote)}</p>
      </div>
    </section>

    <section class="companion-section wrap" aria-labelledby="companion-title"><div class="companion-cover">${cover(config.upsell)}</div><div class="companion-copy"><span class="pill pill-outline">${e(c.companion.label)}</span><p class="eyebrow">${e(c.companion.eyebrow)}</p><h2 id="companion-title">${e(c.companion.heading)}</h2><p>${e(c.companion.description)}</p><p class="companion-note">${e(c.companion.note)}</p>
      ${state.upsellPriced ? `<div class="companion-purchase"><h3>${e(config.upsell.title)}</h3><p class="companion-format">${e(config.upsell.pages)}-page PDF companion</p><div class="companion-action">${priceBlock(config.upsell, 'upsell')}${state.upsellReady ? `<a class="button" href="${e(config.upsell.checkoutUrl)}"><span class="button-label">Get the campaign companion</span>${icon('arrow')}</a>` : `<button class="button" type="button" disabled aria-describedby="upsell-checkout-status"><span class="button-label">Get the campaign companion</span>${icon('arrow')}</button>`}</div>${state.upsellReady ? `<p class="small-note">${e(config.upsell.deliveryDescription)}</p><p class="small-note">${e(config.upsell.refundTerms)}</p>` : `<p class="checkout-status" id="upsell-checkout-status"><span></span>${e(c.offer.unavailable)}</p>`}</div>` : ''}
    </div></section>

    <section class="section wrap faq-section" id="faqs" aria-labelledby="faq-title"><div><p class="eyebrow">A few things you might be wondering</p><h2 id="faq-title">Before you<br><em>get started.</em></h2><p>A little clarity for your next step.</p></div><div class="faq-list">${c.faqs.map(item => `<details><summary>${e(item.question)}${icon('plus')}</summary><p>${e(item.answer)}</p></details>`).join('')}${state.mainReady ? `<details><summary>How do I receive the files?${icon('plus')}</summary><p>${e(config.main.deliveryDescription)}</p></details>` : ''}</div></section>

    <section class="final-section"><div class="wrap final-inner"><span class="eyebrow">One useful task at a time</span><h2>${e(c.final.heading)}</h2><p>${e(c.final.description)}</p>${mainCta('button-cream', 'See inside the guide', '#inside')}<span class="final-format">${e(c.hero.format)}</span></div></section>
  </main>
  <footer class="site-footer wrap"><div class="footer-top"><a class="wordmark" href="#top"><span class="brand-icon">${icon('book')}</span>Practical <span class="brand-ai">AI</span><span class="brand-dot">.</span></a><p>Useful ideas. Everyday business.</p><a class="back-top" href="#top">Back to top${icon('arrow')}</a></div><div class="footer-bottom"><p>${e(config.seller.displayName || 'Practical AI for Nigerian Small Businesses')}<span>${e(c.footerNote)}</span></p><nav aria-label="Footer navigation">${supportEmail(config.seller.supportEmail) ? `<a href="mailto:${e(config.seller.supportEmail)}">Support</a>` : ''}${policyLinks}<a href="#inside">Sample pages</a></nav></div></footer>
  <dialog id="sample-dialog" aria-labelledby="sample-title"><div class="dialog-toolbar"><h2 id="sample-title">Inside the guide</h2><button class="dialog-close" type="button" aria-label="Close sample preview" autofocus>${icon('close')}</button></div><div class="dialog-body"><img alt="" width="1080" height="1512"><a class="sample-original text-link" href="assets/previews/page-08-caption.webp">Open full-size image${icon('diagonal')}</a></div></dialog>
</body></html>`;
}
