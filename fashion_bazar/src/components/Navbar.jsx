import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Truck,
  Store,
} from "lucide-react";
import SmartImage from "./SmartImage";
import { PHOTOS, unsplash } from "../assets/images";
import {useGetCategoryQuery} from "../lib/api/categoryApi";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/categories", label: "Categories", mega: true },
  { to: "/new-arrivals", label: "New In" },
  { to: "/deals", label: "Deals", hot: true },
];

const MEGA_CATEGORIES = [
  { to: "/categories/women", label: "Women", note: "Dresses, tops, knits", photo: PHOTOS.womanPlaid, tone: "bg-pop-50" },
  { to: "/categories/men", label: "Men", note: "Shirts, suits, outerwear", photo: PHOTOS.menswearFlatlay, tone: "bg-sky-50" },
  { to: "/categories/kids", label: "Kids", note: "Play-ready & comfy", photo: PHOTOS.kidRaincoat, tone: "bg-sun-50" },
  { to: "/categories/footwear", label: "Footwear", note: "Sneakers, heels, loafers", photo: PHOTOS.sneakers, tone: "bg-coral-50" },
  { to: "/categories/jewelry", label: "Jewelry", note: "Hoops, bangles, pearls", photo: PHOTOS.goldBangle, tone: "bg-mint-50" },
  { to: "/categories/accessories", label: "Accessories", note: "Bags, scarves & more", photo: PHOTOS.wovenTote, tone: "bg-brand-50" },
];

const ANNOUNCEMENTS = [
  "Free shipping on orders over ₹999 — this week only",
  "Bazar days: up to 50% off across 180+ stalls",
  "New drops land every Friday at 10am",
];

const POPULAR_SEARCHES = ["Midi dress", "Loafers", "Gold hoops", "Tote bag", "Linen"];

