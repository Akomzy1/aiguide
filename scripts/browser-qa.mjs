// Optional local Chrome QA. Start Chrome with --headless=new and --remote-debugging-port=9224.
// Requires the preview server at http://127.0.0.1:4173. No npm dependencies.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { offerState, money } from './offer.mjs';
const config = JSON.parse(await readFile(new URL('../offer.config.json', import.meta.url), 'utf8'));
const offers = offerState(config);
const targets = await (await fetch('http://127.0.0.1:9224/json')).json();
const target = targets.find(item => item.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
let nextId = 0;
const pending = new Map();
const errors = [];
ws.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const handlers = pending.get(message.id);
    if (!handlers) return;
    pending.delete(message.id);
    if (message.error) handlers.reject(new Error(message.error.message));
    else handlers.resolve(message.result);
  }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) errors.push(`${message.params.response.status}: ${message.params.response.url}`);
};
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
async function settle() {
  await evaluate(`new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))`);
}
async function click(selector) {
  const box = await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.scrollIntoView({block:'center',behavior:'instant'}); const r=el.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...box, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...box, button: 'left', clickCount: 1 });
  await settle();
}
async function key(key, code = key) {
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: key === 'Escape' ? 27 : 9 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code });
}
async function navigate(scriptEnabled = true) {
  await send('Page.navigate', { url: 'http://127.0.0.1:4173/' });
  for (let attempt = 0; attempt < 80; attempt++) {
    if (await evaluate(`document.readyState==='complete' && !!document.querySelector('.hero')`)) break;
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  if (scriptEnabled) await settle();
}
async function screenshot(file, full = false) {
  const metrics = await send('Page.getLayoutMetrics');
  const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full, ...(full ? { clip: { x: 0, y: 0, width: metrics.cssContentSize.width, height: metrics.cssContentSize.height, scale: 1 } } : {}) });
  await writeFile(new URL(`../.preview/${file}`, import.meta.url), Buffer.from(result.data, 'base64'));
}
await mkdir(new URL('../.preview/', import.meta.url), { recursive: true });
await send('Page.enable');
await send('Runtime.enable');
await send('Network.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
await send('Emulation.setScriptExecutionDisabled', { value: false });
const report = { viewports: [], interactions: [], errors };
try {
  for (const [width, height] of [[1440,1000],[320,568],[360,800],[390,844],[768,1024],[844,390]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
    await navigate();
    const measurement = await evaluate(`(() => ({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,transferBytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0)+performance.getEntriesByType('navigation')[0].transferSize,brokenImages:[...document.images].filter(i=>i.complete && i.src && !i.naturalWidth).map(i=>i.src),overflow:[...document.querySelectorAll('main *, header *, footer *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0 && (r.right>innerWidth+1 || r.left < -1)}).map(el=>el.className).slice(0,12),heroActionBottom:document.querySelector('.hero-actions').getBoundingClientRect().bottom}))()`);
    assert.ok(measurement.scrollWidth <= width, `Horizontal overflow at ${width}`);
    assert.deepEqual(measurement.brokenImages, []);
    report.viewports.push(measurement);
    await screenshot(`viewport-${width}.png`);
    const pricing = await evaluate(`(() => ({
      main:document.querySelector('[data-price="main"]')?.firstChild.textContent,
      upsell:document.querySelector('[data-price="upsell"]')?.firstChild.textContent,
      disabledMain:!!document.querySelector('.offer-checkout button:disabled'),
      disabledUpsell:!!document.querySelector('.companion-action button:disabled'),
      mainLinks:[...document.querySelectorAll('.site-header a.button,.hero-actions a.button,.offer-checkout a.button,.final-inner a.button')].map(el=>el.getAttribute('href')),
      upsellLink:document.querySelector('.companion-action a.button')?.getAttribute('href'),
      overflowingButtons:[...document.querySelectorAll('.button')].filter(el=>el.getClientRects().length && el.scrollWidth>el.clientWidth+1).map(el=>el.textContent.trim())
    }))()`);
    if (offers.mainPriced) assert.equal(pricing.main, money(config.main.price, config.currency));
    if (offers.upsellPriced) assert.equal(pricing.upsell, money(config.upsell.price, config.currency));
    assert.equal(pricing.disabledMain, offers.mainPriced && !offers.mainCheckoutReady);
    assert.equal(pricing.disabledUpsell, offers.upsellPriced && !offers.upsellCheckoutReady);
    if (offers.mainCheckoutReady) assert.deepEqual(pricing.mainLinks, Array(4).fill(config.main.checkoutUrl));
    if (offers.upsellCheckoutReady) assert.equal(pricing.upsellLink, offers.upsellCheckoutUrl);
    assert.deepEqual(pricing.overflowingButtons, []);
    measurement.pricing = pricing;
    if ([320,390,1440].includes(width)) {
      for (const [name, selector] of [['main','.offer-card'],['companion','.companion-section']]) {
        await evaluate(`(async()=>{for(const img of document.querySelectorAll('${selector} img')){img.loading='eager';await img.decode().catch(()=>{})}window.scrollTo({top:0,behavior:'instant'})})()`);
        await settle();
        const clip = await evaluate(`(() => {const r=document.querySelector('${selector}').getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1}})()`);
        const capture = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});
        await writeFile(new URL(`../.preview/pricing-${name}-${width}.png`, import.meta.url),Buffer.from(capture.data,'base64'));
      }
    }
    if (width === 390) {
      await click('.menu-toggle');
      assert.equal(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')`), 'true');
      await key('Escape');
      assert.equal(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')`), 'false');
      await click('.menu-toggle');
      await click('#navigation a[href="#inside"]');
      assert.equal(await evaluate(`document.querySelector('.menu-toggle').getAttribute('aria-expanded')`), 'false');
      report.interactions.push('Mobile menu opens, Escape closes, section selection closes');
      for (let i = 1; i <= 3; i++) {
        await click(`.preview-card:nth-child(${i}) [data-sample]`);
        assert.equal(await evaluate(`document.querySelector('dialog').open`), true);
        await key('Escape');
        assert.equal(await evaluate(`document.querySelector('dialog').open`), false);
        assert.equal(await evaluate(`document.activeElement.hasAttribute('data-sample')`), true);
      }
      report.interactions.push('All three previews open, Escape closes, focus returns');
      await click('.faq-list details summary');
      assert.equal(await evaluate(`document.querySelector('.faq-list details').open`), true);
      await click('.faq-list details summary');
      assert.equal(await evaluate(`document.querySelector('.faq-list details').open`), false);
      report.interactions.push('Native FAQ toggles');
      await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
      assert.equal(await evaluate(`getComputedStyle(document.querySelector('.main-book')).transform`), 'none');
      assert.equal(await evaluate(`getComputedStyle(document.documentElement).scrollBehavior`), 'auto');
      report.interactions.push('Reduced motion removes cover transform and smooth scroll');
      await send('Emulation.setEmulatedMedia', { features: [] });
    }
  }
  await send('Emulation.setDeviceMetricsOverride', { width:1440,height:1000,deviceScaleFactor:1,mobile:false });
  await navigate();
  // Load deferred samples before capturing the complete page.
  await evaluate(`(async()=>{for(const img of document.images){if(img.src){img.loading='eager';await img.decode().catch(()=>{})}}})()`);
  report.contrast = await evaluate(`(() => {
    const parse = color => (color.match(/[\\d.]+/g)||[]).map(Number);
    const blend = (front,back) => front.slice(0,3).map((c,i)=>c*(front[3]??1)+back[i]*(1-(front[3]??1)));
    const luminance = color => color.slice(0,3).map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((n,x,i)=>n+x*[.2126,.7152,.0722][i],0);
    const walker = document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const failures=[]; let checked=0;
    while(walker.nextNode()) {
      const node=walker.currentNode, el=node.parentElement;
      if(!node.textContent.trim() || !el || !el.getClientRects().length || ['SCRIPT','STYLE'].includes(el.tagName))continue;
      const style=getComputedStyle(el);
      if(style.visibility==='hidden')continue;
      const ancestors=[];for(let p=el;p;p=p.parentElement)ancestors.unshift(p);
      let bg=[255,255,255];for(const parent of ancestors)bg=blend(parse(getComputedStyle(parent).backgroundColor),bg);
      const foreground=blend(parse(style.color),bg);
      const a=luminance(foreground), b=luminance(bg), ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      const size=parseFloat(style.fontSize), bold=parseFloat(style.fontWeight)>=700, threshold=(size>=24||(bold&&size>=18.66))?3:4.5;
      checked++;if(ratio<threshold)failures.push({text:node.textContent.trim().slice(0,75),ratio:+ratio.toFixed(2),threshold});
    }
    return {checked,failures};
  })()`);
  assert.deepEqual(report.contrast.failures, []);
  await screenshot('desktop-full.png', true);
  await evaluate(`document.body.style.zoom='2'`);
  report.cssZoom200 = await evaluate(`({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth})`);
  assert.ok(report.cssZoom200.scrollWidth <= 1440, 'Overflow at 200% CSS zoom');
  await screenshot('zoom-200.png');
  await evaluate(`document.body.style.zoom=''`);
  await send('Emulation.setDeviceMetricsOverride', { width:390,height:844,deviceScaleFactor:1,mobile:false });
  await navigate();
  await evaluate(`(async()=>{for(const img of document.images){if(img.src){img.loading='eager';await img.decode().catch(()=>{})}}})()`);
  await screenshot('mobile-full.png', true);
  await send('Emulation.setScriptExecutionDisabled', { value: true });
  await navigate(false);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('#navigation')).display`), 'flex');
  assert.ok(await evaluate(`document.querySelector('h1').innerText.length > 10`));
  assert.match(await evaluate(`document.querySelector('[data-sample]').getAttribute('href')`), /\.webp$/);
  report.interactions.push('Without JavaScript, primary text, navigation and direct sample links remain available');
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  assert.deepEqual(errors, []);
  report.result = 'passed';
} catch (error) {
  report.result = 'failed';
  report.failure = error.stack;
  process.exitCode = 1;
} finally {
  await send('Emulation.setScriptExecutionDisabled', { value: false });
  await writeFile(new URL('../.preview/browser-qa.json', import.meta.url), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  ws.close();
}
