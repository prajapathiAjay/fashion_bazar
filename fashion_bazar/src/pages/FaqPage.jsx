import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { useGetFaqsQuery } from "../lib/api/faqApi";

// Short ids for the #jump links. Other pages link to these (Footer: /help/faq#shipping),
// so keep them stable. A new topic gets an id made from its name.
const SECTION_IDS = {
  "Orders & payment": "orders",
  "Shipping & returns": "shipping",
  "Selling on Fashion Bazar": "selling",
  Account: "account",
};
const sectionId = (title) =>
  SECTION_IDS[title] ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function FaqPage() {
  const { data, isLoading, isError, refetch } = useGetFaqsQuery();
  const { hash } = useLocation();

  // The questions arrive after the page opens, so ScrollToTop can't find #shipping yet.
  // Scroll to it here once they have loaded.
  useEffect(() => {
    if (!hash || !data) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash, data]);

  // group the questions under their topic, in the topic order the admin panel uses;
  // topics with no published questions are left out
  const sections = (data?.topics ?? [])
    .map((title) => ({
      id: sectionId(title),
      title,
      items: (data?.faqs ?? []).filter((f) => f.topic === title),
    }))
    .filter((s) => s.items.length > 0);

  return (
    <div>
      <PageHeader eyebrow="Help centre" title="Frequently asked" accent="questions">
        Quick answers about orders, delivery, returns and selling.
      </PageHeader>

      {/* Section jump links */}
      {sections.length > 1 && (
      <nav className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 px-5 pt-10">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
          >
            {s.title}
          </a>
        ))}
      </nav>
      )}

      <div className="mx-auto max-w-3xl space-y-12 px-5 py-12 sm:px-6 lg:py-16">
        {isLoading && (
          <div className="space-y-3" aria-busy="true" aria-label="Loading questions">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-2xl bg-mist" />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-3xl border border-line bg-white p-6 text-center">
            <p className="text-sm text-muted">We couldn&apos;t load the questions right now.</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-3 text-sm font-semibold text-brand hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && sections.length === 0 && (
          <p className="text-center text-sm text-muted">No questions here yet. Our team is happy to help directly.</p>
        )}

        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-bold text-ink sm:text-2xl">{section.title}</h2>
            <div className="mt-4 divide-y divide-line rounded-3xl border border-line bg-white">
              {section.items.map((item) => (
                <details key={item._id} className="group px-5 sm:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-subtle transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
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
