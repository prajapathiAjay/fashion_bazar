import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { PHOTOS, unsplash } from "../assets/images";

const CATEGORIES = [
  { to: "/categories/women", label: "Women", count: "480 items", photo: PHOTOS.womanPlaid, bg: "#EEEDFE" },
  { to: "/categories/men", label: "Men", count: "365 items", photo: PHOTOS.menswearFlatlay, bg: "#E6F1FB" },
  { to: "/categories/kids", label: "Kids", count: "210 items", photo: PHOTOS.kidRaincoat, bg: "#FBEAF0" },
  { to: "/categories/footwear", label: "Footwear", count: "195 items", photo: PHOTOS.sneakers, bg: "#FAECE7" },
  { to: "/categories/jewelry", label: "Jewelry", count: "128 items", photo: PHOTOS.goldBangle, bg: "#FAEEDA" },
  { to: "/categories/sale", label: "Sale", count: "Up to 50% off", photo: PHOTOS.shopper, bg: "#FBEAF0", accent: true },
];

function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between lg:mb-8">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-brand">
            <span className="h-px w-8 bg-brand" />
            Find your stall
          </p>
          <h2 className="font-display mt-4 text-3xl font-medium text-ink sm:text-[42px] sm:leading-tight">
            Shop by category
          </h2>
        </div>
        <Link
          to="/categories"
          className="hidden border-b border-ink pb-0.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-brand hover:text-brand sm:block"
        >
          View all
        </Link>
      </div>

      {/* Mobile / tablet: snap-scroll row. Desktop: even grid */}
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map(({ to, label, count, photo, bg, accent }) => (
          <Link
            key={label}
            to={to}
            className="group relative block aspect-[3/4] shrink-0 basis-[150px] snap-start overflow-hidden rounded-2xl transition-shadow hover:shadow-[0_14px_36px_rgba(27,21,35,0.16)] sm:basis-[180px] lg:basis-auto"
          >
            <SmartImage
              src={unsplash(photo, 360, 480)}
              alt={`${label} category`}
              bg={bg}
              className="absolute inset-0"
              imgClassName="transition-transform duration-700 group-hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            {accent && (
              <span className="absolute left-3 top-3 rounded-full bg-sun px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink">
                Hot
              </span>
            )}
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight size={15} />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="block text-base font-semibold text-white">{label}</span>
              <span className={`mt-0.5 block text-xs ${accent ? "text-sun" : "text-white/70"}`}>
                {count}
              </span>
            </span>
          </Link>
        ))}
      </div>

      {/* mobile-only "view all" link since desktop has it up top */}
      <Link
        to="/categories"
        className="mt-6 block text-center text-sm font-semibold text-brand sm:hidden"
      >
        View all categories
      </Link>
    </section>
  );
}

export default CategoryStrip;