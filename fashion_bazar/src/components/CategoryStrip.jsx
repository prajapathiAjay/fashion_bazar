import { Link } from "react-router-dom";
import { Shirt, Users, Baby, Footprints, Gem, Tag } from "lucide-react";

const CATEGORIES = [
  { to: "/categories/women", label: "Women", count: "480 items", icon: Shirt, bg: "#EEEDFE", fg: "#5B21B6" },
  { to: "/categories/men", label: "Men", count: "365 items", icon: Users, bg: "#E6F1FB", fg: "#185FA5" },
  { to: "/categories/kids", label: "Kids", count: "210 items", icon: Baby, bg: "#FBEAF0", fg: "#993556" },
  { to: "/categories/footwear", label: "Footwear", count: "195 items", icon: Footprints, bg: "#FAECE7", fg: "#993C1D" },
  { to: "/categories/jewelry", label: "Jewelry", count: "128 items", icon: Gem, bg: "#FAEEDA", fg: "#854F0B" },
  { to: "/categories/sale", label: "Sale", count: "Up to 50% off", icon: Tag, bg: "#FBEAF0", fg: "#993556" },
];

function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between lg:mb-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#9691A4]">
            Find your stall
          </p>
          <h2 className="font-display mt-1 text-2xl font-bold text-[#1B1523] sm:text-[28px]">
            Shop by category
          </h2>
        </div>
        <Link
          to="/categories"
          className="hidden text-sm font-semibold text-[#5B21B6] hover:text-[#3C3489] sm:block"
        >
          View all
        </Link>
      </div>

      {/* Mobile / tablet: snap-scroll row. Desktop: even grid */}
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map(({ to, label, count, icon: Icon, bg, fg }) => (
          <Link
            key={label}
            to={to}
            className="group flex shrink-0 basis-[132px] snap-start flex-col items-center gap-3 rounded-2xl border border-[#ECE9F1] bg-white px-4 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_10px_30px_rgba(27,21,35,0.08)] sm:basis-[150px] lg:basis-auto"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: bg }}
            >
              <Icon size={24} style={{ color: fg }} strokeWidth={1.75} />
            </span>
            <span>
              <p className="text-[15px] font-semibold text-[#1B1523]">{label}</p>
              <p className="mt-0.5 text-xs text-[#9691A4]">{count}</p>
            </span>
          </Link>
        ))}
      </div>

      {/* mobile-only "view all" link since desktop has it up top */}
      <Link
        to="/categories"
        className="mt-6 block text-center text-sm font-semibold text-[#5B21B6] sm:hidden"
      >
        View all categories
      </Link>
    </section>
  );
}

export default CategoryStrip;