import { Link } from "react-router-dom";
import PageHeader from "./PageHeader";
import { CONTACT_INFO } from "../utils/contactInfo";

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy policy" },
  { to: "/terms", label: "Terms of service" },
  { to: "/cookies", label: "Cookies" },
];

const supportEmail = CONTACT_INFO.find((c) => c.type === "email");

// Shared layout for Privacy, Terms and Cookies pages.
// sections: [{ id, title, body: [string | string[]] }] — a string is a paragraph, an array is a bullet list.
function LegalPage({ title, accent, intro, updated, sections, current }) {
  return (
    <div>
      <PageHeader eyebrow="Legal" title={title} accent={accent}>
        {intro}
      </PageHeader>

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 lg:py-16">
        {/* Contents: horizontal chips on mobile, sticky sidebar on desktop */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-subtle">On this page</p>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            {sections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="shrink-0 rounded-full border border-line-strong bg-white px-3 py-1.5 text-sm text-ink-soft transition-colors hover:border-brand hover:text-brand lg:rounded-lg lg:border-0 lg:bg-transparent lg:px-2"
              >
                {i + 1}. {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="mt-8 lg:mt-0">
          <p className="text-sm text-muted">Last updated: {updated}</p>

          <div className="mt-6 space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-lg font-bold text-ink sm:text-xl">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
                  {s.body.map((block, j) =>
                    Array.isArray(block) ? (
                      <ul key={j} className="list-disc space-y-1.5 pl-5 marker:text-brand">
                        {block.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j}>{block}</p>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-mist p-6 sm:p-8">
            <p className="font-display text-xl font-bold text-ink">Questions about this page?</p>
            <p className="mt-1 text-sm text-muted">
              Email us at{" "}
              <a href={supportEmail?.href} className="font-medium text-brand hover:underline">
                {supportEmail?.text}
              </a>{" "}
              or use our <Link to="/contact" className="font-medium text-brand hover:underline">contact form</Link>.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {LEGAL_LINKS.filter((l) => l.to !== current).map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-full border border-line-strong bg-white px-4 py-2 text-sm font-medium text-ink-soft hover:border-brand hover:text-brand"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default LegalPage;
