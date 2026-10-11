import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import SmartImage from "./SmartImage";

function ProductCard({ product }) {

  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col bg-white">
      <Link to={`/products/${product.id}`} className="relative block aspect-[3/4] overflow-hidden rounded-sm bg-shimmer">
        <SmartImage
          src={product.image ?? product.images?.[0] ?? product.thumbnail}
          alt={product.name}
          bg={product.bg}
          imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        {discount && (
          <span className="absolute left-3 top-3 bg-pop px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWishlisted((v) => !v);
          }}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-all hover:bg-white active:scale-90"
        >
          <Heart size={16} strokeWidth={1.6} className={wishlisted ? "fill-pop text-pop" : "text-ink"} />
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center gap-2 bg-white/95 py-3 text-xs font-medium uppercase tracking-[0.18em] text-ink opacity-0 backdrop-blur transition-all duration-300 hover:bg-ink hover:text-white group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          <ShoppingBag size={14} strokeWidth={1.6} />
          Quick add
        </button>
      </Link>

      <Link to={`/products/${product.id}`} className="flex flex-1 flex-col gap-1 pt-3.5">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-subtle">{product.seller}</p>
        <p className="font-display text-[17px] leading-snug text-ink transition-colors group-hover:text-brand">{product.name}</p>
        <div className="mt-auto flex items-center justify-between pt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] text-ink">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-subtle line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <Star size={12} className="fill-sun text-sun" />
            {product.rating}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;