function CountBadge({ count, className }) {
  if (!count) return null;
  return (
    <span
      className={`absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold ring-2 ring-white ${className}`}
    >
      {count}
    </span>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcement, setAnnouncement] = useState(0);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const megaTimer = useRef(null);
 const { data: categories } = useGetCategoryQuery();
  // Small delay so the menu survives the mouse travelling from button to panel
  const openMega = () => {
    clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const closeMegaSoon = () => {
    clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(megaTimer.current);
    };
  }, []);

  // placeholder counts until the cart / wishlist store is wired up
  const cartCount = 2;
  const wishlistCount = 3;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setAnnouncement((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  // Lock page scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileSearchOpen(false);
  };

  const runSearch = (term) => {
    const q = term.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    closeAll();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  const isCategoryRoute = pathname.startsWith("/categories");

  const desktopLinkClass = ({ isActive }) =>
    `relative flex items-center gap-1 px-3 py-2 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 ${
      isActive ? "text-brand after:scale-x-100" : "text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-colors ${
      isActive ? "bg-brand-50 text-brand" : "text-ink hover:bg-mist"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-[0_8px_30px_-12px_rgba(26,16,51,0.18)]" : "border-b border-line"
      }`}
    >
      {/* Announcement bar */}
      <div className="hidden bg-ink text-white sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs font-semibold lg:px-8">
          <span className="flex items-center gap-1.5 text-white/90">
            <Truck size={14} /> Ships from 1,200+ stalls
          </span>
          <p key={announcement} className="flex animate-fade-up items-center gap-2" aria-live="polite">
            <span className="rounded-full bg-sun px-2 py-0.5 text-[10px] font-bold uppercase text-ink">Hot</span>
            {ANNOUNCEMENTS[announcement]}
          </p>
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/account" className="text-white/90 hover:text-white">
              Track order
            </Link>
            <Link to="/sell" className="flex items-center gap-1 text-white/90 hover:text-white">
              <Store size={13} /> Sell on Bazar
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[76px] lg:px-8">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-ink active:bg-brand-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link to="/" onClick={closeAll} className="flex shrink-0 items-center" aria-label="Fashion Bazar home">
          <span className="font-display text-[24px] font-semibold tracking-tight text-ink lg:text-[27px]">
            Fashion<span className="text-gradient">Bazar</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) =>
            link.mega ? (
              <div
                key={link.to}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMegaSoon}
              >
                <button
                  type="button"
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  className={desktopLinkClass({ isActive: isCategoryRoute })}
                >
                  {link.label}
                  <ChevronDown size={15} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={closeAll}
                className={desktopLinkClass}
              >
                {link.label}
                {link.hot && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pop" />}
              </NavLink>
            )
          )}
        </nav>

        {/* Desktop search */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="hidden max-w-xs flex-1 items-center rounded-full border border-line bg-mist px-4 py-2.5 transition-all focus-within:border-brand/40 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/10 lg:flex xl:max-w-sm"
        >
          <Search size={17} className="shrink-0 text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, shoes, stalls…"
            aria-label="Search products"
            className="ml-2.5 w-full bg-transparent text-sm text-ink outline-none placeholder:text-subtle"
          />
        </form>

        {/* Action icons */}
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-50 lg:hidden"
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
          >
            {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link
            to="/account?tab=wishlist"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-pop-50 hover:text-pop sm:flex"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <span className="relative">
              <Heart size={20} />
              <CountBadge count={wishlistCount} className="bg-pop text-white" />
            </span>
          </Link>

          <Link
            to="/cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-50"
            aria-label={`Bag, ${cartCount} items`}
          >
            <span className="relative">
              <ShoppingBag size={20} />
              <CountBadge count={cartCount} className="bg-sun text-ink" />
            </span>
          </Link>

          <Link
            to="/login"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-50 max-sm:hidden xl:hidden"
            aria-label="Sign in"
          >
            <User size={20} />
          </Link>
          <Link
            to="/login"
            className="ml-1 hidden items-center gap-2 rounded-full bg-ink py-2 pl-2 pr-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink-hover hover:shadow-lg xl:flex"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
              <User size={14} />
            </span>
            Sign in
          </Link>
        </div>
      </div>

      {/* Desktop mega menu */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMegaSoon}
        className={`absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_30px_60px_-20px_rgba(26,16,51,0.25)] transition-all duration-200 lg:block ${
          megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-8 py-8">
          <div className="col-span-8">
            <p className="text-xs font-bold uppercase tracking-wider text-subtle">Shop by category</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {categories?.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`categories/${cat.slug}`}
                  onClick={closeAll}
                  className={`group flex items-center gap-3 rounded-2xl p-2.5 pr-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${cat.tone}`}
                >
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <SmartImage
                      // src={unsplash(cat?.image, 120, 120)}
                      src={cat?.image}
                      alt=""
                      imgClassName="transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-sm font-bold text-ink">
                      {cat.categoryName}
                      <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="block truncate text-xs text-muted">{cat.description}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm">
              <span className="text-subtle">Trending:</span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => runSearch(term)}
                  className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/deals"
            onClick={closeAll}
            className="group relative col-span-4 overflow-hidden rounded-3xl"
          >
            <SmartImage
              src={unsplash(PHOTOS.shopper, 520, 360)}
              alt="Bazar days sale"
              className="absolute inset-0"
              imgClassName="transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <span className="absolute right-4 top-4 rotate-12 rounded-full bg-pop px-3 py-1.5 text-xs font-extrabold text-white shadow-lg">
              -50%
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-sun">Bazar days</span>
              <span className="mt-1 block font-display text-2xl font-extrabold text-white">
                Up to half off
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-white">
                Shop the sale <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile / tablet search */}
      {mobileSearchOpen && (
        <div className="border-t border-line px-4 pb-4 pt-3 lg:hidden">
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex items-center rounded-full border border-line bg-mist px-4 py-2.5 focus-within:border-brand/40 focus-within:bg-white"
          >
            <Search size={17} className="text-subtle" />
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dresses, shoes, stalls…"
              aria-label="Search products"
              className="ml-2.5 w-full bg-transparent text-sm text-ink outline-none placeholder:text-subtle"
            />
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => runSearch(term)}
                className="rounded-full bg-mist px-3 py-1.5 text-xs font-medium text-ink-soft"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative overflow-hidden bg-ink px-5 pb-6 pt-5 text-white">
            <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sun/40 blur-2xl" />
            <div className="relative flex items-center justify-between">
              <span className="font-display text-2xl font-semibold">Fashion<span className="italic text-sun">Bazar</span></span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <p className="relative mt-4 text-sm text-white/85">Welcome! Sign in for faster checkout and order tracking.</p>
            <Link
              to="/login"
              onClick={closeAll}
              className="relative mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink"
            >
              Sign in / Join <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.filter((l) => !l.mega).map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={closeAll}
                  className={mobileLinkClass}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.hot && (
                      <span className="rounded-full bg-pop px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                        Sale
                      </span>
                    )}
                  </span>
                  <ChevronRight size={16} className="text-faint" />
                </NavLink>
              ))}
            </nav>

            <p className="mb-2 mt-6 px-4 text-xs font-bold uppercase tracking-wider text-subtle">Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {categories?.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/categories/${cat.slug}`}
                  onClick={closeAll}
                  className={`flex min-w-0 items-center gap-2 rounded-2xl p-1.5 `}
                >
                  <span className="h-9 w-9 shrink-0 overflow-hidden rounded-xl">
                    {/* <SmartImage src={unsplash(cat.photo, 80, 80)} alt="" /> */}
                    <SmartImage src={cat.image} alt="" />
                  </span>
                  <span className="min-w-0 truncate text-sm font-semibold text-ink">{cat.categoryName}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <Link
                to="/account?tab=wishlist"
                onClick={closeAll}
                className="flex items-center justify-center gap-2 rounded-full border border-line py-3 text-sm font-semibold text-ink hover:bg-mist"
              >
                <Heart size={16} className="text-pop" /> Wishlist
              </Link>
              <Link
                to="/account"
                onClick={closeAll}
                className="flex items-center justify-center gap-2 rounded-full border border-line py-3 text-sm font-semibold text-ink hover:bg-mist"
              >
                <User size={16} className="text-brand" /> Account
              </Link>
            </div>
          </div>

          <div className="border-t border-line px-5 py-4">
            <Link
              to="/deals"
              onClick={closeAll}
              className="flex items-center gap-3 rounded-2xl bg-sun-50 p-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sun">
                <Sparkles size={18} className="text-ink" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">Bazar days are live</span>
                <span className="block text-xs text-muted">Up to 50% off — ends Sunday</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
