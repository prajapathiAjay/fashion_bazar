// Shipping helpers shared by the cart, checkout and account pages.
// The real options come from useGetShippingQuery() (set by the admin on the Shipping page).
// DEFAULT_SHIPPING is only used for the first moment while they load.
export const DEFAULT_SHIPPING = [
  { code: "standard", name: "Standard", description: "Everyday delivery", price: 99, freeAbove: 999, minDays: 4, maxDays: 6 },
  { code: "express", name: "Express", description: "Fastest delivery", price: 199, freeAbove: null, minDays: 1, maxDays: 2 },
];

// Same rule as the backend (shipping.schema.js calcShippingCost), so the total shown = the total charged
export const calcShipping = (method, subTotal) => {
  if (!method) return 0;
  if (method.freeAbove !== null && method.freeAbove !== undefined && subTotal >= method.freeAbove) return 0;
  return method.price;
};

// "4-6 business days", "1 business day", "Today"
export const etaLabel = (method) => {
  if (!method) return "";
  const { minDays = 0, maxDays = 0 } = method;
  if (maxDays === 0) return "Today";
  const days = minDays === maxDays ? `${maxDays}` : `${minDays}-${maxDays}`;
  return `${days} business ${maxDays === 1 ? "day" : "days"}`;
};
