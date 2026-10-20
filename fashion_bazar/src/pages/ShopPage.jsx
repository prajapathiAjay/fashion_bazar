import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../features/products/productThunks";
import { useDispatch, useSelector } from "react-redux";
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  Star,
  ShoppingBag,
  LayoutGrid,
  Grid3x3,
  ArrowRight,
  Sparkles,
  Truck,
  RotateCcw,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import SmartImage from "../components/SmartImage";
import { PHOTOS, unsplash } from "../assets/images";
import { ProductGridSkeleton, ProductsEmpty } from "../components/ProductGridStatus";
import { formatPrice } from "../utils/formatPrice";
import {useGetProductsQuery} from "../lib/api/productApi";
import {useGetCategoryQuery} from "../lib/api/categoryApi";


const CATEGORIES = ["Women", "Men", "Kids", "Footwear", "Jewelry", "Accessories"];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Violet", hex: "#6D4C74" },
  { name: "Coral", hex: "#D99A80" },
  { name: "Gold", hex: "#CDAF72" },
  { name: "Pink", hex: "#C98B96" },
  { name: "Black", hex: "#1C1714" },
  { name: "Sage", hex: "#9CAE98" },
];
const SORT_OPTIONS = ["Most popular", "Newest", "Price: low to high", "Price: high to low", "Top rated"];
const PRICE_CEILING = 5000;
const PAGES = [1, 2, 3];

// Category chips shown under the page heading. `match` decides which chip is active.
const CHIPS = [
  { label: "All", to: "/products", match: (p) => p.pathname === "/products" || p.pathname === "/categories" },
  { label: "New in", to: "/new-arrivals", match: (p) => p.pathname === "/new-arrivals", dot: "bg-mint" },
  { label: "Women", to: "/categories/women", match: (p) => p.slug === "women" },
  { label: "Men", to: "/categories/men", match: (p) => p.slug === "men" },
  { label: "Kids", to: "/categories/kids", match: (p) => p.slug === "kids" },
  { label: "Footwear", to: "/categories/footwear", match: (p) => p.slug === "footwear" },
  { label: "Jewelry", to: "/categories/jewelry", match: (p) => p.slug === "jewelry" },
  { label: "Accessories", to: "/categories/accessories", match: (p) => p.slug === "accessories" },
  { label: "Sale", to: "/deals", match: (p) => p.pathname === "/deals" || p.slug === "sale", sale: true },
];

// Header band styling + copy per route
const BANDS = {
  default: {
    band: "from-brand-50 via-white to-pop-50",
    blobA: "bg-brand/20",
    blobB: "bg-pop/15",
    pill: "bg-brand-50 text-brand",
    eyebrow: "The whole bazar",
    tagline: "Hand-picked pieces from 1,200+ independent stalls — new drops every Friday.",
  },
  women: {
    band: "from-pop-50 via-white to-brand-50",
    blobA: "bg-pop/20",
    blobB: "bg-brand/15",
    pill: "bg-pop-50 text-pop-dark",
    eyebrow: "Womenswear",
    tagline: "Dresses, knits and statement layers from small-batch studios.",
  },
  men: {
    band: "from-sky-50 via-white to-brand-50",
    blobA: "bg-sky/20",
    blobB: "bg-brand/15",
    pill: "bg-sky-50 text-info",
    eyebrow: "Menswear",
    tagline: "Easy tailoring, overshirts and everyday staples that last.",
  },
  kids: {
    band: "from-sun-50 via-white to-mint-50",
    blobA: "bg-sun/30",
    blobB: "bg-mint/20",
    pill: "bg-sun-50 text-ink",
    eyebrow: "Little ones",
    tagline: "Playful, puddle-proof pieces made for running around.",
  },
  footwear: {
    band: "from-coral-50 via-white to-sun-50",
    blobA: "bg-coral/20",
    blobB: "bg-sun/25",
    pill: "bg-coral-50 text-danger",
    eyebrow: "Footwear",
    tagline: "Loafers, sneakers and sandals — every step, sorted.",
  },
  jewelry: {
    band: "from-sun-50 via-white to-pop-50",
    blobA: "bg-sun/30",
    blobB: "bg-pop/15",
    pill: "bg-sun-50 text-ink",
    eyebrow: "Jewelry",
    tagline: "Hoops, bangles and little sparkles from indie makers.",
  },
  accessories: {
    band: "from-mint-50 via-white to-sky-50",
    blobA: "bg-mint/20",
    blobB: "bg-sky/15",
    pill: "bg-mint-50 text-success",
    eyebrow: "Accessories",
    tagline: "Totes, scarves and the finishing touches.",
  },
  new: {
    band: "from-mint-50 via-white to-brand-50",
    blobA: "bg-mint/25",
    blobB: "bg-brand/15",
    pill: "bg-mint-50 text-success",
    eyebrow: "Just landed",
    tagline: "Fresh from the stalls this week — get in before they sell out.",
  },
  sale: {
    band: "from-pop-50 via-white to-sun-50",
    blobA: "bg-pop/25",
    blobB: "bg-sun/30",
    pill: "bg-pop text-white",
    eyebrow: "Bazar days",
    tagline: "Up to 50% off across the bazar. Limited stock, unlimited vibes.",
  },
  search: {
    band: "from-brand-50 via-white to-sky-50",
    blobA: "bg-brand/20",
    blobB: "bg-sky/15",
    pill: "bg-brand-50 text-brand",
    eyebrow: "Search",
    tagline: "Everything across the bazar that matches your search.",
  },
};

