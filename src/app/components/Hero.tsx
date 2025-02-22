"use client";

import Image from "next/image";
import SnowEffect from "./SnowEffect";

const CUSTOMER_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/png?seed=Felix&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Sophie&backgroundColor=ffdfbf",
  "https://api.dicebear.com/7.x/avataaars/png?seed=John&backgroundColor=c0aede",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Maria&backgroundColor=d1d4f9",
];

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-8 z-10">
          <div className="relative">
            <span className="text-red-500 font-medium tracking-wider uppercase text-sm">Welcome to</span>
            <h1 className="mt-2 text-4xl md:text-6xl lg:text-7xl font-serif">
              <span className="block text-gray-900 font-light">MI North</span>
              <span className="block text-red-500 font-bold mt-2">Christmas</span>
              <span className="block text-gray-800 font-light mt-2">Magic</span>
            </h1>
          </div>
          <p className="text-gray-600 text-xl font-medium max-w-xl leading-relaxed">
            Discover our enchanting collection of handcrafted Christmas decorations, 
            bringing the warmth and joy of the holiday season to your home.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-red-500 text-white rounded-lg text-lg font-medium hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5">
              Explore Collection
            </button>
            <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg text-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-0.5">
              Learn More
            </button>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl w-fit">
            <div className="flex -space-x-3">
              {CUSTOMER_AVATARS.map((avatar, i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={avatar}
                    alt={`Happy Customer ${i + 1}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-xl">2,500+</p>
              <p className="text-gray-600">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-20 bg-white p-6 rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/hero.png"
                  alt="Christmas Magic"
                  width={800}
                  height={1000}
                  className="object-cover w-full h-full"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent"></div>
              </div>
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-red-500 rounded-tl-3xl -translate-x-2 -translate-y-2"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-red-500 rounded-br-3xl translate-x-2 translate-y-2"></div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-100 rounded-full opacity-20 blur-3xl z-10"></div>
            <div className="absolute top-0 right-0 w-32 h-32">
              <Image
                src="/christmas-ornament.png"
                alt="Christmas Ornament"
                width={128}
                height={128}
                className="w-full h-full object-contain opacity-50"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 transform rotate-45">
              <Image
                src="/christmas-bells.png"
                alt="Christmas Bells"
                width={128}
                height={128}
                className="w-full h-full object-contain opacity-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Snow Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <SnowEffect />
      </div>
    </section>
  );
} 