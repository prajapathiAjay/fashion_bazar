// Coupon maths for the checkout page. Same rule as the backend
// (discount.repository.js amountFor), so the total shown = the total charged.
// The backend checks the coupon again when the order is placed.

// rule = what /discounts/apply returned: { code, type, value, maxDiscount, minOrder }
// returns the ₹ taken off, or null when the cart is below the coupon's minimum order
export function couponAmount(rule, subTotal) {
  if (!rule) return 0;
  if (rule.minOrder && subTotal < rule.minOrder) return null;
  let amount = rule.type === "percentage" ? (subTotal * rule.value) / 100 : rule.value;
  if (rule.type === "percentage" && rule.maxDiscount) amount = Math.min(amount, rule.maxDiscount);
  return Math.max(0, Math.min(Math.round(amount), subTotal));
}

// "10% off (up to ₹300)" / "₹200 off"
export function couponLabel(rule) {
  if (!rule) return "";
  if (rule.type === "percentage") {
    return rule.maxDiscount
      ? `${rule.value}% off (up to ₹${rule.maxDiscount.toLocaleString("en-IN")})`
      : `${rule.value}% off`;
  }
  return `₹${rule.value.toLocaleString("en-IN")} off`;
}
