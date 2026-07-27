import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const TRUST_POINTS = [
  {
    icon: Truck,
    title: "Free shipping",
    desc: "On orders over $50",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    desc: "30-day return window",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    desc: "Encrypted payments",
  },
  {
    icon: Headphones,
    title: "Seller support",
    desc: "Real humans, 7 days a week",
  },
];

function TrustBadges() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 border-y border-[#ECE9F1] py-8 sm:grid-cols-4 sm:gap-6 lg:py-10">
        {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F7F6FA]">
              <Icon size={20} className="text-[#5B21B6]" strokeWidth={1.75} />
            </span>
            <span>
              <p className="text-sm font-semibold text-[#1B1523]">{title}</p>
              <p className="mt-0.5 text-xs text-[#9691A4]">{desc}</p>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustBadges;