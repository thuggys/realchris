"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const CUSTOMER_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/png?seed=Felix&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Sophie&backgroundColor=ffdfbf",
  "https://api.dicebear.com/7.x/avataaars/png?seed=John&backgroundColor=c0aede",
  "https://api.dicebear.com/7.x/avataaars/png?seed=Maria&backgroundColor=d1d4f9",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

        // Rotate animation for bells
        gsap.to(".rotating-element", {
          rotate: "+=45",
          duration: 8,
          ease: "none",
          repeat: -1
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen md:min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-b from-white to-red-50 px-4 sm:px-6"
      aria-label="Welcome Section"
    >
      {/* Background blur circle - better mobile positioning */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] md:w-[120%] aspect-square bg-red-100 rounded-full opacity-20 blur-3xl" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto py-8 md:py-12 lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left z-10">
            <div className="relative">
              <span 
                className="welcome-text inline-block text-red-500 font-medium tracking-wider uppercase text-xs sm:text-sm mb-2 sm:mb-3" 
                aria-label="Welcome message"
              >
                Welcome to
              </span>
              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1]" aria-label="MI North Christmas Magic">
                <span className="title-text block text-gray-900 font-light">MI North</span>
                <span className="title-text block text-red-500 font-bold mt-1 sm:mt-2">Christmas</span>
                <span className="title-text block text-gray-800 font-light mt-1 sm:mt-2">Magic</span>
              </h1>
            </div>

            <p className="content-anim text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover our enchanting collection of handcrafted Christmas decorations, 
              bringing the warmth and joy of the holiday season to your home.
            </p>

            <div className="content-anim flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-red-500 text-white rounded-xl text-base sm:text-lg font-medium hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Explore Our Collection"
              >
                Explore Collection
              </button>
              <button 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-900 text-gray-900 rounded-xl text-base sm:text-lg font-medium hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                aria-label="Learn More About Us"
              >
                Learn More
              </button>
            </div>
            
            {/* Social Proof - Improved mobile layout */}
            <div 
              className="social-proof flex flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl mx-auto lg:mx-0 w-fit" 
              aria-label="Customer Statistics"
            >
              <div className="flex -space-x-2 sm:-space-x-3" aria-label="Customer Avatars">
                {CUSTOMER_AVATARS.map((avatar, i) => (
                  <div 
                    key={i} 
                    className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full border-2 border-white overflow-hidden"
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
                <p className="font-bold text-gray-900 text-lg sm:text-xl">2,500+</p>
                <p className="text-gray-600 text-sm">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div ref={imageRef} className="w-[85%] sm:w-3/4 md:w-2/3 lg:w-1/2 -mt-6 sm:mt-0">
            <div className="relative">
              {/* Main Image */}
              <div 
                className="relative z-20 bg-white p-8 sm:p-10 md:p-12 rounded-full shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 aspect-square"
                aria-label="MI North Christmas Logo"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-950 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]"></div>
                  
                  {/* Snowfall Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
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
                    className="object-contain w-full h-full p-4 relative z-10"
                    priority
                  />
                </div>
                
                {/* Circular Border Effect */}
                <div className="absolute inset-0 border-4 border-red-500/40 rounded-full"></div>
                <div className="absolute inset-2 border-2 border-red-500/30 rounded-full shadow-inner"></div>
                <div className="absolute inset-4 border border-red-500/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 