import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Wallet,
  Percent,
  Truck,
  UserPlus,
  PackagePlus,
  BadgeIndianRupee,
  Check,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const BENEFITS = [
  { icon: Users, title: "20k+ shoppers", desc: "Get in front of buyers already looking for fashion like yours." },
  { icon: Percent, title: "Keep 90%", desc: "A flat 10% commission. No listing fees, no monthly rent." },
  { icon: Wallet, title: "Weekly payouts", desc: "Money from every sale lands in your bank account each week." },
  { icon: Truck, title: "We handle delivery", desc: "Pack the order, and our courier partners pick it up from you." },
];

const STEPS = [
  { icon: UserPlus, title: "Create your account", desc: "Sign up with your phone number, GSTIN (optional) and bank details." },
  { icon: PackagePlus, title: "List your products", desc: "Add photos, sizes and prices. Your stall goes live after a quick review." },
  { icon: BadgeIndianRupee, title: "Start earning", desc: "Ship orders as they come in and get paid every week." },
];

const REQUIREMENTS = [
  "A bank account in your or your business's name",
  "PAN card (GSTIN needed only above the GST limit)",
  "Clear photos of your products",
  "A pickup address for orders",
];

function SellPage() {
  return (
    <div>
      <PageHeader eyebrow="Become a seller" title="Got a stall?" accent="Open it online.">
        Join hundreds of makers, boutiques and small brands selling on Fashion Bazar. Setup takes
        about 10 minutes.
      </PageHeader>

      <div className="-mt-6 flex justify-center px-5">
        <Link
          to="/register"
          className="group relative inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Start selling
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">Why sell with us</h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl border border-line bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                <Icon size={22} />
              </span>
              <p className="mt-4 text-[15px] font-bold text-ink">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-snow">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">How it works</h2>
          <ol className="mt-10 grid gap-6 lg:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative rounded-3xl border border-line bg-white p-6">
                <span className="absolute right-6 top-6 font-display text-4xl font-bold text-line-strong">
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun-50 text-sun-dark">
                  <Icon size={22} />
                </span>
                <p className="mt-4 text-[15px] font-bold text-ink">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requirements + CTA */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">What you'll need</h2>
          <ul className="mt-5 space-y-3">
            {REQUIREMENTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-3xl bg-brand-gradient p-6 text-white sm:p-8">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Have questions first?</h2>
            <p className="mt-2 text-sm text-white/80">
              Our seller team will walk you through fees, shipping and setup.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink">
              Talk to us
            </Link>
            <Link
              to="/help/faq"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Read FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SellPage;