const PRODUCTS = [
  { id: "p1", name: "Draped midi dress", seller: "Amara Studio", price: 2499, originalPrice: 3299, rating: 4.8, bg: "#D9D2F0" },
  { id: "p2", name: "Linen shirt jacket", seller: "Halden & Co.", price: 3199, originalPrice: null, rating: 4.6, bg: "#F0997B" },
  { id: "p3", name: "Woven tote bag", seller: "Bazar Leather", price: 1799, originalPrice: 2299, rating: 4.9, bg: "#EAD7E6" },
  { id: "p4", name: "Suede loafers", seller: "Marchetti", price: 3899, originalPrice: null, rating: 4.7, bg: "#F7DFA8" },
  { id: "p5", name: "Ribbed knit vest", seller: "Amara Studio", price: 1999, originalPrice: 2699, rating: 4.5, bg: "#C9DDF0" },
  { id: "p6", name: "Gold hoop earrings", seller: "Luna Jewels", price: 1199, originalPrice: null, rating: 4.9, bg: "#F0C4C4" },
  { id: "p7", name: "Wide-leg trousers", seller: "Halden & Co.", price: 2899, originalPrice: null, rating: 4.6, bg: "#CFE3D6" },
  { id: "p8", name: "Structured tote", seller: "Bazar Leather", price: 3499, originalPrice: 4399, rating: 4.8, bg: "#E6D5C3" },
  { id: "p9", name: "Silk scarf", seller: "Luna Jewels", price: 1499, originalPrice: null, rating: 4.4, bg: "#EAD7E6" },
  { id: "p10", name: "Denim overshirt", seller: "Marchetti", price: 2999, originalPrice: 3699, rating: 4.7, bg: "#C9DDF0" },
  { id: "p11", name: "Pleated skirt", seller: "Amara Studio", price: 2299, originalPrice: null, rating: 4.5, bg: "#F0997B" },
  { id: "p12", name: "Leather sandals", seller: "Marchetti", price: 2699, originalPrice: null, rating: 4.6, bg: "#F7DFA8" },
];

/* ------------------------------------------------------------------ */
/* Filters                                                              */
/* ------------------------------------------------------------------ */

function FilterSection({ title, hint, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line py-5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-lg text-left"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-ink">
          {title}
          {hint ? (
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand">{hint}</span>
          ) : null}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-subtle">
          <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function FilterPanel({ selected, toggleCategory, toggleSize, toggleColor, priceMax, setPriceMax, idPrefix }) {
  return (
    <div>
      {/* <FilterSection title="Category" hint={selected.categories.length || null}>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const checked = selected.categories.includes(cat);
            return (
              <label
                key={cat}
                className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors ${
                  checked ? "bg-brand-50 font-semibold text-brand" : "text-ink-soft hover:bg-mist"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat)}
                  className="h-4 w-4 rounded border-line-hover accent-brand"
                />
                {cat}
              </label>
            );
          })}
        </div>
      </FilterSection> */}

      <FilterSection title="Price">
        <div>
          <label htmlFor={`${idPrefix}-price`} className="sr-only">
            Maximum price
          </label>
          <input
            id={`${idPrefix}-price`}
            type="range"
            min="0"
            max={PRICE_CEILING}
            step="100"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-brand"
          />
          <div className="mt-3 flex items-center gap-2">
            <span className="flex-1 rounded-xl border border-line bg-snow px-3 py-2 text-xs text-subtle">
              Min <span className="block text-sm font-semibold text-ink">₹0</span>
            </span>
            <span className="text-faint">—</span>
            <span className="flex-1 rounded-xl border border-brand/30 bg-brand-50 px-3 py-2 text-xs text-brand">
              Max{" "}
              <span className="block text-sm font-semibold text-ink">
                {formatPrice(priceMax)}
                {priceMax === PRICE_CEILING ? "+" : ""}
              </span>
            </span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Size" hint={selected.sizes.length || null}>
        <div className="grid grid-cols-5 gap-2">
          {SIZES.map((size) => {
            const active = selected.sizes.includes(size);
            return (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                aria-pressed={active}
                className={`h-10 rounded-xl border text-xs font-semibold transition-all ${
                  active
                    ? "border-ink bg-ink text-white shadow-md"
                    : "border-line-strong bg-white text-ink-soft hover:border-line-hover hover:bg-mist"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Colour" hint={selected.colors.length || null}>
        <div className="grid grid-cols-3 gap-2">
          {COLORS.map((color) => {
            const active = selected.colors.includes(color.name);
            return (
              <button
                type="button"
                key={color.name}
                onClick={() => toggleColor(color.name)}
                aria-pressed={active}
                className={`flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2 text-[11px] font-medium transition-colors ${
                  active ? "border-ink bg-mist text-ink" : "border-transparent text-muted hover:bg-mist"
                }`}
              >
                <span
                  className="relative flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-line ring-offset-2"
                  style={{ backgroundColor: color.hex }}
                >
                  {active && <Check size={14} className="text-white drop-shadow" strokeWidth={3} />}
                </span>
                {color.name}
              </button>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bits                                                                 */
/* ------------------------------------------------------------------ */

function SortMenu({ sort, setSort }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-line-hover hover:bg-mist"
      >
        <span className="hidden text-subtle sm:inline">Sort:</span>
        <span className="max-w-[9rem] truncate sm:max-w-none">{sort}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Sort products"
          className="absolute right-0 top-full z-30 mt-2 w-60 animate-fade-up rounded-2xl border border-line bg-white p-1.5 shadow-[0_18px_48px_rgba(27,21,35,0.14)] [animation-duration:200ms]"
        >
          {SORT_OPTIONS.map((opt) => (
            <button
              type="button"
              role="option"
              aria-selected={opt === sort}
              key={opt}
              onClick={() => {
                setSort(opt);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                opt === sort ? "bg-brand-50 font-semibold text-brand" : "text-ink-soft hover:bg-mist"
              }`}
            >
              {opt}
              {opt === sort && <Check size={15} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ children, onRemove, label, swatch }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand/20 bg-brand-50 py-1 pl-3 pr-1 text-xs font-semibold text-brand">
      {swatch && (
        <span className="h-3 w-3 rounded-full ring-1 ring-white" style={{ backgroundColor: swatch }} />
      )}
      {children}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="flex h-6 w-6 items-center justify-center rounded-full transition-colors hover:bg-brand hover:text-white"
      >
        <X size={12} strokeWidth={2.5} />
      </button>
    </span>
  );
}

// Colourful tile that sits inside the product grid
function PromoTile() {
  return (
    <Link
      to="/deals"
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-4 text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(27,21,35,0.18)] sm:p-5"
    >
      <SmartImage
        src={unsplash(PHOTOS.shopper, 480, 600)}
        alt=""
        bg="var(--color-ink)"
        className="absolute inset-0"
        imgClassName="transition-transform duration-700 group-hover:scale-110"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
      <span className="absolute right-3 top-3 flex h-14 w-14 rotate-12 animate-wiggle flex-col items-center justify-center rounded-full bg-sun text-center font-display text-[11px] font-extrabold leading-none text-ink shadow-lg sm:h-16 sm:w-16">
        UP TO
        <span className="text-lg sm:text-xl">50%</span>
      </span>
      <span className="relative">
        <span className="inline-flex items-center gap-1 rounded-full bg-pop px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
          <Sparkles size={11} /> Bazar days
        </span>
        <span className="mt-2 block font-display text-lg font-extrabold leading-tight sm:text-2xl">
          Deals worth the detour
        </span>
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-sun sm:text-sm">
          Shop the sale
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

function ShopPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState(SORT_OPTIONS[0]);
  const [priceMax, setPriceMax] = useState(PRICE_CEILING);
  const [selected, setSelected] = useState({ categories: [], sizes: [], colors: [] });
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(1);

// const dispatch = useDispatch();
// const {products,loading,error}=useSelector((state)=>state.products)
const {data:products, isLoading:loading, error}=useGetProductsQuery()
const {data:categories}=useGetCategoryQuery()
console.log("products",products,loading,error)
//   useEffect(()=>{
//     console.log("dispatching fetchProducts")
//   dispatch(fetchProducts())

// },[])
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
  const clearAll = () => {
    setSelected({ categories: [], sizes: [], colors: [] });
    setPriceMax(PRICE_CEILING);
  };

  const priceActive = priceMax < PRICE_CEILING;
  const activeFilterCount =
    selected.categories.length + selected.sizes.length + selected.colors.length + (priceActive ? 1 : 0);

  // Lock page scroll + close on Escape while the mobile drawer is open
  useEffect(() => {
    if (!filtersOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setFiltersOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen]);

  // Heading follows the route: /categories/women, /new-arrivals, /deals, ?q=search
  const { pathname } = useLocation();
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const pageTitle = searchQuery
    ? `Results for “${searchQuery}”`
    : pathname === "/new-arrivals"
    ? "New arrivals"
    : pathname === "/deals"
    ? "Bazar deals"
    : categorySlug
    ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " ")
    : "Shop the bazar";

  const bandKey = searchQuery
    ? "search"
    : pathname === "/new-arrivals"
    ? "new"
    : pathname === "/deals" || categorySlug === "sale"
    ? "sale"
    : categorySlug && BANDS[categorySlug]
    ? categorySlug
    : "default";
  const band = BANDS[bandKey];
  const chipCtx = { pathname, slug: categorySlug };

  const itemCount = products?.length ?? 0;
  const filterProps = { selected, toggleCategory, toggleSize, toggleColor, priceMax, setPriceMax };

  const gridCols = dense
    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
    : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";

  return (
    <div className="overflow-x-clip">
      {/* ---------------- Header band ---------------- */}
      <section className={`relative overflow-hidden border-b border-line bg-gradient-to-br ${band.band}`}>
        <div className={`pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-blob rounded-full blur-3xl ${band.blobA}`} />
        <div className={`pointer-events-none absolute -right-16 top-0 h-64 w-64 animate-blob rounded-full blur-3xl [animation-delay:-5s] ${band.blobB}`} />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--color-ink) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-5 pt-6 sm:px-6 lg:px-8 lg:pb-6 lg:pt-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-subtle">
              <li>
                <Link to="/" className="rounded hover:text-brand">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight size={12} /></li>
              <li>
                <Link to="/products" className="rounded hover:text-brand">Shop</Link>
              </li>
              {pageTitle !== "Shop the bazar" && (
                <>
                  <li aria-hidden="true"><ChevronRight size={12} /></li>
                  <li aria-current="page" className="max-w-[60vw] truncate font-medium text-ink-soft">
                    {pageTitle}
                  </li>
                </>
              )}
            </ol>
          </nav>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 animate-fade-up">
              <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${band.pill}`}>
                {band.eyebrow}
              </span>
              <h1 className="mt-3 break-words text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
                {pageTitle}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">{band.tagline}</p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/80 px-3 py-1.5 text-ink shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-mint" />
                {loading ? "Loading…" : `${itemCount} items`}
              </span>
              <span className="hidden items-center gap-1.5 rounded-full border border-line bg-white/80 px-3 py-1.5 text-ink-soft shadow-sm backdrop-blur sm:inline-flex">
                <Truck size={13} className="text-brand" /> Free shipping ₹999+
              </span>
              <span className="hidden items-center gap-1.5 rounded-full border border-line bg-white/80 px-3 py-1.5 text-ink-soft shadow-sm backdrop-blur lg:inline-flex">
                <RotateCcw size={13} className="text-pop" /> 30-day returns
              </span>
            </div>
          </div>

          {/* Category chips */}
          <nav aria-label="Shop categories" className="mt-6">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
              {categories?.map((chip) => {
                // const active = chip?.match(chipCtx) && !searchQuery;
                return (
                  <li key={chip?.categoryName} className="shrink-0">
                    <Link
                      to={`${chip?.slug}`}
                      // aria-current={active ? "page" : undefined}
                      // className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-all ${
                      //   active
                      //     ? chip?.sale
                      //       ? "border-transparent bg-pop text-white shadow-md"
                      //       : "border-transparent bg-ink text-white shadow-md"
                      //     : chip?.sale
                      //     ? "border-pop/30 bg-white text-pop-dark hover:-translate-y-0.5 hover:bg-pop-50"
                      //     : "border-line bg-white/90 text-ink-soft hover:-translate-y-0.5 hover:border-line-hover hover:text-ink"
                      // }`}
                    >
                      {chip?.dot && <span className={`h-2 w-2 rounded-full ${chip?.dot}`} />}
                      {chip?.sale && <Sparkles size={14} />}
                      {chip?.categoryName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* ---------------- Toolbar ---------------- */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-mist lg:hidden"
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gradient px-1 text-[11px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <p className="hidden text-sm text-muted lg:block">
            Showing <span className="font-semibold text-ink">{loading ? "…" : itemCount}</span> pieces
          </p>

          <div className="ml-auto flex items-center gap-2">
            <div
              role="group"
              aria-label="Grid density"
              className="hidden items-center rounded-full border border-line-strong bg-white p-1 sm:flex"
            >
              <button
                type="button"
                onClick={() => setDense(false)}
                aria-pressed={!dense}
                aria-label="Comfortable grid"
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  !dense ? "bg-ink text-white" : "text-subtle hover:text-ink"
                }`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                type="button"
                onClick={() => setDense(true)}
                aria-pressed={dense}
                aria-label="Compact grid"
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  dense ? "bg-ink text-white" : "text-subtle hover:text-ink"
                }`}
              >
                <Grid3x3 size={15} />
              </button>
            </div>
            <SortMenu sort={sort} setSort={setSort} />
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex w-full items-center gap-2 overflow-x-auto pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap">
              {selected.categories.map((c) => (
                <FilterChip key={`c-${c}`} label={c} onRemove={() => toggleCategory(c)}>
                  {c}
                </FilterChip>
              ))}
              {selected.sizes.map((s) => (
                <FilterChip key={`s-${s}`} label={`size ${s}`} onRemove={() => toggleSize(s)}>
                  Size {s}
                </FilterChip>
              ))}
              {selected.colors.map((c) => (
                <FilterChip
                  key={`col-${c}`}
                  label={c}
                  swatch={COLORS.find((x) => x.name === c)?.hex}
                  onRemove={() => toggleColor(c)}
                >
                  {c}
                </FilterChip>
              ))}
              {priceActive && (
                <FilterChip label="price limit" onRemove={() => setPriceMax(PRICE_CEILING)}>
                  Under {formatPrice(priceMax)}
                </FilterChip>
              )}
              <button
                type="button"
                onClick={clearAll}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-pop-dark underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-8 xl:gap-10">
          {/* ---------------- Desktop sidebar ---------------- */}
          <aside aria-label="Filters" className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto rounded-3xl border border-line bg-white p-5 [scrollbar-width:thin]">
              <div className="mb-1 flex items-center justify-between">
                <p className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <SlidersHorizontal size={16} className="text-brand" />
                  Filters
                </p>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs font-bold text-pop-dark hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <FilterPanel {...filterProps} idPrefix="desktop" />

              <div className="mt-2 rounded-2xl bg-sun-50 p-4">
                <p className="flex items-center gap-1.5 text-sm font-bold text-ink">
                  <Star size={14} className="fill-sun text-sun" /> Top-rated stalls
                </p>
                <p className="mt-1 text-xs text-muted">
                  Every seller is reviewed by real shoppers. Look for the gold star.
                </p>
              </div>
            </div>
          </aside>

          {/* ---------------- Grid ---------------- */}
          <div className="min-w-0 flex-1">
            <div className={`grid gap-x-4 gap-y-10 sm:gap-x-5 ${gridCols}`}>
              {loading ? (
                <ProductGridSkeleton count={8} />
              ) : products?.length ? (
                products.flatMap((product, i) => {
                  const card = <ProductCard key={product?.id} product={product} />;
                  return i === 2 ? [card, <PromoTile key="promo-tile" />] : [card];
                })
              ) : (
                <ProductsEmpty error={error} />
              )}
            </div>

            {/* Bottom banner */}
            {!loading && itemCount > 0 && (
              <div className="mt-10 flex flex-col items-start gap-4 overflow-hidden rounded-3xl bg-brand-gradient p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 animate-float items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                    <Heart size={22} className="fill-white" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-extrabold">Can't decide?</p>
                    <p className="text-sm text-white/80">Heart your faves and we'll ping you when they drop in price.</p>
                  </div>
                </div>
                <Link
                  to="/new-arrivals"
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingBag size={16} /> See new drops
                </Link>
              </div>
            )}

            {/* Pagination */}
            {!loading && itemCount > 0 && (
              <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-10 items-center gap-1 rounded-full border border-line-strong px-3 text-sm font-semibold text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                {PAGES.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPage(p)}
                    aria-current={p === page ? "page" : undefined}
                    aria-label={`Page ${p}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      p === page ? "bg-ink text-white shadow-md" : "text-ink-soft hover:bg-mist"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(PAGES.length, p + 1))}
                  disabled={page === PAGES.length}
                  className="flex h-10 items-center gap-1 rounded-full border border-line-strong px-3 text-sm font-semibold text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- Mobile filter drawer ---------------- */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          filtersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!filtersOpen}
      >
        <div onClick={() => setFiltersOpen(false)} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            filtersOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <p className="font-display text-lg font-bold text-ink">Filters</p>
              <p className="text-xs text-subtle">
                {activeFilterCount ? `${activeFilterCount} selected` : "Refine your finds"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-ink hover:bg-brand-50"
              aria-label="Close filters"
              tabIndex={filtersOpen ? 0 : -1}
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-1">
            {filtersOpen && <FilterPanel {...filterProps} idPrefix="mobile" />}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-line bg-white px-5 py-4">
            <button
              type="button"
              onClick={clearAll}
              disabled={activeFilterCount === 0}
              className="h-12 rounded-full border border-line-strong px-5 text-sm font-semibold text-ink disabled:opacity-40"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="h-12 rounded-full bg-brand-gradient text-sm font-bold text-white shadow-md active:scale-[0.98]"
            >
              Show {loading ? "" : itemCount} results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
