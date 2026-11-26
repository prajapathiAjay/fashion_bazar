import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, LayoutGrid, Percent, ShoppingBag, User } from "lucide-react";
import { useGetCartItemsQuery } from "../lib/api/cartApi";

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/products", label: "Shop", icon: LayoutGrid },
  { to: "/deals", label: "Deals", icon: Percent },
  { to: "/cart", label: "Bag", icon: ShoppingBag, showBagCount: true },
  { to: "/account", label: "Account", icon: User },
];

// App-style bottom navigation for phones and small tablets.
function MobileTabBar() {
  // same count as the navbar bag icon (number of lines in the bag)
  const token = useSelector((state) => state.auth.token);
  const { data: cartItems } = useGetCartItemsQuery(undefined, { skip: !token });
  const bagCount = token ? cartItems?.length ?? 0 : 0;

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex h-16 max-w-md items-stretch justify-around px-2">
        {TABS.map(({ to, label, icon: Icon, end, showBagCount }) => {
          const badge = showBagCount ? bagCount : 0;
          return (
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
          );
        })}
      </ul>
    </nav>
  );
}

export default MobileTabBar;
