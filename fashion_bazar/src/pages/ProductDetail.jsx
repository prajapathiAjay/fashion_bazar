import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SmartImage from "../components/SmartImage";
import ReviewModal from "../components/ReviewModal";
import { PHOTOS, unsplash } from "../assets/images";
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
import { getPrices } from "../utils/productPrice";
import { swatchFor } from "../utils/colorSwatch";
import { useGetProductsByIdQuery, useGetProductsQuery } from "../lib/api/productApi";
import { useGetCategoryQuery } from "../lib/api/categoryApi";
import { useAddToCartMutation } from "../lib/api/cartApi";
import { useAddToWishlistMutation, useDeleteFromWishListMutation } from "../lib/api/wishlistApi";
import { useIsWishlist } from "../hooks/isWishList";
import { useAddReviewMutation,useGetReviewQuery } from "../lib/api/reviewApi";

const SIZE_GUIDE = [
  { size: "XS", bust: "80", waist: "62", hip: "88" },
  { size: "S", bust: "84", waist: "66", hip: "92" },
  { size: "M", bust: "88", waist: "70", hip: "96" },
  { size: "L", bust: "94", waist: "76", hip: "102" },
  { size: "XL", bust: "100", waist: "82", hip: "108" },
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

function Gallery({ discount,images }) {
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
        {images?.map((image, i) => (
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
            <SmartImage src={image} alt="" />
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
          src={images?.[activeImage]}
          alt={`Product image ${activeImage + 1}`}
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
          {images?.map((image, i) => (
            <div key={i} className="aspect-[4/5] w-full shrink-0 snap-center">
              <SmartImage
                src={image}
                alt={`Product image ${i + 1}`}
                fetchPriority={i === 0 ? "high" : undefined}
              />
            </div>
          ))}
        </div>
        {badges}
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {activeImage + 1}/{images?.length ?? 0}
        </span>
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {images?.map((_, i) => (
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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);
  const [cartError, setCartError] = useState("");
  const [copied, setCopied] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const { productId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const { data: product, isLoading, error } = useGetProductsByIdQuery(productId);
  const { data: reviews } = useGetReviewQuery(productId);
  const { data: categories } = useGetCategoryQuery();
  // "You might also like": other products from the same categories
  const { data: relatedData } = useGetProductsQuery(
    { categoryId: product?.categories?.join(","), exclude: productId, limit: 4 },
    { skip: !product }
  );
  const related = relatedData?.items ?? [];

  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [deleteFromWishList] = useDeleteFromWishListMutation();
  const [addReview] = useAddReviewMutation();
  // true when this product is in the shopper's saved wishlist
  const { isWishlisted: wishlisted, wishlistItemId } = useIsWishlist(productId);

  // Prices, stock and the chosen options all come from the product itself
  const { sale: price, original: originalPrice, discount } = getPrices(product);
  const stock = product?.stock ?? 0;
  const size = selectedSize || product?.sizes?.[0] || "";
  const color = selectedColor || product?.colors?.[0] || "";
  const category = categories?.find((c) => c.slug !== "all" && product?.categories?.includes(c._id));

  // Review summary
  const list = reviews ?? [];
  const reviewCount = list.length;
  const avgRating = reviewCount
    ? list.reduce((sum, r) => sum + r.rating, 0) / reviewCount
    : 0;
  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: list.filter((r) => r.rating === stars).length,
  }));
  const recommendPct = reviewCount
    ? Math.round((list.filter((r) => r.rating >= 4).length / reviewCount) * 100)
    : 0;

  // The bag, wishlist and reviews belong to an account
  const requireLogin = () => {
    if (token) return true;
    navigate("/login");
    return false;
  };

  // Returns true when the product was added
  const addCurrentToBag = async () => {
    setCartError("");
    try {
      await addToCart({ productID: product._id, quantity: qty, size: size || undefined }).unwrap();
      return true;
    } catch (err) {
      const message = err?.data?.message ?? (typeof err?.data === "string" ? err.data : "");
      setCartError(message || "Could not add this to your bag. Please try again.");
      return false;
    }
  };

  const handleAddToBag = async () => {
    if (!requireLogin()) return;
    if (await addCurrentToBag()) {
      setAddedToBag(true);
      setTimeout(() => setAddedToBag(false), 2000);
    }
  };

  const handleBuyNow = async () => {
    if (!requireLogin()) return;
    if (await addCurrentToBag()) navigate("/checkout");
  };

  const handleWishlist = () => {
    if (!requireLogin()) return;
    if (wishlisted) deleteFromWishList(wishlistItemId);
    else addToWishlist(product._id);
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // the share sheet was closed, nothing to do
    }
  };

  // Errors are thrown on purpose: the review form catches them and shows the message
  const handleSubmitReview = async (review) => {
    if (!token) throw new Error("Please log in to write a review.");
    await addReview(review).unwrap();
  };

  if (isLoading) {
    return <p className="mx-auto max-w-7xl px-4 py-24 text-center text-sm text-muted">Loading product…</p>;
  }
  if (error || !product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center">
        <p className="text-xl font-bold text-ink">We couldn't find this product</p>
        <p className="mt-2 text-sm text-muted">It may have sold out or been removed.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-ink-hover"
        >
          Back to the shop
        </Link>
      </div>
    );
  }

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
            {category && (
              <>
                <li><Link to={`/categories/${category.slug}`} className="hover:text-brand">{category.categoryName}</Link></li>
                <li aria-hidden="true"><ChevronRight size={12} /></li>
              </>
            )}
            <li aria-current="page" className="max-w-[60vw] truncate font-medium text-ink-soft">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12 xl:gap-16">
          {/* ---------------- Gallery (sticky on desktop) ---------------- */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Gallery discount={discount} images={product?.images} />
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
                   {product?.brand} <BadgeCheck size={15} className="shrink-0 text-brand" aria-label="Verified seller" />
                  </p>
                  <p className="text-xs text-subtle">Verified seller on Fashion Bazar</p>
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
              <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{product?.name}</h1>
              <button
                type="button"
                onClick={handleShare}
                aria-label={copied ? "Link copied" : "Share product"}
                className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-brand-50 hover:text-brand"
              >
                {copied ? <Check size={17} className="text-success" /> : <Share2 size={17} />}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a href="#reviews" className="flex items-center gap-1.5 rounded-full text-sm text-ink hover:text-brand">
                <Stars value={avgRating} />
                <span className="font-bold">{avgRating.toFixed(1)}</span>
                <span className="text-subtle underline-offset-4 hover:underline">({reviewCount} {reviewCount === 1 ? "review" : "reviews"})</span>
              </a>
              {stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {stock <= 5 ? `Only ${stock} left` : "In stock"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-danger-50 px-2.5 py-1 text-xs font-semibold text-danger">
                  <span className="h-1.5 w-1.5 rounded-full bg-danger" /> Out of stock
                </span>
              )}
            </div>

            {/* Price block */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl bg-gradient-to-r from-pop-50 via-white to-sun-50 p-4">
              <span className="font-display text-3xl font-extrabold text-ink">{formatPrice(price)}</span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-faint line-through">{formatPrice(originalPrice)}</span>
                  <span className="rounded-full bg-pop px-2.5 py-1 text-xs font-bold text-white">
                    Save {discount}%
                  </span>
                </>
              )}
              <span className="w-full text-xs text-muted">Inclusive of all taxes · or 4 payments of {formatPrice(price / 4)}</span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-[15px]">
             {product?.description}
            </p>

            {/* Colour */}
            {product.colors?.length > 0 && (
              <fieldset className="mt-7">
                <legend className="text-sm font-bold text-ink">
                  Colour <span className="font-normal capitalize text-subtle">— {color}</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colors.map((name) => (
                    <button
                      type="button"
                      key={name}
                      onClick={() => setSelectedColor(name)}
                      aria-label={name}
                      aria-pressed={color === name}
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full ring-offset-2 transition-all ${
                        color === name ? "ring-2 ring-ink" : "ring-1 ring-line hover:ring-line-hover"
                      }`}
                      style={{ backgroundColor: swatchFor(name) }}
                    >
                      {color === name && <Check size={16} strokeWidth={3} className="text-white mix-blend-difference" />}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Size */}
            <fieldset className={`mt-6 ${product.sizes?.length ? "" : "hidden"}`}>
              <div className="flex items-center justify-between">
                <legend className="text-sm font-bold text-ink">
                  Size <span className="font-normal text-subtle">— {size}</span>
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
                {product.sizes?.map((option) => {
                  const active = size === option;
                  return (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setSelectedSize(option)}
                      aria-pressed={active}
                      className={`relative h-12 rounded-2xl border text-sm font-semibold transition-all sm:min-w-14 sm:px-4 ${
                        active
                          ? "border-ink bg-ink text-white shadow-md"
                          : "border-line-strong text-ink-soft hover:border-line-hover hover:bg-mist"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted">Not sure? Open the size guide to compare measurements.</p>

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
                          className={`border-t border-line ${row.size === size ? "bg-brand-50 font-semibold text-brand" : "text-ink-soft"}`}
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
                disabled={adding}
                className={`flex h-12 min-w-[10rem] flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold text-white shadow-[0_10px_24px_rgba(124,58,237,0.25)] transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                  addedToBag ? "bg-success" : "bg-brand-gradient"
                }`}
              >
                {addLabel}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
                  wishlisted ? "border-pop/30 bg-pop-50" : "border-line-strong hover:border-pop/40 hover:bg-pop-50"
                }`}
              >
                <Heart size={19} className={wishlisted ? "fill-pop text-pop" : "text-ink"} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={adding}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-ink text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-60"
            >
              Buy now <ArrowRight size={16} />
            </button>

            {cartError && (
              <p role="alert" className="mt-3 rounded-2xl bg-danger-50 px-4 py-3 text-sm font-semibold text-danger">
                {cartError}
              </p>
            )}

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
                  {product.summary && <li>{product.summary}</li>}
                  {product.brand && <li>Brand: {product.brand}</li>}
                  {product.sizes?.length > 0 && <li>Sizes: {product.sizes.join(", ")}</li>}
                  {product.colors?.length > 0 && <li className="capitalize">Colours: {product.colors.join(", ")}</li>}
                </ul>
              </Accordion>
              <Accordion title="Care" icon={Leaf} tone="bg-mint-50 text-success">
                Follow the care label on the garment. Most pieces last longest when washed cold and
                hung to dry.
              </Accordion>
              <Accordion title="Shipping & returns" icon={Truck} tone="bg-sky-50 text-info">
                Ships in 1-2 business days. Free standard shipping on orders over ₹999. Returns
                accepted within 30 days, unworn with tags attached.
              </Accordion>
              {product.brand && (
                <Accordion title={`Seller — ${product.brand}`} icon={Store} tone="bg-pop-50 text-pop-dark">
                  Sold by {product.brand}, a verified seller on Fashion Bazar.
                </Accordion>
              )}
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
              onClick={() => setReviewOpen(true)}
              className="inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm font-semibold text-ink transition-colors hover:bg-mist"
            >
              Write a review
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:gap-10">
            {/* Summary */}
            <div className="rounded-3xl bg-gradient-to-br from-brand-50 via-white to-sun-50 p-6 lg:self-start">
              <div className="flex items-end gap-3">
                <span className="font-display text-5xl font-extrabold text-ink">{avgRating.toFixed(1)}</span>
                <div className="pb-1.5">
                  <Stars value={avgRating} size={16} />
                  <p className="mt-1 text-xs text-muted">{reviewCount} {reviewCount === 1 ? "review" : "reviews"}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {breakdown.map(({ stars, count }) => {
                  const pct = Math.round((reviewCount ? count / reviewCount : 0) * 100);
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
              {reviewCount > 0 && (
                <p className="mt-5 flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 text-xs font-semibold text-ink">
                  <ThumbsUp size={14} className="text-mint" /> {recommendPct}% would recommend
                </p>
              )}
            </div>

            {/* Cards */}
            {reviews?.length === 0 && (
              <p className="rounded-3xl border border-dashed border-line-strong p-8 text-center text-sm text-muted">
                No reviews yet. Be the first to write one!
              </p>
            )}
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {reviews?.map((r) => {
                const name =
                  `${r.user?.firstName ?? ""} ${r.user?.lastName ?? ""}`.trim() || "Shopper";
                const date = new Date(r.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                return (
                <li key={r._id} className="flex flex-col rounded-3xl border border-line bg-white p-5 transition-shadow hover:shadow-[0_14px_36px_rgba(27,21,35,0.08)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand">
                      {name[0].toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 text-sm font-bold text-ink">
                        {name}
                        <BadgeCheck size={14} className="text-mint" aria-label="Verified buyer" />
                      </p>
                      <p className="text-[11px] text-subtle">{date}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Stars value={r.rating} size={13} />
                    <span className="sr-only">{r.rating} out of 5 stars</span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-ink">{r.title}</p>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{r.comment}</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand"
                  >
                    <ThumbsUp size={13} /> Helpful ({r.helpful ?? 0})
                  </button>
                </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ---------------- Related ---------------- */}
        {related.length > 0 && (
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
              <Link
                to={category ? `/categories/${category.slug}` : "/products"}
                className="hidden items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark sm:inline-flex"
              >
                Shop all <ArrowRight size={15} />
              </Link>
            </div>
            <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 md:grid-cols-4 [&::-webkit-scrollbar]:hidden">
              {related.map((item) => (
                <Link
                  key={item._id}
                  to={`/products/${item._id}`}
                  className="group w-[62%] shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(27,21,35,0.09)] sm:w-auto"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <SmartImage
                      src={item.images?.[0]}
                      alt={item.name}
                      bg="var(--color-shimmer)"
                      imgClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-3.5 py-3">
                    {item.brand && (
                      <p className="text-[11px] font-medium uppercase tracking-wide text-subtle">{item.brand}</p>
                    )}
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="mt-1 text-sm font-bold text-ink">{formatPrice(getPrices(item).sale)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ---------------- Mobile sticky add-to-bag ---------------- */}
      <div className="fixed inset-x-0 bottom-16 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(27,21,35,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0">
            <p className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-ink">{formatPrice(price)}</span>
              {discount > 0 && (
                <span className="text-xs text-faint line-through">{formatPrice(originalPrice)}</span>
              )}
            </p>
            <p className="truncate text-[11px] text-subtle">
              {[color, size && `Size ${size}`].filter(Boolean).join(" · ") || product.name}
            </p>
          </div>
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong"
          >
            <Heart size={18} className={wishlisted ? "fill-pop text-pop" : "text-ink"} />
          </button>
          <button
            type="button"
            onClick={handleAddToBag}
            disabled={adding}
            className={`flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold text-white active:scale-[0.98] ${
              addedToBag ? "bg-success" : "bg-brand-gradient"
            }`}
          >
            {addLabel}
          </button>
        </div>
      </div>

      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        product={product}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}

export default ProductDetail;
