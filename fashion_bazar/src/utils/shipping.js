// Shipping helpers shared by the cart and checkout pages.
// The real rates come from useGetShippingQuery(); these defaults are only used
// for the first moment while they load (same values the backend starts with).
export const DEFAULT_SHIPPING = {
  standard: { enabled: true, price: 99, freeAbove: 999, minDays: 4, maxDays: 6 },
  express: { enabled: true, price: 199, freeAbove: null, minDays: 1, maxDays: 2 },
};

// Same rule as the backend (shipping.schema.js calcShippingCost), so the total shown = the total charged
export const calcShipping = (settings, method, subTotal) => {
  const m = settings?.[method];
  if (!m) return 0;
  if (m.freeAbove !== null && m.freeAbove !== undefined && subTotal >= m.freeAbove) return 0;
  return m.price;
};

// "4-6 business days" (or "2 business days" when min = max)
export const etaLabel = (m) => {
  if (!m) return "";
  const days = m.minDays === m.maxDays ? `${m.minDays}` : `${m.minDays}-${m.maxDays}`;
  return `${days} business ${m.maxDays === 1 ? "day" : "days"}`;
};
