import { useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import {
  ChevronLeft,
  ChevronDown,
  Lock,
  Truck,
  Zap,
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  Mail,
  Phone,
  User,
  MapPin,
  Package,
  PackageCheck,
  Home,
  ShieldCheck,
  Tag,
  ArrowRight,
  Loader2,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "../utils/formatPrice";
import { useGetCartItemsQuery } from "../lib/api/cartApi";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../lib/api/userApi";

/* ------------------------------------------------------------------ */

// TODO: replace with the order number returned by your order API
const ORDER_NUMBER = "#BZ-10521";

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on delivery", hint: "Pay when it arrives", icon: Banknote, tone: "bg-sun-50 text-sun-dark", available: true },
  { id: "upi", label: "UPI", hint: "GPay, PhonePe & more", icon: Smartphone, tone: "bg-mint-50 text-mint", available: false },
  { id: "card", label: "Card", hint: "Credit or debit", icon: CreditCard, tone: "bg-brand-50 text-brand", available: false },
];

const money = formatPrice;

/* ---------------------------------------------------------------- */

function Section({ icon: Icon, tone = "bg-brand-50 text-brand", title, subtitle, action, children }) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${tone}`}>
            <Icon size={18} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-ink">{title}</h2>
            {subtitle && <p className="text-xs text-subtle">{subtitle}</p>}
          </div>
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-4 text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_var(--color-pop)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-8px_var(--color-pop)] active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-[0_12px_30px_-8px_var(--color-pop)] ${className}`}
    >
      {children}
    </button>
  );
}

