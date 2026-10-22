export const hasText = value => typeof value === 'string' && value.trim().length > 0;
export const validPrice = value => Number.isFinite(value) && value > 0;

export function httpsUrl(value) {
  if (!hasText(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch { return false; }
}

export const supportEmail = value => typeof value === 'string' && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
export const policyUrl = value => httpsUrl(value) || (typeof value === 'string' && /^\/(?!\/)[a-zA-Z0-9/_-]+\.html$/.test(value));

export function offerState(config) {
  const common = [];
  if (config.mode !== 'live') common.push('mode');
  // This project sells in NGN; unsupported currency codes must not crash formatting.
  if (config.currency !== 'NGN') common.push('currency');
  if (!hasText(config.seller?.displayName)) common.push('seller.displayName');
  if (!supportEmail(config.seller?.supportEmail)) common.push('seller.supportEmail');
  if (!policyUrl(config.site?.privacyUrl)) common.push('site.privacyUrl');
  if (!policyUrl(config.site?.termsUrl)) common.push('site.termsUrl');
  const validateProduct = product => {
    const missing = [...common];
    if (!validPrice(product?.price)) missing.push('price');
    if (!httpsUrl(product?.checkoutUrl)) missing.push('checkoutUrl');
    if (!hasText(product?.deliveryDescription)) missing.push('deliveryDescription');
    if (!hasText(product?.refundTerms)) missing.push('refundTerms');
    return missing;
  };
  const mainMissing = validateProduct(config.main);
  const upsellMissing = validateProduct(config.upsell);
  if (!config.upsell?.enabled) upsellMissing.push('enabled');
  if (config.upsell?.includedWithMain !== false) upsellMissing.push('includedWithMain');
  return {
    mainPriced: config.currency === 'NGN' && validPrice(config.main?.price),
    upsellPriced: config.currency === 'NGN' && config.upsell?.enabled === true && validPrice(config.upsell?.price),
    mainReady: mainMissing.length === 0, upsellReady: upsellMissing.length === 0, mainMissing, upsellMissing
  };
}

export const money = (value, currency = 'NGN') => new Intl.NumberFormat('en-NG', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
