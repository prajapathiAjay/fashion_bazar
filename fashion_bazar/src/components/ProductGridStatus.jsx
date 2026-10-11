import { PackageSearch } from "lucide-react";

export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="aspect-[4/5] bg-shimmer" />
      <div className="flex flex-col gap-2 px-3.5 py-3">
        <div className="h-2.5 w-16 rounded bg-shimmer" />
        <div className="h-3.5 w-3/4 rounded bg-shimmer" />
        <div className="mt-1 h-3.5 w-10 rounded bg-shimmer" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return Array.from({ length: count }, (_, i) => <ProductCardSkeleton key={i} />);
}

export function ProductsEmpty({ error }) {
  return (
    <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-snow px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
        <PackageSearch size={24} className="text-subtle" strokeWidth={1.75} />
      </span>
      <p className="mt-4 text-base font-semibold text-ink">
        {error ? "Couldn't load products" : "No products yet"}
      </p>
      <p className="mt-1 max-w-xs text-sm text-subtle">
        {error
          ? "The bazar is having trouble reaching its stalls. Try again in a moment."
          : "New stalls are setting up — check back soon."}
      </p>
    </div>
  );
}
