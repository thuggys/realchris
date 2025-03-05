"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import MouseFollower from "mouse-follower";

const CUSTOMER_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/png?seed=Felix&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Sophie&backgroundColor=ffdfbf",
  "https://api.dicebear.com/7.x/avataaars/png?seed=John&backgroundColor=c0aede",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Maria&backgroundColor=d1d4f9",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const cursorInitialized = useRef(false);

  useEffect(() => {
    setIsClient(true);
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Remove the problematic MouseFollower initialization
    // We'll handle it differently

    const ctx = gsap.context(() => {
      // Welcome text animation
      gsap.from(".welcome-text", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      });

      // Staggered title animation
      gsap.from(".title-text", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2
      });

      // Description and buttons animation
      gsap.from(".content-anim", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.8
      });

      // Social proof animation
      gsap.from(".social-proof", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 1.2
      });

      // Hero image animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.4
        });

        // Floating animation for decorative elements
        gsap.to(".floating-element", {
          y: "20px",
          duration: 2,
          ease: "none",
          yoyo: true,
          repeat: -1
        });

        // Rotate animation for elements
        gsap.to(".rotating-element", {
          rotate: "+=45",
          duration: 8,
          ease: "none",
          repeat: -1
        });
        
        // Parallax effect on scroll
        gsap.to(".parallax-bg", {
          y: "30%",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
      
      // Animated background shapes
      gsap.to(".animated-shape-1", {
        x: "10vw",
        y: "5vh",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(".animated-shape-2", {
        x: "-15vw",
        y: "-8vh",
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      });
    }, heroRef);

    return () => {
      ctx.revert();
      // No need to destroy cursor here since we're not initializing it
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen md:min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-b from-white via-rose-50 to-red-50 px-4 sm:px-6"
      aria-label="Welcome Section"
    >
      {/* Animated background shapes */}
      <div className="animated-shape-1 absolute top-[10%] left-[10%] w-[30vw] md:w-[20vw] aspect-square bg-gradient-to-br from-red-200/20 to-rose-300/30 rounded-full opacity-50 blur-3xl" aria-hidden="true"></div>
      <div className="animated-shape-2 absolute bottom-[10%] right-[10%] w-[40vw] md:w-[25vw] aspect-square bg-gradient-to-tr from-red-300/20 to-pink-200/30 rounded-full opacity-60 blur-3xl" aria-hidden="true"></div>
      
      {/* Parallax background elements */}
      <div className="parallax-bg absolute top-1/3 left-1/4 w-8 h-8 bg-red-500/10 rounded-full" aria-hidden="true"></div>
      <div className="parallax-bg absolute top-2/3 right-1/3 w-12 h-12 bg-red-400/10 rounded-full" aria-hidden="true"></div>
      <div className="parallax-bg absolute bottom-1/4 left-1/2 w-5 h-5 bg-red-600/10 rounded-full" aria-hidden="true"></div>
      
      {/* Snow particles */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-snowfall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                opacity: 0.7,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left z-10">
            <div className="relative">
              <span 
                className="welcome-text inline-block text-red-500 font-medium tracking-wider uppercase text-xs sm:text-sm mb-2 sm:mb-3 rounded-full bg-red-50 px-3 py-1 shadow-sm" 
                aria-label="Welcome message"
              >
                Welcome to our collection
              </span>
              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1]" aria-label="Holiday Magic Collection">
                <span className="title-text block text-gray-900 font-light">Discover</span>
                <span className="title-text block text-red-500 font-bold mt-1 sm:mt-2 relative inline-block">
                  Holiday
                  <span className="absolute -top-1 -right-2 w-3 h-3 bg-red-400 rounded-full opacity-70 floating-element"></span>
                </span>
                <span className="title-text block text-gray-800 font-light mt-1 sm:mt-2">Magic</span>
              </h1>
            </div>

            <p className="content-anim text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Transform your home into a winter wonderland with our enchanting collection of handcrafted Christmas decorations.
            </p>

            <div className="content-anim flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-base sm:text-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 relative overflow-hidden group"
                aria-label="Explore Our Collection"
              >
                <span className="relative z-10">Explore Collection</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-900 text-gray-900 rounded-xl text-base sm:text-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                aria-label="Learn More About Us"
              >
                Learn More
              </button>
            </div>
            
            {/* Social Proof - Enhanced */}
            <div 
              className="social-proof flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm p-4 md:p-5 rounded-xl border border-white/70 shadow-md mx-auto lg:mx-0 w-fit" 
              aria-label="Customer Statistics"
            >
              <div className="flex -space-x-3 sm:-space-x-4" aria-label="Customer Avatars">
                {CUSTOMER_AVATARS.map((avatar, i) => (
                  <div 
                    key={i} 
                    className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full border-2 border-white overflow-hidden transform hover:scale-110 hover:z-10 transition-all duration-300"
                    aria-hidden="true"
                  >
                    <Image
                      src={avatar}
                      alt=""
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">2,500+</p>
                <p className="text-gray-600 text-sm md:text-base">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div ref={imageRef} className="w-[85%] sm:w-3/4 md:w-2/3 lg:w-1/2 -mt-6 sm:mt-0">
            <div className="relative">
              {/* Main Image */}
              <div 
                className="relative z-20 bg-gradient-to-br from-white to-white/90 p-8 sm:p-10 md:p-12 rounded-full shadow-2xl transform hover:-translate-y-3 transition-transform duration-500 aspect-square"
                aria-label="MI North Christmas Logo"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-950 backdrop-blur-sm border-8 border-white shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent)]"></div>
                  
                  {/* Snowfall Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    {isClient && [...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-snowfall"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: '-5%',
                          opacity: 0.7,
                          animationDelay: `${Math.random() * 5}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>

                  <Image
                    src="/logo.png"
                    alt="MI North Christmas Logo"
                    width={800}
                    height={800}
                    className="object-contain w-full h-full p-4 relative z-10 transform hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
                
                {/* Circular Border Effects */}
                <div className="absolute inset-0 border-4 border-red-500/40 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 border-2 border-red-500/30 rounded-full shadow-inner"></div>
                <div className="absolute inset-4 border border-red-500/20 rounded-full"></div>
                
                {/* Floating Decoration Elements */}
                <div className="absolute -top-4 -right-2 w-12 h-12 flex items-center justify-center">
                  <div className="w-full h-full bg-red-100 rounded-full opacity-80 absolute floating-element"></div>
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-red-500 relative z-10 rotating-element" fill="currentColor">
                    <path d="M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm-7.999 7c1.437.438 2.562 1.564 2.999 3.001.438-1.437 1.563-2.562 3-2.999-1.437-.438-2.562-1.564-3-3.001-.437 1.436-1.562 2.562-2.999 3zm-2-8c.999.305 1.784 1.093 2.086 2.094.305-1.001 1.092-1.787 2.093-2.093-1.001-.305-1.788-1.093-2.093-2.093-.303 1-1.087 1.788-2.086 2.092zm19.998 2.001c-1.001-.305-1.786-1.094-2.089-2.094-.304 1-1.088 1.789-2.089 2.094 1.001.305 1.785 1.094 2.089 2.093.303-.999 1.088-1.789 2.089-2.093z"/>
                  </svg>
                </div>
                <div className="absolute -bottom-2 -left-4 w-10 h-10 flex items-center justify-center">
                  <div className="w-full h-full bg-red-100 rounded-full opacity-80 absolute floating-element"></div>
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500 relative z-10 rotating-element" fill="currentColor">
                    <path d="M11 6.999c2.395.731 4.27 2.607 4.999 5.001.733-2.395 2.608-4.269 5.001-5-2.393-.731-4.268-2.605-5.001-5-.729 2.394-2.604 4.268-4.999 4.999zm-7.999 7c1.437.438 2.562 1.564 2.999 3.001.438-1.437 1.563-2.562 3-2.999-1.437-.438-2.562-1.564-3-3.001-.437 1.436-1.562 2.562-2.999 3zm-2-8c.999.305 1.784 1.093 2.086 2.094.305-1.001 1.092-1.787 2.093-2.093-1.001-.305-1.788-1.093-2.093-2.093-.303 1-1.087 1.788-2.086 2.092zm19.998 2.001c-1.001-.305-1.786-1.094-2.089-2.094-.304 1-1.088 1.789-2.089 2.094 1.001.305 1.785 1.094 2.089 2.093.303-.999 1.088-1.789 2.089-2.093z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 