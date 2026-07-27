import { Link } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, Sparkles, Shield, Truck } from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBFAFD] via-white to-[#F7F6FA]">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#EEEDFE] blur-3xl opacity-60" />
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#FDF3DC] blur-3xl opacity-60" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#F5D488] blur-3xl opacity-20" />
      
      {/* Animated dots pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #1B1523 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-[#ECE9F1] bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-[#5B21B6] shadow-sm transition-all hover:shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5B21B6] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5B21B6]" />
              </span>
              The bazar is open — autumn drop is live
            </div>

            {/* Main Heading */}
            <h1 className="font-display mt-6 text-[40px] font-bold leading-[1.08] tracking-tight text-[#1B1523] sm:text-5xl lg:text-[56px] xl:text-[64px]">
              Every stall,
              <br />
              <span className="relative inline-block">
                one address
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C40 3 160 3 198 9"
                    stroke="#F5D488"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="animate-draw"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#6B6478] lg:text-lg">
              Hundreds of independent sellers, one checkout. Curated fashion
              from across the bazar, refreshed every week.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#1B1523] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-xl active:scale-[0.98]"
              >
                <span className="relative z-10">Browse the bazar</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="absolute inset-0 bg-gradient-to-r from-[#F5D488] to-[#e8c477] opacity-0 transition-opacity group-hover:opacity-20" />
              </Link>
              
              <Link
                to="/new-arrivals"
                className="group inline-flex items-center gap-2 rounded-full border border-[#E4E0EC] bg-white px-7 py-3.5 text-sm font-semibold text-[#1B1523] transition-all hover:scale-105 hover:border-[#F5D488] hover:shadow-md"
              >
                See new arrivals
                <Sparkles size={16} className="text-[#F5D488]" />
              </Link>
            </div>

            {/* Trust Indicators - Enhanced */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#ECE9F1] pt-6">
              <div className="group">
                <p className="font-display text-2xl font-bold text-[#1B1523] transition-colors group-hover:text-[#5B21B6]">
                  1,200+
                </p>
                <p className="text-xs text-[#9691A4] flex items-center gap-1">
                  <Shield size={12} />
                  sellers on the bazar
                </p>
              </div>
              <div className="h-8 w-px bg-[#ECE9F1]" />
              <div className="group">
                <p className="font-display text-2xl font-bold text-[#1B1523] transition-colors group-hover:text-[#5B21B6]">
                  4.8/5
                </p>
                <p className="text-xs text-[#9691A4] flex items-center gap-1">
                  <Star size={12} className="fill-[#F5D488] text-[#F5D488]" />
                  average seller rating
                </p>
              </div>
              <div className="h-8 w-px bg-[#ECE9F1]" />
              <div className="group">
                <p className="font-display text-2xl font-bold text-[#1B1523] transition-colors group-hover:text-[#5B21B6]">
                  48h
                </p>
                <p className="text-xs text-[#9691A4] flex items-center gap-1">
                  <Truck size={12} />
                  average delivery
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Grid */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto grid h-[420px] max-w-md grid-cols-5 grid-rows-6 gap-3 sm:h-[480px] sm:max-w-lg lg:mx-0 lg:max-w-full">
              {/* Colorful blocks */}
              <div className="col-span-3 row-span-4 rounded-3xl bg-gradient-to-br from-[#D9D2F0] to-[#C4B8E8] shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl" />
              <div className="col-span-2 row-span-3 rounded-3xl bg-gradient-to-br from-[#F0997B] to-[#E88463] shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl" />
              <div className="col-span-2 col-start-4 row-span-3 row-start-4 rounded-3xl bg-gradient-to-br from-[#F7DFA8] to-[#F5D488] shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl" />
              <div className="col-span-3 row-span-2 col-start-1 row-start-5 rounded-3xl bg-gradient-to-br from-[#EAD7E6] to-[#DFC8DA] shadow-lg transition-all hover:scale-[1.02] hover:shadow-2xl" />

              {/* Floating Rating Card */}
              <div className="absolute -left-4 top-6 animate-float flex items-center gap-2 rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-3 shadow-[0_8px_30px_rgba(27,21,35,0.12)] transition-all hover:scale-105 hover:shadow-xl sm:-left-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5D488]">
                  <Star size={18} className="fill-[#1B1523] text-[#1B1523]" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight text-[#1B1523]">4.8 rating</p>
                  <p className="text-xs leading-tight text-[#9691A4]">from 20k+ buyers</p>
                </div>
              </div>

              {/* Floating Trend Card */}
              <div className="absolute -right-4 bottom-8 animate-float-delayed flex items-center gap-2 rounded-2xl bg-[#1B1523] px-4 py-3 shadow-[0_8px_30px_rgba(27,21,35,0.25)] transition-all hover:scale-105 hover:shadow-xl sm:-right-8">
                <TrendingUp size={18} className="text-[#F5D488]" />
                <div>
                  <p className="text-xs font-medium text-white">
                    Trending in <span className="text-[#F5D488]">Footwear</span>
                  </p>
                  <p className="text-[10px] text-white/50">+42% this week</p>
                </div>
              </div>

              {/* Floating Sparkle */}
              <div className="absolute -top-2 right-12 animate-pulse">
                <Sparkles size={20} className="text-[#F5D488]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes draw {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-draw {
          stroke-dasharray: 200;
          animation: draw 1.5s ease-out forwards;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite 0.5s;
        }
      `}</style>
    </section>
  );
}

export default Hero;