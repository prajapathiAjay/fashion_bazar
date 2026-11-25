import { Link } from "react-router-dom";
import { ArrowRight, Store, HandHeart, Sparkles, ShieldCheck } from "lucide-react";
import PageHeader from "../components/PageHeader";

const STATS = [
  { value: "500+", label: "Independent sellers" },
  { value: "20k+", label: "Happy shoppers" },
  { value: "120+", label: "Cities delivered to" },
  { value: "4.7★", label: "Average rating" },
];

const VALUES = [
  {
    icon: Store,
    title: "Small sellers first",
    desc: "Every stall on Fashion Bazar is run by a maker, a boutique or a small brand, not a warehouse.",
    tone: "bg-brand-50 text-brand",
  },
  {
    icon: Sparkles,
    title: "Fresh every week",
    desc: "New drops land every week, so the bazar never feels the same twice.",
    tone: "bg-sun-50 text-sun-dark",
  },
  {
    icon: ShieldCheck,
    title: "One safe checkout",
    desc: "Shop from many sellers and pay once, with secure payments and easy returns.",
    tone: "bg-mint-50 text-mint",
  },
  {
    icon: HandHeart,
    title: "Fair for everyone",
    desc: "Sellers keep 90% of every sale and get paid weekly. Shoppers get honest prices.",
    tone: "bg-pop-50 text-pop",
  },
];

function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow="About us" title="The whole bazar," accent="one checkout">
        Fashion Bazar brings hundreds of independent sellers together in one place, so you can
        discover clothes with character without walking a hundred lanes.
      </PageHeader>

      {/* Story */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-mist">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80"
            alt="A boutique clothing rail"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sun-dark">Our story</p>
          <h2 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">
            Started with a single stall
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              We grew up shopping in busy local bazars, where every stall had something you
              couldn't find anywhere else. The problem was finding them.
            </p>
            <p>
              Fashion Bazar puts those stalls online. Sellers set up shop in minutes, and shoppers
              browse, compare and buy from all of them with a single cart.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-sun sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">What we stand for</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, desc, tone }) => (
            <div key={title} className="rounded-3xl border border-line bg-white p-6">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
                <Icon size={22} />
              </span>
              <p className="mt-4 text-[15px] font-bold text-ink">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-5 rounded-3xl bg-brand-gradient p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <div>
            <p className="font-display text-2xl font-bold text-white">Come take a walk through the bazar</p>
            <p className="mt-1 text-sm text-white/80">New stalls and new drops every week.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/categories"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink"
            >
              Start shopping
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/sell"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Become a seller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
