'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/components/context/CartContext';
import CartSidebar from '@/components/ui/CartSidebar';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/who-we-are' },
  { name: 'Shop', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Turnkey Solutions', href: '/turnkey-solutions' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { openCart, getItemCount } = useCart();

  useEffect(() => {
    // Set client flag to true after hydration
    setIsClient(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg ${
      isClient && isScrolled 
        ? 'bg-white shadow-xl' 
        : 'bg-blue-900 shadow-lg'
    }`}>
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img 
                src="/beatslogo.png" 
                alt="Beats Medical Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className={`text-2xl font-bold font-playfair transition-colors duration-300 ${
                  isClient && isScrolled ? 'text-blue-900' : 'text-white'
                }`}>BEATS</h1>
                <p className={`text-xs transition-colors duration-300 ${
                  isClient && isScrolled ? 'text-blue-700' : 'text-gray-200'
                }`}>Medical Equipment Trading L.L.C.</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 relative group hover:text-[#e34a80] ${
                  isClient && isScrolled ? 'text-blue-900' : 'text-white'
                }`}
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#e34a80] transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Cart and CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={openCart}
              className={`relative p-2 rounded-lg transition-all duration-300 hover:text-[#e34a80] ${
                isClient && isScrolled ? 'text-blue-900' : 'text-white'
              }`}
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            <Link
              href="/contact"
              className={`border-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                isClient && isScrolled 
                  ? 'bg-white border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white' 
                  : 'bg-blue-900 border-white text-white hover:bg-white hover:text-blue-900'
              }`}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className={`transition-colors duration-300 hover:text-[#e34a80] ${
                isClient && isScrolled ? 'text-blue-900' : 'text-white'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t transition-colors duration-300 ${
          isClient && isScrolled 
            ? 'bg-gray-50 border-gray-200' 
            : 'bg-blue-800 border-blue-700'
        }`}>
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md font-medium transition-colors duration-300 hover:text-[#e34a80] ${
                  isClient && isScrolled 
                    ? 'text-blue-900 hover:bg-gray-100' 
                    : 'text-white hover:bg-blue-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Cart Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md font-medium transition-colors duration-300 hover:text-[#e34a80] ${
                isClient && isScrolled 
                  ? 'text-blue-900 hover:bg-gray-100' 
                  : 'text-white hover:bg-blue-700'
              }`}
            >
              <span className="flex items-center">
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Cart
              </span>
              {getItemCount() > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            <Link
              href="/contact"
              className={`block px-3 py-2 rounded-md font-medium text-center mt-4 transition-colors duration-300 ${
                isClient && isScrolled 
                  ? 'bg-blue-900 text-white hover:bg-blue-800' 
                  : 'bg-white text-blue-900 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
}