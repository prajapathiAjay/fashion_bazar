import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import SmartImage from "./SmartImage";
import { formatPrice } from "../utils/formatPrice";

// "Editorial Overlay" card: a tall photo with the name and price printed over
// a dark fade, like a magazine page, and a full-width Add to bag below.
function ProductCard({ product }) {

  const [wishlisted, setWishlisted] = useState(false);
  const productId = product._id ?? product.id;
  const href = `/products/${productId}`;
  const sellerName = typeof product.seller === "object" ? product.seller?.name : product.seller;
  const discount = product.originalPrice > product.price
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : 0;
  // Corner tag: the product's own badge if it has one, otherwise the discount
  const tag = product.badge ?? product.tag ?? (discount > 0 ? `${discount}% off` : null);

  // A second photo, if there is one, fades in on hover (desktop only)
  const mainImage = product.image ?? product.images?.[0] ?? product.thumbnail;
  const hoverImage = product.images?.find((img) => img && img !== mainImage);

  return (
    <article className="group relative flex flex-col bg-white">
      <div className="relative aspect-2/3 overflow-hidden rounded-sm bg-shimmer">
        <Link to={href} className="block h-full w-full">
          <SmartImage
            src={mainImage}
            alt={product.name}
            bg={product.bg}
            imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 hidden h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block"
            />
          )}

          {/* dark fade so the white text reads on any photo */}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/85 via-ink/40 to-transparent" />

          <div className="absolute inset-x-2.5 bottom-2.5 flex flex-col gap-0.5 text-white sm:inset-x-3.5 sm:bottom-3.5 sm:gap-1">
            {sellerName && (
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.2em] text-white/75">{sellerName}</p>
            )}
            <h3 className="line-clamp-2 font-display text-[15px] leading-snug sm:text-[19px]">{product.name}</h3>
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-[15px] font-medium sm:text-base">{formatPrice(product.price)}</span>
              {discount > 0 && (
                <span className="text-xs text-white/60 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </Link>

        {tag && (
          <span className="pointer-events-none absolute left-2.5 top-2.5 border border-white/70 px-1.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white sm:left-3 sm:top-3 sm:px-2">
            {tag}
          </span>
        )}

        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-all hover:bg-white active:scale-90 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <Heart
            size={16}
            strokeWidth={1.6}
            className={`transition-transform duration-300 ${wishlisted ? "scale-110 fill-pop text-pop" : "text-ink"}`}
          />
        </button>
      </div>

      <button
        type="button"
        aria-label={`Add ${product.name} to bag`}
        className="mt-2.5 w-full border border-ink bg-white py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-white active:bg-ink active:text-white sm:py-3 sm:text-xs"
      >
        Add to bag
      </button>
    </article>
  );
}

export default ProductCard;
