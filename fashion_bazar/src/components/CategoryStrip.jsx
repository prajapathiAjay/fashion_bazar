import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { useGetCategoryQuery } from "../lib/api/categoryApi";
import { useGetProductsQuery } from "../lib/api/productApi";

// Real number of products in one category (asks for 1 item, reads the total)
function CategoryCount({ slug }) {
  const { data } = useGetProductsQuery({ category: slug, limit: 1 });
  if (data?.total == null) return null;
  return (
    <span className="mt-0.5 block text-xs text-white/70">
      {data.total} {data.total === 1 ? "item" : "items"}
    </span>
  );
}

function CategoryStrip() {
  const { data, isLoading, isError } = useGetCategoryQuery();
  // "all" is just every product, the Shop page already covers it
  const categories = data?.filter((category) => category?.slug !== "all");

  // nothing to show (failed or no categories yet) -> hide the section
  if (!isLoading && (isError || !categories?.length)) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between lg:mb-8">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-brand">
            <span className="h-px w-8 bg-brand" />
            Find your stall
          </p>
          <h2 className="font-display mt-4 text-3xl font-medium text-ink sm:text-[42px] sm:leading-tight">
            Shop by category
          </h2>
        </div>
        <Link
          to="/categories"
          className="hidden border-b border-ink pb-0.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-brand hover:text-brand sm:block"
        >
          View all
        </Link>
      </div>

      {/* Mobile / tablet: snap-scroll row. Desktop: even grid */}
      <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] snap-x snap-mandatory sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="aspect-[3/4] shrink-0 basis-[150px] animate-pulse rounded-2xl bg-shimmer sm:basis-[180px] lg:basis-auto"
              />
            ))
          : categories.map(({ slug, categoryName, image, tone }) => (
              <Link
                key={slug}
                to={`/categories/${slug}`}
                className="group relative block aspect-[3/4] shrink-0 basis-[150px] snap-start overflow-hidden rounded-2xl transition-shadow hover:shadow-[0_14px_36px_rgba(27,21,35,0.16)] sm:basis-[180px] lg:basis-auto"
              >
                <SmartImage
                  src={image}
                  alt={`${categoryName} category`}
                  bg={tone}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-700 group-hover:scale-110"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={15} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block text-base font-semibold text-white">{categoryName}</span>
                  <CategoryCount slug={slug} />
                </span>
              </Link>
            ))}
      </div>

      {/* mobile-only "view all" link since desktop has it up top */}
      <Link
        to="/categories"
        className="mt-6 block text-center text-sm font-semibold text-brand sm:hidden"
      >
        View all categories
      </Link>
    </section>
  );
}

export default CategoryStrip;
