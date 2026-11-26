import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Printer } from "lucide-react";
import { useGetMyOrdersQuery } from "../lib/api/checkoutApi";
import { useGetStoreSettingsQuery } from "../lib/api/settingsApi";
import { formatPrice } from "../utils/formatPrice";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// Printable invoice for one of the shopper's own orders: /orders/BZ-10001/invoice
// Opened in a new tab from Account → Orders; "Print / Save as PDF" uses the browser's print dialog.
function InvoicePage() {
  const { orderId } = useParams();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);
  const { data: orders, isLoading } = useGetMyOrdersQuery(undefined, { skip: !token });
  const { data: store } = useGetStoreSettingsQuery();

  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (isLoading) return <p className="p-10 text-center text-sm text-muted">Loading invoice…</p>;

  const order = orders?.find((o) => o.orderNumber === orderId);
  if (!order) {
    return (
      <div className="p-10 text-center">
        <p className="font-semibold text-ink">We couldn't find this order.</p>
        <Link to="/account" className="mt-3 inline-block text-sm font-semibold text-brand underline">
          Back to your orders
        </Link>
      </div>
    );
  }

  const address = order.shippingAddress ?? {};
  const storeName = store?.storeName || "Fashion Bazar";
  const storeLines = [store?.address, store?.supportPhone && `Phone: ${store.supportPhone}`, store?.supportEmail]
    .filter(Boolean);
  const paymentLabel = order.paymentMethod === "cod" ? "Cash on delivery" : "Online payment";

  return (
    <div className="min-h-screen bg-mist px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto mb-4 flex max-w-3xl justify-end print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-hover"
        >
          <Printer size={16} /> Print / Save as PDF
        </button>
      </div>

      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-sm text-ink shadow-sm print:max-w-none print:rounded-none print:shadow-none">
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-line pb-6">
          <div>
            <p className="font-display text-2xl font-bold">{storeName}</p>
            {storeLines.map((line) => (
              <p key={line} className="mt-0.5 text-xs text-muted">{line}</p>
            ))}
          </div>
          <div className="text-right">
            <p className="text-lg font-bold uppercase tracking-wider">Invoice</p>
            <p className="mt-1 text-xs text-muted">Invoice no. <span className="font-semibold text-ink">{order.orderNumber}</span></p>
            <p className="text-xs text-muted">Order date: {formatDate(order.createdAt)}</p>
            {order.deliveredAt && <p className="text-xs text-muted">Delivered: {formatDate(order.deliveredAt)}</p>}
          </div>
        </header>

        <section className="grid gap-6 border-b border-line py-6 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Bill & ship to</p>
            <p className="mt-2 font-semibold">{address.name}</p>
            <p className="text-muted">{address.line1}</p>
            {address.line2 && <p className="text-muted">{address.line2}</p>}
            <p className="text-muted">
              {[address.city, address.state].filter(Boolean).join(", ")} {address.pinCode}
            </p>
            {address.phone && <p className="text-muted">Phone: {address.phone}</p>}
          </div>
          <div className="sm:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-subtle">Payment</p>
            <p className="mt-2">{paymentLabel}</p>
            <p className="text-muted">Status: {order.paymentStatus}</p>
            {order.paymentInfo?.razorpayPaymentId && (
              <p className="break-all text-xs text-muted">Payment ID: {order.paymentInfo.razorpayPaymentId}</p>
            )}
          </div>
        </section>

        <table className="mt-6 w-full text-left">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wider text-subtle">
              <th className="py-2 font-semibold">Item</th>
              <th className="py-2 text-right font-semibold">Qty</th>
              <th className="py-2 text-right font-semibold">Price</th>
              <th className="py-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={i} className="border-b border-line align-top">
                <td className="py-3 pr-3">
                  {item.name}
                  {item.size && <span className="block text-xs text-muted">Size {item.size}</span>}
                </td>
                <td className="py-3 text-right tabular-nums">{item.quantity}</td>
                <td className="py-3 text-right tabular-nums">{formatPrice(item.price)}</td>
                <td className="py-3 text-right tabular-nums">{formatPrice(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="ml-auto mt-4 w-full max-w-xs space-y-1.5">
          <div className="flex justify-between text-muted">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(order.subTotal)}</dd>
          </div>
          <div className="flex justify-between text-muted">
            <dt>Shipping{order.shippingMethodName ? ` (${order.shippingMethodName})` : ""}</dt>
            <dd className="tabular-nums">{order.shipping ? formatPrice(order.shipping) : "Free"}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-muted">
              <dt>Coupon ({order.discountCode})</dt>
              <dd className="tabular-nums">-{formatPrice(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-2 text-base font-bold">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatPrice(order.totalAmount)}</dd>
          </div>
        </dl>

        {(order.status === "Cancelled" || order.status === "Returned") && (
          <p className="mt-6 rounded-lg bg-mist px-4 py-3 text-xs font-semibold text-ink-soft">
            This order was {order.status.toLowerCase()}
            {order.paymentStatus === "Refunded" ? " and the amount has been refunded." : "."}
          </p>
        )}

        <p className="mt-8 border-t border-line pt-4 text-center text-xs text-subtle">
          Thank you for shopping with {storeName}. Prices include all taxes.
        </p>
      </article>
    </div>
  );
}

export default InvoicePage;
