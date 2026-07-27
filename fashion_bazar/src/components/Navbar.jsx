import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/deals", label: "Deals" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const cartCount = 2;
  const wishlistCount = 3;

  const desktopLinkClass = ({ isActive }) =>
    `relative py-2 text-[15px] font-medium tracking-tight transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#5B21B6] after:to-[#C026D3] after:transition-all after:duration-300 ${
      isActive
        ? "text-[#1B1523] after:w-full"
        : "text-[#6B6478] hover:text-[#1B1523] after:w-0 hover:after:w-full"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
      isActive ? "bg-[#F4F1FA] text-[#5B21B6]" : "text-[#3A3547] hover:bg-[#F7F6FA]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#ECE9F1] bg-white/85 backdrop-blur-xl">
      {/* Announcement strip — dropped on very small screens to save space */}
      <div className="hidden items-center justify-center gap-2 bg-[#1B1523] py-2 text-xs font-medium tracking-wide text-[#F5D488] sm:flex">
        <span className="h-1 w-1 rounded-full bg-[#F5D488]" />
        Free shipping on orders over $50 — this week only
      </div>

      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-[#1B1523] active:bg-[#F4F1FA] lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-center">
          <span className="font-display text-2xl font-bold tracking-tight text-[#1B1523] lg:text-[28px]">
            Nova
          </span>
          <span className="relative font-display text-2xl font-bold tracking-tight text-[#5B21B6] lg:text-[28px]">
            Mart
            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-[#F5D488] shadow-[0_0_8px_2px_rgba(245,212,136,0.65)] transition-transform duration-300 group-hover:scale-150" />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop search */}
        <div className="hidden max-w-xs flex-1 items-center rounded-full border border-[#ECE9F1] bg-[#F7F6FA] px-4 py-2.5 transition-colors focus-within:border-[#5B21B6]/40 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#5B21B6]/10 lg:flex xl:max-w-sm">
          <Search size={17} className="shrink-0 text-[#9691A4]" />
          <input
            type="text"
            placeholder="Search products..."
            className="ml-2.5 w-full bg-transparent text-sm text-[#1B1523] outline-none placeholder:text-[#9691A4]"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1B1523] transition-colors hover:bg-[#F4F1FA] lg:hidden"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[#1B1523] transition-colors hover:bg-[#F4F1FA] sm:flex"
            aria-label="Wishlist"
          >
            <span className="relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5B21B6] text-[10px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </span>
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#1B1523] transition-colors hover:bg-[#F4F1FA]"
            aria-label="Cart"
          >
            <span className="relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-[#F5D488] to-[#E8B93F] text-[10px] font-bold text-[#1B1523]">
                  {cartCount}
                </span>
              )}
            </span>
          </button>

          <button
            className="hidden h-10 w-10 items-center justify-center rounded-full text-[#1B1523] transition-colors hover:bg-[#F4F1FA] sm:flex"
            aria-label="Account"
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Mobile / tablet search — expands under the header */}
      {mobileSearchOpen && (
        <div className="border-t border-[#ECE9F1] px-4 py-3 lg:hidden">
          <div className="flex items-center rounded-full border border-[#ECE9F1] bg-[#F7F6FA] px-4 py-2.5">
            <Search size={17} className="text-[#9691A4]" />
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              className="ml-2.5 w-full bg-transparent text-sm text-[#1B1523] outline-none placeholder:text-[#9691A4]"
            />
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-[#1B1523]/40 backdrop-blur-sm"
        />
        <div
          className={`absolute left-0 top-0 h-full w-[82%] max-w-xs bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-[#ECE9F1] px-5">
            <span className="font-display text-xl font-bold text-[#1B1523]">
              Nova<span className="text-[#5B21B6]">Mart</span>
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#1B1523] hover:bg-[#F4F1FA]"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={mobileLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-2 flex gap-2 border-t border-[#ECE9F1] px-5 py-4">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ECE9F1] py-2.5 text-sm font-medium text-[#1B1523]">
              <Heart size={16} /> Wishlist
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#ECE9F1] py-2.5 text-sm font-medium text-[#1B1523]">
              <User size={16} /> Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;