'use client'

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animations
      gsap.from(".about-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about-title",
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Paragraphs stagger animation
      gsap.from(".about-text", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about-text",
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });

      // Image and frame animation
      if (imageRef.current) {
        // Frame animation
        gsap.from(".decorative-frame", {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        });

        // Stats card animation
        gsap.from(".stats-card", {
          x: -50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".stats-card",
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Signature section animation
      gsap.from(".signature-section", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".signature-section",
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-20 bg-white"
      aria-label="About MI North Christmas"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="about-title space-y-2">
              <h2 className="text-gray-600 uppercase tracking-wider text-sm font-medium">About Us</h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">Hi, Welcome to MI North Christmas!</h3>
            </div>
            
            <div className="space-y-4 sm:space-y-6 text-gray-600 leading-relaxed">
              <p className="about-text">
                We are a dedicated team of Christmas enthusiasts with over 10 years of experience 
                in bringing joy and festive spirit to homes around the world.
              </p>
              
              <p className="about-text">
                We&apos;re passionate about helping others create magical holiday moments. With our 
                carefully curated selection of Christmas decorations and gifts, we make it easy 
                for you to transform your space into a winter wonderland.
              </p>

              <p className="about-text">
                Whether you&apos;re looking for traditional decorations or modern holiday accessories, 
                we&apos;re here to help you find the perfect items to make your Christmas celebrations 
                truly special.
              </p>
            </div>

            <div className="about-text flex items-center gap-4 pt-4">
              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg px-2 py-1"
                aria-label="Read more about MI North Christmas"
              >
                Read More
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="signature-section flex items-center gap-4 pt-6 sm:pt-8" role="contentinfo" aria-label="Founders Information">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full overflow-hidden border-2 border-gray-100">
                <Image
                  src="/me.jpg"
                  alt="Vickie and Chris, Founders of MI North Christmas"
                  width={80}
                  height={80}
                  className="object-cover opacity-80"
                />
              </div>
              <div className="h-8 w-px bg-gray-200" aria-hidden="true"></div>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Vickie & Chris</p>
                <p className="text-sm text-gray-600">Founders, MI North Christmas</p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div ref={imageRef} className="w-full lg:w-1/2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative frame */}
              <div className="decorative-frame absolute -top-6 -right-6 w-[calc(100%+24px)] h-[calc(100%+24px)] bg-red-600/10 rounded-3xl" aria-hidden="true"></div>
              <div className="decorative-frame absolute -top-3 -right-3 w-[calc(100%+12px)] h-[calc(100%+12px)] bg-red-600/5 rounded-3xl" aria-hidden="true"></div>
              
              {/* Main image container */}
              <div 
                className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white p-3 sm:p-4"
                aria-label="Our Story Image"
              >
                <div className="relative h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/chr.png"
                    alt="MI North Christmas team crafting holiday decorations"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Floating stats card */}
              <div 
                className="stats-card absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 sm:p-6 max-w-[calc(100%-2rem)] sm:max-w-xs"
                aria-label="Years of Experience"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center" aria-hidden="true">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">10+ Years</p>
                    <p className="text-xs sm:text-sm text-gray-600">Of Spreading Joy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 