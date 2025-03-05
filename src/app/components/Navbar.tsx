'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Navbar animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-logo', {
        x: -20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
      
      gsap.from('.nav-link', {
        y: -10,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2
      });
      
      gsap.from('.join-button', {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.5)',
        delay: 0.5
      });
    }, navRef);
    
    return () => ctx.revert();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/collection', label: 'Collection' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <style jsx global>{`
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .mobile-nav-btn {
            display: none !important;
          }
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          hasScrolled ? 'bg-[#FFF9F0]/95 navbar-backdrop shadow-sm' : 'bg-white/95 md:bg-transparent'
        } safe-padding-top`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Top Holiday Banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-1.5 text-center text-white text-sm font-medium px-4">
          <p>🎄 Holiday Special: Free Shipping on Orders Over $50 🎄</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="nav-logo relative z-10 flex items-center"
              aria-label="MI North Christmas - Home"
            >
              <div className="flex flex-col">
                <h1 className="flex items-center text-[#222]">
                  <span className="font-serif text-2xl font-bold tracking-tight">
                    <span className="text-red-600">MI</span><span>NORTH</span>
                  </span>
                </h1>
                <div className="flex items-center">
                  <div className="h-0.5 w-7 bg-red-500 mr-2"></div>
                  <span className="text-xs text-red-600 uppercase tracking-widest font-medium">Christmas</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-medium text-[#222] hover:text-red-600 transition-colors ${
                    pathname === link.href 
                      ? 'text-red-600 font-semibold' 
                      : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Join Now Button */}
              <Link
                href="/join"
                className="join-button hidden md:inline-flex bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
              >
                Join Now
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                className="md:hidden flex items-center justify-center w-10 h-10 text-gray-800"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation - Dropdown mode */}
          {isOpen && (
            <div 
              className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-lg border-t border-gray-100 mobile-nav-dropdown z-[101]"
              style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}
            >
              <div className="px-6 py-6">
                <ul className="space-y-5">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block py-2 px-3 rounded-lg text-[#222] hover:bg-red-50 hover:text-red-600 transition-colors ${
                          pathname === link.href 
                            ? 'bg-red-50 text-red-600 font-semibold' 
                            : 'font-medium'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-2 flex justify-center">
                    <Link
                      href="/join"
                      className="inline-flex bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition-colors shadow-md w-full justify-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Join Now
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Space to compensate for fixed navbar */}
      <div className="h-[72px] md:h-[84px]"></div>
    </>
  );
} 