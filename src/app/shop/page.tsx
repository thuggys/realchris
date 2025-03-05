'use client'

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  category: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

// Main Shop page component
export default function Shop() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent />
      </Suspense>
      <Footer />
    </div>
  );
}

// Loading skeleton component
function ShopSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="h-64 bg-gray-200 rounded-3xl mb-8"></div>
        
        {/* Categories skeleton */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        
        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main content component that uses useSearchParams
function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [isLoading, setIsLoading] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  
  // Update active category when URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);
  
  // Simulate loading effect
  useEffect(() => {
    // Simulate loading delay for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Example product data - in a real app, this would likely come from an API
  const products: Product[] = [
    {
      id: "p1",
      image: "/product1.jpg",
      title: "Vintage Glass Ornaments",
      description: "Set of 24 hand-painted glass ornaments in traditional holiday colors",
      originalPrice: 89,
      discountedPrice: 69,
      category: "ornaments",
      isFeatured: true
    },
    {
      id: "p2",
      image: "/chr.png",
      title: "Twinkle Light Curtain",
      description: "300 LED warm white icicle lights with 8 magical lighting modes",
      originalPrice: 79,
      discountedPrice: 59,
      category: "lights",
      isNew: true
    },
    {
      id: "p3",
      image: "/hero.png",
      title: "Luxury Pine Wreath",
      description: "30-inch pre-lit wreath with pine cones and red berries",
      originalPrice: 129,
      discountedPrice: 99,
      category: "decor"
    },
    {
      id: "p4",
      image: "/santa-image.png",
      title: "Premium Garland Set",
      description: "9ft battery-operated LED garland with frosted pine cones",
      originalPrice: 69,
      discountedPrice: 49,
      category: "decor",
      isFeatured: true
    },
    {
      id: "p5",
      image: "/me.jpg",
      title: "Smart LED String Lights",
      description: "Voice-controlled multicolor string lights compatible with smart home systems",
      originalPrice: 89,
      discountedPrice: 69,
      category: "lights",
      isNew: true
    },
    {
      id: "p6",
      image: "/logo.png",
      title: "Ceramic Santa Figurine",
      description: "Hand-painted collectible Santa Claus figurine, 12-inch tall",
      originalPrice: 59,
      discountedPrice: 45,
      category: "decor"
    },
    {
      id: "p7",
      image: "/product1.jpg",
      title: "Crystal Star Tree Topper",
      description: "Illuminated crystal star with 30 LED lights and 5 light modes",
      originalPrice: 49,
      discountedPrice: 39,
      category: "ornaments"
    },
    {
      id: "p8",
      image: "/about-image.jpg",
      title: "Musical Snow Globe",
      description: "Hand-crafted snow globe with winter village scene and music box",
      originalPrice: 65,
      discountedPrice: 55,
      category: "decor",
      isFeatured: true
    }
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "ornaments", name: "Ornaments" },
    { id: "lights", name: "Lighting" },
    { id: "decor", name: "Home Decor" },
    { id: "new", name: "New Arrivals" }
  ];

  // Filter products based on active category
  const filteredProducts = activeCategory === "all" 
    ? products 
    : activeCategory === "new"
      ? products.filter(product => product.isNew)
      : products.filter(product => product.category === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Header elements animation
    const headerElements = headerRef.current?.querySelectorAll('*');
    if (headerElements) {
      gsap.from(headerElements, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%"
        }
      });
    }

    // Products grid animation
    const productCards = productsRef.current?.querySelectorAll('.product-card');
    if (productCards) {
      gsap.from(productCards, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top 75%"
        }
      });
    }
  }, [activeCategory]); // Re-run animation when category changes

  // Function to handle the "Shop Now" button click
  const handleShopNow = () => {
    setActiveCategory("all");
    
    // Scroll to the products section with a smooth animation
    const productsElement = productsRef.current;
    if (productsElement) {
      productsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Hero Section - MI North Christmas Style */}
      <section className="relative bg-[#FFF9F0] rounded-3xl mx-auto max-w-7xl mt-8 overflow-hidden border-2 border-red-100">
        {/* Decorative Christmas Corner Elements */}
        <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full text-red-600/20 fill-current">
            <path d="M0,0 L100,0 C45,0 0,45 0,100 L0,0 Z" />
          </svg>
          <div className="absolute top-4 left-4 text-red-600/80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 transform rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full text-red-600/20 fill-current">
            <path d="M0,0 L100,0 C45,0 0,45 0,100 L0,0 Z" />
          </svg>
          <div className="absolute top-4 right-4 text-red-600/80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z"/>
            </svg>
          </div>
        </div>
        
        {/* Floating Christmas Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Hearts */}
          <div className="absolute left-[15%] top-[25%] animate-float" style={{ animationDuration: '6s' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#D14836" className="opacity-70">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          
          {/* Mittens */}
          <div className="absolute right-[20%] top-[30%] animate-float" style={{ animationDuration: '7s', animationDelay: '0.5s' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#E17B9E" className="opacity-70">
              <path d="M12.5 2C14.43 2 16 3.57 16 5.5v.5h2.5c1.93 0 3.5 1.57 3.5 3.5S20.43 13 18.5 13H16v7.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V13h-5c-1.93 0-3.5-1.57-3.5-3.5S6.07 6 8 6h5v-.5C13 4.17 12.33 3.5 11.5 3.5S10 4.17 10 5h-2c0-1.93 1.57-3.5 3.5-3.5h1z"/>
            </svg>
          </div>
          
          {/* Christmas Socks */}
          <div className="absolute left-[75%] bottom-[30%] animate-float-reverse" style={{ animationDuration: '8s' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#D64541" className="opacity-70">
              <path d="M17 4v7l2 3v8h-6v-8l2-3V4h2M9 4v7l2 3v8H5v-8l2-3V4h2M12 2H7v9l-2 3v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8l-2-3V2z"/>
            </svg>
          </div>
          
          {/* Cookies */}
          <div className="absolute right-[30%] bottom-[20%] animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#C3A86B" className="opacity-70">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="8.5" cy="9.5" r="1.5" fill="#5D4037"/>
              <circle cx="15" cy="9.5" r="1.5" fill="#5D4037"/>
              <circle cx="12" cy="14" r="1.5" fill="#5D4037"/>
            </svg>
          </div>
          
          {/* Tree ornament */}
          <div className="absolute left-[12%] bottom-[15%] animate-float-reverse" style={{ animationDuration: '6.5s', animationDelay: '0.3s' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#55ACEE" className="opacity-70">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center">
          <div className="inline-block mb-4 relative">
            <span className="inline-block px-6 py-2 bg-red-600 text-white rounded-full text-sm font-semibold uppercase tracking-wider">
              MI North Christmas 2024
            </span>
            <div className="absolute -right-2 -top-2 w-6 h-6 animate-pulse-slow">
              <div className="h-2 w-2 bg-red-400 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
          
          <h1 className="font-serif text-6xl md:text-9xl font-bold text-[#222] mb-4 md:mb-6 tracking-tight text-gradient bg-gradient-to-r from-red-700 via-red-600 to-red-800">
            Celebrate
          </h1>
          <h2 className="text-2xl md:text-4xl font-serif text-[#222] mb-6 md:mb-10">
            The Season With Us!
          </h2>
          
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-8 md:mb-12">
            Why wait until December 25th? The first time, the first sale with fast delivery! 
            Christmas is a time for giving.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button 
              onClick={handleShopNow}
              className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Shop Now
            </button>
            <Link 
              href="/collection"
              className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-red-600 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              View Collection
            </Link>
          </div>
          
          <div className="relative w-full max-w-5xl mx-auto mt-4 mb-4">
            {/* 3D Scene with Santa */}
            <div className="relative">
              {/* Background Trees */}
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="relative z-10 flex items-end justify-center scale-125 md:scale-100">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`relative mx-1 md:mx-3 ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}`}
                      style={{
                        animationDelay: `${i * 0.3}s`,
                        zIndex: 20 - Math.abs(i - 2),
                        height: `${80 + Math.abs(i - 2) * 20}px`,
                        marginBottom: `${Math.abs(i - 2) * 10}px`
                      }}
                    >
                      <div 
                        className="bg-green-600 w-16 md:w-32"
                        style={{
                          height: '100%',
                          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                          transformOrigin: 'bottom center'
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Santa in Sleigh */}
              <div className="relative z-30 mt-20 mb-10 animate-float" style={{ animationDuration: '8s' }}>
                <div className="absolute -top-12 -right-6 md:-top-20 md:-right-8 rotate-12 text-red-600 font-bold py-2 px-4 rounded-lg bg-white/90 backdrop-blur text-sm md:text-base">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-medium">PREMIUM</span>
                    <span className="text-xl md:text-2xl">-30%</span>
                  </div>
                </div>
                <Image
                  src="/santa-image.png"
                  alt="Santa Claus with presents"
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain drop-shadow-xl"
                />
              </div>
              
              {/* Gift Boxes */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20 flex justify-center w-full">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`relative mx-1 md:mx-2 ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}`}
                    style={{
                      animationDelay: `${i * 0.4}s`,
                      animationDuration: `${5 + i}s`,
                      zIndex: 15 - i,
                      bottom: `${i * 5}px`
                    }}
                  >
                    <div 
                      className={`w-12 h-12 md:w-20 md:h-20 rounded-sm border-2 ${
                        ['bg-red-500 border-yellow-400', 
                         'bg-green-500 border-red-400',
                         'bg-yellow-500 border-red-400',
                         'bg-red-600 border-yellow-500'][i % 4]
                      }`}
                    >
                      <div className={`w-full h-2 md:h-3 ${
                        ['bg-yellow-400', 'bg-red-400', 'bg-red-400', 'bg-yellow-500'][i % 4]
                      } absolute top-1/2 left-0 transform -translate-y-1/2`}></div>
                      <div className={`h-full w-2 md:w-3 ${
                        ['bg-yellow-400', 'bg-red-400', 'bg-red-400', 'bg-yellow-500'][i % 4]
                      } absolute top-0 left-1/2 transform -translate-x-1/2`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Snow Border */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white transform -translate-y-1">
          <svg
            className="absolute top-0 w-full transform -translate-y-full"
            viewBox="0 0 1200 30"
            preserveAspectRatio="none"
            fill="white"
          >
            <path
              d="M0,30 C300,10 400,30 500,20 C600,10 700,30 800,20 C900,10 1000,30 1100,20 C1140,15 1160,10 1200,30 L1200,30 L0,30 Z"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Category Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="inline-block px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-3">Collections</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our selection of premium holiday décor to transform your home this season
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                ? 'bg-red-600 text-white shadow-md animate-pulse-light'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Link>
          ))}
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">No products match the selected category.</p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  View All Products
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mt-16">
          <nav className="flex items-center space-x-2">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-red-600 text-white font-medium">1</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">2</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">3</button>
            <span className="text-gray-600">...</span>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">12</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { image, title, description, originalPrice, discountedPrice, isNew, isFeatured, category } = product;
  const [imageError, setImageError] = useState(false);
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
  
  return (
    <div className="group cursor-pointer product-card overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white border border-gray-100">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {!imageError ? (
          <Image
            src={image}
            alt={title}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            priority={true}
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback image with product title
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            <div className="text-center p-4">
              <div className="text-red-600 text-4xl mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-medium">{title}</p>
            </div>
          </div>
        )}
        
        {/* Holiday Decorative Element */}
        <div className="absolute -top-1 -right-1 w-12 h-12 overflow-hidden">
          <div className="absolute transform rotate-45 bg-red-600 text-white font-bold py-1 right-[-30px] top-[10px] w-[100px] text-center text-xs">
            Holiday
          </div>
        </div>
        
        {/* Status Badges */}
        <div className="absolute top-0 left-0 p-4 flex flex-col gap-2 z-10">
          {isNew && (
            <span className="inline-block py-1 px-3 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">New</span>
          )}
          {isFeatured && (
            <span className="inline-block py-1 px-3 bg-amber-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">Featured</span>
          )}
          {(!isNew && !isFeatured && discount > 0) && (
            <span className="inline-block py-1 px-3 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
              {discount}% Off
            </span>
          )}
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-block py-1 px-3 bg-white/80 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-5 py-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">{title}</h3>
          <div className="flex text-yellow-400 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-baseline gap-2">
          <span className="text-red-600 font-bold text-xl">${discountedPrice}</span>
          {originalPrice > discountedPrice && (
            <span className="text-gray-400 text-sm line-through">${originalPrice}</span>
          )}
        </div>
        
        {/* Fast Delivery Badge */}
        {(isFeatured || Math.random() > 0.5) && (
          <div className="mt-4 flex items-center text-xs text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Fast delivery (2-3 days)</span>
          </div>
        )}
      </div>
    </div>
  );
} 