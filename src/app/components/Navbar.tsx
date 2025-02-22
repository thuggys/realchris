'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/collection', label: 'Collection' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          hasScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-10 text-2xl font-bold text-gray-900 flex items-center gap-2"
              aria-label="MI North Christmas - Home"
            >
              <span className="text-red-500">MI</span>
              <span>North</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full hover:text-red-500 ${
                      pathname === link.href 
                        ? 'text-red-500 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-red-500 after:rounded-full' 
                        : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2 ml-4">
                <button 
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button 
                  className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                  aria-label="Shopping cart"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4">
                <span className={`absolute w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${isOpen ? 'rotate-45 top-1.5' : 'top-0'}`} />
                <span className={`absolute w-5 h-0.5 bg-gray-600 top-1.5 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${isOpen ? '-rotate-45 top-1.5' : 'top-3'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-black/20 transition-opacity duration-300 lg:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
          onClick={() => setIsOpen(false)}
        />
        
        <div 
          className={`fixed inset-y-0 right-0 w-[280px] bg-white shadow-xl transition-transform duration-300 ease-out lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close button for mobile */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col h-full pt-16">
            <div className="flex-1 overflow-y-auto px-4">
              <div className="space-y-6">
                {/* Mobile Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                        pathname === link.href 
                          ? 'bg-red-50 text-red-500' 
                          : 'text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Quick Actions */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
                  <div className="mt-2 space-y-1">
                    <button 
                      className="flex items-center w-full px-4 py-2.5 gap-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="Search products"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Products
                    </button>
                    <button 
                      className="flex items-center w-full px-4 py-2.5 gap-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="View shopping cart"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Shopping Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="border-t border-gray-100 p-4">
              <button 
                className="w-full py-2.5 px-4 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Extra space for fixed navbar */}
      <div className="h-20" />
    </>
  );
} 