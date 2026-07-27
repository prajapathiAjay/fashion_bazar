import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Lock, Truck, CreditCard, Check } from "lucide-react";

const ORDER_ITEMS = [
  { id: "p1", name: "Draped midi dress", seller: "Amara Studio", price: 48, qty: 1, size: "M", bg: "#D9D2F0" },
  { id: "p4", name: "Suede loafers", seller: "Marchetti", price: 74, qty: 1, size: "8", bg: "#F7DFA8" },
  { id: "p6", name: "Gold hoop earrings", seller: "Luna Jewels", price: 22, qty: 2, size: "One size", bg: "#F0C4C4" },
];

const STEPS = ["Shipping", "Payment", "Review"];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  isDone
                    ? "bg-[#3B6D11] text-white"
                    : isActive
                    ? "bg-[#1B1523] text-white"
                    : "bg-[#F0EDF6] text-[#9691A4]"
                }`}
              >
                {isDone ? <Check size={13} /> : stepNum}
              </span>
              <span
                className={`hidden text-sm font-medium sm:inline ${
                  isActive || isDone ? "text-[#1B1523]" : "text-[#9691A4]"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum < STEPS.length && (
              <span className="h-px w-6 bg-[#ECE9F1] sm:w-10" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FieldLabel({ children }) {
  return <label className="mb-1.5 block text-xs font-medium text-[#3A3547]">{children}</label>;
}

const inputClass =
  "w-full rounded-xl border border-[#E4E0EC] bg-white px-3.5 py-2.5 text-sm text-[#1B1523] outline-none transition-colors placeholder:text-[#B5B0C1] focus:border-[#5B21B6]/40 focus:ring-4 focus:ring-[#5B21B6]/10";

function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [shipMethod, setShipMethod] = useState("standard");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = shipMethod === "express" ? 12 : subtotal >= 50 ? 0 : 5;
  const total = subtotal + shipping;

  const goNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep((s) => s + 1);
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
    }, 1200);
  };

  if (placed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF3DE]">
          <Check size={26} className="text-[#3B6D11]" />
        </span>
        <h1 className="font-display mt-5 text-2xl font-bold text-[#1B1523]">Order placed</h1>
        <p className="mt-2 text-sm text-[#9691A4]">
          Confirmation sent to your email. Your order from {ORDER_ITEMS.length} sellers is on
          its way.
        </p>
        <p className="mt-4 text-sm font-medium text-[#1B1523]">
          Order total: ${total.toFixed(2)}
        </p>
        <Link
          to="/"
          className="mt-6 rounded-full bg-[#1B1523] px-6 py-3.5 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        to="/cart"
        className="inline-flex items-center gap-1 text-sm font-medium text-[#6B6478] hover:text-[#1B1523]"
      >
        <ChevronLeft size={15} />
        Back to bag
      </Link>

      <div className="mt-5 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-[#1B1523] sm:text-[28px]">
          Checkout
        </h1>
        <StepIndicator current={step} />
      </div>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start">
        {/* Form column */}
        <div className="flex-1">
          {step === 1 && (
            <form onSubmit={goNext} className="flex flex-col gap-5">
              <p className="text-sm font-semibold text-[#1B1523]">Shipping address</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>First name</FieldLabel>
                  <input required placeholder="Ananya" className={inputClass} />
                </div>
                <div>
                  <FieldLabel>Last name</FieldLabel>
                  <input required placeholder="Rao" className={inputClass} />
                </div>
              </div>
              <div>
                <FieldLabel>Address</FieldLabel>
                <input required placeholder="123 Bazar Street" className={inputClass} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <FieldLabel>City</FieldLabel>
                  <input required placeholder="City" className={inputClass} />
                </div>
                <div>
                  <FieldLabel>State</FieldLabel>
                  <input required placeholder="State" className={inputClass} />
                </div>
                <div>
                  <FieldLabel>PIN code</FieldLabel>
                  <input required placeholder="000000" className={inputClass} />
                </div>
              </div>
              <div>
                <FieldLabel>Phone</FieldLabel>
                <input required type="tel" placeholder="+91 00000 00000" className={inputClass} />
              </div>

              <p className="mt-2 text-sm font-semibold text-[#1B1523]">Delivery method</p>
              <div className="flex flex-col gap-3">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 ${
                    shipMethod === "standard" ? "border-[#1B1523]" : "border-[#E4E0EC]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="ship"
                      checked={shipMethod === "standard"}
                      onChange={() => setShipMethod("standard")}
                      className="h-4 w-4 accent-[#1B1523]"
                    />
                    <span>
                      <span className="block text-sm font-medium text-[#1B1523]">Standard</span>
                      <span className="block text-xs text-[#9691A4]">4-6 business days</span>
                    </span>
                  </span>
                  <span className="text-sm font-medium text-[#1B1523]">
                    {subtotal >= 50 ? "Free" : "$5.00"}
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3.5 ${
                    shipMethod === "express" ? "border-[#1B1523]" : "border-[#E4E0EC]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="ship"
                      checked={shipMethod === "express"}
                      onChange={() => setShipMethod("express")}
                      className="h-4 w-4 accent-[#1B1523]"
                    />
                    <span>
                      <span className="block text-sm font-medium text-[#1B1523]">Express</span>
                      <span className="block text-xs text-[#9691A4]">1-2 business days</span>
                    </span>
                  </span>
                  <span className="text-sm font-medium text-[#1B1523]">$12.00</span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-3 rounded-full bg-[#1B1523] py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
              >
                Continue to payment
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={goNext} className="flex flex-col gap-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-[#1B1523]">
                <CreditCard size={16} />
                Payment details
              </p>
              <div>
                <FieldLabel>Card number</FieldLabel>
                <input required placeholder="1234 1234 1234 1234" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Expiry</FieldLabel>
                  <input required placeholder="MM / YY" className={inputClass} />
                </div>
                <div>
                  <FieldLabel>CVC</FieldLabel>
                  <input required placeholder="123" className={inputClass} />
                </div>
              </div>
              <div>
                <FieldLabel>Name on card</FieldLabel>
                <input required placeholder="Ananya Rao" className={inputClass} />
              </div>

              <p className="mt-1 flex items-center gap-1.5 text-xs text-[#9691A4]">
                <Lock size={12} />
                Payments are encrypted and processed securely.
              </p>

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-full border border-[#E4E0EC] py-3.5 text-sm font-semibold text-[#1B1523]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#1B1523] py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
                >
                  Review order
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <p className="text-sm font-semibold text-[#1B1523]">Review your order</p>
              <div className="flex flex-col divide-y divide-[#ECE9F1] rounded-2xl border border-[#ECE9F1]">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4">
                    <div
                      className="h-14 w-12 shrink-0 rounded-lg"
                      style={{ backgroundColor: item.bg }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#1B1523]">{item.name}</p>
                      <p className="text-xs text-[#9691A4]">
                        {item.seller} · Size {item.size} · Qty {item.qty}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-[#1B1523]">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#F7F6FA] p-4 text-sm text-[#6B6478]">
                <p className="flex items-center gap-2 font-medium text-[#1B1523]">
                  <Truck size={15} />
                  {shipMethod === "express" ? "Express delivery" : "Standard delivery"}
                </p>
                <p className="mt-1">123 Bazar Street, your city — arriving in{" "}
                  {shipMethod === "express" ? "1-2" : "4-6"} business days</p>
              </div>

              <div className="mt-1 flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-full border border-[#E4E0EC] py-3.5 text-sm font-semibold text-[#1B1523]"
                >
                  Back
                </button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1B1523] py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
                >
                  {placing ? "Placing order..." : `Place order — $${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="rounded-2xl border border-[#ECE9F1] bg-[#F7F6FA] p-5 sm:p-6">
            <p className="text-sm font-semibold text-[#1B1523]">Order summary</p>
            <div className="mt-4 flex flex-col gap-3">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className="h-11 w-9 shrink-0 rounded-md"
                    style={{ backgroundColor: item.bg }}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#1B1523]">{item.name}</p>
                    <p className="text-[11px] text-[#9691A4]">Qty {item.qty}</p>
                  </div>
                  <p className="text-xs font-medium text-[#1B1523]">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

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
            </div>

            <div className="mt-4 flex justify-between border-t border-[#E4E0EC] pt-4">
              <span className="text-sm font-semibold text-[#1B1523]">Total</span>
              <span className="text-lg font-bold text-[#1B1523]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;