import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";

function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#1B1523]">
        {/* ambient accents */}
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[#F5D488]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#5B21B6]/20 blur-3xl" />

        {/* ticket-style perforation edge */}
        <div className="absolute inset-y-0 right-[132px] hidden w-px border-l-2 border-dashed border-white/10 lg:block" />

        <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F5D488]/15 px-3 py-1 text-xs font-semibold text-[#F5D488]">
              <Clock size={13} />
              Ends Sunday
            </div>

            <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Bazar days are here
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">
              Up to 50% off across women's, men's and accessories — every
              stall, one sale.
            </p>

            <Link
              to="/deals"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#F5D488] px-6 py-3.5 text-sm font-semibold text-[#1B1523] transition-transform active:scale-[0.98]"
            >
              Shop the sale
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* stub / ticket callout */}
          <div className="flex shrink-0 items-center gap-6 border-t border-white/10 pt-8 lg:flex-col lg:items-start lg:gap-3 lg:border-t-0 lg:border-l lg:border-dashed lg:border-white/10 lg:pl-10 lg:pt-0">
            <div>
              <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                50<span className="text-2xl align-top text-[#F5D488]">%</span>
              </p>
              <p className="text-xs text-white/50">max discount</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-white sm:text-5xl">
                180<span className="text-2xl align-top text-[#F5D488]">+</span>
              </p>
              <p className="text-xs text-white/50">stalls participating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanner;