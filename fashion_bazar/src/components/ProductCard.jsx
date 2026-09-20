import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";

function ProductCard({ product }) {

  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#ECE9F1] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(27,21,35,0.09)]">
      <Link to={`/products/${product.id}`} className="relative block aspect-[4/5] overflow-hidden">
        <div
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundColor: product.bg }}
        />
        {discount && (
          <span className="absolute left-3 top-3 rounded-full bg-[#1B1523] px-2.5 py-1 text-[11px] font-semibold text-white">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((v) => !v);
          }}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform active:scale-90"
        >
          <Heart size={16} className={wishlisted ? "fill-[#D4537E] text-[#D4537E]" : "text-[#1B1523]"} />
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center gap-2 rounded-full bg-[#1B1523] py-2.5 text-sm font-semibold text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          <ShoppingBag size={15} />
          Quick add
        </button>
      </Link>

      <Link to={`/products/${product.id}`} className="flex flex-1 flex-col gap-1 px-3.5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#9691A4]">{product.seller}</p>
        <p className="text-[15px] font-medium leading-snug text-[#1B1523]">{product.name}</p>
        <div className="mt-auto flex items-center justify-between pt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-semibold text-[#1B1523]">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#B5B0C1] line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#6B6478]">
            <Star size={12} className="fill-[#F5D488] text-[#F5D488]" />
            {product.rating}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;