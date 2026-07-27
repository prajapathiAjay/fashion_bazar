import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Star,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Check,
} from "lucide-react";

const IMAGES = ["#D9D2F0", "#C9BEE8", "#B5A6DE", "#E0D6F2"];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
  { name: "Violet", hex: "#5B21B6" },
  { name: "Black", hex: "#1B1523" },
  { name: "Sage", hex: "#9CB89A" },
];

const RELATED = [
  { id: "p2", name: "Linen shirt jacket", seller: "Halden & Co.", price: 62, bg: "#F0997B" },
  { id: "p5", name: "Ribbed knit vest", seller: "Amara Studio", price: 39, bg: "#C9DDF0" },
  { id: "p9", name: "Silk scarf", seller: "Luna Jewels", price: 28, bg: "#EAD7E6" },
  { id: "p11", name: "Pleated skirt", seller: "Amara Studio", price: 44, bg: "#F0997B" },
];

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#ECE9F1] py-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-[#1B1523]">{title}</span>
        <ChevronDown
          size={16}
          className={`text-[#9691A4] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-3 text-sm leading-relaxed text-[#6B6478]">{children}</div>
      )}
    </div>
  );
}

function ProductDetail() {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Violet");
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const price = 48;
  const originalPrice = 64;
  const discount = Math.round(100 - (price / originalPrice) * 100);

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* Breadcrumb */}
      <p className="mb-6 text-xs text-[#9691A4]">
        <Link to="/" className="hover:text-[#5B21B6]">Home</Link>
        {" / "}
        <Link to="/products" className="hover:text-[#5B21B6]">Shop</Link>
        {" / "}
        <span className="text-[#3A3547]">Draped midi dress</span>
      </p>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <div
              className="h-full w-full transition-colors duration-300"
              style={{ backgroundColor: IMAGES[activeImage] }}
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-[#1B1523] px-3 py-1.5 text-xs font-semibold text-white">
                -{discount}% off
              </span>
            )}
          </div>
          <div className="mt-3 flex gap-3">
            {IMAGES.map((color, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                  activeImage === i ? "border-[#1B1523]" : "border-transparent"
                }`}
              >
                <div className="h-full w-full" style={{ backgroundColor: color }} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[#9691A4]">
            Amara Studio
          </p>
          <h1 className="font-display mt-1.5 text-2xl font-bold text-[#1B1523] sm:text-3xl">
            Draped midi dress
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm text-[#1B1523]">
              <Star size={15} className="fill-[#F5D488] text-[#F5D488]" />
              <span className="font-medium">4.8</span>
            </div>
            <span className="text-sm text-[#9691A4]">·</span>
            <span className="text-sm text-[#9691A4]">126 reviews</span>
            <span className="text-sm text-[#9691A4]">·</span>
            <span className="text-sm text-[#3B6D11]">In stock</span>
          </div>

          <div className="mt-5 flex items-baseline gap-2.5">
            <span className="text-2xl font-bold text-[#1B1523]">${price}</span>
            <span className="text-base text-[#B5B0C1] line-through">${originalPrice}</span>
            <span className="text-sm font-medium text-[#993556]">Save ${originalPrice - price}</span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#6B6478]">
            A flowing midi dress with soft draping at the waist, cut from a
            breathable cotton-linen blend. Made by an independent studio on
            the bazar, small-batch and limited in run.
          </p>

          {/* Color */}
          <div className="mt-7">
            <p className="text-sm font-semibold text-[#1B1523]">
              Color <span className="font-normal text-[#9691A4]">— {selectedColor}</span>
            </p>
            <div className="mt-3 flex gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  aria-label={color.name}
                  className="relative h-9 w-9 rounded-full ring-1 ring-[#ECE9F1] ring-offset-2"
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor === color.name && (
                    <span className="absolute inset-0 rounded-full ring-2 ring-[#1B1523] ring-offset-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#1B1523]">
                Size <span className="font-normal text-[#9691A4]">— {selectedSize}</span>
              </p>
              <button className="text-xs font-medium text-[#5B21B6] hover:text-[#3C3489]">
                Size guide
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-11 min-w-11 rounded-full border px-4 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-[#1B1523] bg-[#1B1523] text-white"
                      : "border-[#E4E0EC] text-[#3A3547] hover:border-[#B5B0C1]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-[#E4E0EC]">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-[#1B1523]"
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>
              <span className="w-8 text-center text-sm font-medium text-[#1B1523]">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-[#1B1523]"
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>

            <button
              onClick={handleAddToBag}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1B1523] text-sm font-semibold text-white transition-transform active:scale-[0.98]"
            >
              {addedToBag ? (
                <>
                  <Check size={16} />
                  Added to bag
                </>
              ) : (
                "Add to bag"
              )}
            </button>

            <button
              onClick={() => setWishlisted((v) => !v)}
              aria-label="Toggle wishlist"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E4E0EC]"
            >
              <Heart size={18} className={wishlisted ? "fill-[#D4537E] text-[#D4537E]" : "text-[#1B1523]"} />
            </button>
          </div>

          {/* Trust row */}
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-[#F7F6FA] p-4">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck size={17} className="text-[#5B21B6]" />
              <span className="text-[11px] text-[#6B6478]">Free shipping $50+</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RotateCcw size={17} className="text-[#5B21B6]" />
              <span className="text-[11px] text-[#6B6478]">30-day returns</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck size={17} className="text-[#5B21B6]" />
              <span className="text-[11px] text-[#6B6478]">Secure checkout</span>
            </div>
          </div>

          {/* Accordions */}
          <div className="mt-7">
            <Accordion title="Materials & care" defaultOpen>
              70% cotton, 30% linen. Machine wash cold, hang dry. Iron on low
              heat if needed.
            </Accordion>
            <Accordion title="Shipping & returns">
              Ships in 1-2 business days from Amara Studio. Free standard
              shipping on orders over $50. Returns accepted within 30 days,
              unworn with tags attached.
            </Accordion>
            <Accordion title="Seller — Amara Studio">
              Independent studio on the bazar since 2021, focused on
              small-batch, seasonless staples.
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <h2 className="font-display text-xl font-bold text-[#1B1523] sm:text-2xl">
          You might also like
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {RELATED.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className="group overflow-hidden rounded-2xl border border-[#ECE9F1] bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(27,21,35,0.09)]"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <div
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundColor: item.bg }}
                />
              </div>
              <div className="px-3.5 py-3">
                <p className="text-[11px] font-medium uppercase tracking-wide text-[#9691A4]">
                  {item.seller}
                </p>
                <p className="text-sm font-medium text-[#1B1523]">{item.name}</p>
                <p className="mt-1 text-sm font-semibold text-[#1B1523]">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;