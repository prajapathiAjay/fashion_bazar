import { useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import { PHOTOS, unsplash } from "../assets/images";

import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Lock,
  Sparkles,
  PartyPopper,
  X,
  Star,
} from "lucide-react";
import { formatPrice } from "../utils/formatPrice";
import {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../lib/api/cartApi";
import { useAddToWishlistMutation } from "../lib/api/wishlistApi";

const FREE_SHIPPING_AT = 999;

const SUGGESTIONS = [
  { id: "p2", name: "Satin bomber jacket", seller: "Halden & Co.", price: 3199, rating: 4.6, bg: "var(--color-coral-50)", image: unsplash(PHOTOS.bomberJacket, 400, 500) },
  { id: "p5", name: "Crochet knit poncho", seller: "Amara Studio", price: 1999, rating: 4.5, bg: "var(--color-sky-50)", image: unsplash(PHOTOS.knitTop, 400, 500) },
  { id: "p7", name: "Striped wide-leg trousers", seller: "Halden & Co.", price: 2899, rating: 4.6, bg: "var(--color-mint-50)", image: unsplash(PHOTOS.wideLegTrousers, 400, 500) },
  { id: "p3", name: "Woven tote bag", seller: "Bazar Leather", price: 1799, rating: 4.9, bg: "var(--color-pop-50)", image: unsplash(PHOTOS.wovenTote, 400, 500) },
];

const EMPTY_CATEGORIES = [
  { label: "Women", to: "/categories/women", tone: "bg-pop-50 text-pop-dark hover:bg-pop hover:text-white" },
  { label: "Footwear", to: "/categories/footwear", tone: "bg-sun-50 text-ink hover:bg-sun" },
  { label: "Jewelry", to: "/categories/jewelry", tone: "bg-mint-50 text-ink hover:bg-mint hover:text-white" },
  { label: "Men", to: "/categories/men", tone: "bg-sky-50 text-ink hover:bg-sky hover:text-white" },
];

const money = formatPrice;

/* ---------------------------------------------------------------- */

function PaymentChips({ className = "" }) {
  const chips = [
    { label: "VISA", tone: "text-info italic tracking-tight" },
    { label: "Mastercard", tone: "text-coral" },
    { label: "UPI", tone: "text-mint" },
    { label: "PayPal", tone: "text-sky" },
    { label: "COD", tone: "text-ink-soft" },
  ];
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Accepted payment methods">
      {chips.map((c) => (
        <li
          key={c.label}
          className={`rounded-md border border-line bg-white px-2 py-1 text-[10px] font-extrabold uppercase ${c.tone}`}
        >
          {c.label}
        </li>
      ))}
    </ul>
  );
}

