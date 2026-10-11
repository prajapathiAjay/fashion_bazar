import { useState } from "react";
import { Link } from "react-router-dom";
import SmartImage from "../components/SmartImage";
import { PHOTOS, unsplash } from "../assets/images";

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
  MapPin,
  Package,
  PackageCheck,
  Home,
  ShieldCheck,
  Tag,
  ArrowRight,
  Pencil,
  Loader2,
  ShoppingBag,
} from "lucide-react";

const ORDER_ITEMS = [
  { id: "p1", name: "Draped midi dress", seller: "Amara Studio", price: 48, qty: 1, size: "M", bg: "#D9D2F0", image: unsplash(PHOTOS.floralDress, 120, 150) },
  { id: "p4", name: "Suede loafers", seller: "Marchetti", price: 74, qty: 1, size: "8", bg: "#F7DFA8", image: unsplash(PHOTOS.leatherShoes, 120, 150) },
  { id: "p6", name: "Gold hoop earrings", seller: "Luna Jewels", price: 22, qty: 2, size: "One size", bg: "#F0C4C4", image: unsplash(PHOTOS.goldHoops, 120, 150) },
];

const STEPS = ["Shipping", "Payment", "Review"];
const ORDER_NUMBER = "#BZ-10521";

const PAYMENT_METHODS = [
  { id: "card", label: "Card", hint: "Credit or debit", icon: CreditCard, tone: "bg-brand-50 text-brand" },
  { id: "upi", label: "UPI", hint: "GPay, PhonePe & more", icon: Smartphone, tone: "bg-mint-50 text-mint" },
  { id: "cod", label: "Cash on delivery", hint: "Pay when it arrives", icon: Banknote, tone: "bg-sun-50 text-sun-dark" },
];

const money = (n) => `$${n.toFixed(2)}`;

const inputClass =
  "w-full rounded-xl border border-line-strong bg-white px-3.5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint hover:border-line-hover focus:border-brand/50 focus:ring-4 focus:ring-brand/10";

/* ---------------------------------------------------------------- */

function StepIndicator({ current, onJump }) {
  const pct = ((current - 1) / (STEPS.length - 1)) * 100;
  return (
    <nav aria-label="Checkout progress" className="w-full">
      <ol className="relative flex items-start justify-between">
        {/* track */}
        <span
          aria-hidden="true"
          className="absolute left-[16.66%] right-[16.66%] top-4 h-1 rounded-full bg-shimmer"
        >
          <span
            className="block h-full rounded-full bg-brand-gradient transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </span>
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === current;
          const isDone = stepNum < current;
          const circle = (
            <span
              className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ring-4 ring-white transition-all ${
                isDone
                  ? "bg-brand-gradient text-white group-hover:scale-110"
                  : isActive
                  ? "bg-ink text-white shadow-lg shadow-brand/30"
                  : "border-2 border-line-strong bg-white text-subtle"
              }`}
            >
              {isDone ? <Check size={16} strokeWidth={3} /> : stepNum}
            </span>
          );
          const text = (
            <span
              className={`mt-2 text-xs font-semibold sm:text-sm ${
                isActive ? "text-ink" : isDone ? "text-brand" : "text-subtle"
              }`}
            >
              {label}
            </span>
          );
          return (
            <li key={label} className="flex flex-1 flex-col items-center">
              {isDone ? (
                <button
                  type="button"
                  onClick={() => onJump(stepNum)}
                  className="group flex flex-col items-center rounded-xl"
                  aria-label={`${label} — completed, go back to edit`}
                >
                  {circle}
                  {text}
                </button>
              ) : (
                <span className="flex flex-col items-center" aria-current={isActive ? "step" : undefined}>
                  {circle}
                  {text}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

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

function Field({ id, label, className = "", hint, ...inputProps }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-ink-soft">
        {label}
      </label>
      <input id={id} name={id} className={inputClass} aria-describedby={hint ? `${id}-hint` : undefined} {...inputProps} />
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[11px] text-subtle">
          {hint}
        </p>
      )}
    </div>
  );
}

function EditLink({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand-50"
    >
      <Pencil size={12} /> Edit
    </button>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-4 text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_var(--color-pop)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-8px_var(--color-pop)] active:translate-y-0 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70 ${className}`}
    >
      {children}
    </button>
  );
}

function BackButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line-strong bg-white px-6 py-4 text-sm font-semibold text-ink transition-colors hover:border-line-hover hover:bg-mist"
    >
      <ChevronLeft size={16} /> Back
    </button>
  );
}

function SummaryItems({ compact = false }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {ORDER_ITEMS.map((item) => (
        <li key={item.id} className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className={`overflow-hidden rounded-xl border border-line ${compact ? "h-14 w-11" : "h-16 w-13"}`}>
              <SmartImage src={item.image} alt={item.name} bg={item.bg} />
            </div>
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {item.qty}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
            <p className="truncate text-[11px] text-subtle">
              {item.seller} · Size {item.size}
            </p>
          </div>
          <p className="text-sm font-semibold tabular-nums text-ink">{money(item.price * item.qty)}</p>
        </li>
      ))}
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
          <p className="text-[11px] text-subtle">USD · taxes included</p>
        </div>
        <p className="text-2xl font-extrabold tabular-nums text-ink">{money(total)}</p>
      </div>
    </>
  );
}

function SecurityNote() {
  return (
    <div className="mt-5 flex items-start gap-3 rounded-2xl bg-mint-50 p-3.5">
      <ShieldCheck size={18} className="mt-0.5 shrink-0 text-mint" />
      <p className="text-xs text-ink-soft">
        <span className="font-bold text-ink">Secure checkout.</span> Payments are encrypted and
        every order is covered by Bazar buyer protection.
      </p>
    </div>
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

function SuccessScreen({ total, shipMethod, email }) {
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
    <div className="mx-auto max-w-3xl px-5 pb-36 pt-10 sm:px-6 lg:pb-16 lg:pt-14">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-sun-50 px-5 py-12 text-center sm:px-10 sm:py-16">
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
            <span className="font-semibold text-ink">{email || "your email"}</span>. Your order from{" "}
            {ORDER_ITEMS.length} sellers is being packed with care.
          </p>

          <div className="mx-auto mt-7 grid max-w-md grid-cols-2 gap-3 text-left">
            <div className="rounded-2xl border border-line bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Arriving in</p>
              <p className="mt-1 text-base font-bold text-ink">
                {shipMethod === "express" ? "1-2" : "4-6"} business days
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Order total</p>
              <p className="mt-1 text-base font-bold tabular-nums text-ink">{money(total)}</p>
            </div>
          </div>

          {/* timeline */}
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
                <span className={`mt-2 text-xs font-semibold ${done ? "text-ink" : "text-subtle"}`}>
                  {label}
                </span>
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
  const [step, setStep] = useState(1);
  const [shipMethod, setShipMethod] = useState("standard");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [payMethod, setPayMethod] = useState("card");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    upiId: "",
  });

  const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = shipMethod === "express" ? 12 : subtotal >= 50 ? 0 : 5;
  const total = subtotal + shipping;
  const unitCount = ORDER_ITEMS.reduce((sum, i) => sum + i.qty, 0);

  const onField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const bind = (name) => ({ value: form[name], onChange: onField });

  const goTo = (n) => {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = (e) => {
    e.preventDefault();
    if (step < 3) goTo(step + 1);
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      window.scrollTo({ top: 0 });
    }, 1200);
  };

  if (placed) {
    return <SuccessScreen total={total} shipMethod={shipMethod} email={form.email} />;
  }

  const shipOptions = [
    {
      id: "standard",
      label: "Standard",
      eta: "4-6 business days",
      price: subtotal >= 50 ? "Free" : "$5.00",
      icon: Truck,
      tone: "bg-sky-50 text-sky",
    },
    {
      id: "express",
      label: "Express",
      eta: "1-2 business days",
      price: "$12.00",
      icon: Zap,
      tone: "bg-sun-50 text-sun-dark",
      badge: "Fastest",
    },
  ];

  const fullName = [form.firstName, form.lastName].filter(Boolean).join(" ") || "Ananya Rao";
  const addressLine =
    [form.address, form.apartment, form.city, form.state, form.pin].filter(Boolean).join(", ") ||
    "123 Bazar Street, your city";
  const activePay = PAYMENT_METHODS.find((m) => m.id === payMethod);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-36 pt-6 sm:px-6 lg:px-8 lg:pb-16 lg:pt-10">
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

      <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">Checkout</h1>
          <p className="mt-1 text-sm text-muted">
            {unitCount} items · {ORDER_ITEMS.length} sellers · one smooth checkout
          </p>
        </div>
        <div className="w-full md:max-w-sm">
          <StepIndicator current={step} onJump={goTo} />
        </div>
      </div>

      {/* Mobile summary toggle */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-mist lg:hidden">
        <button
          type="button"
          onClick={() => setSummaryOpen((o) => !o)}
          aria-expanded={summaryOpen}
          aria-controls="mobile-summary"
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-brand">
            <ShoppingBag size={16} />
            {summaryOpen ? "Hide" : "Show"} order summary
            <ChevronDown size={16} className={`transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
          </span>
          <span className="text-base font-extrabold tabular-nums text-ink">{money(total)}</span>
        </button>
        {summaryOpen && (
          <div id="mobile-summary" className="border-t border-line bg-white px-4 pb-5 pt-5">
            <SummaryItems compact />
            <SummaryTotals subtotal={subtotal} shipping={shipping} total={total} />
            <PromoHint />
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-10">
        {/* Form column */}
        <div className="min-w-0 animate-fade-up" key={step}>
          {step === 1 && (
            <form onSubmit={goNext} className="flex flex-col gap-5">
              {/* Express checkout (UI only) */}
              <div className="rounded-3xl border border-line bg-white p-5 sm:p-6">
                <p className="text-center text-xs font-semibold uppercase tracking-wider text-subtle">
                  Express checkout
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm font-bold text-white transition-colors hover:bg-ink-hover"
                  >
                    <Smartphone size={15} /> Pay with UPI
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl bg-sun py-3 text-sm font-bold text-ink transition-colors hover:bg-sun-dark"
                  >
                    <Zap size={15} /> Bazar Pay
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-3 text-xs text-subtle">
                  <span className="h-px flex-1 bg-line" /> or continue below <span className="h-px flex-1 bg-line" />
                </div>
              </div>

              <Section icon={Mail} title="Contact" subtitle="Order updates go here" tone="bg-pop-50 text-pop">
                <Field
                  id="email"
                  label="Email address"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="ananya@example.com"
                  {...bind("email")}
                />
              </Section>

              <Section icon={MapPin} title="Shipping address" subtitle="Where should we deliver?">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="firstName" label="First name" required autoComplete="given-name" placeholder="Ananya" {...bind("firstName")} />
                  <Field id="lastName" label="Last name" required autoComplete="family-name" placeholder="Rao" {...bind("lastName")} />
                  <Field
                    id="address"
                    label="Address"
                    required
                    autoComplete="address-line1"
                    placeholder="123 Bazar Street"
                    className="sm:col-span-2"
                    {...bind("address")}
                  />
                  <Field
                    id="apartment"
                    label="Apartment, suite, etc. (optional)"
                    autoComplete="address-line2"
                    placeholder="Flat 4B"
                    className="sm:col-span-2"
                    {...bind("apartment")}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <Field id="city" label="City" required autoComplete="address-level2" placeholder="Bengaluru" className="col-span-2 sm:col-span-1" {...bind("city")} />
                  <Field id="state" label="State" required autoComplete="address-level1" placeholder="Karnataka" {...bind("state")} />
                  <Field
                    id="pin"
                    label="PIN code"
                    required
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="560001"
                    {...bind("pin")}
                  />
                </div>
                <Field
                  id="phone"
                  label="Phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 00000 00000"
                  hint="In case the courier needs to reach you."
                  className="mt-4"
                  {...bind("phone")}
                />
              </Section>

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
                          className={`relative flex items-center gap-3 rounded-2xl border-2 p-4 transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20 ${
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

              <PrimaryButton type="submit" className="w-full">
                Continue to payment
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </PrimaryButton>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={goNext} className="flex flex-col gap-5">
              <Section icon={CreditCard} title="Payment" subtitle="All transactions are secure and encrypted">
                <fieldset>
                  <legend className="sr-only">Payment method</legend>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {PAYMENT_METHODS.map((m) => {
                      const selected = payMethod === m.id;
                      const Icon = m.icon;
                      return (
                        <label
                          key={m.id}
                          htmlFor={`pay-${m.id}`}
                          className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-2 py-3.5 text-center transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20 sm:flex-row sm:px-3.5 sm:text-left ${
                            selected ? "border-brand bg-brand-50/60" : "border-line hover:border-line-hover"
                          }`}
                        >
                          <input
                            id={`pay-${m.id}`}
                            type="radio"
                            name="payMethod"
                            value={m.id}
                            checked={selected}
                            onChange={() => setPayMethod(m.id)}
                            className="sr-only"
                          />
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${m.tone}`}>
                            <Icon size={17} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-bold text-ink sm:text-sm">{m.label}</span>
                            <span className="hidden text-[11px] text-subtle sm:block">{m.hint}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-5 rounded-2xl bg-mist p-4 sm:p-5">
                  {payMethod === "card" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <div className="mb-1.5 flex items-center justify-between">
                          <label htmlFor="cc-number" className="text-xs font-semibold text-ink-soft">
                            Card number
                          </label>
                          <span className="flex gap-1" aria-hidden="true">
                            <span className="rounded border border-line bg-white px-1.5 text-[9px] font-extrabold italic text-info">VISA</span>
                            <span className="rounded border border-line bg-white px-1.5 text-[9px] font-extrabold text-coral">MC</span>
                            <span className="rounded border border-line bg-white px-1.5 text-[9px] font-extrabold text-sky">RuPay</span>
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            id="cc-number"
                            name="cc-number"
                            required
                            autoComplete="cc-number"
                            inputMode="numeric"
                            placeholder="1234 1234 1234 1234"
                            className={`${inputClass} pr-10`}
                          />
                          <CreditCard size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-faint" />
                        </div>
                      </div>
                      <Field id="cc-exp" label="Expiry" required autoComplete="cc-exp" inputMode="numeric" placeholder="MM / YY" />
                      <Field id="cc-csc" label="CVC" required autoComplete="cc-csc" inputMode="numeric" placeholder="123" />
                      <Field id="cc-name" label="Name on card" required autoComplete="cc-name" placeholder="Ananya Rao" className="col-span-2" />
                    </div>
                  )}
                  {payMethod === "upi" && (
                    <Field
                      id="upiId"
                      label="UPI ID"
                      required
                      autoComplete="off"
                      placeholder="yourname@okbank"
                      hint="You'll get a request in your UPI app to approve the payment."
                      {...bind("upiId")}
                    />
                  )}
                  {payMethod === "cod" && (
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sun-50 text-sun-dark">
                        <Banknote size={18} />
                      </span>
                      <div className="text-sm text-ink-soft">
                        <p className="font-bold text-ink">Pay {money(total)} when your order arrives</p>
                        <p className="mt-1 text-xs text-muted">
                          Cash or UPI accepted at the door. Please keep the exact amount handy — each
                          seller&apos;s parcel is collected separately.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <p className="mt-4 flex items-center gap-1.5 text-xs text-subtle">
                  <Lock size={12} className="text-mint" />
                  Payments are encrypted and processed securely.
                </p>
              </Section>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <BackButton onClick={() => goTo(1)} />
                <PrimaryButton type="submit" className="flex-1">
                  Review order
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </PrimaryButton>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-line bg-white">
                <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-pop-50 text-pop">
                      <Mail size={18} />
                    </span>
                    <div className="min-w-0 text-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Contact</p>
                      <p className="mt-0.5 break-all font-semibold text-ink">{form.email || "ananya@example.com"}</p>
                    </div>
                  </div>
                  <EditLink onClick={() => goTo(1)} label="Edit contact" />
                </div>
                <div className="flex items-start justify-between gap-3 border-t border-line p-5 sm:p-6">
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                      <MapPin size={18} />
                    </span>
                    <div className="min-w-0 text-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Ship to</p>
                      <p className="mt-0.5 font-semibold text-ink">{fullName}</p>
                      <p className="text-muted">{addressLine}</p>
                      {form.phone && <p className="text-muted">{form.phone}</p>}
                    </div>
                  </div>
                  <EditLink onClick={() => goTo(1)} label="Edit shipping address" />
                </div>
                <div className="flex items-start justify-between gap-3 border-t border-line p-5 sm:p-6">
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky">
                      {shipMethod === "express" ? <Zap size={18} /> : <Truck size={18} />}
                    </span>
                    <div className="text-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Delivery</p>
                      <p className="mt-0.5 font-semibold text-ink">
                        {shipMethod === "express" ? "Express delivery" : "Standard delivery"}
                      </p>
                      <p className="text-muted">
                        Arriving in {shipMethod === "express" ? "1-2" : "4-6"} business days
                      </p>
                    </div>
                  </div>
                  <EditLink onClick={() => goTo(1)} label="Edit delivery method" />
                </div>
                <div className="flex items-start justify-between gap-3 border-t border-line p-5 sm:p-6">
                  <div className="flex gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${activePay.tone}`}>
                      <activePay.icon size={18} />
                    </span>
                    <div className="text-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Payment</p>
                      <p className="mt-0.5 font-semibold text-ink">{activePay.label}</p>
                      <p className="text-muted">
                        {payMethod === "upi" && form.upiId ? form.upiId : activePay.hint}
                      </p>
                    </div>
                  </div>
                  <EditLink onClick={() => goTo(2)} label="Edit payment method" />
                </div>
              </div>

              <section className="rounded-3xl border border-line bg-white p-5 sm:p-6">
                <h2 className="text-lg font-bold text-ink">Items ({unitCount})</h2>
                <ul className="mt-4 flex flex-col divide-y divide-line">
                  {ORDER_ITEMS.map((item) => (
                    <li key={item.id} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                      <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                        <SmartImage src={item.image} alt={item.name} bg={item.bg} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">{item.seller}</p>
                        <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
                        <p className="mt-1 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-medium text-ink-soft">Size {item.size}</span>
                          <span className="rounded-full bg-mist px-2 py-0.5 text-[11px] font-medium text-ink-soft">Qty {item.qty}</span>
                        </p>
                      </div>
                      <p className="text-sm font-bold tabular-nums text-ink">{money(item.price * item.qty)}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <BackButton onClick={() => goTo(2)} />
                <PrimaryButton type="button" onClick={placeOrder} disabled={placing} className="flex-1">
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
              </div>
              <p className="text-center text-[11px] text-subtle">
                By placing your order you agree to Fashion Bazar&apos;s terms and returns policy.
              </p>
            </div>
          )}
        </div>

        {/* Summary sidebar (desktop) */}
        <aside aria-labelledby="checkout-summary" className="hidden lg:sticky lg:top-32 lg:block">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_20px_50px_-30px_rgba(26,16,51,0.25)]">
            <div className="flex items-center justify-between">
              <h2 id="checkout-summary" className="text-xl font-bold text-ink">
                Order summary
              </h2>
              <Link to="/cart" className="text-xs font-semibold text-brand hover:text-brand-dark">
                Edit bag
              </Link>
            </div>
            <div className="mt-5">
              <SummaryItems />
            </div>
            <SummaryTotals subtotal={subtotal} shipping={shipping} total={total} />
            <PromoHint />
            <SecurityNote />
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
