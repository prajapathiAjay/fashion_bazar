import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";

const PRODUCTS = [
  {
    id: "p1",
    name: "Draped midi dress",
    seller: "Amara Studio",
    price: 48,
    originalPrice: 64,
    rating: 4.8,
    bg: "#D9D2F0",
    to: "/products/p1",
  },
  {
    id: "p2",
    name: "Linen shirt jacket",
    seller: "Halden & Co.",
    price: 62,
    originalPrice: null,
    rating: 4.6,
    bg: "#F0997B",
    to: "/products/p2",
  },
  {
    id: "p3",
    name: "Woven tote bag",
    seller: "Bazar Leather",
    price: 35,
    originalPrice: 45,
    rating: 4.9,
    bg: "#EAD7E6",
    to: "/products/p3",
  },
  {
    id: "p4",
    name: "Suede loafers",
    seller: "Marchetti",
    price: 74,
    originalPrice: null,
    rating: 4.7,
    bg: "#F7DFA8",
    to: "/products/p4",
  },
  {
    id: "p5",
    name: "Ribbed knit vest",
    seller: "Amara Studio",
    price: 39,
    originalPrice: 52,
    rating: 4.5,
    bg: "#C9DDF0",
    to: "/products/p5",
  },
  {
    id: "p6",
    name: "Gold hoop earrings",
    seller: "Luna Jewels",
    price: 22,
    originalPrice: null,
    rating: 4.9,
    bg: "#F0C4C4",
    to: "/products/p6",
  },
  {
    id: "p7",
    name: "Wide-leg trousers",
    seller: "Halden & Co.",
    price: 56,
    originalPrice: null,
    rating: 4.6,
    bg: "#CFE3D6",
    to: "/products/p7",
  },
  {
    id: "p8",
    name: "Structured tote",
    seller: "Bazar Leather",
    price: 68,
    originalPrice: 85,
    rating: 4.8,
    bg: "#E6D5C3",
    to: "/products/p8",
  },
];

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#ECE9F1] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(27,21,35,0.09)]">
      {/* Image area */}
      <Link to={product.to} className="relative block aspect-[4/5] overflow-hidden">
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
          <Heart
            size={16}
            className={wishlisted ? "fill-[#D4537E] text-[#D4537E]" : "text-[#1B1523]"}
          />
        </button>

        {/* Quick add — slides up on hover, desktop only */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center gap-2 rounded-full bg-[#1B1523] py-2.5 text-sm font-semibold text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        >
          <ShoppingBag size={15} />
          Quick add
        </button>
      </Link>

      {/* Info */}
      <Link to={product.to} className="flex flex-1 flex-col gap-1 px-3.5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#9691A4]">
          {product.seller}
        </p>
        <p className="text-[15px] font-medium leading-snug text-[#1B1523]">
          {product.name}
        </p>

        <div className="mt-auto flex items-center justify-between pt-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-semibold text-[#1B1523]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#B5B0C1] line-through">
                ${product.originalPrice}
              </span>
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

function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between lg:mb-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#9691A4]">
            Picked for you
          </p>
          <h2 className="font-display mt-1 text-2xl font-bold text-[#1B1523] sm:text-[28px]">
            Featured this week
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden text-sm font-semibold text-[#5B21B6] hover:text-[#3C3489] sm:block"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Link
        to="/products"
        className="mt-8 block text-center text-sm font-semibold text-[#5B21B6] sm:hidden"
      >
        View all products
      </Link>
    </section>
  );
}

export default FeaturedProducts;