function SummaryItems({ items }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {items?.map((item) => {
        const meta = [item.productID?.seller, item.size && `Size ${item.size}`]
          .filter(Boolean)
          .join(" · ");
        return (
          <li key={item._id || item.id} className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="h-16 w-13 overflow-hidden rounded-xl border border-line">
                <SmartImage
                  src={item?.productID?.images?.[0]}
                  alt={item?.productID?.name || ""}
                  bg={item.bg}
                />
              </div>
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{item?.productID?.name}</p>
              {meta && <p className="truncate text-[11px] text-subtle">{meta}</p>}
            </div>
            <p className="text-sm font-semibold tabular-nums text-ink">
              {money((item.productID?.price || 0) * item.quantity)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function SummaryTotals({ subtotal, shipping, total }) {
  return (
    <>
      <dl className="mt-5 flex flex-col gap-2.5 border-t border-dashed border-line-strong pt-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Subtotal</dt>
          <dd className="font-medium tabular-nums text-ink">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd className={`font-medium tabular-nums ${shipping === 0 ? "font-semibold text-success" : "text-ink"}`}>
            {shipping === 0 ? "Free" : money(shipping)}
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex items-end justify-between border-t border-line-strong pt-4">
        <div>
          <p className="text-sm font-bold text-ink">Total</p>
          <p className="text-[11px] text-subtle">INR · taxes included</p>
        </div>
        <p className="text-2xl font-extrabold tabular-nums text-ink">{money(total)}</p>
      </div>
    </>
  );
}

function PromoHint() {
  return (
    <p className="mt-4 flex items-center gap-2 rounded-2xl border border-dashed border-pop/30 bg-pop-50 px-3.5 py-2.5 text-xs text-ink-soft">
      <Tag size={14} className="shrink-0 text-pop" />
      <span>
        Have a promo code? Add <span className="font-bold text-ink">BAZAR10</span> in your{" "}
        <Link to="/cart" className="font-semibold text-pop-dark underline-offset-2 hover:underline">
          bag
        </Link>
        .
      </span>
    </p>
  );
}

function SecurityNote() {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-2xl bg-mint-50 p-3.5">
      <ShieldCheck size={18} className="mt-0.5 shrink-0 text-mint" />
      <p className="text-xs text-ink-soft">
        <span className="font-bold text-ink">Secure checkout.</span> Every order is covered by Bazar
        buyer protection.
      </p>
    </div>
  );
}

function SuccessScreen({ total, shipMethod, email, itemCount }) {
  const timeline = [
    { label: "Ordered", icon: Check, done: true },
    { label: "Packed", icon: Package, done: false },
    { label: "Shipped", icon: Truck, done: false },
    { label: "Delivered", icon: Home, done: false },
  ];
  const confetti = [
    "left-[8%] top-[12%] h-3 w-3 bg-sun",
    "left-[18%] top-[40%] h-2 w-2 bg-pop",
    "left-[6%] top-[70%] h-2.5 w-2.5 rotate-45 rounded-sm bg-mint",
    "right-[10%] top-[16%] h-2.5 w-2.5 rotate-12 rounded-sm bg-brand",
    "right-[20%] top-[46%] h-3 w-3 bg-coral",
    "right-[7%] top-[72%] h-2 w-2 bg-sky",
    "left-[30%] top-[8%] h-1.5 w-1.5 bg-brand",
    "right-[32%] top-[6%] h-2 w-2 bg-mint",
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-6 lg:pt-14">
      <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-brand-50 via-white to-sun-50 px-5 py-12 text-center sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-blob rounded-full bg-brand/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 animate-blob rounded-full bg-pop/20 blur-3xl [animation-delay:-5s]" />
        {confetti.map((c) => (
          <span key={c} aria-hidden="true" className={`pointer-events-none absolute animate-float rounded-full ${c}`} />
        ))}

        <div className="relative animate-fade-up">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_16px_40px_-10px_var(--color-pop)]">
            <Check size={38} strokeWidth={3} />
          </span>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm">
            Order <span className="text-brand">{ORDER_NUMBER}</span>
          </p>
          <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-[42px] sm:leading-tight">
            Yay, it&apos;s <span className="text-gradient">on its way!</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-muted">
            Confirmation sent to{" "}
            <span className="font-semibold text-ink">{email || "your email"}</span>. Your{" "}
            {itemCount} {itemCount === 1 ? "item is" : "items are"} being packed with care.
          </p>

          <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-3 text-left">
            <div className="rounded-2xl border border-line bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Arriving in</p>
              <p className="mt-1 text-base font-bold text-ink">
                {shipMethod === "express" ? "1-2" : "4-6"} business days
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Pay on delivery</p>
              <p className="mt-1 text-base font-bold tabular-nums text-ink">{money(total)}</p>
            </div>
          </div>

          <ol className="relative mx-auto mt-8 flex max-w-md items-start justify-between" aria-label="Order status">
            <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-5 h-1 rounded-full bg-shimmer">
              <span className="block h-full w-[8%] rounded-full bg-brand-gradient" />
            </span>
            {timeline.map(({ label, icon: Icon, done }) => (
              <li key={label} className="relative z-10 flex flex-1 flex-col items-center">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ring-4 ring-white ${
                    done ? "bg-brand-gradient text-white" : "bg-white text-subtle"
                  }`}
                >
                  <Icon size={16} />
                </span>
                <span className={`mt-2 text-xs font-semibold ${done ? "text-ink" : "text-subtle"}`}>{label}</span>
              </li>
            ))}
          </ol>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/account"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-line-hover hover:bg-mist"
            >
              <PackageCheck size={16} /> View your orders
            </Link>
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_var(--color-pop)] transition-all hover:-translate-y-0.5"
            >
              Keep shopping
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function CheckoutPage() {
  const [shipMethod, setShipMethod] = useState("standard");
  const [payMethod, setPayMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  /* ---- data from API ---- */
  const { data: cartItems } = useGetCartItemsQuery();
  const { data: userData } = useGetUserByIdQuery();
  const [updateUser, { isLoading: savingDefault }] = useUpdateUserMutation();

  const user = userData?.user;
  const addresses = user?.addresses ?? [];
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  // null until the user picks one -> the default address is used automatically.
  // Picking here only affects this order, it does not change the saved default.
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const selectedAddress =
    addresses.find((a) => a._id === selectedAddressId) || defaultAddress;

  // Marks one address as the saved default (same approach as the account page)
  const setDefaultAddress = async (id) => {
    const next = addresses.map((a) => ({ ...a, isDefault: a._id === id }));
    try {
      await updateUser({ addresses: next }).unwrap();
      setSelectedAddressId(id); // also use it for this order
    } catch (err) {
      console.error(err);
    }
  };

  /* ---- totals ---- */
  const subtotal =
    cartItems?.reduce((sum, i) => sum + (i.productID?.price || 0) * i.quantity, 0) || 0;
  const shipping = shipMethod === "express" ? 199 : subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const unitCount = cartItems?.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const lineCount = cartItems?.length || 0;

  const canPlace =
    Boolean(selectedAddress) && lineCount > 0 && payMethod === "cod" && !placing;

  const placeOrder = () => {
    if (!canPlace) return;
    setPlacing(true);
    // TODO: replace with your real order API call, e.g.
    // await createOrder({ address: selectedAddress, shipMethod, payMethod }).unwrap();
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      window.scrollTo({ top: 0 });
    }, 1200);
  };

  if (placed) {
    return (
      <SuccessScreen
        total={total}
        shipMethod={shipMethod}
        email={user?.email}
        itemCount={unitCount}
      />
    );
  }

  const shipOptions = [
    {
      id: "standard",
      label: "Standard",
      eta: "4-6 business days",
      price: subtotal >= 999 ? "Free" : money(99),
      icon: Truck,
      tone: "bg-sky-50 text-sky",
    },
    {
      id: "express",
      label: "Express",
      eta: "1-2 business days",
      price: money(199),
      icon: Zap,
      tone: "bg-sun-50 text-sun-dark",
      badge: "Fastest",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/cart"
          className="group inline-flex items-center gap-1 rounded-full py-1 text-sm font-semibold text-muted transition-colors hover:text-ink"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to bag
        </Link>
        <p className="inline-flex items-center gap-1.5 rounded-full bg-mint-50 px-3 py-1.5 text-xs font-semibold text-ink">
          <Lock size={12} className="text-mint" /> Secure checkout
        </p>
      </div>

      <div className="mt-5">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">Checkout</h1>
        <p className="mt-1 text-sm text-muted">
          {unitCount} {unitCount === 1 ? "item" : "items"} · one smooth checkout
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-10">
        {/* Totals box — right on desktop, on top on mobile */}
        <aside aria-labelledby="price-details" className="lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
          <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_20px_50px_-30px_rgba(26,16,51,0.25)] sm:p-6">
            <h2 id="price-details" className="text-xl font-bold text-ink">
              Price details
            </h2>
            <SummaryTotals subtotal={subtotal} shipping={shipping} total={total} />
            <PromoHint />
            <SecurityNote />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-5 lg:col-start-1 lg:row-start-1">
          {/* 1. Order summary dropdown */}
          <section className="overflow-hidden rounded-3xl border border-line bg-white">
            <button
              type="button"
              onClick={() => setSummaryOpen((o) => !o)}
              aria-expanded={summaryOpen}
              aria-controls="order-items"
              className="flex w-full items-center justify-between gap-3 p-5 text-left sm:p-6"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                  <ShoppingBag size={18} />
                </span>
                <span>
                  <span className="block text-lg font-bold text-ink">Order summary</span>
                  <span className="block text-xs text-subtle">
                    {lineCount} {lineCount === 1 ? "item" : "items"} · {summaryOpen ? "Hide" : "Show"} details
                  </span>
                </span>
              </span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-muted transition-transform ${summaryOpen ? "rotate-180" : ""}`}
              />
            </button>
            {summaryOpen && (
              <div id="order-items" className="border-t border-line p-5 sm:p-6">
                <SummaryItems items={cartItems} />
                <div className="mt-4 text-right">
                  <Link to="/cart" className="text-xs font-semibold text-brand hover:text-brand-dark">
                    Edit bag
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* 2. Account details + addresses */}
          <Section
            icon={MapPin}
            title="Delivery address"
            subtitle="Choose where we should deliver"
            action={
              <Link
                to="/account?tab=addresses"
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-50"
              >
                <Plus size={12} /> Add new
              </Link>
            }
          >
            {/* User details */}
            <div className="rounded-2xl bg-mist p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Your details</p>
              <ul className="mt-2.5 flex flex-col gap-2 text-sm text-ink">
                <li className="flex items-center gap-2.5">
                  <User size={14} className="shrink-0 text-brand" />
                  <span className="font-semibold">
                    {[user?.firstName, user?.lastName].filter(Boolean).join(" ")}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={14} className="shrink-0 text-brand" />
                  <span className="break-all">{user?.email}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={14} className="shrink-0 text-brand" />
                  <span>{user?.phone}</span>
                </li>
              </ul>
            </div>

            {/* Saved addresses */}
            {addresses.length === 0 ? (
              <p className="mt-4 rounded-2xl bg-mist p-4 text-sm text-muted">
                No saved addresses yet. Add one to continue.
              </p>
            ) : (
              <fieldset className="mt-4">
                <legend className="sr-only">Delivery address</legend>
                <div className="flex flex-col gap-3">
                  {addresses.map((a) => {
                    const selected = a._id === selectedAddress?._id;
                    return (
                      <label
                        key={a._id}
                        htmlFor={`addr-${a._id}`}
                        className={`relative flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-all has-focus-visible:ring-4 has-focus-visible:ring-brand/20 ${
                          selected
                            ? "border-brand bg-brand-50/60"
                            : "border-line hover:border-line-hover"
                        }`}
                      >
                        <input
                          id={`addr-${a._id}`}
                          type="radio"
                          name="address"
                          value={a._id}
                          checked={a?.isDefault}
                          onChange={() => setDefaultAddress(a._id)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            selected
                              ? "border-brand bg-brand text-white"
                              : "border-line-strong bg-white"
                          }`}
                        >
                          {selected && <Check size={11} strokeWidth={3.5} />}
                        </span>
                        <span className="min-w-0 flex-1 text-sm">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-ink">
                              {a.name || [user?.firstName, user?.lastName].filter(Boolean).join(" ")}
                            </span>
                            <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-soft">
                              {a.tag}
                            </span>
                            {a.isDefault && (
                              <span className="rounded-full bg-mint-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mint">
                                Default
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block text-muted">
                            {[a.line1, a.line2, a.city, a.state, a.pinCode]
                              .filter(Boolean)
                              .join(", ")}
                          </span>

                          {/* Set as default */}
                          {!a.isDefault && (
                            <button
                              type="button"
                              disabled={savingDefault}
                              onClick={(e) => {
                                // button is inside a <label>: don't trigger the radio
                                e.preventDefault();
                                e.stopPropagation();
                                setDefaultAddress(a._id);
                              }}
                              className="mt-2 inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1 text-[11px] font-semibold text-ink-soft transition-colors hover:border-line-hover hover:bg-mist disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {savingDefault ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                <Check size={12} />
                              )}
                              Set as Current Delivery address
                            </button>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}
          </Section>

          {/* 3. Delivery method */}
          <Section icon={Truck} title="Delivery method" subtitle="Each seller ships separately" tone="bg-sky-50 text-sky">
            <fieldset>
              <legend className="sr-only">Delivery method</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {shipOptions.map((opt) => {
                  const selected = shipMethod === opt.id;
                  const Icon = opt.icon;
                  return (
                    <label
                      key={opt.id}
                      htmlFor={`ship-${opt.id}`}
                      className={`relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-all has-focus-visible:ring-4 has-focus-visible:ring-brand/20 ${
                        selected
                          ? "border-brand bg-brand-50/60"
                          : "border-line hover:-translate-y-0.5 hover:border-line-hover"
                      }`}
                    >
                      <input
                        id={`ship-${opt.id}`}
                        type="radio"
                        name="ship"
                        value={opt.id}
                        checked={selected}
                        onChange={() => setShipMethod(opt.id)}
                        className="sr-only"
                      />
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${opt.tone}`}>
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 text-sm font-bold text-ink">
                          {opt.label}
                          {opt.badge && (
                            <span className="rounded-full bg-pop px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                              {opt.badge}
                            </span>
                          )}
                        </span>
                        <span className="block text-xs text-subtle">{opt.eta}</span>
                      </span>
                      <span className="text-sm font-bold text-ink">{opt.price}</span>
                      <span
                        aria-hidden="true"
                        className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white ring-2 ring-white transition-transform ${
                          selected ? "scale-100" : "scale-0"
                        }`}
                      >
                        <Check size={13} strokeWidth={3} />
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Section>

          {/* 4. Payment method */}
          <Section icon={CreditCard} title="Payment" subtitle="Choose how you'd like to pay">
            <fieldset>
              <legend className="sr-only">Payment method</legend>
              <div className="flex flex-col gap-3">
                {PAYMENT_METHODS.map((m) => {
                  const selected = payMethod === m.id;
                  const Icon = m.icon;
                  return (
                    <label
                      key={m.id}
                      htmlFor={`pay-${m.id}`}
                      className={`relative flex items-center gap-3 rounded-2xl border-2 p-4 transition-all has-focus-visible:ring-4 has-focus-visible:ring-brand/20 ${
                        !m.available
                          ? "cursor-not-allowed border-line bg-mist/60"
                          : selected
                            ? "cursor-pointer border-brand bg-brand-50/60"
                            : "cursor-pointer border-line hover:border-line-hover"
                      }`}
                    >
                      <input
                        id={`pay-${m.id}`}
                        type="radio"
                        name="payMethod"
                        value={m.id}
                        checked={selected}
                        disabled={!m.available}
                        onChange={() => m.available && setPayMethod(m.id)}
                        className="sr-only"
                      />
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${m.tone} ${
                          m.available ? "" : "opacity-50"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <span className={`min-w-0 flex-1 ${m.available ? "" : "opacity-60"}`}>
                        <span className="block text-sm font-bold text-ink">{m.label}</span>
                        <span className="block text-xs text-subtle">{m.hint}</span>
                      </span>
                      {m.available ? (
                        <span
                          aria-hidden="true"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            selected ? "border-brand bg-brand text-white" : "border-line-strong bg-white"
                          }`}
                        >
                          {selected && <Check size={11} strokeWidth={3.5} />}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-sun-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sun-dark">
                          Coming soon
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {payMethod === "cod" && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-mist p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sun-50 text-sun-dark">
                  <Banknote size={18} />
                </span>
                <div className="text-sm text-ink-soft">
                  <p className="font-bold text-ink">Pay {money(total)} when your order arrives</p>
                  <p className="mt-1 text-xs text-muted">
                    Cash or UPI accepted at the door. Please keep the exact amount handy — each seller&apos;s
                    parcel is collected separately.
                  </p>
                </div>
              </div>
            )}
          </Section>

          {/* 5. Place order */}
          <button>
            <PrimaryButton type="button" onClick={placeOrder} disabled={!canPlace} className="w-full">
              {placing ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> Placing order...
                </>
              ) : (
                <>
                  <Lock size={15} /> Place order — {money(total)}
                </>
              )}
            </PrimaryButton>
            {!selectedAddress && (
              <p className="mt-2 text-center text-xs font-medium text-pop-dark">
                Select a delivery address to place your order.
              </p>
            )}
            <p className="mt-3 text-center text-[11px] text-subtle">
              By placing your order you agree to Fashion Bazar&apos;s terms and returns policy.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
