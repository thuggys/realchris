'use client'

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
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

// Interface for the snowflake/particle elements
interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  id: number;
}

// Main Collection page component
export default function Collection() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Suspense fallback={<CollectionSkeleton />}>
        <CollectionContent />
      </Suspense>
      <Footer />
    </div>
  );
}

// Loading skeleton component
function CollectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="animate-pulse">
        {/* Hero skeleton */}
        <div className="h-64 bg-gray-200 rounded-3xl mb-8"></div>
        
        {/* Tabs skeleton */}
        <div className="flex gap-4 mb-8 justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-32 bg-gray-200 rounded-full"></div>
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
function CollectionContent() {
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get('collection');
  
  const [activeCollection, setActiveCollection] = useState(collectionParam || 'seasonal');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  
  // Update active collection when URL parameter changes
  useEffect(() => {
    if (collectionParam) {
      setActiveCollection(collectionParam);
    }
  }, [collectionParam]);
  
  // Simulate loading effect
  useEffect(() => {
    // Simulate loading delay for a smoother experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sample collection data
  const collections = {
    seasonal: {
      title: "Winter Wonderland Collection",
      description: "Discover our enchanting selection of winter-themed decorations to transform your space into a magical wonderland.",
      primaryColor: "from-blue-900 via-indigo-800 to-purple-900",
      accentColor: "via-blue-400",
      motif: "snowfall"
    },
    limited: {
      title: "Limited Edition Treasures",
      description: "Exclusive pieces that combine artisanal craftsmanship with contemporary design. Once they're gone, they're gone forever.",
      primaryColor: "from-amber-800 via-red-800 to-rose-900",
      accentColor: "via-amber-300",
      motif: "sparkle"
    },
    vintage: {
      title: "Vintage-Inspired Classics",
      description: "Timeless designs that evoke nostalgia and warmth, perfect for creating lasting holiday traditions.",
      primaryColor: "from-emerald-900 via-teal-800 to-cyan-900",
      accentColor: "via-emerald-300",
      motif: "twinkle"
    }
  };

  // Generate particles (snowflakes, sparkles, etc.) based on active collection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Generate new particles
    const newParticles: Particle[] = [];
    const count = activeCollection === 'seasonal' ? 40 : 25;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: Math.random() * 100, // percentage across screen
        y: Math.random() * 100, // percentage down screen
        size: Math.random() * 8 + 2, // size between 2-10px
        opacity: Math.random() * 0.5 + 0.3, // opacity between 0.3-0.8
        speed: Math.random() * 3 + 1, // animation speed multiplier
        id: i,
      });
    }
    
    setParticles(newParticles);
  }, [activeCollection]);

  // Example product data - in a real app, this would come from an API
  const products: Product[] = [
    {
      id: "c1",
      image: "/chr.png",
      title: "Crystalline Snowflake Mobile",
      description: "Hand-crafted crystal snowflakes that catch and refract light in mesmerizing patterns",
      originalPrice: 129,
      discountedPrice: 99,
      category: "seasonal",
      isFeatured: true
    },
    {
      id: "c2",
      image: "/hero.png",
      title: "Midnight Velvet Stocking",
      description: "Luxurious deep blue velvet stocking with silver embroidery and satin lining",
      originalPrice: 79,
      discountedPrice: 59,
      category: "seasonal",
      isNew: true
    },
    {
      id: "c3",
      image: "/me.jpg",
      title: "Artisanal Glass Ornament Set",
      description: "Set of 6 mouth-blown glass ornaments with hand-painted gold detailing",
      originalPrice: 149,
      discountedPrice: 119,
      category: "limited"
    },
    {
      id: "c4",
      image: "/santa-image.png",
      title: "Heritage Wooden Nutcracker",
      description: "Traditional hand-carved nutcracker with movable jaw and intricate painted details",
      originalPrice: 189,
      discountedPrice: 159,
      category: "vintage",
      isFeatured: true
    },
    {
      id: "c5",
      image: "/product1.jpg",
      title: "Nordic Star Lantern",
      description: "Geometric star lantern with warm LED lighting and brass frame",
      originalPrice: 99,
      discountedPrice: 79,
      category: "seasonal"
    },
    {
      id: "c6",
      image: "/chr.png",
      title: "Champagne Gold Wreath",
      description: "Elegant artificial wreath with champagne gold leaves and subtle glitter accents",
      originalPrice: 159,
      discountedPrice: 129,
      category: "limited",
      isNew: true
    },
    {
      id: "c7",
      image: "/hero.png",
      title: "Botanical Garland Lights",
      description: "Delicate string lights intertwined with preserved eucalyptus and berries",
      originalPrice: 119,
      discountedPrice: 99,
      category: "seasonal"
    },
    {
      id: "c8",
      image: "/me.jpg",
      title: "Heirloom Advent Calendar",
      description: "Wooden advent calendar with 24 drawers, designed to become a treasured family heirloom",
      originalPrice: 199,
      discountedPrice: 169,
      category: "vintage"
    },
    {
      id: "c9",
      image: "/santa-image.png",
      title: "Celestial Table Runner",
      description: "Midnight blue table runner with embroidered stars and metallic thread detailing",
      originalPrice: 89,
      discountedPrice: 69,
      category: "limited"
    }
  ];

  // Filter products based on active collection
  const filteredProducts = products.filter(product => 
    activeCollection === 'all' || product.category === activeCollection
  );

  // Animation effects
  useEffect(() => {
    if (isLoading || typeof window === 'undefined') return;
    
    // Create a GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }
      
      // Hero background animation
      if (productsRef.current) {
        const bgImage = productsRef.current.querySelector('.hero-bg-image');
        const overlay = productsRef.current.querySelector('.hero-overlay');
        
        gsap.fromTo(
          bgImage,
          { scale: 1.2, opacity: 0.5 },
          { scale: 1.1, opacity: 1, duration: 2.5, ease: "power2.out" }
        );
        
        gsap.fromTo(
          overlay,
          { opacity: 0.8 },
          { opacity: 0.5, duration: 2, ease: "power2.out" }
        );
        
        // Diagonal reveal
        const diagonal = productsRef.current.querySelector('.diagonal-reveal');
        gsap.fromTo(
          diagonal,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.5, ease: "power3.inOut" }
        );
      }
      
      // 3D Grid animation
      if (productsRef.current) {
        const cards = productsRef.current.querySelectorAll('.product-card');
        
        gsap.fromTo(
          cards,
          { 
            y: 100, 
            opacity: 0,
            rotateY: -15,
            transformPerspective: 800
          },
          { 
            y: 0, 
            opacity: 1, 
            rotateY: 0,
            stagger: 0.1,
            duration: 0.8, 
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: productsRef.current,
              start: "top 80%",
            }
          }
        );
      }
    });
    
    // Return cleanup function
    return () => ctx.revert();
  }, [isLoading]); // Remove activeCollection dependency to prevent double animation

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeCollection]);

  // Mouse parallax effect for hero
  useEffect(() => {
    if (isLoading || typeof window === 'undefined' || !productsRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const moveX = (mouseX - 0.5) * 20; // -10px to 10px
      const moveY = (mouseY - 0.5) * 20; // -10px to 10px
      
      const bgImage = productsRef.current?.querySelector('.hero-bg-image');
      const particles = productsRef.current?.querySelector('.particles-container');
      const headerContent = headerRef.current;
      
      if (bgImage) {
        gsap.to(bgImage, {
          x: -moveX,
          y: -moveY,
          duration: 1,
          ease: "power2.out"
        });
      }
      
      if (particles) {
        gsap.to(particles, {
          x: moveX / 3,
          y: moveY / 3,
          duration: 1.5,
          ease: "power2.out"
        });
      }
      
      if (headerContent) {
        gsap.to(headerContent, {
          x: moveX / 8,
          y: moveY / 8,
          duration: 1.2,
          ease: "power2.out"
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoading]);

  // Switch collection
  const handleCollectionChange = (collection: string) => {
    setActiveCollection(collection);
  };

  return (
    <>
      {/* Enhanced Hero Section with Dynamic Design */}
      <section ref={productsRef} className="relative h-[calc(100vh-102px)] mt-[102px] overflow-hidden">
        {/* Background Image with Parallax */}
        <div 
          className="hero-bg-image absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ 
            backgroundImage: `url(/${activeCollection === 'seasonal' ? 'chr.png' : 
                              activeCollection === 'limited' ? 'hero.png' : 'product1.jpg'})`,
            transform: 'scale(1.1)'
          }}
        ></div>
        
        {/* Colored Gradient Overlay */}
        <div 
          className={`hero-overlay absolute inset-0 bg-gradient-to-br ${
            collections[activeCollection as keyof typeof collections]?.primaryColor || "from-blue-900 to-purple-900"
          } opacity-50 z-10 transition-colors duration-1000`}
        ></div>
        
        {/* Diagonal Split Design */}
        <div 
          className="diagonal-reveal absolute inset-0 origin-left z-10 overflow-hidden"
          style={{ transform: 'scaleX(0)' }}
        >
          <div 
            className={`absolute inset-0 bg-gradient-to-tr from-transparent ${
              collections[activeCollection as keyof typeof collections]?.accentColor || "via-blue-400"
            } to-transparent opacity-30 transform translate-x-1/2 w-[200%] h-[200%] top-[-50%] left-[-50%]`}
          ></div>
        </div>
        
        {/* Particles Effect Container */}
        <div className="particles-container absolute inset-0 z-10 overflow-hidden">
          {particles.map((particle) => {
            const animationType = 
              activeCollection === 'seasonal' ? 'animate-snowfall' : 
              activeCollection === 'limited' ? 'animate-sparkle' : 'animate-twinkle';
            
            const shape = 
              activeCollection === 'seasonal' ? 'rounded-full' : 
              activeCollection === 'limited' ? 'star-shape' : 'rounded-sm';
              
            const color = 
              activeCollection === 'seasonal' ? 'bg-white' : 
              activeCollection === 'limited' ? 'bg-amber-200' : 'bg-emerald-200';
              
            return (
              <div 
                key={particle.id}
                className={`absolute ${animationType} ${shape} ${color} will-change-transform`}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  animationDuration: `${5 / particle.speed}s`,
                  animationDelay: `${particle.id * 0.2}s`
                }}
              />
            );
          })}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-[10%] w-28 h-28 rounded-full border-4 border-white/20 animate-float-reverse"></div>
          <div className="absolute bottom-1/3 right-[15%] w-40 h-40 rounded-full border-4 border-white/10 animate-float"></div>
          <div className="absolute top-1/2 right-[30%] w-16 h-16 rounded-full bg-white/5 animate-float-reverse"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4">
          <div ref={headerRef} className="text-center max-w-3xl will-change-transform">
            <span 
              className={`px-6 py-2 border border-white/40 rounded-full text-sm uppercase tracking-widest mb-6 inline-block backdrop-blur-sm
                ${activeCollection === 'seasonal' ? 'text-blue-100' : 
                  activeCollection === 'limited' ? 'text-amber-100' : 'text-emerald-100'}`}
            >
              {activeCollection === 'seasonal' ? 'Winter Collection' : 
               activeCollection === 'limited' ? 'Limited Edition' : 'Vintage Classics'}
            </span>
            
            <h1 className="text-5xl md:text-7xl font-cursive mb-6">
              {collections[activeCollection as keyof typeof collections]?.title || "Our Collections"}
            </h1>
            
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto backdrop-blur-[2px] bg-black/10 p-4 rounded-lg">
              {collections[activeCollection as keyof typeof collections]?.description || 
                "Explore our carefully curated collections of exceptional holiday decor."}
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
              <button 
                className={`px-8 py-3 rounded-full font-medium transition-colors 
                  ${activeCollection === 'seasonal' ? 'bg-blue-600 hover:bg-blue-700' : 
                    activeCollection === 'limited' ? 'bg-amber-600 hover:bg-amber-700' : 
                    'bg-emerald-600 hover:bg-emerald-700'} text-white`}
              >
                Explore Collection
              </button>
              <button className="px-8 py-3 border-2 border-white/70 rounded-full font-medium hover:bg-white/10 transition-colors backdrop-blur-sm">
                View Catalog
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* Collection Content Wrapper */}
      <div className="bg-white min-h-screen">
        {/* Collection Tabs - Elegant Minimal Design */}
        <section className="bg-white py-10 border-t border-gray-100">
          <div className="container mx-auto">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl md:text-3xl font-cursive mb-10 text-center text-gray-800">Browse Collections</h2>
              
              <div className="flex justify-center space-x-2 md:space-x-12">
                {/* Seasonal Tab */}
                <button
                  onClick={() => handleCollectionChange('seasonal')}
                  className="relative group px-2 py-1 transition-all duration-300 focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 mb-3 flex items-center justify-center rounded-full
                      ${activeCollection === 'seasonal' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-700'
                      }
                      transition-colors duration-300
                    `}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeCollection === 'seasonal' ? 2 : 1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                      </svg>
                    </div>
                    
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      activeCollection === 'seasonal' ? 'text-blue-800' : 'text-gray-600 group-hover:text-blue-700'
                    }`}>
                      Seasonal
                    </span>
                  </div>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 mt-1">
                    <div className={`
                      h-full rounded-full transition-all duration-300 transform origin-left
                      ${activeCollection === 'seasonal' ? 'bg-blue-500 scale-x-100' : 'bg-transparent scale-x-0 group-hover:bg-blue-200 group-hover:scale-x-50'}
                    `}></div>
                  </div>
                </button>
                
                {/* Limited Edition Tab */}
                <button
                  onClick={() => handleCollectionChange('limited')}
                  className="relative group px-2 py-1 transition-all duration-300 focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 mb-3 flex items-center justify-center rounded-full
                      ${activeCollection === 'limited' 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-amber-50 group-hover:text-amber-700'
                      }
                      transition-colors duration-300
                    `}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeCollection === 'limited' ? 2 : 1.5} d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8M12 8l-5 5m5-5l5 5M20 21V8a4 4 0 00-4-4h-.8" />
                      </svg>
                    </div>
                    
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      activeCollection === 'limited' ? 'text-amber-800' : 'text-gray-600 group-hover:text-amber-700'
                    }`}>
                      Limited
                    </span>
                  </div>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 mt-1">
                    <div className={`
                      h-full rounded-full transition-all duration-300 transform origin-left
                      ${activeCollection === 'limited' ? 'bg-amber-500 scale-x-100' : 'bg-transparent scale-x-0 group-hover:bg-amber-200 group-hover:scale-x-50'}
                    `}></div>
                  </div>
                </button>
                
                {/* Vintage Tab */}
                <button
                  onClick={() => handleCollectionChange('vintage')}
                  className="relative group px-2 py-1 transition-all duration-300 focus:outline-none"
                >
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 mb-3 flex items-center justify-center rounded-full
                      ${activeCollection === 'vintage' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                      }
                      transition-colors duration-300
                    `}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activeCollection === 'vintage' ? 2 : 1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      activeCollection === 'vintage' ? 'text-emerald-800' : 'text-gray-600 group-hover:text-emerald-700'
                    }`}>
                      Vintage
                    </span>
                  </div>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 mt-1">
                    <div className={`
                      h-full rounded-full transition-all duration-300 transform origin-left
                      ${activeCollection === 'vintage' ? 'bg-emerald-500 scale-x-100' : 'bg-transparent scale-x-0 group-hover:bg-emerald-200 group-hover:scale-x-50'}
                    `}></div>
                  </div>
                </button>
              </div>
              
              {/* Collection Description */}
              <div className="mt-6 max-w-2xl mx-auto text-center">
                <p className={`text-sm transition-opacity duration-300 ${
                  activeCollection === 'seasonal' ? 'text-blue-900/70' :
                  activeCollection === 'limited' ? 'text-amber-900/70' :
                  'text-emerald-900/70'
                }`}>
                  {activeCollection === 'seasonal' 
                    ? 'Discover our enchanting selection of seasonal decorations to transform your space.' 
                    : activeCollection === 'limited'
                    ? 'Exclusive pieces that combine craftsmanship with contemporary design.' 
                    : 'Timeless designs that evoke nostalgia and warmth for lasting traditions.'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Collection Header Bar */}
        <section className={`py-4 ${
          activeCollection === 'seasonal' ? 'bg-blue-50' :
          activeCollection === 'limited' ? 'bg-amber-50' :
          'bg-emerald-50'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h3 className={`text-xl font-medium ${
                activeCollection === 'seasonal' ? 'text-blue-900' :
                activeCollection === 'limited' ? 'text-amber-900' :
                'text-emerald-900'
              }`}>
                {collections[activeCollection as keyof typeof collections]?.title}
              </h3>
              <div className="text-sm text-gray-500">
                {filteredProducts.length} items
              </div>
            </div>
          </div>
        </section>
        
        {/* Elegant Product Grid */}
        <section className="container mx-auto px-4 py-16">
          {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <div className={`w-12 h-12 rounded-full border-2 animate-spin ${
                activeCollection === 'seasonal' ? 'border-blue-500 border-t-transparent' :
                activeCollection === 'limited' ? 'border-amber-500 border-t-transparent' :
                'border-emerald-500 border-t-transparent'
              }`}></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-50">
                    {/* Product Image */}
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Quick view button */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button 
                          className={`w-full py-2.5 rounded-md text-white text-sm font-medium transition-colors ${
                            activeCollection === 'seasonal' ? 'bg-blue-600 hover:bg-blue-700' :
                            activeCollection === 'limited' ? 'bg-amber-600 hover:bg-amber-700' :
                            'bg-emerald-600 hover:bg-emerald-700'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                          }}
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                    
                    {/* Product Labels */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          activeCollection === 'seasonal' ? 'bg-blue-100 text-blue-800' :
                          activeCollection === 'limited' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          New
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="px-2">
                    <h3 
                      className="text-lg font-medium text-gray-900 mb-1 group-hover:underline decoration-[0.5px] underline-offset-2 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                      }}
                    >
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">${product.discountedPrice}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded ${
                        activeCollection === 'seasonal' ? 'bg-blue-100 text-blue-800' :
                        activeCollection === 'limited' ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        Save ${product.originalPrice - product.discountedPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        
        {/* Refined Newsletter Section */}
        <section className={`py-20 ${
          activeCollection === 'seasonal' ? 'bg-blue-50' :
          activeCollection === 'limited' ? 'bg-amber-50' :
          'bg-emerald-50'
        }`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-10 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full ${
                activeCollection === 'seasonal' ? 'bg-blue-100' :
                activeCollection === 'limited' ? 'bg-amber-100' :
                'bg-emerald-100'
              }`}></div>
              <div className={`absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 rounded-full ${
                activeCollection === 'seasonal' ? 'bg-blue-100/50' :
                activeCollection === 'limited' ? 'bg-amber-100/50' :
                'bg-emerald-100/50'
              }`}></div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-cursive mb-4 text-gray-900">Join Our Collector&apos;s Circle</h2>
                <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                  Be the first to know about new collections, limited edition releases, and exclusive collector&apos;s events.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <button className={`px-6 py-3 rounded-md font-medium text-white transition-colors whitespace-nowrap ${
                    activeCollection === 'seasonal' ? 'bg-blue-600 hover:bg-blue-700' :
                    activeCollection === 'limited' ? 'bg-amber-600 hover:bg-amber-700' :
                    'bg-emerald-600 hover:bg-emerald-700'
                  }`}>
                    Subscribe
                  </button>
                </div>
                
                <p className="mt-4 text-xs text-gray-500">
                  By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-gray-800 hover:bg-gray-200 transition-colors"
              onClick={() => setSelectedProduct(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex flex-col md:flex-row h-full">
              {/* Product Image */}
              <div className="w-full md:w-1/2 relative bg-gray-50">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                
                {/* Product badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {selectedProduct.isNew && (
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      activeCollection === 'seasonal' ? 'bg-blue-100 text-blue-800' :
                      activeCollection === 'limited' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      New
                    </span>
                  )}
                  {selectedProduct.isFeatured && (
                    <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              
              {/* Product Details */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col h-full">
                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                  <div className="mb-2 text-sm uppercase tracking-wider text-gray-500">
                    {selectedProduct.category === 'seasonal' ? 'Seasonal Collection' : 
                     selectedProduct.category === 'limited' ? 'Limited Edition' : 
                     'Vintage Collection'}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">{selectedProduct.title}</h2>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-semibold">${selectedProduct.discountedPrice}</span>
                    <span className="text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                    <span className={`ml-auto text-xs font-medium px-2 py-1 rounded ${
                      activeCollection === 'seasonal' ? 'bg-blue-100 text-blue-800' :
                      activeCollection === 'limited' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      Save ${selectedProduct.originalPrice - selectedProduct.discountedPrice}
                    </span>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                      <div className="flex border border-gray-300 rounded-md w-32">
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                        <div className="flex-1 text-center py-1">1</div>
                        <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Highlights</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>Hand-crafted with premium materials</li>
                        <li>Exclusive design only available this season</li>
                        <li>Makes a perfect gift or home accent</li>
                        <li>Easy to clean and maintain</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <button 
                    className={`w-full py-3 rounded-md text-white font-medium text-base transition-colors ${
                      activeCollection === 'seasonal' ? 'bg-blue-600 hover:bg-blue-700' :
                      activeCollection === 'limited' ? 'bg-amber-600 hover:bg-amber-700' :
                      'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    Add to Cart
                  </button>
                  
                  <div className="flex justify-between mt-4">
                    <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Save to Wishlist
                    </button>
                    <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 