import { useEffect, useState } from "react";
import SmartImage from "../components/SmartImage";
import { PHOTOS, unsplash } from "../assets/images";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  // Bell, // used by the commented-out Notifications panel
  LogOut,
  ChevronRight,
  Pencil,
  Truck,
  Check,
  FileText,
  RotateCcw,
  ShoppingBag,
  Trash2,
  Plus,
  House,
  Briefcase,
  Headphones,
  MessageCircle,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  PackageCheck,
  PackageX,
  // Percent, // used by the commented-out Notifications panel
  // Zap, // used by the commented-out Notifications panel
  CalendarDays,
  X,
} from "lucide-react";
import { formatPrice } from "../utils/formatPrice";
import { getPrices } from "../utils/productPrice";
import { useGetUserByIdQuery, useUpdateUserMutation, useChangePasswordMutation } from "../lib/api/userApi";
import { useGetWishlistQuery,useDeleteFromWishListMutation } from "../lib/api/wishlistApi";
import { useGetMyOrdersQuery, useCancelOrderMutation, useRequestReturnMutation } from "../lib/api/checkoutApi";
import { useAddToCartMutation, useDeleteCartItemMutation } from "../lib/api/cartApi";
import { baseApi } from "../lib/api/baseApi";
import { logout, setCredentials } from "../lib/slices/authSlice";
import { useForm } from "react-hook-form";
import {useCart} from "../hooks/isCart"
const NAV_ITEMS = [
  {
    id: "orders",
    label: "Orders",
    icon: Package,
    tone: "bg-brand-50 text-brand",
  },
  {
    id: "profile",
    label: "Profile details",
    icon: User,
    tone: "bg-pop-50 text-pop",
  },
  {
    id: "password",
    label: "Change password",
    icon: Lock,
    tone: "bg-sky-50 text-sky",
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: MapPin,
    tone: "bg-mint-50 text-mint",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    icon: Heart,
    tone: "bg-coral-50 text-coral",
  },
  // {
  //   id: "notifications",
  //   label: "Notifications",
  //   icon: Bell,
  //   tone: "bg-sun-50 text-sun-dark",
  // },
];

const ORDER_STEPS = ["Ordered", "Packed", "Shipped", "Delivered"];

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

// Turns an order from the server into the shape the order card shows
const toCardOrder = (order) => {
  const status = ["Delivered", "Cancelled", "Returned"].includes(order.status) ? order.status : "In transit";
  const eta = new Date(order.createdAt);
  // new orders save the delivery days of the option picked; older ones only have the code
  const maxDays = order.deliveryDays?.max ?? (order.shippingMethod === "express" ? 2 : 6);
  eta.setDate(eta.getDate() + maxDays);
  return {
    id: order.orderNumber,
    date: formatDate(order.createdAt),
    status,
    step: Math.max(0, ORDER_STEPS.indexOf(order.status)),
    eta: `Arriving by ${eta.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}`,
    deliveredOn: `Delivered ${formatDate(order.deliveredAt ?? order.updatedAt)}`,
    total: order.totalAmount,
    products: order.items.map((item) => ({ photo: item.image, name: item.name })),
    raw: order, // full server order, used by the details view
  };
};

const STATUS_STYLES = {
  Delivered: { pill: "bg-success-50 text-success", icon: PackageCheck },
  "In transit": { pill: "bg-info-50 text-info", icon: Truck },
  Cancelled: { pill: "bg-danger-50 text-danger", icon: PackageX },
  Returned: { pill: "bg-mist text-ink-soft", icon: RotateCcw },
};

const ORDER_FILTERS = ["All", "In transit", "Delivered", "Cancelled", "Returned"];

// Notifications are hidden until there is a backend to save the choices.
// const NOTIFICATION_SETTINGS = [
//   {
//     id: "orders",
//     title: "Order updates",
//     desc: "Shipping, delivery and return status for every order.",
//     icon: Truck,
//     tone: "bg-brand-50 text-brand",
//   },
//   {
//     id: "drops",
//     title: "New drops",
//     desc: "First look when sellers you follow add new pieces.",
//     icon: Sparkles,
//     tone: "bg-pop-50 text-pop",
//   },
//   {
//     id: "prices",
//     title: "Price drops",
//     desc: "A heads-up when something in your wishlist goes on sale.",
//     icon: Percent,
//     tone: "bg-mint-50 text-mint",
//   },
//   {
//     id: "newsletter",
//     title: "Weekly newsletter",
//     desc: "Editor picks, style notes and bazar-day deals.",
//     icon: Mail,
//     tone: "bg-sun-50 text-sun-dark",
//   },
// ];

const money = formatPrice;

const INPUT_CLASS =
  "w-full rounded-xl border border-line-strong bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-faint hover:border-line-hover focus:border-brand/40 focus:ring-4 focus:ring-brand/10";

const CARD_CLASS = "rounded-3xl border border-line bg-white";

/* ------------------------------------------------------------------
   Small shared pieces
   ------------------------------------------------------------------ */

