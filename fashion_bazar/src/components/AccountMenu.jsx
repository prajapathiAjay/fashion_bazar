import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  KeyRound,
  LogIn,
  Lock,
  LogOut,
  MapPin,
  Package,
  User,
  UserPlus,
} from "lucide-react";

const LOGGED_IN_LINKS = [
  { to: "/account?tab=profile", label: "My profile", icon: User },
  { to: "/account", label: "My orders", icon: Package },
  { to: "/account?tab=password", label: "Change password", icon: Lock },
  { to: "/account?tab=addresses", label: "Addresses", icon: MapPin },
];

const LOGGED_OUT_LINKS = [
  { to: "/login", label: "Sign in", icon: LogIn },
  { to: "/register", label: "Create account", icon: UserPlus },
  { to: "/forgot-password", label: "Forgot password?", icon: KeyRound },
];

const itemClass =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-mist hover:text-ink";

// Account button + dropdown in the navbar (tablet and desktop; phones use the drawer)
function AccountMenu({ token, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

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
  const toggle = () => setOpen((v) => !v);
  const name = user?.firstName;
  const initial = name?.[0]?.toUpperCase();

  return (
    <div ref={wrapRef} className="relative max-sm:hidden">
      {/* Icon trigger (tablet / small desktop) */}
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={token ? "Account menu" : "Sign in menu"}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-50 xl:hidden"
      >
        <User size={20} />
      </button>

      {/* Pill trigger (large desktop) */}
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="ml-1 hidden items-center gap-2 rounded-full bg-ink py-2 pl-2 pr-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-hover hover:shadow-lg xl:flex"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs">
          {token && initial ? initial : <User size={14} />}
        </span>
        {token ? `Hi, ${name ?? "there"}` : "Sign in"}
        <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-64 animate-fade-up rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_-12px_rgba(27,21,35,0.25)]"
        >
          {token ? (
            <>
              <div className="flex items-center gap-3 border-b border-line px-3 pb-3 pt-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 font-semibold text-brand">
                  {initial ?? <User size={16} />}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">
                    {user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "My account"}
                  </p>
                  {user?.email && <p className="truncate text-xs text-subtle">{user.email}</p>}
                </div>
              </div>

              <div className="py-1">
                {LOGGED_IN_LINKS.map(({ to, label, icon: Icon }) => (
                  <Link key={label} to={to} role="menuitem" onClick={close} className={itemClass}>
                    <Icon size={16} className="text-subtle" />
                    {label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-line pt-1">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    close();
                    onLogout();
                  }}
                  className={`${itemClass} w-full text-danger hover:bg-danger-50 hover:text-danger`}
                >
                  <LogOut size={16} />
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="px-3 pb-2 pt-2 text-xs text-subtle">
                Sign in for faster checkout and order tracking.
              </p>
              {LOGGED_OUT_LINKS.map(({ to, label, icon: Icon }) => (
                <Link key={label} to={to} role="menuitem" onClick={close} className={itemClass}>
                  <Icon size={16} className="text-subtle" />
                  {label}
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AccountMenu;
