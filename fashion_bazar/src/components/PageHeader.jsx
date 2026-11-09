// Shared top section for simple info pages (About, Seller, Contact, FAQ)
function PageHeader({ eyebrow, title, accent, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-snow">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 lg:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sun-dark">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
          {title} {accent && <span className="text-gradient">{accent}</span>}
        </h1>
        {children && (
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">{children}</p>
        )}
      </div>
    </section>
  );
}

export default PageHeader;
