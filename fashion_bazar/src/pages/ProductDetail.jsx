import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import { PHOTOS, unsplash, unsplashZoom } from "../assets/images";

import {
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Check,
  BadgeCheck,
  Store,
  MapPin,
  Ruler,
  Share2,
  Leaf,
  Zap,
  ShoppingBag,
  ThumbsUp,
  Package,
  ArrowRight,
} from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

// Main shot plus close-up crops of the same photo
const IMAGES = [
  { src: unsplash(PHOTOS.floralDress, 900, 1125), thumb: unsplash(PHOTOS.floralDress, 160, 160), bg: "#D9D2F0" },
  { src: unsplashZoom(PHOTOS.floralDress, 0.4, 0.3, 1.8, 900, 1125), thumb: unsplashZoom(PHOTOS.floralDress, 0.4, 0.3, 1.8, 160, 160), bg: "#C9BEE8" },
  { src: unsplashZoom(PHOTOS.floralDress, 0.5, 0.75, 1.6, 900, 1125), thumb: unsplashZoom(PHOTOS.floralDress, 0.5, 0.75, 1.6, 160, 160), bg: "#B5A6DE" },
  { src: unsplashZoom(PHOTOS.floralDress, 0.3, 0.5, 2.4, 900, 1125), thumb: unsplashZoom(PHOTOS.floralDress, 0.3, 0.5, 2.4, 160, 160), bg: "#E0D6F2" },
];
const SIZES = ["XS", "S", "M", "L", "XL"];
const LOW_STOCK = ["XL"];
const COLORS = [
  { name: "Violet", hex: "#6D4C74" },
  { name: "Black", hex: "#1C1714" },
  { name: "Sage", hex: "#9CAE98" },
];

const SIZE_GUIDE = [
  { size: "XS", bust: "80", waist: "62", hip: "88" },
  { size: "S", bust: "84", waist: "66", hip: "92" },
  { size: "M", bust: "88", waist: "70", hip: "96" },
  { size: "L", bust: "94", waist: "76", hip: "102" },
  { size: "XL", bust: "100", waist: "82", hip: "108" },
];

const RELATED = [
  { id: "p2", name: "Satin bomber jacket", seller: "Halden & Co.", price: 3199, bg: "#F0997B", photo: PHOTOS.bomberJacket },
  { id: "p5", name: "Crochet knit poncho", seller: "Amara Studio", price: 1999, bg: "#C9DDF0", photo: PHOTOS.knitTop },
  { id: "p7", name: "Striped wide-leg trousers", seller: "Halden & Co.", price: 2899, bg: "#CFE3D6", photo: PHOTOS.wideLegTrousers },
  { id: "p3", name: "Woven tote bag", seller: "Bazar Leather", price: 1799, bg: "#EAD7E6", photo: PHOTOS.wovenTote },
];

const RATING = 4.8;
const REVIEW_COUNT = 126;
const BREAKDOWN = [
  { stars: 5, count: 98 },
  { stars: 4, count: 18 },
  { stars: 3, count: 6 },
  { stars: 2, count: 2 },
  { stars: 1, count: 2 },
];
const REVIEWS = [
  {
    name: "Priya M.",
    photo: PHOTOS.womanPlaid,
    rating: 5,
    date: "2 weeks ago",
    size: "M",
    title: "Floaty, flattering and so soft",
    body: "The drape at the waist is gorgeous and the linen blend doesn't crease as much as I feared. Wore it to a wedding and got so many compliments.",
    helpful: 24,
  },
  {
    name: "Sofia R.",
    photo: PHOTOS.womanCoat,
    rating: 5,
    date: "1 month ago",
    size: "S",
    title: "Runs true to size",
    body: "Ordered my usual S and it fits perfectly. The violet is richer in person. Shipping was quick and the packaging was plastic-free.",
    helpful: 17,
  },
  {
    name: "Hannah K.",
    photo: PHOTOS.shopper,
    rating: 4,
    date: "1 month ago",
    size: "L",
    title: "Lovely, slightly long",
    body: "Beautiful quality for the price. It hits a little below mid-calf on me (I'm 5'3\") so I had it taken up an inch — worth it.",
    helpful: 9,
  },
];

