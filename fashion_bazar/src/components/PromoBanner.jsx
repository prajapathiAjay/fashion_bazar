import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PHOTOS, unsplash } from "../assets/images";
import { useGetProductsQuery } from "../lib/api/productApi";

function PromoBanner() {
  const { data } = useGetProductsQuery({ onSale: true, limit: 1 });
  const onSaleCount = data?.total ?? 0;
  // no discounted products -> no sale banner
  if (!onSaleCount) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-ink">
        {/* photo, fading into the dark panel on the left */}
        <img
          src={unsplash(PHOTOS.rackKnit, 1100, 600)}
          alt=""
          loading="lazy"
          className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover opacity-30 sm:w-3/4 sm:opacity-60"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/30" />

        {/* ambient accents */}
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-sun/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />

        {/* ticket-style perforation edge */}
        <div className="absolute inset-y-0 right-[132px] hidden w-px border-l-2 border-dashed border-white/10 lg:block" />

        <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div className="max-w-lg">
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Bazar days are here
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              Discounted pieces from across the bazar — every stall, one checkout.
            </p>

            <Link
              to="/deals"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-sm font-semibold text-ink transition-transform active:scale-[0.98]"
            >
              Shop the sale
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* real number of products on sale right now */}
          <div className="flex shrink-0 items-center gap-6 border-t border-white/10 pt-8 lg:flex-col lg:items-start lg:gap-3 lg:border-t-0 lg:border-l lg:border-dashed lg:border-white/10 lg:pl-10 lg:pt-0">
            <div>
              <p className="font-display text-4xl font-bold text-white sm:text-5xl">{onSaleCount}</p>
              <p className="text-xs text-white/50">{onSaleCount === 1 ? "item" : "items"} on sale</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;