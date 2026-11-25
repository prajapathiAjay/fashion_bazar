import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton, ProductsEmpty } from "./ProductGridStatus";
import { useGetProductsQuery } from "../lib/api/productApi";


function FeaturedProducts() {

// newest 8 products; the list comes back as { items, total, ... }
const {data,isLoading:loading,error}=useGetProductsQuery({ sort: "newest", limit: 8 })
const products=data?.items



  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between lg:mb-8">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-brand">
            <span className="h-px w-8 bg-brand" />
            Picked for you
          </p>
          <h2 className="font-display mt-4 text-3xl font-medium text-ink sm:text-[42px] sm:leading-tight">
            Featured this week
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden border-b border-ink pb-0.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-brand hover:text-brand sm:block"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : products?.length ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          <ProductsEmpty error={error} />
        )}
      </div>

      <Link
        to="/products"
        className="mt-8 block text-center text-sm font-semibold text-brand sm:hidden"
      >
        View all products
      </Link>
    </section>
  );
}

export default FeaturedProducts;