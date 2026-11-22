import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  KeyRound,
  Lock,
  LogOut,
  MapPin,
  Package,
  User,
  UserPlus,
} from "lucide-react";
import { useGetMyOrdersQuery } from "../lib/api/checkoutApi";

// each link gets its own soft colour chip, like the account page tiles
const LOGGED_IN_LINKS = [
  { to: "/account?tab=profile", label: "My profile", icon: User, tone: "bg-brand-50 text-brand" },
  { to: "/account", label: "My orders", icon: Package, tone: "bg-sun-50 text-sun-dark", badge: "orders" },
  { to: "/account?tab=password", label: "Change password", icon: Lock, tone: "bg-sky-50 text-sky" },
  { to: "/account?tab=addresses", label: "Addresses", icon: MapPin, tone: "bg-mint-50 text-mint" },
];

const LOGGED_OUT_LINKS = [
  { to: "/register", label: "Create account", icon: UserPlus, tone: "bg-brand-50 text-brand" },
  { to: "/forgot-password", label: "Forgot password?", icon: KeyRound, tone: "bg-sky-50 text-sky" },
];

const itemClass =
  "flex items-center gap-3 rounded-xl p-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-mist hover:text-ink";

function Chip({ icon: Icon, tone }) {
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] ${tone}`}>
      <Icon size={16} />
    </span>
  );
}

// Account button + dropdown in the navbar (tablet and desktop; phones use the drawer)
function AccountMenu({ token, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // same cached query the account page uses, so no extra request there
  const { data: myOrders } = useGetMyOrdersQuery(undefined, { skip: !token });
  const activeOrders = token
    ? (myOrders ?? []).filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length
    : 0;

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const name = user?.firstName;
  const initial = name?.[0]?.toUpperCase();
  const fullName = user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "";

  return (
    <div ref={wrapRef} className="relative ml-1 max-sm:hidden">
      {/* Trigger: avatar only below xl, avatar + greeting on large screens */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={token ? "Account menu" : "Sign in menu"}
        className={`flex items-center gap-2.5 rounded-full p-1 text-left transition-colors xl:bg-mist xl:pr-3 xl:hover:bg-shimmer ${
          open ? "xl:bg-shimmer" : ""
        }`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-2 ring-sun ring-offset-2 ring-offset-white ${
            token ? "bg-brand font-display text-base text-white" : "bg-white text-brand"
          }`}
        >
          {token && initial ? initial : <User size={17} />}
        </span>
        <span className="hidden flex-col leading-tight xl:flex">
          <span className="text-[11px] text-muted">Hello,</span>
          <span className="text-sm font-semibold text-ink">
            {token ? name ?? "there" : "Sign in"}
          </span>
        </span>
        <ChevronDown
          size={15}
          className={`hidden text-muted transition-transform xl:block ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-72 animate-fade-up overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_24px_60px_-16px_rgba(86,30,42,0.35)]"
        >
          {token ? (
            <>
              {/* Wine header */}
              <div className="flex items-center gap-3 bg-brand p-4 text-white">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-dark font-display text-lg ring-2 ring-sun">
                  {initial ?? <User size={18} />}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[17px]">{fullName || "My account"}</p>
                  {user?.email && <p className="truncate text-xs text-white/75">{user.email}</p>}
                </div>
              </div>

              <div className="flex flex-col p-2">
                {LOGGED_IN_LINKS.map(({ to, label, icon, tone, badge }) => (
                  <Link key={label} to={to} role="menuitem" onClick={close} className={itemClass}>
                    <Chip icon={icon} tone={tone} />
                    {label}
                    {badge === "orders" && activeOrders > 0 && (
                      <span className="ml-auto rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-white">
                        {activeOrders}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="border-t border-line p-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    close();
                    onLogout();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-danger/20 p-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger-50"
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Wine header with the main action */}
              <div className="bg-brand p-4 text-white">
                <p className="font-display text-[17px]">Welcome to the bazar</p>
                <p className="mt-0.5 text-xs text-white/75">
                  Sign in for faster checkout and order tracking.
                </p>
                <Link
                  to="/login"
                  role="menuitem"
                  onClick={close}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-50"
                >
                  Sign in <ArrowRight size={15} />
                </Link>
              </div>

              <div className="flex flex-col p-2">
                {LOGGED_OUT_LINKS.map(({ to, label, icon, tone }) => (
                  <Link key={label} to={to} role="menuitem" onClick={close} className={itemClass}>
                    <Chip icon={icon} tone={tone} />
                    {label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
