import { useGetShippingQuery } from "../lib/api/shippingApi";
import { formatPrice } from "../utils/formatPrice";

// The "free on orders over ₹X" amount the admin set on the Shipping page.
// Returns { freeAbove, freeLabel } — both null when no delivery option is free (or while loading),
// so pages only promise free shipping when it is really on.
export const useFreeShipping = () => {
  const { data: shipping } = useGetShippingQuery();
  const freeAbove = shipping?.find((m) => m.freeAbove != null)?.freeAbove ?? null;
  return { freeAbove, freeLabel: freeAbove != null ? formatPrice(freeAbove) : null };
};
