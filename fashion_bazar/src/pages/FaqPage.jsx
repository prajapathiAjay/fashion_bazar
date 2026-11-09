import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageHeader from "../components/PageHeader";

const FAQ_SECTIONS = [
  {
    id: "orders",
    title: "Orders & payment",
    items: [
      {
        q: "How do I track my order?",
        a: "Go to Account → Orders and open the order. You'll see its status and the courier tracking link once it ships.",
      },
      {
        q: "Which payment methods do you accept?",
        a: "UPI, RuPay, Visa, Mastercard, net banking and cash on delivery (on eligible orders).",
      },
      {
        q: "Can I order from more than one seller at once?",
        a: "Yes. Add items from any sellers to one cart and pay once. Items from different sellers may arrive in separate parcels.",
      },
      {
        q: "Can I cancel my order?",
        a: "You can cancel from Account → Orders any time before the seller ships it. Your refund starts right away.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & returns",
    items: [
      {
        q: "How much is delivery?",
        a: "Delivery is free on orders over ₹999. Below that, a small delivery fee is shown at checkout.",
      },
      {
        q: "How long does delivery take?",
        a: "Most orders arrive in 3–7 working days, depending on your city and the seller's location.",
      },
      {
        q: "What is your return policy?",
        a: "You can return most items within 30 days of delivery if they're unused and have their tags on. Start a return from Account → Orders.",
      },
      {
        q: "When will I get my refund?",
        a: "Once the seller receives your return, refunds reach UPI and cards in 5–7 working days. Cash on delivery orders are refunded to your bank account.",
      },
    ],
  },
  {
    id: "selling",
    title: "Selling on Fashion Bazar",
    items: [
      {
        q: "How much does it cost to sell?",
        a: "There's no listing fee or monthly charge. We take a flat 10% commission on each sale, so you keep 90%.",
      },
      {
        q: "When do sellers get paid?",
        a: "Payouts go to your bank account every week for all delivered orders that are past the return window.",
      },
      {
        q: "Do I need a GSTIN to sell?",
        a: "Only if your turnover is above the GST registration limit. A PAN card and bank account are enough to start.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <div>
      <PageHeader eyebrow="Help centre" title="Frequently asked" accent="questions">
        Quick answers about orders, delivery, returns and selling.
      </PageHeader>

      {/* Section jump links */}
      <nav className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 px-5 pt-10">
        {FAQ_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
          >
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mx-auto max-w-3xl space-y-12 px-5 py-12 sm:px-6 lg:py-16">
        {FAQ_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold text-ink sm:text-2xl">{section.title}</h2>
            <div className="mt-4 divide-y divide-line rounded-3xl border border-line bg-white">
              {section.items.map((item) => (
                <details key={item.q} className="group px-5 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-subtle transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div className="rounded-3xl bg-mist p-6 text-center sm:p-8">
          <p className="font-display text-xl font-bold text-ink">Still need help?</p>
          <p className="mt-1 text-sm text-muted">Our support team replies within one working day.</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-hover"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FaqPage;