const TRUST = [
  { icon: Truck, label: "Free shipping", sub: "On orders ₹999+", chip: "bg-brand-50 text-brand" },
  { icon: RotateCcw, label: "30-day returns", sub: "Free & easy", chip: "bg-pop-50 text-pop-dark" },
  { icon: ShieldCheck, label: "Secure checkout", sub: "Buyer protection", chip: "bg-mint-50 text-success" },
  { icon: Leaf, label: "Small-batch", sub: "Made to last", chip: "bg-sun-50 text-ink" },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

function Stars({ value, size = 14 }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= Math.round(value) ? "fill-sun text-sun" : "fill-line text-line"}
        />
      ))}
    </span>
  );
}

function Accordion({ title, icon: Icon, tone, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 py-4 text-left"
      >
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}>
          <Icon size={17} />
        </span>
        <span className="flex-1 text-sm font-bold text-ink">{title}</span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mist text-subtle">
          <ChevronDown size={15} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && <div className="pb-5 pl-12 text-sm leading-relaxed text-muted">{children}</div>}
    </div>
  );
}

function Gallery({ discount }) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoom, setZoom] = useState(null); // {x, y} while hovering on desktop
  const scrollerRef = useRef(null);

  const onScroll = (e) => {
    const el = e.currentTarget;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== activeImage) setActiveImage(i);
  };
  const goTo = (i) => {
    setActiveImage(i);
    const el = scrollerRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const badges = (
    <div className="pointer-events-none absolute left-4 top-4 flex flex-col items-start gap-2">
      <span className="rounded-full bg-mint px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
        New
      </span>
      {discount > 0 && (
        <span className="-rotate-3 rounded-full bg-pop px-3 py-1 text-xs font-bold text-white shadow-md">
          -{discount}%
        </span>
      )}
    </div>
  );

  return (
    <div className="lg:flex lg:gap-4">
      {/* Desktop vertical thumbnails */}
      <div className="hidden shrink-0 flex-col gap-3 lg:flex" role="tablist" aria-label="Product images">
        {IMAGES.map((image, i) => (
          <button
            type="button"
            key={i}
            role="tab"
            aria-selected={activeImage === i}
            onClick={() => setActiveImage(i)}
            onMouseEnter={() => setActiveImage(i)}
            aria-label={`View image ${i + 1}`}
            className={`h-24 w-20 overflow-hidden rounded-2xl border-2 transition-all ${
              activeImage === i ? "border-brand shadow-md" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <SmartImage src={image.thumb} alt="" bg={image.bg} />
          </button>
        ))}
      </div>

      {/* Desktop main image with hover zoom */}
      <div
        className="relative hidden aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden rounded-3xl lg:block"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
      >
        <SmartImage
          key={activeImage}
          src={IMAGES[activeImage].src}
          alt={`Draped midi dress — view ${activeImage + 1}`}
          bg={IMAGES[activeImage].bg}
          fetchPriority="high"
          imgClassName={`transition-transform duration-300 ease-out ${zoom ? "scale-[1.8]" : "scale-100"}`}
          style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        {badges}
        {!zoom && (
          <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur">
            Hover to zoom
          </span>
        )}
      </div>

      {/* Mobile swipeable gallery */}
      <div className="relative -mx-4 sm:mx-0 lg:hidden">
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] sm:rounded-3xl [&::-webkit-scrollbar]:hidden"
          aria-label="Product images, swipe to browse"
        >
          {IMAGES.map((image, i) => (
            <div key={i} className="aspect-[4/5] w-full shrink-0 snap-center">
              <SmartImage
                src={image.src}
                alt={`Draped midi dress — view ${i + 1}`}
                bg={image.bg}
                fetchPriority={i === 0 ? "high" : undefined}
              />
            </div>
          ))}
        </div>
        {badges}
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {activeImage + 1}/{IMAGES.length}
        </span>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {IMAGES.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-2 rounded-full transition-all ${activeImage === i ? "w-6 bg-white" : "w-2 bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DeliveryCard() {
  const [pincode, setPincode] = useState("");
  const [eta, setEta] = useState(null);
  const valid = /^\d{5,6}$/.test(pincode);

  const check = (e) => {
    e.preventDefault();
    if (!valid) return;
    const d = new Date();
    d.setDate(d.getDate() + 4);
    setEta(d.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" }));
  };

  return (
    <div className="rounded-3xl border border-line bg-snow p-4 sm:p-5">
      <p className="flex items-center gap-2 text-sm font-bold text-ink">
        <MapPin size={16} className="text-pop" /> Check delivery
      </p>
      <form onSubmit={check} className="mt-3 flex gap-2">
        <label htmlFor="pincode" className="sr-only">
          Postcode
        </label>
        <input
          id="pincode"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={6}
          placeholder="Enter postcode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            setEta(null);
          }}
          className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-white px-4 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <button
          type="submit"
          disabled={!valid}
          className="h-11 shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-hover disabled:opacity-40"
        >
          Check
        </button>
      </form>
      <div aria-live="polite" className="mt-3 space-y-2 text-xs text-muted">
        {eta ? (
          <p className="flex items-center gap-2 rounded-xl bg-success-50 px-3 py-2 font-semibold text-success">
            <Check size={14} /> Arrives by {eta} · Free delivery
          </p>
        ) : (
          <p className="flex items-center gap-2">
            <Truck size={14} className="text-brand" /> Usually ships in 1–2 business days
          </p>
        )}
        <p className="flex items-center gap-2">
          <Zap size={14} className="text-sun-dark" /> Order in the next 3 hrs for same-day dispatch
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Violet");
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const price = 2499;
  const originalPrice = 3299;
  const discount = Math.round(100 - (price / originalPrice) * 100);

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const addLabel = addedToBag ? (
    <>
      <Check size={17} strokeWidth={2.5} />
      Added to bag
    </>
  ) : (
    <>
      <ShoppingBag size={17} />
      Add to bag
    </>
  );

  return (
    <div className="overflow-x-clip pb-36 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 lg:mb-7">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-subtle">
            <li><Link to="/" className="hover:text-brand">Home</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li><Link to="/products" className="hover:text-brand">Shop</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li><Link to="/categories/women" className="hover:text-brand">Women</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li aria-current="page" className="font-medium text-ink-soft">Draped midi dress</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
          {/* ---------------- Gallery (sticky on desktop) ---------------- */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Gallery discount={discount} />
          </div>

          {/* ---------------- Info ---------------- */}
          <div className="min-w-0">
            {/* Seller row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-100">
                  <SmartImage src={unsplash(PHOTOS.storefront, 80, 80)} alt="" bg="var(--color-brand-50)" />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 truncate text-sm font-bold text-ink">
                    Amara Studio <BadgeCheck size={15} className="shrink-0 text-brand" aria-label="Verified seller" />
                  </p>
                  <p className="text-xs text-subtle">4.9 seller rating · 2.1k sales</p>
                </div>
              </div>
              <Link
                to="/products"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-50 hover:text-brand"
              >
                <Store size={14} /> Visit stall
              </Link>
            </div>

            <div className="mt-5 flex items-start justify-between gap-3">
              <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">Draped midi dress</h1>
              <button
                type="button"
                aria-label="Share product"
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-brand-50 hover:text-brand"
              >
                <Share2 size={17} />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a href="#reviews" className="flex items-center gap-1.5 rounded-full text-sm text-ink hover:text-brand">
                <Stars value={RATING} />
                <span className="font-bold">{RATING}</span>
                <span className="text-subtle underline-offset-4 hover:underline">({REVIEW_COUNT} reviews)</span>
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> In stock
              </span>
            </div>

            {/* Price block */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-gradient-to-r from-pop-50 via-white to-sun-50 p-4">
              <span className="font-display text-3xl font-extrabold text-ink">{formatPrice(price)}</span>
              <span className="text-lg text-faint line-through">{formatPrice(originalPrice)}</span>
              <span className="rounded-full bg-pop px-2.5 py-1 text-xs font-bold text-white">
                Save {formatPrice(originalPrice - price)} · {discount}% off
              </span>
              <span className="w-full text-xs text-muted">Inclusive of all taxes · or 4 payments of {formatPrice(price / 4)}</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-[15px]">
              A flowing midi dress with soft draping at the waist, cut from a
              breathable cotton-linen blend. Made by an independent studio on
              the bazar, small-batch and limited in run.
            </p>

            {/* Colour */}
            <fieldset className="mt-7">
              <legend className="text-sm font-bold text-ink">
                Colour <span className="font-normal text-subtle">— {selectedColor}</span>
              </legend>
              <div className="mt-3 flex gap-3">
                {COLORS.map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={color.name}
                    aria-pressed={selectedColor === color.name}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full ring-offset-2 transition-all ${
                      selectedColor === color.name ? "ring-2 ring-ink" : "ring-1 ring-line hover:ring-line-hover"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.name && <Check size={16} strokeWidth={3} className="text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Size */}
            <fieldset className="mt-6">
              <div className="flex items-center justify-between">
                <legend className="text-sm font-bold text-ink">
                  Size <span className="font-normal text-subtle">— {selectedSize}</span>
                </legend>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen((v) => !v)}
                  aria-expanded={sizeGuideOpen}
                  className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold text-brand hover:text-brand-dark"
                >
                  <Ruler size={14} /> Size guide
                </button>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2 sm:flex sm:flex-wrap">
                {SIZES.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={active}
                      className={`relative h-12 rounded-2xl border text-sm font-semibold transition-all sm:min-w-14 sm:px-4 ${
                        active
                          ? "border-ink bg-ink text-white shadow-md"
                          : "border-line-strong text-ink-soft hover:border-line-hover hover:bg-mist"
                      }`}
                    >
                      {size}
                      {LOW_STOCK.includes(size) && (
                        <span className="absolute -right-1 -top-1.5 rounded-full bg-sun px-1.5 py-0.5 text-[9px] font-bold text-ink">
                          Low
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted">Fits true to size · Model is 5'8" wearing S</p>

              {sizeGuideOpen && (
                <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full text-left text-xs">
                    <caption className="sr-only">Size guide in centimetres</caption>
                    <thead className="bg-mist text-subtle">
                      <tr>
                        {["Size", "Bust", "Waist", "Hip"].map((h) => (
                          <th key={h} scope="col" className="px-3 py-2 font-semibold">{h}{h !== "Size" && " (cm)"}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_GUIDE.map((row) => (
                        <tr
                          key={row.size}
                          className={`border-t border-line ${row.size === selectedSize ? "bg-brand-50 font-semibold text-brand" : "text-ink-soft"}`}
                        >
                          <th scope="row" className="px-3 py-2">{row.size}</th>
                          <td className="px-3 py-2">{row.bust}</td>
                          <td className="px-3 py-2">{row.waist}</td>
                          <td className="px-3 py-2">{row.hip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </fieldset>

            {/* Quantity + actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded-full border border-line-strong" role="group" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="flex h-12 w-11 items-center justify-center rounded-l-full text-ink hover:bg-mist disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-sm font-bold text-ink" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-12 w-11 items-center justify-center rounded-r-full text-ink hover:bg-mist"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToBag}
                className={`flex h-12 min-w-[10rem] flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold text-white shadow-[0_10px_24px_rgba(124,58,237,0.25)] transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                  addedToBag ? "bg-success" : "bg-brand-gradient"
                }`}
              >
                {addLabel}
              </button>

              <button
                type="button"
                onClick={() => setWishlisted((v) => !v)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
                  wishlisted ? "border-pop/30 bg-pop-50" : "border-line-strong hover:border-pop/40 hover:bg-pop-50"
                }`}
              >
                <Heart size={19} className={wishlisted ? "fill-pop text-pop" : "text-ink"} />
              </button>
            </div>

            <Link
              to="/checkout"
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-ink text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Buy now <ArrowRight size={16} />
            </Link>

            {/* Trust row */}
            <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, label, sub, chip }) => (
                <li key={label} className="flex items-center gap-2.5 rounded-2xl border border-line p-3 sm:flex-col sm:items-start">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${chip}`}>
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold text-ink">{label}</span>
                    <span className="block text-[11px] text-subtle">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <DeliveryCard />
            </div>

            {/* Accordions */}
            <div className="mt-6 rounded-3xl border border-line px-4 sm:px-5">
              <Accordion title="Product details" icon={Package} tone="bg-brand-50 text-brand" defaultOpen>
                <ul className="list-disc space-y-1 pl-4">
                  <li>Relaxed fit with soft draping at the waist</li>
                  <li>V-neckline, short flutter sleeves</li>
                  <li>Concealed side zip, midi length (approx. 118cm in M)</li>
                  <li>Style no. AMS-2291</li>
                </ul>
              </Accordion>
              <Accordion title="Materials & care" icon={Leaf} tone="bg-mint-50 text-success">
                70% cotton, 30% linen. Machine wash cold, hang dry. Iron on low
                heat if needed.
              </Accordion>
              <Accordion title="Shipping & returns" icon={Truck} tone="bg-sky-50 text-info">
                Ships in 1-2 business days from Amara Studio. Free standard
                shipping on orders over ₹999. Returns accepted within 30 days,
                unworn with tags attached.
              </Accordion>
              <Accordion title="Seller — Amara Studio" icon={Store} tone="bg-pop-50 text-pop-dark">
                Independent studio on the bazar since 2021, focused on
                small-batch, seasonless staples.
              </Accordion>
            </div>
          </div>
        </div>

        {/* ---------------- Reviews ---------------- */}
        <section id="reviews" aria-labelledby="reviews-heading" className="mt-16 scroll-mt-32 lg:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="inline-flex rounded-full bg-sun-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
                Real shoppers
              </span>
              <h2 id="reviews-heading" className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
                Reviews
              </h2>
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm font-semibold text-ink transition-colors hover:bg-mist"
            >
              Write a review
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-10">
            {/* Summary */}
            <div className="rounded-3xl bg-gradient-to-br from-brand-50 via-white to-sun-50 p-6 lg:self-start">
              <div className="flex items-end gap-3">
                <span className="font-display text-5xl font-extrabold text-ink">{RATING}</span>
                <div className="pb-1.5">
                  <Stars value={RATING} size={16} />
                  <p className="mt-1 text-xs text-muted">{REVIEW_COUNT} reviews</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {BREAKDOWN.map(({ stars, count }) => {
                  const pct = Math.round((count / REVIEW_COUNT) * 100);
                  return (
                    <li key={stars} className="flex items-center gap-3 text-xs">
                      <span className="flex w-7 items-center gap-0.5 font-semibold text-ink">
                        {stars}
                        <Star size={11} className="fill-sun text-sun" />
                      </span>
                      <span
                        className="h-2 flex-1 overflow-hidden rounded-full bg-white"
                        role="meter"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pct}
                        aria-label={`${stars} star reviews`}
                      >
                        <span className="block h-full rounded-full bg-brand-gradient" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="w-8 text-right text-subtle">{count}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold text-ink">
                <ThumbsUp size={14} className="text-mint" /> 94% would recommend
              </p>
            </div>

            {/* Cards */}
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {REVIEWS.map((r) => (
                <li key={r.name} className="flex flex-col rounded-3xl border border-line bg-white p-5 transition-shadow hover:shadow-[0_14px_36px_rgba(27,21,35,0.08)]">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <SmartImage src={unsplash(r.photo, 80, 80, "&crop=faces")} alt="" bg="var(--color-shimmer)" />
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-sm font-bold text-ink">
                        {r.name}
                        <BadgeCheck size={14} className="text-mint" aria-label="Verified buyer" />
                      </p>
                      <p className="text-[11px] text-subtle">{r.date} · Size {r.size}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Stars value={r.rating} size={13} />
                    <span className="sr-only">{r.rating} out of 5 stars</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-ink">{r.title}</p>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{r.body}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand"
                  >
                    <ThumbsUp size={13} /> Helpful ({r.helpful})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Related ---------------- */}
        <section aria-labelledby="related-heading" className="mt-16 lg:mt-24">
          <div className="flex items-end justify-between gap-3">
            <div>
              <span className="inline-flex rounded-full bg-pop-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pop-dark">
                Complete the look
              </span>
              <h2 id="related-heading" className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">
                You might also like
              </h2>
            </div>
            <Link to="/products" className="hidden items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark sm:inline-flex">
              Shop all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 md:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {RELATED.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="group w-[62%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(27,21,35,0.09)] sm:w-auto"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SmartImage
                    src={unsplash(item.photo, 480, 600)}
                    alt={item.name}
                    bg={item.bg}
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-100 shadow-sm backdrop-blur transition-all lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <Plus size={16} />
                  </span>
                </div>
                <div className="px-3.5 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-subtle">{item.seller}</p>
                  <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                  <p className="mt-1 text-sm font-bold text-ink">{formatPrice(item.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* ---------------- Mobile sticky add-to-bag ---------------- */}
      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(27,21,35,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0">
            <p className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-ink">{formatPrice(price)}</span>
              <span className="text-xs text-faint line-through">{formatPrice(originalPrice)}</span>
            </p>
            <p className="truncate text-[11px] text-subtle">
              {selectedColor} · Size {selectedSize}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setWishlisted((v) => !v)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong"
          >
            <Heart size={18} className={wishlisted ? "fill-pop text-pop" : "text-ink"} />
          </button>
          <button
            type="button"
            onClick={handleAddToBag}
            className={`flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold text-white active:scale-[0.98] ${
              addedToBag ? "bg-success" : "bg-brand-gradient"
            }`}
          >
            {addLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
