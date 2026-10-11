import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import SmartImage from "./SmartImage";
import { PHOTOS, unsplash } from "../assets/images";

const TICKER_ITEMS = [
  "Free shipping over $50",
  "New arrivals every Friday",
  "1,200+ independent stalls",
  "Complimentary 30-day returns",
  "Secure checkout",
];

const HIGHLIGHTS = [
  { value: "1,200+", label: "Independent stalls" },
  { value: "4.8", label: "Average rating", star: true },
  { value: "48h", label: "Average delivery" },
];

function Ticker() {
  // Four copies: the marquee shifts by exactly half (two copies), so the loop is seamless
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-ink bg-ink py-3">
      <div className="flex w-max animate-marquee items-center [animation-duration:40s] [backface-visibility:hidden] [will-change:transform] hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-8 text-xs font-medium uppercase tracking-[0.25em] text-white [-webkit-font-smoothing:subpixel-antialiased]">{item}</span>
            <span className="text-sun" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist">
      {/* Soft champagne wash behind the imagery */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-sun-50 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-6 md:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* ---------------- Copy ---------------- */}
          <div className="animate-fade-up lg:col-span-5">
            <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-brand">
              <span className="h-px w-10 bg-brand" />
              Autumn / Winter 2026
            </p>

            <h1 className="mt-6 text-[46px] font-medium leading-[1.04] text-ink sm:text-6xl lg:text-[64px] xl:text-[74px]">
              Every stall,
              <br />
              one <span className="text-gradient">beautiful</span>
              <br />
              address.
            </h1>

            <p className="mt-7 max-w-md text-[17px] font-light leading-relaxed text-muted lg:text-lg">
              Discover considered fashion from hundreds of independent ateliers and makers — curated,
              collected and delivered in a single checkout.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand"
              >
                Shop the collection
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/new-arrivals"
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium uppercase tracking-[0.15em] text-ink transition-colors hover:border-brand hover:text-brand"
              >
                New arrivals
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 divide-x divide-line-strong border-t border-line-strong pt-6">
              {HIGHLIGHTS.map(({ value, label, star }) => (
                <div key={label} className="px-4 first:pl-0">
                  <dt className="sr-only">{label}</dt>
                  <dd className="flex items-center gap-1 font-display text-2xl text-ink sm:text-[28px]">
                    {value}
                    {star && <Star size={15} className="fill-sun text-sun" />}
                  </dd>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.15em] text-subtle">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------------- Editorial imagery ---------------- */}
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-12 gap-4 sm:gap-5">
              {/* Main look */}
              <Link
                to="/categories/women"
                className="group relative col-span-8 aspect-[4/5] overflow-hidden rounded-sm"
              >
                <SmartImage
                  src={unsplash(PHOTOS.womanCoat, 720, 900)}
                  alt="Woman in a pale blue tailored coat"
                  bg="var(--color-shimmer)"
                  fetchPriority="high"
                  imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-x-0 top-0 bg-gradient-to-b from-ink/55 to-transparent p-5 pb-20 sm:p-6 sm:pb-24">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-white/75">
                    Look 01 · Women
                  </span>
                  <span className="mt-1 flex items-center gap-2 font-display text-xl text-white sm:text-2xl">
                    The tailored coat edit
                    <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>

              {/* Side column */}
              <div className="col-span-4 flex flex-col gap-4 sm:gap-5">
                <Link to="/categories/men" className="group relative aspect-[3/4] overflow-hidden rounded-sm">
                  <SmartImage
                    src={unsplash(PHOTOS.manSuit, 400, 540)}
                    alt="Man in a navy suit"
                    bg="var(--color-shimmer)"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink">
                    Men
                  </span>
                </Link>
                <Link to="/categories/jewelry" className="group relative flex-1 overflow-hidden rounded-sm">
                  <SmartImage
                    src={unsplash(PHOTOS.goldHoops, 400, 400)}
                    alt="Gold twisted hoop earrings"
                    bg="var(--color-shimmer)"
                    className="absolute inset-0"
                    imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 bg-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink">
                    Jewelry
                  </span>
                </Link>
              </div>
            </div>

            {/* Featured product card */}
            <Link
              to="/products/p1"
              className="group absolute -bottom-6 left-4 hidden items-center gap-4 bg-white sm:flex p-3 pr-5 shadow-[0_24px_60px_-20px_rgba(28,23,20,0.35)] transition-transform hover:-translate-y-1 sm:left-8"
            >
              <span className="h-16 w-12 overflow-hidden">
                <SmartImage src={unsplash(PHOTOS.floralDress, 120, 160)} alt="" bg="var(--color-shimmer)" />
              </span>
              <span>
                <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-subtle">
                  Most loved
                </span>
                <span className="block font-display text-[15px] text-ink">Draped midi dress</span>
                <span className="block text-sm text-ink">
                  $48 <span className="ml-1 text-xs text-faint line-through">$64</span>
                </span>
              </span>
              <ArrowRight size={16} className="ml-2 text-ink transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Vertical editorial caption */}
            <p className="absolute -right-2 top-1/2 hidden origin-center -translate-y-1/2 translate-x-1/2 rotate-90 text-[10px] font-medium uppercase tracking-[0.4em] text-subtle xl:block">
              Fashion Bazar — Est. 2021
            </p>
          </div>
        </div>
      </div>

      <Ticker />
    </section>
  );
}

export default Hero;
