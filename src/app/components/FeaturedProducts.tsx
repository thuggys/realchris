'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category?: string;
}

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "ornaments", name: "Ornaments" },
    { id: "lights", name: "Lighting" },
    { id: "decor", name: "Home Decor" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial load animations
    const ctx = gsap.context(() => {
      // Featured product animation
      if (featuredRef.current) {
        gsap.from(featuredRef.current, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power3.out"
        });
      }

      // Header elements animation
      const headerElements = headerRef.current?.querySelectorAll('*');
      if (headerElements) {
        gsap.from(headerElements, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        });
      }

      // Category buttons animation
      gsap.from(".category-btn", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      });

      // Products grid animation
      if (productsRef.current) {
        gsap.from(".product-card", {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 lg:py-32">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Featured Product */}
          <div ref={featuredRef} className="col-span-1 lg:col-span-5">
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl lg:rounded-[2.5rem] overflow-hidden group">
                <Image
                  src="/christmas-tree.jpg"
                  alt="Premium Christmas Tree"
                  width={800}
                  height={1000}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Sale Badge */}
                <div className="absolute top-4 lg:top-8 left-4 lg:left-8 bg-red-500 text-white px-4 lg:px-6 py-2 rounded-full text-sm font-medium tracking-wider">
                  SALE -25%
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-10 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                    <span className="text-red-500 uppercase tracking-widest text-sm font-medium mb-4 block">Premium Collection</span>
                    <h3 className="text-2xl lg:text-4xl font-semibold mb-4 text-gray-900">Royal Spruce Tree</h3>
                    <p className="text-gray-600 mb-6 lg:mb-8 leading-relaxed">A majestic 7.5ft pre-lit artificial Christmas tree with snow-dusted tips and 800 warm LED lights.</p>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
                      <div className="flex items-baseline gap-4">
                        <span className="text-gray-400 line-through text-xl">$599</span>
                        <span className="text-red-500 text-3xl lg:text-4xl font-bold">$449</span>
                      </div>
                      <button className="w-full lg:w-auto bg-red-500 text-white px-6 lg:px-8 py-3 rounded-2xl hover:bg-red-600 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-0.5">
                        Shop Collection
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-1 lg:col-span-7">
            {/* Section Header */}
            <div ref={headerRef} className="mb-8 lg:mb-16">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[2px] w-12 bg-red-500" />
                <span className="text-red-500 uppercase tracking-[0.2em] text-sm font-medium">Holiday Magic</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-semibold mb-6 lg:mb-8 leading-tight">Featured<br className="hidden lg:block" /> Decorations</h2>
              <p className="text-gray-600 max-w-2xl text-base lg:text-lg leading-relaxed">
                Transform your home into a winter wonderland with our premium selection of Christmas decorations and ornaments.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-6 mb-8 lg:mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-btn px-4 lg:px-6 py-2 lg:py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div ref={productsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <ProductCard
                image="/ornament-set.jpg"
                title="Vintage Glass Ornaments"
                description="Set of 24 hand-painted glass ornaments in traditional holiday colors"
                originalPrice={89}
                discountedPrice={69}
                category="ornaments"
              />
              <ProductCard
                image="/fairy-lights.jpg"
                title="Twinkle Light Curtain"
                description="300 LED warm white icicle lights with 8 magical lighting modes"
                originalPrice={79}
                discountedPrice={59}
                category="lights"
              />
              <ProductCard
                image="/wreath.jpg"
                title="Luxury Pine Wreath"
                description="30-inch pre-lit wreath with pine cones and red berries"
                originalPrice={129}
                discountedPrice={99}
                category="decor"
              />
              <ProductCard
                image="/garland.jpg"
                title="Premium Garland Set"
                description="9ft battery-operated LED garland with frosted pine cones"
                originalPrice={69}
                discountedPrice={49}
                category="decor"
              />
            </div>

            {/* Bottom Navigation */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 mt-8 lg:mt-16 pt-6 lg:pt-8 border-t">
              <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors group order-2 lg:order-1">
                <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Previous Page</span>
              </button>
              <div className="flex gap-3 order-1 lg:order-2">
                <span className="text-red-500 font-medium">01</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-400">05</span>
              </div>
              <button className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors group order-3">
                <span className="font-medium">Next Page</span>
                <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ image, title, description, originalPrice, discountedPrice, category }: ProductCardProps) {
  return (
    <div className="group cursor-pointer product-card">
      {/* Image */}
      <div className="relative aspect-square rounded-2xl lg:rounded-3xl overflow-hidden mb-4 lg:mb-6">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        {category && (
          <div className="absolute top-4 lg:top-6 left-4 lg:left-6 bg-white/90 backdrop-blur-sm text-gray-900 px-3 lg:px-4 py-2 rounded-full text-sm font-medium">
            {category}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-4 lg:top-6 right-4 lg:right-6 flex flex-col gap-2 lg:gap-3 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-8 lg:w-10 h-8 lg:h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg">
            <svg className="w-4 lg:w-5 h-4 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="w-8 lg:w-10 h-8 lg:h-10 bg-white rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg">
            <svg className="w-4 lg:w-5 h-4 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="flex items-baseline gap-2 lg:gap-3 mb-2 lg:mb-3">
          <span className="text-red-500 font-semibold text-lg">${discountedPrice}</span>
          <span className="text-gray-400 text-sm line-through">${originalPrice}</span>
        </div>
        <h3 className="text-lg lg:text-xl font-medium mb-2 group-hover:text-red-500 transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
} 