function FreeShippingBar({ subtotal }) {
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const unlocked = remaining === 0;
  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_AT) * 100));

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-4 sm:p-5 ${
        unlocked ? "border-mint/30 bg-mint-50" : "border-brand/15 bg-brand-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
            unlocked ? "bg-mint text-white" : "bg-white text-brand"
          }`}
        >
          {unlocked ? <PartyPopper size={18} /> : <Truck size={18} />}
        </span>
        <p className="text-sm text-ink" aria-live="polite">
          {unlocked ? (
            <>
              <span className="font-bold">Yay! You&apos;ve unlocked free shipping.</span>{" "}
              <span className="text-muted">Your bag ships on us.</span>
            </>
          ) : (
            <>
              You&apos;re <span className="font-bold text-brand">{money(remaining)}</span> away from{" "}
              <span className="font-bold">free shipping</span>
            </>
          )}
        </p>
      </div>
      <div
        className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-white"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progress towards free shipping"
      >
        <div
          className="h-full rounded-full bg-brand-gradient transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function QtyStepper({ item }) {
  const [updateCartItem] = useUpdateCartItemMutation();

  const changeQty = (delta) => {
    const next = item.quantity + delta;
    if (next < 1) return;
    updateCartItem({ id: item._id, quantity: next });
  };

  return (
    <div className="inline-flex items-center rounded-full border border-line-strong bg-white">
      <button
        type="button"
        onClick={() => changeQty(-1)}
        disabled={item.quantity <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:text-faint disabled:hover:bg-transparent"
        aria-label={`Decrease quantity of ${item.productID?.name}`}
      >
        <Minus size={14} />
      </button>
      <span className="w-7 text-center text-sm font-semibold tabular-nums text-ink" aria-live="polite">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => changeQty(1)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist"
        aria-label={`Increase quantity of ${item.productID?.name}`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

function CartItem({ item }) {
  const [addToWishlist] = useAddToWishlistMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const product = item.productID;

  return (
    <li className="group relative flex gap-4 rounded-3xl border border-line bg-white p-3.5 transition-all hover:border-line-hover hover:shadow-[0_14px_36px_rgba(26,16,51,0.06)] sm:gap-5 sm:p-4">
      <Link
        to={`/products/${product?._id}`}
        className="h-32 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-40 sm:w-32"
      >
        <SmartImage
          src={product?.images?.[0]}
          alt={product?.name}
          bg={item.bg}
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {item.seller && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">
                {item.seller}
              </p>
            )}
            <Link
              to={`/products/${product?._id}`}
              className="mt-0.5 block truncate text-[15px] font-semibold text-ink hover:text-brand sm:text-base"
            >
              {product?.name}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => deleteCartItem(item._id)}
            aria-label={`Remove ${product?.name} from bag`}
            className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-subtle transition-colors hover:bg-danger-50 hover:text-danger"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {item.size && (
            <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-ink-soft">
              Size: <span className="font-semibold text-ink">{item.size}</span>
            </span>
          )}
          {item.color && (
            <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium text-ink-soft">
              Colour: <span className="font-semibold text-ink">{item.color}</span>
            </span>
          )}
          <span className="hidden rounded-full bg-success-50 px-2.5 py-1 text-[11px] font-semibold text-success sm:inline">
            In stock
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
          <QtyStepper item={item} />
          <div className="text-right">
            <p className="text-base font-bold tabular-nums text-ink sm:text-lg">
              {money((product?.price ?? 0) * item.quantity)}
            </p>
            {product?.price && item.quantity > 1 && (
              <p className="text-[11px] text-subtle">{money(product.price)} each</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-2.5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => addToWishlist(product?._id)}
            className="inline-flex items-center gap-1.5 rounded-full py-1 text-muted transition-colors hover:text-pop"
          >
            <Heart size={13} />
            Move to wishlist
          </button>
        </div>
      </div>
    </li>
  );
}

function SummaryRow({ label, value, tone = "text-ink" }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={`font-medium tabular-nums ${tone}`}>{value}</dd>
    </div>
  );
}

function SuggestionCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex w-44 shrink-0 snap-start flex-col sm:w-auto"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <SmartImage
          src={product.image}
          alt={product.name}
          bg={product.bg}
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-2.5 right-2.5 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-ink opacity-0 shadow-md transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Plus size={16} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-wider text-subtle">
        {product.seller}
      </p>
      <p className="truncate text-sm font-semibold text-ink group-hover:text-brand">
        {product.name}
      </p>
      <div className="mt-0.5 flex items-center justify-between">
        <span className="text-sm font-bold text-ink">{money(product.price)}</span>
        <span className="inline-flex items-center gap-1 text-xs text-muted">
          <Star size={12} className="fill-sun text-sun" aria-hidden="true" />
          {product.rating}
        </span>
      </div>
    </Link>
  );
}

function YouMightAlsoLike() {
  return (
    <section aria-labelledby="also-like" className="mt-14 lg:mt-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-sun-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
            <Sparkles size={12} className="text-sun-dark" /> Picked for you
          </p>
          <h2 id="also-like" className="mt-2 text-2xl font-bold text-ink sm:text-[28px]">
            You might also like
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark sm:inline-flex"
        >
          View all <ArrowRight size={15} />
        </Link>
      </div>
      <div className="-mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-6">
        {SUGGESTIONS.map((p) => (
          <SuggestionCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function EmptyBag() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-36 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-sun-50 px-6 py-14 text-center sm:py-20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 animate-blob rounded-full bg-brand/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-blob rounded-full bg-pop/15 blur-3xl [animation-delay:-5s]" />

        <div className="relative mx-auto h-36 w-36 animate-fade-up">
          <span className="absolute inset-0 rounded-full bg-white shadow-xl shadow-brand/20" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 animate-float items-center justify-center rounded-3xl bg-brand-gradient text-white shadow-lg">
              <ShoppingBag size={34} strokeWidth={1.8} />
            </span>
          </span>
          <span className="absolute -right-1 top-3 flex h-9 w-9 animate-wiggle items-center justify-center rounded-full bg-sun text-ink shadow-md">
            <Heart size={15} className="fill-ink" />
          </span>
          <span className="absolute -left-2 bottom-5 h-4 w-4 rounded-full bg-mint" />
          <span className="absolute bottom-0 right-6 h-2.5 w-2.5 rounded-full bg-coral" />
          <span className="absolute left-4 top-1 h-2 w-2 rounded-full bg-sky" />
        </div>

        <h1 className="relative mt-8 text-3xl font-extrabold text-ink sm:text-4xl">
          Your bag is <span className="text-gradient">feeling light</span>
        </h1>
        <p className="relative mx-auto mt-3 max-w-md text-[15px] text-muted">
          Nothing here yet — browse the bazar and find something worth carrying home.
        </p>
        <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_var(--color-pop)] transition-all hover:-translate-y-0.5"
          >
            Start shopping
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/account"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-line-hover hover:bg-mist"
          >
            <Heart size={15} /> View wishlist
          </Link>
        </div>
        <nav aria-label="Shop by category" className="relative mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Or jump into</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {EMPTY_CATEGORIES.map((c) => (
              <li key={c.label}>
                <Link
                  to={c.to}
                  className={`inline-block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${c.tone}`}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <YouMightAlsoLike />
    </div>
  );
}

/* ---------------------------------------------------------------- */

function CartPage() {
  // promo code is currently disabled (PromoForm commented out), kept for the discount row
  const [appliedPromo, setAppliedPromo] = useState(null);

  const { data: cartItems = [], isLoading, isError } = useGetCartItemsQuery();

  const removePromo = () => setAppliedPromo(null);

  // all hooks are above; early returns are safe from here on
  if (isLoading) return <p className="p-6">Loading bag...</p>;
  if (isError) return <p className="p-6">Couldn&apos;t load your bag.</p>;
  if (cartItems.length === 0) return <EmptyBag />;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productID?.price ?? 0) * item.quantity,
    0
  );
  const unitCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_AT || subtotal === 0 ? 0 : 99;
  const discount = appliedPromo ? Math.round(subtotal * (appliedPromo.percent / 100)) : 0;
  const total = subtotal + shipping - discount;
  const savings = discount + (shipping === 0 ? 99 : 0);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-36 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-extrabold text-ink sm:text-4xl">
            Your bag
            <span className="rounded-full bg-pop-50 px-3 py-1 font-sans text-sm font-bold text-pop-dark">
              {unitCount} {unitCount === 1 ? "item" : "items"}
            </span>
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            From {cartItems.length} independent {cartItems.length === 1 ? "seller" : "sellers"} · items aren&apos;t reserved until checkout
          </p>
        </div>
        <Link
          to="/products"
          className="group inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-line-hover hover:bg-mist"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
          Continue shopping
        </Link>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
        {/* Items */}
        <section aria-label="Items in your bag" className="flex min-w-0 flex-col gap-4">
          <FreeShippingBar subtotal={subtotal} />
          <ul className="flex flex-col gap-3 sm:gap-4">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </ul>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: RotateCcw, title: "30-day returns", desc: "Free & easy", tone: "bg-pop-50 text-pop" },
              { icon: ShieldCheck, title: "Buyer protection", desc: "On every order", tone: "bg-mint-50 text-mint" },
              { icon: Truck, title: "Tracked delivery", desc: "From each seller", tone: "bg-sky-50 text-sky" },
            ].map(({ icon: Icon, title, desc, tone }) => (
              <div key={title} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3.5">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{title}</span>
                  <span className="block text-xs text-subtle">{desc}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <aside aria-labelledby="summary-title" className="lg:sticky lg:top-32">
          <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_20px_50px_-30px_rgba(26,16,51,0.25)] sm:p-6">
            <h2 id="summary-title" className="text-xl font-bold text-ink">
              Order summary
            </h2>

            <dl className="mt-5 flex flex-col gap-3 border-t border-dashed border-line-strong pt-5 text-sm">
              <SummaryRow label={`Subtotal (${unitCount} items)`} value={money(subtotal)} />
              <SummaryRow
                label="Shipping"
                value={shipping === 0 ? "Free" : money(shipping)}
                tone={shipping === 0 ? "text-success font-semibold" : "text-ink"}
              />
              {discount > 0 && (
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-success">
                    Discount
                    <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-[11px] font-bold">
                      {appliedPromo.code}
                      <button
                        type="button"
                        onClick={removePromo}
                        aria-label={`Remove promo code ${appliedPromo.code}`}
                        className="rounded-full hover:text-ink"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  </dt>
                  <dd className="font-semibold tabular-nums text-success">-{money(discount)}</dd>
                </div>
              )}
            </dl>

            <div className="mt-5 flex items-end justify-between border-t border-line-strong pt-4">
              <div>
                <p className="text-sm font-bold text-ink">Total</p>
                <p className="text-[11px] text-subtle">Taxes included</p>
              </div>
              <p className="text-2xl font-extrabold tabular-nums text-ink">{money(total)}</p>
            </div>

            {savings > 0 && (
              <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-success-50 px-3 py-2 text-xs font-semibold text-success">
                <Sparkles size={13} /> You&apos;re saving {money(savings)} on this order
              </p>
            )}

            <Link
              to="/checkout"
              className="group mt-5 flex items-center justify-center gap-2 rounded-full bg-brand-gradient py-4 text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_var(--color-pop)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-8px_var(--color-pop)] active:translate-y-0"
            >
              <Lock size={15} />
              Secure checkout
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="mt-5 flex flex-col items-center gap-2.5">
              <PaymentChips className="justify-center" />
              <p className="flex items-center gap-1.5 text-[11px] text-subtle">
                <ShieldCheck size={12} className="text-mint" />
                256-bit SSL encrypted · Safe & secure payments
              </p>
            </div>
          </div>

          <p className="mt-4 rounded-2xl bg-sun-50 px-4 py-3 text-xs text-ink-soft">
            <span className="font-bold text-ink">Need help?</span> Our seller support team replies 7 days a week.
          </p>
        </aside>
      </div>

      <YouMightAlsoLike />

      {/* Mobile sticky checkout bar */}
      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-10px_30px_-15px_rgba(26,16,51,0.25)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium text-subtle">
              Total · {unitCount} items
            </p>
            <p className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold tabular-nums text-ink">{money(total)}</span>
              {savings > 0 && (
                <span className="truncate text-[11px] font-semibold text-success">
                  saving {money(savings)}
                </span>
              )}
            </p>
          </div>
          <Link
            to="/checkout"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_var(--color-pop)] active:scale-[0.98]"
          >
            Checkout
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
