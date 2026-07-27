import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, Tag, ArrowRight, ShoppingBag } from "lucide-react";

const INITIAL_ITEMS = [
  {
    id: "p1",
    name: "Draped midi dress",
    seller: "Amara Studio",
    price: 48,
    size: "M",
    color: "Violet",
    qty: 1,
    bg: "#D9D2F0",
  },
  {
    id: "p4",
    name: "Suede loafers",
    seller: "Marchetti",
    price: 74,
    size: "8",
    color: "Black",
    qty: 1,
    bg: "#F7DFA8",
  },
  {
    id: "p6",
    name: "Gold hoop earrings",
    seller: "Luna Jewels",
    price: 22,
    size: "One size",
    color: "Gold",
    qty: 2,
    bg: "#F0C4C4",
  },
];

function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "BAZAR10") {
      setAppliedPromo({ code: "BAZAR10", percent: 10 });
      setPromoError("");
    } else {
      setPromoError("That code isn't valid.");
      setAppliedPromo(null);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5;
  const discount = appliedPromo ? Math.round(subtotal * (appliedPromo.percent / 100)) : 0;
  const total = subtotal + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center sm:px-6 lg:px-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F6FA]">
          <ShoppingBag size={26} className="text-[#9691A4]" />
        </span>
        <h1 className="font-display mt-5 text-2xl font-bold text-[#1B1523]">Your bag is empty</h1>
        <p className="mt-2 max-w-sm text-sm text-[#9691A4]">
          Nothing here yet — browse the bazar and find something worth
          carrying home.
        </p>
        <Link
          to="/products"
          className="mt-6 rounded-full bg-[#1B1523] px-6 py-3.5 text-sm font-semibold text-white"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="font-display text-2xl font-bold text-[#1B1523] sm:text-[28px]">
        Your bag
      </h1>
      <p className="mt-1 text-sm text-[#9691A4]">{items.length} items</p>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Items */}
        <div className="flex-1">
          <div className="flex flex-col divide-y divide-[#ECE9F1] border-y border-[#ECE9F1]">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 py-5 sm:gap-5">
                <Link
                  to={`/products/${item.id}`}
                  className="h-24 w-20 shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-24"
                >
                  <div className="h-full w-full" style={{ backgroundColor: item.bg }} />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-[#9691A4]">
                        {item.seller}
                      </p>
                      <Link
                        to={`/products/${item.id}`}
                        className="text-sm font-medium text-[#1B1523] hover:text-[#5B21B6] sm:text-[15px]"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-[#9691A4]">
                        Size {item.size} · {item.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#9691A4] hover:bg-[#F7F6FA] hover:text-[#1B1523]"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="flex items-center rounded-full border border-[#E4E0EC]">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-9 w-9 items-center justify-center text-[#1B1523]"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-[#1B1523]">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-9 w-9 items-center justify-center text-[#1B1523]"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-[#1B1523] sm:text-[15px]">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="mt-6 inline-block text-sm font-semibold text-[#5B21B6] hover:text-[#3C3489]"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="rounded-2xl border border-[#ECE9F1] bg-[#F7F6FA] p-5 sm:p-6">
            <p className="text-sm font-semibold text-[#1B1523]">Order summary</p>

            <form onSubmit={applyPromo} className="mt-4 flex gap-2">
              <div className="flex flex-1 items-center rounded-full border border-[#E4E0EC] bg-white px-3.5 py-2.5">
                <Tag size={14} className="text-[#9691A4]" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="ml-2 w-full bg-transparent text-sm text-[#1B1523] outline-none placeholder:text-[#9691A4]"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-full border border-[#E4E0EC] bg-white px-4 text-sm font-medium text-[#1B1523] hover:bg-[#F7F6FA]"
              >
                Apply
              </button>
            </form>
            {promoError && <p className="mt-2 text-xs text-[#993C1D]">{promoError}</p>}
            {appliedPromo && (
              <p className="mt-2 text-xs text-[#3B6D11]">
                {appliedPromo.code} applied — {appliedPromo.percent}% off
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2.5 border-t border-[#E4E0EC] pt-5 text-sm">
              <div className="flex justify-between text-[#6B6478]">
                <span>Subtotal</span>
                <span className="text-[#1B1523]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6B6478]">
                <span>Shipping</span>
                <span className="text-[#1B1523]">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#3B6D11]">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-between border-t border-[#E4E0EC] pt-4">
              <span className="text-sm font-semibold text-[#1B1523]">Total</span>
              <span className="text-lg font-bold text-[#1B1523]">${total.toFixed(2)}</span>
            </div>

            {subtotal < 50 && (
              <p className="mt-3 text-xs text-[#9691A4]">
                Add ${(50 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <Link
              to="/checkout"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#1B1523] py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
            >
              Checkout
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;