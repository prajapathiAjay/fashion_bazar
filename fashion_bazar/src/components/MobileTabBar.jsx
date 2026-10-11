import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, Percent, ShoppingBag, User } from "lucide-react";

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/products", label: "Shop", icon: LayoutGrid },
  { to: "/deals", label: "Deals", icon: Percent },
  { to: "/cart", label: "Bag", icon: ShoppingBag, badge: 2 },
  { to: "/account", label: "Account", icon: User },
];

// App-style bottom navigation for phones and small tablets.
function MobileTabBar() {
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto flex h-16 max-w-md items-stretch justify-around px-2">
        {TABS.map(({ to, label, icon: Icon, end, badge }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `group flex h-full flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors ${
                  isActive ? "text-brand" : "text-subtle hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`relative flex h-8 w-12 items-center justify-center rounded-full transition-all ${
                      isActive ? "bg-brand-50" : ""
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                    {badge ? (
                      <span className="absolute right-1 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-pop px-1 text-[9px] font-bold text-white ring-2 ring-white">
                        {badge}
                      </span>
                    ) : null}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MobileTabBar;
