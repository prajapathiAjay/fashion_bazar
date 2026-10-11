import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton, ProductsEmpty } from "./ProductGridStatus";
import {useDispatch, useSelector} from 'react-redux'
import {fetchProducts} from '../features/products/productThunks'
const PRODUCTS = [
  {
    id: "p1",
    name: "Draped midi dress",
    seller: "Amara Studio",
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    bg: "#D9D2F0",
    to: "/products/p1",
  },
  {
    id: "p2",
    name: "Linen shirt jacket",
    seller: "Halden & Co.",
    price: 3199,
    originalPrice: null,
    rating: 4.6,
    bg: "#F0997B",
    to: "/products/p2",
  },
  {
    id: "p3",
    name: "Woven tote bag",
    seller: "Bazar Leather",
    price: 1799,
    originalPrice: 2299,
    rating: 4.9,
    bg: "#EAD7E6",
    to: "/products/p3",
  },
  {
    id: "p4",
    name: "Suede loafers",
    seller: "Marchetti",
    price: 3899,
    originalPrice: null,
    rating: 4.7,
    bg: "#F7DFA8",
    to: "/products/p4",
  },
  {
    id: "p5",
    name: "Ribbed knit vest",
    seller: "Amara Studio",
    price: 1999,
    originalPrice: 2699,
    rating: 4.5,
    bg: "#C9DDF0",
    to: "/products/p5",
  },
  {
    id: "p6",
    name: "Gold hoop earrings",
    seller: "Luna Jewels",
    price: 1199,
    originalPrice: null,
    rating: 4.9,
    bg: "#F0C4C4",
    to: "/products/p6",
  },
  {
    id: "p7",
    name: "Wide-leg trousers",
    seller: "Halden & Co.",
    price: 2899,
    originalPrice: null,
    rating: 4.6,
    bg: "#CFE3D6",
    to: "/products/p7",
  },
  {
    id: "p8",
    name: "Structured tote",
    seller: "Bazar Leather",
    price: 3499,
    originalPrice: 4399,
    rating: 4.8,
    bg: "#E6D5C3",
    to: "/products/p8",
  },
];



function FeaturedProducts() {


const dispatch = useDispatch()
const {products,loading,error} = useSelector((state)=>state.products)
useEffect(()=>{
  dispatch(fetchProducts())

},[])

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
          products.slice(0, 8).map((product) => <ProductCard key={product?.id} product={product} />)
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