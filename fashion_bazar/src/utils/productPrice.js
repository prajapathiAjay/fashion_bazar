// Works out the prices to show for a product.
//   price        = the original price (MRP)
//   discount     = percent off
//   sellingPrice = what the shopper pays (older products don't have it, so it is calculated)
// Returns { sale, original, discount } where discount is 0 when there is no saving.
export const getPrices = (product) => {
  const original = Number(product?.price) || 0;
  const percent = Number(product?.discount) || 0;
  const sale =
    product?.sellingPrice != null
      ? Number(product.sellingPrice)
      : Math.round((original * (100 - percent)) / 100);
  const discount = original > sale ? Math.round(100 - (sale / original) * 100) : 0;
  return { sale, original, discount };
};