function PanelHeader({ title, desc, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        {desc && <p className="mt-1 text-sm text-subtle">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

function IconChip({ icon: Icon, tone, size = "md" }) {
  const box = size === "sm" ? "h-9 w-9 rounded-xl" : "h-11 w-11 rounded-2xl";
  return (
    <span
      className={`flex shrink-0 items-center justify-center ${box} ${tone}`}
    >
      <Icon size={size === "sm" ? 16 : 20} strokeWidth={2} />
    </span>
  );
}

function Field({ id, label, hint, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold text-ink-soft"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-subtle">{hint}</p>}
    </div>
  );
}

// Switch is only used by the Notifications panel below.
// function Switch({ checked, onChange, labelId }) {
//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={checked}
//       aria-labelledby={labelId}
//       onClick={() => onChange(!checked)}
//       className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors ${
//         checked ? "bg-brand-gradient" : "bg-line-strong"
//       }`}
//     >
//       <span
//         className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
//           checked ? "translate-x-6" : "translate-x-1"
//         }`}
//       />
//     </button>
//   );
// }

function ActionButton({ icon: Icon, children, onClick, tone = "default" }) {
  const tones = {
    default:
      "border-line-strong text-ink-soft hover:border-line-hover hover:bg-mist",
    brand: "border-transparent bg-brand-50 text-brand hover:bg-brand-100",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors ${tones[tone]}`}
    >
      <Icon size={14} />
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------
   Profile hero + stats
   ------------------------------------------------------------------ */

function ProfileHero({ user, onEdit }) {
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section
      className={`${CARD_CLASS} relative animate-fade-up overflow-hidden`}
    >
      {/* gradient band */}
      <div className="relative h-28 overflow-hidden bg-brand-gradient sm:h-36">
        <div className="pointer-events-none absolute -left-10 -top-16 h-48 w-48 animate-blob rounded-full bg-sun/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-56 w-56 animate-blob rounded-full bg-mint/40 blur-3xl [animation-delay:-6s]" />
        <span className="pointer-events-none absolute right-6 top-5 hidden h-12 w-12 rotate-12 rounded-2xl border-4 border-white/25 sm:block" />
        <span className="pointer-events-none absolute right-28 top-14 hidden h-8 w-8 animate-float rounded-full border-4 border-sun/70 md:block" />
        <Sparkles
          size={22}
          className="pointer-events-none absolute left-1/2 top-6 hidden animate-wiggle text-white/60 sm:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative px-5 pb-5 sm:px-7 sm:pb-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
            <div className="relative -mt-12 h-24 w-24 shrink-0 overflow-hidden rounded-3xl shadow-[0_12px_30px_rgba(26,16,51,0.18)] ring-4 ring-white sm:-mt-14 sm:h-28 sm:w-28">
              <SmartImage
                src={unsplash(PHOTOS.womanCoat, 160, 160, "&crop=faces")}
                alt={user?.name || ""}
                bg="var(--color-brand-100)"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-ink sm:text-[28px]">
                  {user?.firstName || "Loading..."}
                </h1>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
                {memberSince && (
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={14} />
                    Member since {memberSince}
                  </span>
                )}
                <span className="inline-flex min-w-0 items-center gap-1">
                  <Mail size={14} />
                  <span className="truncate">{user?.email}</span>
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-line-strong bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-line-hover hover:shadow-md sm:self-auto"
          >
            <Pencil size={15} />
            Edit profile
          </button>
        </div>

      </div>
    </section>
  );
}

function StatTiles({ onSelect, orderCount, wishlistCount, addressCount }) {
  const stats = [
    {
      label: "Orders",
      value: orderCount,
      icon: Package,
      tone: "bg-brand-50 text-brand",
      tab: "orders",
    },
    {
      label: "Wishlist",
      value: wishlistCount,
      icon: Heart,
      tone: "bg-pop-50 text-pop",
      tab: "wishlist",
    },
    {
      label: "Saved addresses",
      value: addressCount,
      icon: MapPin,
      tone: "bg-mint-50 text-mint",
      tab: "addresses",
    },
  ];

  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {stats.map(({ label, value, icon, tone, tab }, i) => {
        const inner = (
          <>
            <IconChip
              icon={icon}
              tone={`${tone} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}
            />
            <span className="min-w-0 text-left">
              <span className="block font-display text-xl font-extrabold text-ink sm:text-2xl">
                {value}
              </span>
              <span className="block truncate text-xs text-subtle">
                {label}
              </span>
            </span>
          </>
        );
        const cls = `group flex animate-fade-up items-center gap-3 rounded-3xl border border-line bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(26,16,51,0.08)] sm:p-5`;
        const style = { animationDelay: `${80 + i * 60}ms` };
        return tab ? (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(tab)}
            className={cls}
            style={style}
          >
            {inner}
          </button>
        ) : (
          <div key={label} className={cls} style={style}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------
   Orders
   ------------------------------------------------------------------ */

function OrderTracker({ step }) {
  const pct = (step / (ORDER_STEPS.length - 1)) * 100;
  return (
    <div className="mt-4 rounded-2xl bg-mist px-3 py-4 sm:px-5">
      <div className="relative">
        <div
          className="absolute left-[12.5%] right-[12.5%] top-4 h-1 rounded-full bg-line-strong"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-brand-gradient"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ol className="relative grid grid-cols-4">
          {ORDER_STEPS.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li
                key={label}
                className="flex flex-col items-center gap-1.5 text-center"
                aria-current={current ? "step" : undefined}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-mint text-white"
                      : current
                        ? "bg-brand text-white ring-4 ring-brand-100"
                        : "border-2 border-line-strong bg-white text-faint"
                  }`}
                >
                  {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={`text-[11px] font-semibold sm:text-xs ${
                    current
                      ? "text-brand"
                      : done
                        ? "text-ink-soft"
                        : "text-subtle"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

// Days a delivered order can be returned (same as the backend, Terms and FAQ)
const RETURN_DAYS = 30;
const CANCEL_REASONS = ["Changed my mind", "Ordered by mistake", "Found a better price", "Delivery is taking too long", "Other"];
const RETURN_REASONS = ["Size doesn't fit", "Not as described", "Damaged or defective", "Received the wrong item", "Changed my mind", "Other"];

// Can this order still be returned? (delivered, no request yet, inside the window)
const returnInfo = (raw) => {
  if (raw.status !== "Delivered" || raw.returnRequest?.status) return { canReturn: false };
  const lastDay = new Date(new Date(raw.deliveredAt ?? raw.updatedAt).getTime() + RETURN_DAYS * 24 * 60 * 60 * 1000);
  return { canReturn: Date.now() <= lastDay.getTime(), lastDay };
};

// What's happening with a cancelled / returned order, in the shopper's words
function OrderStatusNote({ raw }) {
  const total = money(raw.totalAmount);
  const r = raw.returnRequest;
  const online = raw.paymentMethod === "razorpay";

  if (raw.status === "Cancelled") {
    return (
      <p className="mt-4 flex items-center gap-1.5 rounded-2xl bg-danger-50 px-3.5 py-2.5 text-xs font-semibold text-danger">
        <PackageX size={15} className="shrink-0" />
        {raw.paymentStatus === "Refunded"
          ? `Cancelled · Refund of ${total} issued to your original payment method`
          : raw.paymentStatus === "Paid"
            ? `Cancelled · Refund of ${total} is being processed`
            : "This order was cancelled"}
      </p>
    );
  }
  if (!r?.status) return null;

  const NOTES = {
    Requested: { tone: "bg-sun-50 text-sun-dark", text: `Return requested on ${formatDate(r.requestedAt)}. We'll reply within 2 working days.` },
    Approved: { tone: "bg-info-50 text-info", text: "Return approved — we'll contact you to arrange the pickup." },
    Rejected: { tone: "bg-danger-50 text-danger", text: "We couldn't accept this return." },
    Received: {
      tone: "bg-info-50 text-info",
      text: online
        ? `We've received your return. Your refund of ${total} is being processed.`
        : `We've received your return. Your refund of ${total} will be sent to ${r.refundTo}.`,
    },
    Refunded: {
      tone: "bg-success-50 text-success",
      text: online
        ? `Returned · Refund of ${total} issued to your original payment method (5–7 working days)`
        : `Returned · Refund of ${total} sent to ${r.refundTo}`,
    },
  };
  const note = NOTES[r.status];
  if (!note) return null;
  return (
    <div className={`mt-4 rounded-2xl px-3.5 py-2.5 text-xs font-semibold ${note.tone}`}>
      <p className="flex items-center gap-1.5">
        <RotateCcw size={15} className="shrink-0" />
        {note.text}
      </p>
      {r.adminNote && <p className="mt-1 pl-[21px] font-normal">Note from us: {r.adminNote}</p>}
    </div>
  );
}

// Track / Cancel / Buy again / Return / Invoice for one order (card and details page)
function OrderActions({ order, showTrack = false }) {
  const raw = order.raw;
  const navigate = useNavigate();
  const [panel, setPanel] = useState(null); // null | "cancel" | "return"
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [refundTo, setRefundTo] = useState("");
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }
  const [buying, setBuying] = useState(false);
  const [cancelOrder, { isLoading: cancelling }] = useCancelOrderMutation();
  const [requestReturn, { isLoading: returning }] = useRequestReturnMutation();
  const [addToCart] = useAddToCartMutation();

  const canCancel = raw.status === "Ordered" || raw.status === "Packed";
  const { canReturn, lastDay } = returnInfo(raw);
  const isCod = raw.paymentMethod === "cod";
  const showInvoice = raw.status === "Delivered" || raw.status === "Returned";
  const showBuyAgain = raw.status === "Delivered" || raw.status === "Cancelled" || raw.status === "Returned";

  const openPanel = (name) => {
    setPanel((p) => (p === name ? null : name));
    setReason("");
    setDetails("");
    setMessage(null);
  };

  const handleCancel = async () => {
    try {
      const res = await cancelOrder({ id: raw._id, reason: reason || undefined }).unwrap();
      setPanel(null);
      setMessage({ type: "success", text: res.message });
    } catch (err) {
      setMessage({ type: "error", text: err?.data?.message || "Could not cancel the order. Please try again." });
    }
  };

  const handleReturn = async (e) => {
    e.preventDefault();
    try {
      const res = await requestReturn({
        id: raw._id,
        reason: [reason, details.trim()].filter(Boolean).join(" — "),
        refundTo: isCod ? refundTo.trim() : undefined,
      }).unwrap();
      setPanel(null);
      setMessage({ type: "success", text: res.message });
    } catch (err) {
      setMessage({ type: "error", text: err?.data?.message || "Could not request the return. Please try again." });
    }
  };

  // Puts the same pieces (and sizes) back in the bag; skips what's sold out or no longer sold
  const handleBuyAgain = async () => {
    setBuying(true);
    setMessage(null);
    let added = 0;
    const skipped = [];
    for (const item of raw.items) {
      try {
        await addToCart({ productID: item.product, quantity: item.quantity, size: item.size || undefined }).unwrap();
        added += 1;
      } catch {
        skipped.push(item.name);
      }
    }
    setBuying(false);
    if (added && !skipped.length) return navigate("/cart");
    setMessage(
      added
        ? { type: "success", text: `Added to your bag. Not available right now: ${skipped.join(", ")}.` }
        : { type: "error", text: "These items aren't available right now." }
    );
  };

  const selectClass = `${INPUT_CLASS} mt-1`;

  return (
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap gap-2">
        {showTrack && raw.status !== "Delivered" && raw.status !== "Cancelled" && raw.status !== "Returned" && (
          <ActionButton icon={Truck} tone="brand" onClick={() => navigate(`/orders/${order.id}`)}>
            Track
          </ActionButton>
        )}
        {canCancel && (
          <ActionButton icon={PackageX} onClick={() => openPanel("cancel")}>
            Cancel order
          </ActionButton>
        )}
        {showBuyAgain && (
          <ActionButton icon={ShoppingBag} tone="brand" onClick={handleBuyAgain}>
            {buying ? "Adding…" : "Buy again"}
          </ActionButton>
        )}
        {canReturn && (
          <ActionButton icon={RotateCcw} onClick={() => openPanel("return")}>
            Return
          </ActionButton>
        )}
        {showInvoice && (
          <ActionButton icon={FileText} onClick={() => window.open(`/orders/${order.id}/invoice`, "_blank", "noopener")}>
            Invoice
          </ActionButton>
        )}
      </div>

      {panel === "cancel" && (
        <div className="mt-3 rounded-2xl border border-line bg-snow p-4">
          <p className="text-sm font-bold text-ink">Cancel order #{order.id}?</p>
          <p className="mt-1 text-xs text-muted">
            {raw.paymentMethod === "razorpay" && raw.paymentStatus === "Paid"
              ? `You'll get ${money(raw.totalAmount)} back to your original payment method in 5–7 working days.`
              : "Nothing has been charged, so there's nothing to refund."}
          </p>
          <label className="mt-3 block text-xs font-semibold text-ink-soft">
            Reason (optional)
            <select value={reason} onChange={(e) => setReason(e.target.value)} className={selectClass}>
              <option value="">Choose a reason</option>
              {CANCEL_REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={() => setPanel(null)} className="rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-mist">
              Keep order
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelling}
              className="rounded-full bg-danger px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
            >
              {cancelling ? "Cancelling…" : "Yes, cancel order"}
            </button>
          </div>
        </div>
      )}

      {panel === "return" && (
        <form onSubmit={handleReturn} className="mt-3 rounded-2xl border border-line bg-snow p-4">
          <p className="text-sm font-bold text-ink">Return order #{order.id}</p>
          <p className="mt-1 text-xs text-muted">
            Items must be unused with their tags on. You can return until {formatDate(lastDay)}.
          </p>
          <label className="mt-3 block text-xs font-semibold text-ink-soft">
            Why are you returning it?
            <select required value={reason} onChange={(e) => setReason(e.target.value)} className={selectClass}>
              <option value="">Choose a reason</option>
              {RETURN_REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-xs font-semibold text-ink-soft">
            Anything else we should know? (optional)
            <textarea
              rows={2}
              maxLength={300}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className={`${INPUT_CLASS} mt-1 resize-none`}
            />
          </label>
          {isCod && (
            <label className="mt-3 block text-xs font-semibold text-ink-soft">
              Where should we send your refund? (UPI ID or bank account + IFSC)
              <input
                required
                maxLength={200}
                value={refundTo}
                onChange={(e) => setRefundTo(e.target.value)}
                placeholder="e.g. name@okaxis"
                className={`${INPUT_CLASS} mt-1`}
              />
            </label>
          )}
          <div className="mt-3 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={() => setPanel(null)} className="rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-mist">
              Close
            </button>
            <button type="submit" disabled={returning} className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white disabled:opacity-60">
              {returning ? "Sending…" : "Request return"}
            </button>
          </div>
        </form>
      )}

      {message && (
        <p
          role={message.type === "error" ? "alert" : "status"}
          className={`mt-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold ${
            message.type === "error" ? "bg-danger-50 text-danger" : "bg-success-50 text-success"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

function OrderCard({ order, highlighted }) {
  const { pill, icon: StatusIcon } = STATUS_STYLES[order.status];
  const itemCount = order.products.length;
  const thumbs = order.products.slice(0, 3);

  return (
    <article
      id={`order-${order.id}`}
      className={`${CARD_CLASS} scroll-mt-28 p-4 transition-all hover:shadow-[0_14px_36px_rgba(26,16,51,0.06)] sm:p-5 ${
        highlighted
          ? "border-brand/40 ring-4 ring-brand/10"
          : "hover:border-line-hover"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* stacked thumbnails */}
        <div className="flex shrink-0 -space-x-5">
          {thumbs.map((p, i) => (
            <div
              key={i}
              className="h-16 w-14 overflow-hidden rounded-2xl ring-2 ring-white sm:h-20 sm:w-16"
              style={{ zIndex: thumbs.length - i }}
            >
              <SmartImage
                src={p.photo}
                alt={p.name}
                bg={p.bg}
              />
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-ink sm:text-[15px]">
              #{order.id}
            </p>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${pill}`}
            >
              <StatusIcon size={12} />
              {order.status}
            </span>
            {highlighted && (
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                Viewing
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-subtle">
            Placed {order.date} · {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}
          </p>
          <p className="mt-1 truncate text-xs text-muted">
            {order.products.map((p) => p.name).join(", ")}
          </p>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-[11px] uppercase tracking-wide text-subtle">
            Total
          </p>
          <p className="font-display text-lg font-bold text-ink">
            {money(order.total)}
          </p>
        </div>
      </div>

      {order.status === "In transit" && (
        <>
          <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-info">
            <Truck size={15} />
            {order.eta}
          </p>
          <OrderTracker step={order.step} />
        </>
      )}
      {order.status === "Delivered" && (
        <p className="mt-4 flex items-center gap-1.5 rounded-2xl bg-success-50 px-3.5 py-2.5 text-xs font-semibold text-success">
          <PackageCheck size={15} />
          {order.deliveredOn}
        </p>
      )}
      {/* cancelled / return in progress / returned */}
      <OrderStatusNote raw={order.raw} />

      <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-start sm:justify-between">
        <OrderActions order={order} showTrack />
        <div className="flex shrink-0 items-center justify-between gap-3">
          <p className="font-display text-lg font-bold text-ink sm:hidden">
            {money(order.total)}
          </p>
          <Link
            to={`/orders/${order.id}`}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-ink transition-colors hover:text-brand"
          >
            Order details
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function OrderDetails({ order }) {
  const { pill, icon: StatusIcon } = STATUS_STYLES[order.status];
  const raw = order.raw;
  const address = raw.shippingAddress;
  const itemCount = raw.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="animate-fade-up">
      <Link
        to="/account"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-subtle transition-colors hover:text-brand"
      >
        <ChevronRight size={16} className="rotate-180" />
        All orders
      </Link>

      {/* Header + status */}
      <div className={`${CARD_CLASS} p-4 sm:p-5`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">#{order.id}</h2>
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${pill}`}>
                <StatusIcon size={12} />
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-subtle">
              Placed {order.date} · {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-subtle">Total</p>
            <p className="font-display text-lg font-bold text-ink">{money(raw.totalAmount)}</p>
          </div>
        </div>

        {order.status === "In transit" && (
          <>
            <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-info">
              <Truck size={15} />
              {order.eta}
            </p>
            <OrderTracker step={order.step} />
          </>
        )}
        {order.status === "Delivered" && (
          <p className="mt-4 flex items-center gap-1.5 rounded-2xl bg-success-50 px-3.5 py-2.5 text-xs font-semibold text-success">
            <PackageCheck size={15} />
            {order.deliveredOn}
          </p>
        )}
        <OrderStatusNote raw={raw} />

        <div className="mt-4 border-t border-line pt-4">
          <OrderActions order={order} />
        </div>
      </div>

      {/* Items */}
      <div className={`${CARD_CLASS} mt-4 p-4 sm:p-5`}>
        <h3 className="text-sm font-bold text-ink">Items in this order</h3>
        <ul className="mt-3 divide-y divide-line">
          {raw.items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <Link
                to={`/products/${item.product}`}
                className="h-20 w-16 shrink-0 overflow-hidden rounded-2xl"
              >
                <SmartImage src={item.image} alt={item.name} />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${item.product}`}
                  className="block truncate text-sm font-semibold text-ink hover:text-brand"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-xs text-subtle">
                  {item.size && <>Size {item.size} · </>}Qty {item.quantity} × {money(item.price)}
                </p>
              </div>
              <p className="text-sm font-bold tabular-nums text-ink">
                {money(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Address */}
        <div className={`${CARD_CLASS} p-4 sm:p-5`}>
          <div className="flex items-center gap-2">
            <IconChip icon={MapPin} tone="bg-brand-50 text-brand" size="sm" />
            <h3 className="text-sm font-bold text-ink">Delivery address</h3>
          </div>
          <div className="mt-3 text-sm text-muted">
            <p className="font-semibold text-ink">
              {address.name}
              {address.tag && (
                <span className="ml-2 rounded-full bg-mist px-2 py-0.5 text-[11px] font-semibold text-subtle">
                  {address.tag}
                </span>
              )}
            </p>
            <p className="mt-1">{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>
              {[address.city, address.state].filter(Boolean).join(", ")} {address.pinCode}
            </p>
            {address.phone && <p className="mt-1">Phone: {address.phone}</p>}
          </div>
        </div>

        {/* Payment + price */}
        <div className={`${CARD_CLASS} p-4 sm:p-5`}>
          <div className="flex items-center gap-2">
            <IconChip icon={CreditCard} tone="bg-sun-50 text-sun-dark" size="sm" />
            <h3 className="text-sm font-bold text-ink">Payment</h3>
          </div>
          <p className="mt-3 text-sm text-muted">
            {raw.paymentMethod === "cod" ? "Cash on delivery" : "Online payment"} ·{" "}
            <span className="font-semibold text-ink">{raw.paymentStatus}</span>
          </p>
          <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd className="tabular-nums">{money(raw.subTotal)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Shipping ({raw.shippingMethodName || raw.shippingMethod})</dt>
              <dd className="tabular-nums">{raw.shipping === 0 ? "Free" : money(raw.shipping)}</dd>
            </div>
            {raw.discount > 0 && (
              <div className="flex justify-between text-muted">
                <dt>Coupon ({raw.discountCode})</dt>
                <dd className="tabular-nums text-success">-{money(raw.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between pt-1 font-bold text-ink">
              <dt>Total</dt>
              <dd className="tabular-nums">{money(raw.totalAmount)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function OrdersPanel({ orderId }) {
  const [filter, setFilter] = useState("All");
  const { data: serverOrders, isLoading } = useGetMyOrdersQuery();
  const ORDERS = (serverOrders ?? []).map(toCardOrder);
  const visible =
    filter === "All" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  useEffect(() => {
    if (!orderId || isLoading) return;
    document
      .getElementById(`order-${orderId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [orderId, isLoading]);

  if (isLoading) {
    return (
      <div>
        <PanelHeader title="Your orders" desc="Track, return or buy your favourites again." />
        <div className="flex flex-col gap-4">
          {[0, 1].map((i) => (
            <div key={i} className={`${CARD_CLASS} h-36 animate-pulse bg-mist`} />
          ))}
        </div>
      </div>
    );
  }

  // /orders/BZ-10001 -> show that order's full details
  const selectedOrder = orderId && ORDERS.find((o) => o.id === orderId);
  if (selectedOrder) return <OrderDetails order={selectedOrder} />;

  return (
    <div>
      <PanelHeader
        title="Your orders"
        desc="Track, return or buy your favourites again."
      />

      <div
        className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1"
        role="group"
        aria-label="Filter orders by status"
      >
        {ORDER_FILTERS.map((f) => {
          const count =
            f === "All"
              ? ORDERS.length
              : ORDERS.filter((o) => o.status === f).length;
          const on = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                on
                  ? "border-ink bg-ink text-white"
                  : "border-line-strong bg-white text-ink-soft hover:border-line-hover"
              }`}
            >
              {f}
              <span
                className={`rounded-full px-1.5 text-[11px] ${on ? "bg-white/20 text-white" : "bg-mist text-subtle"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length ? (
        <div className="flex flex-col gap-4">
          {visible.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              highlighted={order.id === orderId}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-line-strong px-6 py-14 text-center">
          <IconChip icon={Package} tone="bg-brand-50 text-brand" />
          <p className="mt-4 text-sm font-semibold text-ink">
            No {filter.toLowerCase()} orders
          </p>
          <p className="mt-1 text-xs text-subtle">
            Orders with this status will show up here.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Profile
   ------------------------------------------------------------------ */

function FormSection({ icon, tone, title, desc, children }) {
  return (
    <section className={`${CARD_CLASS} p-5 sm:p-6`}>
      <div className="mb-5 flex items-center gap-3">
        <IconChip icon={icon} tone={tone} size="sm" />
        <div>
          <h3 className="text-base font-bold text-ink">{title}</h3>
          {desc && <p className="text-xs text-subtle">{desc}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function PasswordInput({ id, placeholder, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...rest}
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={
          id === "current-password" ? "current-password" : "new-password"
        }
        className={`${INPUT_CLASS} pr-11`}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-subtle hover:bg-mist hover:text-ink"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

function ProfilePanel({ user }) {
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      // <input type="date"> needs YYYY-MM-DD
      dob: user?.dob ? String(user.dob).slice(0, 10) : "",
    },
  });
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onSubmit = async (value) => {
    setSaveError("");
    try {
      await updateUser(value).unwrap();
      setSaved(true);
    } catch (err) {
      // e.g. "Another account already uses this email" / invalid mobile number
      setSaveError(err?.data?.message || "Could not save your details. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        setSaved(false);
        setSaveError("");
      }}
      className="flex flex-col gap-4"
    >
      <PanelHeader
        title="Profile details"
        desc="Keep your details up to date for faster checkout."
      />

      <FormSection
        icon={User}
        tone="bg-pop-50 text-pop"
        title="Personal information"
        desc="How sellers and couriers reach you."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="first-name" label="First name">
            <input
              id="first-name"
              autoComplete="given-name"
              className={INPUT_CLASS}
              {...register("firstName")}
            />
          </Field>
          <Field id="last-name" label="Last name">
            <input
              id="last-name"
              autoComplete="family-name"
              className={INPUT_CLASS}
              {...register("lastName")}
            />
          </Field>
          <Field id="email" label="Email">
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={INPUT_CLASS}
              {...register("email")}
            />
          </Field>
          <Field id="phone" label="Phone">
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              className={INPUT_CLASS}
              {...register("phone")}
            />
          </Field>
          <Field
            id="dob"
            label="Date of birth"
            hint="We'll send you a birthday treat."
          >
            <input
              id="dob"
              type="date"
              className={INPUT_CLASS}
              {...register("dob")}
            />
          </Field>
          {/* <Field id="pronouns" label="Pronouns (optional)">
            <select id="pronouns" defaultValue="she/her" className={INPUT_CLASS}>
              <option value="">Prefer not to say</option>
              <option value="she/her">she/her</option>
              <option value="he/him">he/him</option>
              <option value="they/them">they/them</option>
            </select>
          </Field> */}
        </div>
      </FormSection>

      {/* Password now lives in its own "Change password" tab (ChangePasswordPanel) */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        {saved && (
          <p
            role="status"
            className="flex items-center gap-1.5 text-sm font-semibold text-success"
          >
            <Check size={16} />
            Changes saved
          </p>
        )}
        {saveError && (
          <p role="alert" className="text-sm font-semibold text-danger">
            {saveError}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            reset();
            setSaved(false);
          }}
          className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-mist"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-brand-gradient px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(124,58,237,0.28)] transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60"
        >
          {isLoading ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------
   Change password
   ------------------------------------------------------------------ */

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One letter and one number", test: (v) => /[a-zA-Z]/.test(v) && /\d/.test(v) },
];

const EMPTY_PASSWORDS = { currentPassword: "", newPassword: "", confirmPassword: "" };

function ChangePasswordPanel() {
  const [values, setValues] = useState(EMPTY_PASSWORDS);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useDispatch();

  const onField = (e) => {
    setValues((cur) => ({ ...cur, [e.target.name]: e.target.value }));
    setSaved(false);
    setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = values;
    if (!currentPassword) return setError("Enter your current password.");
    if (!PASSWORD_RULES.every((r) => r.test(newPassword)))
      return setError("Your new password doesn't meet the rules below.");
    if (newPassword !== confirmPassword) return setError("New passwords don't match.");
    if (newPassword === currentPassword)
      return setError("New password must be different from the current one.");

    setSubmitting(true);
    try {
      const res = await changePassword({ currentPassword, newPassword }).unwrap();
      // the change logs out every older login, including this one, so keep the fresh token
      if (res?.data?.token) dispatch(setCredentials(res.data.token));
      setValues(EMPTY_PASSWORDS);
      setSaved(true);
    } catch (err) {
      setError(err?.data?.message || "Couldn't update your password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <PanelHeader
        title="Change password"
        desc="Use a password you don't use on any other site."
      />

      <FormSection
        icon={Lock}
        tone="bg-sky-50 text-sky"
        title="Password"
        desc="You'll stay logged in on this device after changing it."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2 sm:max-w-[calc(50%-0.5rem)]">
            <Field id="current-password" label="Current password">
              <PasswordInput
                id="current-password"
                name="currentPassword"
                placeholder="••••••••"
                value={values.currentPassword}
                onChange={onField}
              />
            </Field>
            <Link
              to="/forgot-password"
              className="mt-2 inline-block text-xs font-medium text-brand hover:text-brand-dark"
            >
              Forgot your current password?
            </Link>
          </div>
          <Field id="new-password" label="New password">
            <PasswordInput
              id="new-password"
              name="newPassword"
              placeholder="New password"
              value={values.newPassword}
              onChange={onField}
            />
          </Field>
          <Field id="confirm-password" label="Confirm new password">
            <PasswordInput
              id="confirm-password"
              name="confirmPassword"
              placeholder="Repeat new password"
              value={values.confirmPassword}
              onChange={onField}
            />
          </Field>
        </div>

        <ul className="mt-4 flex flex-col gap-1.5">
          {PASSWORD_RULES.map((r) => {
            const ok = r.test(values.newPassword);
            return (
              <li
                key={r.label}
                className={`flex items-center gap-2 text-xs ${ok ? "text-mint" : "text-subtle"}`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full ${
                    ok ? "bg-mint text-white" : "border border-line-strong"
                  }`}
                >
                  {ok && <Check size={10} strokeWidth={3.5} />}
                </span>
                {r.label}
              </li>
            );
          })}
        </ul>
      </FormSection>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        {error && <p className="text-sm text-danger">{error}</p>}
        {saved && (
          <p role="status" className="flex items-center gap-1.5 text-sm font-semibold text-success">
            <Check size={16} />
            Password updated
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-gradient px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(124,58,237,0.28)] transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60"
        >
          {submitting ? "Updating…" : "Update password"}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------
   Addresses
   ------------------------------------------------------------------ */


// States and union territories for the address form
const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

const EMPTY_FORM = {
  tag: "Home",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pinCode: "",
};

function AddressesPanel({ addresses }) {
  const [showForm, setShowForm] = useState(false);
  // index of the address being edited, null while adding a new one
  const [editingIndex, setEditingIndex] = useState(null);
  const [addrError, setAddrError] = useState("");
  const [updateUser, { isLoading: savingAddr }] = useUpdateUserMutation();
  const { register, handleSubmit, reset, watch, setValue } = useForm({ defaultValues: EMPTY_FORM });

  const tag = watch("tag");
  const TAGS = {
    Home: { icon: House, tone: "bg-brand-50 text-brand" },
    Work: { icon: Briefcase, tone: "bg-sky-50 text-sky" },
    Other: { icon: MapPin, tone: "bg-mint-50 text-mint" },
  };
  const list = addresses ?? [];

  // Addresses are saved as one list on the profile; returns true when it worked
  const saveAddresses = async (next) => {
    setAddrError("");
    try {
      await updateUser({ addresses: next }).unwrap();
      return true;
    } catch (err) {
      setAddrError(err?.data?.message || "Could not save your addresses. Please try again.");
      return false;
    }
  };

  const openAdd = () => {
    setEditingIndex(null);
    reset(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (i) => {
    const a = list[i];
    setEditingIndex(i);
    reset({
      tag: a.tag ?? "Home",
      line1: a.line1 ?? "",
      line2: a.line2 ?? "",
      city: a.city ?? "",
      state: a.state ?? "",
      pinCode: a.pinCode ?? "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    reset(EMPTY_FORM);
  };

  const setDefaultAddress = (i) => saveAddresses(list.map((a, idx) => ({ ...a, isDefault: idx === i })));

  // Removing the default makes the next address the default, so checkout always has one picked
  const deleteAddress = (i) => {
    const rest = list.filter((_, idx) => idx !== i);
    if (list[i]?.isDefault && rest.length) rest[0] = { ...rest[0], isDefault: true };
    return saveAddresses(rest);
  };

  const onSubmit = async (values) => {
    const next =
      editingIndex !== null
        ? // keep the same _id, so an address picked at checkout stays picked
          list.map((a, idx) => (idx === editingIndex ? { ...a, ...values } : a))
        : // the first address becomes the default
          [...list, { ...values, isDefault: list.length === 0 }];
    if (await saveAddresses(next)) closeForm();
  };

  return (
    <div>
      <PanelHeader
        title="Saved addresses"
        desc="Where should we send your bazar finds?"
      />

      {addrError && (
        <p role="alert" className="mb-4 rounded-2xl bg-danger-50 px-4 py-3 text-sm font-semibold text-danger">
          {addrError}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {list.map((a, index) => {
          const { icon, tone } = TAGS[a.tag] ?? TAGS.Other;
          return (
            <article
              key={a._id ?? index}
              className={`${CARD_CLASS} flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(26,16,51,0.06)] ${
                a.isDefault ? "border-mint/50" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IconChip icon={icon} tone={tone} size="sm" />
                  <span className="text-sm font-bold text-ink">{a.tag}</span>
                </div>
                {a?.isDefault && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-mint-50 px-2.5 py-1 text-[11px] font-semibold text-mint">
                    <Check size={12} strokeWidth={3} />
                    Default
                  </span>
                )}
              </div>
              <div className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                <p>{a?.line1}</p>
                {a?.line2 && <p>{a.line2}</p>}
                <p>{[a?.city, a?.state].filter(Boolean).join(", ")}</p>
                <p>{a?.pinCode}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                <ActionButton icon={Pencil} onClick={() => openEdit(index)}>
                  Edit
                </ActionButton>
                {!a?.isDefault && (
                  <ActionButton icon={Check} onClick={() => setDefaultAddress(index)}>
                    Set as default
                  </ActionButton>
                )}
                <button
                  type="button"
                  onClick={() => deleteAddress(index)}
                  disabled={savingAddr}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-danger transition-colors hover:bg-danger-50 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Remove
                </button>
              </div>
            </article>
          );
        })}

        {showForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${CARD_CLASS} mb-4 p-5 sm:p-6`}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-bold text-ink">
                {editingIndex !== null ? "Edit address" : "Add new address"}
              </h3>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Close form"
                className="flex h-8 w-8 items-center justify-center rounded-full text-subtle hover:bg-mist hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {["Home", "Work", "Other"].map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tag === t}
                  onClick={() => setValue("tag", t)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    tag === t
                      ? "border-ink bg-ink text-white"
                      : "border-line-strong text-ink-soft hover:border-line-hover"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* <Field id="addr-name" label="Full name">
              <input id="addr-name" required value={form.name} onChange={update("name")} className={INPUT_CLASS} />
            </Field>
            <Field id="addr-phone" label="Phone">
              <input id="addr-phone" type="tel" required value={form.phone} onChange={update("phone")} className={INPUT_CLASS} />
            </Field> */}
              <div className="sm:col-span-2">
                <Field id="addr-line1" label="Address line 1">
                  <input
                    id="addr-line1"
                    required
                    {...register("line1")}
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field id="addr-line2" label="Address line 2 (optional)">
                  <input
                    id="addr-line2"
                    {...register("line2")}
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>
              <Field id="addr-city" label="City">
                <input
                  id="addr-city"
                  required
                  {...register("city")}
                  className={INPUT_CLASS}
                />
              </Field>
              <Field id="addr-state" label="State">
                {/* a list (not free text), so every order has the same spelling for the admin's region report */}
                <select id="addr-state" required {...register("state")} className={INPUT_CLASS}>
                  <option value="">Choose your state</option>
                  {/* an older address typed by hand still shows until it's changed */}
                  {watch("state") && !INDIAN_STATES.includes(watch("state")) && (
                    <option value={watch("state")}>{watch("state")}</option>
                  )}
                  {INDIAN_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field id="addr-pin" label="Pincode">
                <input
                  id="addr-pin"
                  required
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  {...register("pinCode")}
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-full border border-line-strong px-6 py-2.5 text-sm font-semibold text-ink-soft hover:bg-mist"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingAddr}
                className="rounded-full bg-brand-gradient px-7 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {savingAddr ? "Saving…" : editingIndex !== null ? "Update address" : "Save address"}
              </button>
            </div>
          </form>
        )}

        <button
          type="button"
          onClick={openAdd}
          className="group flex min-h-52 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-line-strong p-6 text-center transition-colors hover:border-brand/40 hover:bg-brand-50/50"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white transition-transform duration-300 group-hover:rotate-90">
            <Plus size={22} />
          </span>
          <span className="text-sm font-bold text-ink">Add new address</span>
          <span className="text-xs text-subtle">
            Home, work or a friend's place
          </span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Wishlist
   ------------------------------------------------------------------ */

// One card per wishlist item, so each card can call useCart for its own product.
// All cards share the same cached cart query, so there is still only one request.
function WishlistCard({ item }) {
  // item = wishlist item; the product itself is populated inside item.productId
  const product = item.productId;
  const [deleteFromWishList] = useDeleteFromWishListMutation();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useDeleteCartItemMutation();
  const { isInCart, getCartId } = useCart(product?._id);

  const handleCart = async () => {
    try {
      if (isInCart) {
        // Already in the cart → remove it (DELETE needs the cart item's id)
        await removeFromCart(getCartId).unwrap();
      } else {
        // Not in the cart → add it (cart backend expects productID, capital ID)
        await addToCart({ productID: product._id, quantity: 1 }).unwrap();
      }
    } catch (err) {
      console.error("Cart update failed", err);
    }
  };

  // sale price + MRP, same as the shop cards
  const { sale, original, discount } = getPrices(product);

  return (
    <article className="group flex flex-col">
      <div className="relative">
        <Link
          to={`/products/${product?._id}`}
          className="block aspect-4/5 overflow-hidden rounded-3xl"
          aria-label={product?.name}
        >
          <SmartImage
            src={product?.images?.[0]}
            alt={product?.name}
            bg={product?.bg}
            imgClassName="transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-pop px-2.5 py-1 text-[11px] font-bold text-white">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={() => deleteFromWishList(item._id).unwrap()}
          aria-label={`Remove ${product?.name} from wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-pop shadow-sm backdrop-blur transition-transform hover:scale-110"
        >
          <Heart size={16} className="fill-pop" />
        </button>
      </div>
      <div className="mt-3 flex flex-1 flex-col px-1">
        <p className="text-[11px] text-subtle">{product?.seller?.name ?? product?.seller}</p>
        <Link
          to={`/products/${product?._id}`}
          className="truncate text-sm font-semibold text-ink hover:text-brand"
        >
          {product?.name}
        </Link>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold text-ink">
            {money(sale)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-faint line-through">
              {money(original)}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={handleCart}
          className={`mt-3 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-semibold transition-all ${
            isInCart
              ? "bg-success-50 text-success"
              : "bg-ink text-white hover:-translate-y-0.5 hover:bg-ink-hover"
          }`}
        >
          {isInCart ? (
            <Check size={14} strokeWidth={3} />
          ) : (
            <ShoppingBag size={14} />
          )}
          {isInCart ? "In bag · Remove" : "Move to bag"}
        </button>
      </div>
    </article>
  );
}

function WishlistPanel({ watchListItems }) {
  if (!watchListItems?.length) {
    return (
      <div>
        <PanelHeader title="Your wishlist" />
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-line-strong px-6 py-16 text-center">
          <IconChip icon={Heart} tone="bg-pop-50 text-pop" />
          <p className="mt-4 text-sm font-semibold text-ink">
            Your wishlist is empty
          </p>
          <p className="mt-1 text-xs text-subtle">
            Tap the heart on anything you love to save it here.
          </p>
          <Link
            to="/products"
            className="mt-5 rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-semibold text-white"
          >
            Browse the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PanelHeader
        title="Your wishlist"
        desc={`${watchListItems.length} ${watchListItems.length === 1 ? "piece" : "pieces"} saved for later`}
      />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {watchListItems.map((item) => (
          <WishlistCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Notifications
   ------------------------------------------------------------------ */

// Notifications are hidden until there is a backend to save the choices.
// function NotificationsPanel() {
//   const [prefs, setPrefs] = useState({
//     orders: true,
//     drops: true,
//     prices: false,
//     newsletter: true,
//   });

//   return (
//     <div>
//       <PanelHeader
//         title="Notifications"
//         desc="Choose what lands in your inbox and on your phone."
//       />
//       <ul className={`${CARD_CLASS} divide-y divide-line`}>
//         {NOTIFICATION_SETTINGS.map(({ id, title, desc, icon, tone }) => (
//           <li key={id} className="flex items-center gap-4 p-4 sm:p-5">
//             <IconChip icon={icon} tone={tone} size="sm" />
//             <div className="min-w-0 flex-1">
//               <p id={`notif-${id}`} className="text-sm font-semibold text-ink">
//                 {title}
//               </p>
//               <p className="mt-0.5 text-xs text-subtle">{desc}</p>
//             </div>
//             <Switch
//               checked={prefs[id]}
//               labelId={`notif-${id}`}
//               onChange={(v) => setPrefs((cur) => ({ ...cur, [id]: v }))}
//             />
//           </li>
//         ))}
//       </ul>
//       <p className="mt-4 flex items-start gap-2 rounded-2xl bg-sky-50 px-4 py-3 text-xs text-ink-soft">
//         <Zap size={14} className="mt-0.5 shrink-0 text-sky" />
//         Security alerts about your account are always on, so you never miss
//         something important.
//       </p>
//     </div>
//   );
// }

/* ------------------------------------------------------------------
   Support card
   ------------------------------------------------------------------ */

function SupportCard({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-mint-50 p-5 ${className}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 animate-blob rounded-full bg-sky/20 blur-2xl" />
      <div className="relative">
        <span className="flex h-11 w-11 -rotate-6 items-center justify-center rounded-2xl bg-white text-mint shadow-sm">
          <Headphones size={20} />
        </span>
        <p className="mt-3 font-display text-base font-bold text-ink">
          Need help?
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Questions about an order? Send us a message and we'll get back to you.
        </p>
        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-hover"
        >
          <MessageCircle size={14} />
          Contact us
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Page
   ------------------------------------------------------------------ */

function AccountPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data } = useGetUserByIdQuery(undefined, { skip: !token });
  const user = data?.user;
  const tabParam = searchParams.get("tab");
  const active = NAV_ITEMS.some((n) => n.id === tabParam) ? tabParam : "orders";
 const {data:watchListItems}=useGetWishlistQuery(undefined, { skip: !token })
  const { data: myOrders } = useGetMyOrdersQuery(undefined, { skip: !token });
  const setActive = (id) => {
    setSearchParams(id === "orders" ? {} : { tab: id }, { replace: true });
  };

  const counts = {
    orders: myOrders?.length || 0,
    wishlist: watchListItems?.length || 0,
    addresses: user?.addresses?.length,
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate("/login", { replace: true });
  };

  // account page is only for logged-in users.
  // Remember this page (e.g. /orders/123?tab=...), so logging in brings them back here.
  if (!token)
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-10">
      <ProfileHero user={user} onEdit={() => setActive("profile")} />
      <StatTiles
        onSelect={setActive}
        orderCount={counts.orders}
        wishlistCount={counts.wishlist}
        addressCount={counts.addresses ?? 0}
      />

      <div className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-start lg:gap-8">
        {/* Sidebar / tab strip */}
        <aside className="min-w-0 lg:sticky lg:top-32 lg:w-64 lg:shrink-0">
          <nav
            aria-label="Account sections"
            className="lg:rounded-3xl lg:border lg:border-line lg:bg-white lg:p-2"
          >
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {NAV_ITEMS.map(({ id, label, icon: Icon, tone }) => {
                const on = active === id;
                return (
                  <li key={id} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setActive(id)}
                      aria-current={on ? "page" : undefined}
                      className={`group flex w-full items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold transition-colors lg:rounded-2xl lg:border-transparent lg:px-2.5 ${
                        on
                          ? "border-ink bg-ink text-white lg:bg-ink"
                          : "border-line-strong bg-white text-ink-soft hover:bg-mist lg:bg-transparent"
                      }`}
                    >
                      <span
                        className={`hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl lg:flex ${
                          on ? "bg-white/15 text-white" : tone
                        }`}
                      >
                        <Icon size={17} />
                      </span>
                      <Icon size={15} className="lg:hidden" />
                      <span className="whitespace-nowrap lg:flex-1 lg:text-left">
                        {label}
                      </span>
                      {counts[id] !== undefined && (
                        <span
                          className={`hidden rounded-full px-2 py-0.5 text-[11px] lg:inline ${
                            on
                              ? "bg-white/20 text-white"
                              : "bg-mist text-subtle"
                          }`}
                        >
                          {counts[id]}
                        </span>
                      )}
                      <ChevronRight
                        size={15}
                        className={`hidden lg:block ${on ? "text-white/70" : "text-faint"}`}
                      />
                    </button>
                  </li>
                );
              })}
              <li className="shrink-0 lg:mt-1 lg:border-t lg:border-line lg:pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-full border border-danger/20 bg-danger-50 px-4 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger-50 lg:rounded-2xl lg:border-transparent lg:bg-transparent lg:px-2.5"
                >
                  <span className="hidden h-9 w-9 items-center justify-center rounded-xl bg-danger-50 lg:flex">
                    <LogOut size={17} />
                  </span>
                  <LogOut size={15} className="lg:hidden" />
                  <span className="whitespace-nowrap">Log out</span>
                </button>
              </li>
            </ul>
          </nav>

          <SupportCard className="mt-4 hidden lg:block" />

        </aside>

        {/* Content */}
        <div key={active} className="min-w-0 flex-1 animate-fade-up">
          {active === "orders" && <OrdersPanel orderId={orderId} />}
          {/* key remounts the form once the user loads, so defaultValue picks it up */}
          {active === "profile" && <ProfilePanel key={user?._id} user={user} />}
          {active === "password" && <ChangePasswordPanel />}
          {active === "addresses" && (
            <AddressesPanel
              addresses={user?.addresses}
            />
          )}
          {active === "wishlist" && (
            <WishlistPanel watchListItems={watchListItems} />
          )}
          {/* {active === "notifications" && <NotificationsPanel />} */}
        </div>

        <SupportCard className="lg:hidden" />
      </div>
    </div>
  );
}

export default AccountPage;
