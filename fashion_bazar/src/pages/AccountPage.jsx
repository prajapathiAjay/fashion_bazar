import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Star,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "profile", label: "Profile details", icon: User },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment methods", icon: CreditCard },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const ORDERS = [
  {
    id: "BZ-10482",
    date: "Jul 18, 2026",
    status: "Delivered",
    total: 144.0,
    items: 3,
    bg: "#D9D2F0",
  },
  {
    id: "BZ-10327",
    date: "Jun 30, 2026",
    status: "In transit",
    total: 62.0,
    items: 1,
    bg: "#F0997B",
  },
  {
    id: "BZ-10188",
    date: "Jun 09, 2026",
    status: "Delivered",
    total: 89.0,
    items: 2,
    bg: "#F7DFA8",
  },
];

const STATUS_STYLES = {
  Delivered: "bg-[#EAF3DE] text-[#3B6D11]",
  "In transit": "bg-[#E6F1FB] text-[#185FA5]",
  Cancelled: "bg-[#FCEBEB] text-[#A32D2D]",
};

function OrdersPanel() {
  return (
    <div className="flex flex-col gap-4">
      {ORDERS.map((order) => (
        <Link
          key={order.id}
          to={`/orders/${order.id}`}
          className="flex items-center gap-4 rounded-2xl border border-[#ECE9F1] bg-white p-4 transition-colors hover:border-[#D9D5E3] sm:p-5"
        >
          <div
            className="h-14 w-14 shrink-0 rounded-xl"
            style={{ backgroundColor: order.bg }}
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-[#1B1523]">{order.id}</p>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#9691A4]">
              {order.date} · {order.items} items
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-[#1B1523]">${order.total.toFixed(2)}</p>
            <ChevronRight size={16} className="text-[#B5B0C1]" />
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProfilePanel() {
  return (
    <form className="flex max-w-lg flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#3A3547]">First name</label>
          <input
            defaultValue="Ananya"
            className="w-full rounded-xl border border-[#E4E0EC] bg-white px-3.5 py-2.5 text-sm text-[#1B1523] outline-none focus:border-[#5B21B6]/40 focus:ring-4 focus:ring-[#5B21B6]/10"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#3A3547]">Last name</label>
          <input
            defaultValue="Rao"
            className="w-full rounded-xl border border-[#E4E0EC] bg-white px-3.5 py-2.5 text-sm text-[#1B1523] outline-none focus:border-[#5B21B6]/40 focus:ring-4 focus:ring-[#5B21B6]/10"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#3A3547]">Email</label>
        <input
          defaultValue="ananya.rao@example.com"
          type="email"
          className="w-full rounded-xl border border-[#E4E0EC] bg-white px-3.5 py-2.5 text-sm text-[#1B1523] outline-none focus:border-[#5B21B6]/40 focus:ring-4 focus:ring-[#5B21B6]/10"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#3A3547]">Phone</label>
        <input
          defaultValue="+91 90000 00000"
          type="tel"
          className="w-full rounded-xl border border-[#E4E0EC] bg-white px-3.5 py-2.5 text-sm text-[#1B1523] outline-none focus:border-[#5B21B6]/40 focus:ring-4 focus:ring-[#5B21B6]/10"
        />
      </div>
      <button
        type="submit"
        className="mt-2 self-start rounded-full bg-[#1B1523] px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
      >
        Save changes
      </button>
    </form>
  );
}

function PlaceholderPanel({ label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#E4E0EC] py-16 text-center">
      <p className="text-sm font-medium text-[#1B1523]">{label}</p>
      <p className="mt-1 text-xs text-[#9691A4]">Nothing set up here yet.</p>
    </div>
  );
}

function AccountPage() {
  const [active, setActive] = useState("orders");

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <h1 className="font-display text-2xl font-bold text-[#1B1523] sm:text-[28px]">
        Your account
      </h1>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* Sidebar */}
        <aside className="lg:w-64 lg:shrink-0">
          <div className="flex items-center gap-3 rounded-2xl border border-[#ECE9F1] bg-white p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEEDFE] text-sm font-semibold text-[#5B21B6]">
              AR
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1B1523]">Ananya Rao</p>
              <p className="flex items-center gap-1 text-xs text-[#9691A4]">
                <Star size={11} className="fill-[#F5D488] text-[#F5D488]" />
                Bazar member since 2024
              </p>
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                  active === id
                    ? "bg-[#1B1523] text-white"
                    : "text-[#3A3547] hover:bg-[#F7F6FA]"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
            <button className="flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#993C1D] hover:bg-[#FAECE7] lg:mt-2 lg:w-full">
              <LogOut size={16} />
              Log out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {active === "orders" && <OrdersPanel />}
          {active === "profile" && <ProfilePanel />}
          {active === "wishlist" && <PlaceholderPanel label="Wishlist" />}
          {active === "addresses" && <PlaceholderPanel label="Addresses" />}
          {active === "payment" && <PlaceholderPanel label="Payment methods" />}
          {active === "notifications" && <PlaceholderPanel label="Notifications" />}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;