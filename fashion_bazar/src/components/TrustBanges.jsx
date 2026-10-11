import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const TRUST_POINTS = [
  {
    icon: Truck,
    title: "Free shipping",
    desc: "On orders over $50",
    tone: "bg-brand-50 text-brand",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    desc: "30-day return window",
    tone: "bg-pop-50 text-pop",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    desc: "Encrypted payments",
    tone: "bg-mint-50 text-mint",
  },
  {
    icon: Headphones,
    title: "Seller support",
    desc: "Real humans, 7 days a week",
    tone: "bg-sun-50 text-sun-dark",
  },
];

function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {TRUST_POINTS.map(({ icon: Icon, title, desc, tone }) => (
          <div
            key={title}
            className="group flex flex-col items-start gap-4 rounded-3xl border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(26,16,51,0.08)] sm:flex-row sm:items-center sm:p-6"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${tone}`}
            >
              <Icon size={22} strokeWidth={2} />
            </span>
            <span>
              <p className="text-[15px] font-bold text-ink">{title}</p>
              <p className="mt-0.5 text-xs text-subtle">{desc}</p>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBadges;