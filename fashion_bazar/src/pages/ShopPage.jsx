import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../features/products/productThunks";
import { useDispatch, useSelector } from "react-redux";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  Heart,
  Star,
  ShoppingBag,
} from "lucide-react";

const CATEGORIES = ["Women", "Men", "Kids", "Footwear", "Jewelry", "Accessories"];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Violet", hex: "#5B21B6" },
  { name: "Coral", hex: "#F0997B" },
  { name: "Gold", hex: "#F5D488" },
  { name: "Pink", hex: "#D4537E" },
  { name: "Black", hex: "#1B1523" },
  { name: "Sage", hex: "#9CB89A" },
];
const SORT_OPTIONS = ["Most popular", "Newest", "Price: low to high", "Price: high to low", "Top rated"];



const PRODUCTS = [
  { id: "p1", name: "Draped midi dress", seller: "Amara Studio", price: 48, originalPrice: 64, rating: 4.8, bg: "#D9D2F0" },
  { id: "p2", name: "Linen shirt jacket", seller: "Halden & Co.", price: 62, originalPrice: null, rating: 4.6, bg: "#F0997B" },
  { id: "p3", name: "Woven tote bag", seller: "Bazar Leather", price: 35, originalPrice: 45, rating: 4.9, bg: "#EAD7E6" },
  { id: "p4", name: "Suede loafers", seller: "Marchetti", price: 74, originalPrice: null, rating: 4.7, bg: "#F7DFA8" },
  { id: "p5", name: "Ribbed knit vest", seller: "Amara Studio", price: 39, originalPrice: 52, rating: 4.5, bg: "#C9DDF0" },
  { id: "p6", name: "Gold hoop earrings", seller: "Luna Jewels", price: 22, originalPrice: null, rating: 4.9, bg: "#F0C4C4" },
  { id: "p7", name: "Wide-leg trousers", seller: "Halden & Co.", price: 56, originalPrice: null, rating: 4.6, bg: "#CFE3D6" },
  { id: "p8", name: "Structured tote", seller: "Bazar Leather", price: 68, originalPrice: 85, rating: 4.8, bg: "#E6D5C3" },
  { id: "p9", name: "Silk scarf", seller: "Luna Jewels", price: 28, originalPrice: null, rating: 4.4, bg: "#EAD7E6" },
  { id: "p10", name: "Denim overshirt", seller: "Marchetti", price: 58, originalPrice: 72, rating: 4.7, bg: "#C9DDF0" },
  { id: "p11", name: "Pleated skirt", seller: "Amara Studio", price: 44, originalPrice: null, rating: 4.5, bg: "#F0997B" },
  { id: "p12", name: "Leather sandals", seller: "Marchetti", price: 52, originalPrice: null, rating: 4.6, bg: "#F7DFA8" },
];

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

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#ECE9F1] py-5 first:pt-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-[#1B1523]">{title}</span>
        <ChevronDown
          size={16}
          className={`text-[#9691A4] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function FilterPanel({ selected, toggleCategory, toggleSize, toggleColor, priceMax, setPriceMax }) {
  return (
    <div>
      <FilterSection title="Category">
        <div className="flex flex-col gap-3">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 text-sm text-[#3A3547]">
              <input
                type="checkbox"
                checked={selected.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-[#D9D5E3] text-[#5B21B6] focus:ring-[#5B21B6]/30"
              />
              {cat}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-[#5B21B6]"
          />
          <div className="mt-2 flex justify-between text-xs text-[#9691A4]">
            <span>$0</span>
            <span className="font-medium text-[#1B1523]">Up to ${priceMax}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`h-9 min-w-9 rounded-full border px-3 text-xs font-medium transition-colors ${
                selected.sizes.includes(size)
                  ? "border-[#1B1523] bg-[#1B1523] text-white"
                  : "border-[#E4E0EC] text-[#3A3547] hover:border-[#B5B0C1]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              aria-label={color.name}
              className="relative h-8 w-8 rounded-full ring-1 ring-[#ECE9F1] ring-offset-2"
              style={{ backgroundColor: color.hex }}
            >
              {selected.colors.includes(color.name) && (
                <span className="absolute inset-0 rounded-full ring-2 ring-[#1B1523] ring-offset-2" />
              )}
            </button>
          ))}
        </div>
      </FilterSection>
    </div>
  );
}

function ShopPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [priceMax, setPriceMax] = useState(100);
  const [selected, setSelected] = useState({ categories: [], sizes: [], colors: [] });

const dispatch = useDispatch();
const {products,loading,error}=useSelector((state)=>state.products) 
console.log("products",products,loading,error)
  useEffect(()=>{
    console.log("dispatching fetchProducts")
  dispatch(fetchProducts())

},[])
  const toggleCategory = (cat) =>
    setSelected((s) => ({
      ...s,
      categories: s.categories.includes(cat)
        ? s.categories.filter((c) => c !== cat)
        : [...s.categories, cat],
    }));
  const toggleSize = (size) =>
    setSelected((s) => ({
      ...s,
      sizes: s.sizes.includes(size) ? s.sizes.filter((v) => v !== size) : [...s.sizes, size],
    }));
  const toggleColor = (color) =>
    setSelected((s) => ({
      ...s,
      colors: s.colors.includes(color) ? s.colors.filter((v) => v !== color) : [...s.colors, color],
    }));

  const activeFilterCount =
    selected.categories.length + selected.sizes.length + selected.colors.length;

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Breadcrumb + heading */}
      <div className="mb-6">
        <p className="text-xs text-[#9691A4]">
          <Link to="/" className="hover:text-[#5B21B6]">Home</Link> / Shop
        </p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-[#1B1523] sm:text-[28px]">
              Shop the bazar
            </h1>
            <p className="mt-1 text-sm text-[#9691A4]">{products.length} items</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex items-center justify-between gap-3 border-y border-[#ECE9F1] py-3">
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 rounded-full border border-[#E4E0EC] px-4 py-2 text-sm font-medium text-[#1B1523] lg:hidden"
        >
          <SlidersHorizontal size={15} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5B21B6] text-[11px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="relative ml-auto">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-[#E4E0EC] px-4 py-2 text-sm font-medium text-[#1B1523]"
          >
            Sort: {sort}
            <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-[#ECE9F1] bg-white p-1.5 shadow-[0_14px_36px_rgba(27,21,35,0.12)]">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSort(opt);
                    setSortOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                    opt === sort ? "bg-[#F4F1FA] text-[#5B21B6]" : "text-[#3A3547] hover:bg-[#F7F6FA]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-10">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <FilterPanel
            selected={selected}
            toggleCategory={toggleCategory}
            toggleSize={toggleSize}
            toggleColor={toggleColor}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
          />
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${
                  page === 1 ? "bg-[#1B1523] text-white" : "text-[#3A3547] hover:bg-[#F7F6FA]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          filtersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div onClick={() => setFiltersOpen(false)} className="absolute inset-0 bg-[#1B1523]/40 backdrop-blur-sm" />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
            filtersOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#ECE9F1] px-5 py-4">
            <span className="text-base font-semibold text-[#1B1523]">Filters</span>
            <button
              onClick={() => setFiltersOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F4F1FA]"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
          <div className="px-5 py-2">
            <FilterPanel
              selected={selected}
              toggleCategory={toggleCategory}
              toggleSize={toggleSize}
              toggleColor={toggleColor}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
            />
          </div>
          <div className="sticky bottom-0 border-t border-[#ECE9F1] bg-white px-5 py-4">
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full rounded-full bg-[#1B1523] py-3 text-sm font-semibold text-white"
            >
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;