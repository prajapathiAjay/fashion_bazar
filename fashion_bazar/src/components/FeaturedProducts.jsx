import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import ProductCard from "./ProductCard";
import {useDispatch, useSelector} from 'react-redux'
import {fetchProducts} from '../features/products/productThunks'
const PRODUCTS = [
  {
    id: "p1",
    name: "Draped midi dress",
    seller: "Amara Studio",
    price: 48,
    originalPrice: 64,
    rating: 4.8,
    bg: "#D9D2F0",
    to: "/products/p1",
  },
  {
    id: "p2",
    name: "Linen shirt jacket",
    seller: "Halden & Co.",
    price: 62,
    originalPrice: null,
    rating: 4.6,
    bg: "#F0997B",
    to: "/products/p2",
  },
  {
    id: "p3",
    name: "Woven tote bag",
    seller: "Bazar Leather",
    price: 35,
    originalPrice: 45,
    rating: 4.9,
    bg: "#EAD7E6",
    to: "/products/p3",
  },
  {
    id: "p4",
    name: "Suede loafers",
    seller: "Marchetti",
    price: 74,
    originalPrice: null,
    rating: 4.7,
    bg: "#F7DFA8",
    to: "/products/p4",
  },
  {
    id: "p5",
    name: "Ribbed knit vest",
    seller: "Amara Studio",
    price: 39,
    originalPrice: 52,
    rating: 4.5,
    bg: "#C9DDF0",
    to: "/products/p5",
  },
  {
    id: "p6",
    name: "Gold hoop earrings",
    seller: "Luna Jewels",
    price: 22,
    originalPrice: null,
    rating: 4.9,
    bg: "#F0C4C4",
    to: "/products/p6",
  },
  {
    id: "p7",
    name: "Wide-leg trousers",
    seller: "Halden & Co.",
    price: 56,
    originalPrice: null,
    rating: 4.6,
    bg: "#CFE3D6",
    to: "/products/p7",
  },
  {
    id: "p8",
    name: "Structured tote",
    seller: "Bazar Leather",
    price: 68,
    originalPrice: 85,
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
          <p className="text-xs font-medium uppercase tracking-wide text-[#9691A4]">
            Picked for you
          </p>
          <h2 className="font-display mt-1 text-2xl font-bold text-[#1B1523] sm:text-[28px]">
            Featured this week
          </h2>
        </div>
        <Link
          to="/products"
          className="hidden text-sm font-semibold text-[#5B21B6] hover:text-[#3C3489] sm:block"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>

      <Link
        to="/products"
        className="mt-8 block text-center text-sm font-semibold text-[#5B21B6] sm:hidden"
      >
        View all products
      </Link>
    </section>
  );
}

export default FeaturedProducts;