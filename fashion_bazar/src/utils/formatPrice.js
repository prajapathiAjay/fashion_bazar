// Formats a number as Indian rupees with Indian digit grouping: 2499 -> "₹2,499", 125000 -> "₹1,25,000".
export const formatPrice = (amount) =>
  `₹${Math.round(Number(amount) || 0).toLocaleString("en-IN")}`;
