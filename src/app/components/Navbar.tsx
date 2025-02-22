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
          <div className="flex justify-between items-center h-24 sm:h-28">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative z-10 text-lg sm:text-xl font-serif tracking-wide ml-0"
              aria-label="MI North Christmas - Home"
            >
              <span className="text-red-500">MI North</span>
              <span className="text-gray-700"> Christmas</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm">
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
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-lg transition-all duration-300 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 top-2' : 'top-0'}`} />
                <span className={`absolute w-4 right-0 h-0.5 bg-gray-800 top-2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 w-0' : 'opacity-100'}`} />
                <span className={`absolute w-6 h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 top-2' : 'top-4'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: 40 }}
          aria-hidden={!isOpen}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Mobile Menu Panel */}
        <div 
          className={`fixed inset-y-0 right-0 w-[min(100vw,400px)] bg-white shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: 45 }}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <span className="text-xl font-serif">Menu</span>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Links */}
              <div className="p-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${
                      pathname === link.href 
                        ? 'bg-red-50 text-red-500' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-6 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    className="flex items-center w-full px-4 py-3 gap-3 text-gray-700 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
                    aria-label="Search products"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="font-medium">Search Products</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100">
              <button 
                className="w-full py-3 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:-translate-y-0.5"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Extra space for fixed navbar */}
      <div className="h-24 sm:h-28" />
    </>
  );
} 