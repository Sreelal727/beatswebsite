import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                High-Quality
                <span className="block text-blue-200">Dental Units</span>
                <span className="block">& Accessories</span>
              </h1>
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Offering premium biomedical equipment with unmatched quality, reliability, and innovation for healthcare facilities across the UAE and beyond.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 group"
              >
                Request a Free Quote
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-lg transition-colors duration-200"
              >
                View Products
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">8+</div>
                <div className="text-sm text-blue-100">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">7+</div>
                <div className="text-sm text-blue-100">Partner Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">100+</div>
                <div className="text-sm text-blue-100">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Woson Dental Units</h3>
                  <p className="text-blue-100">Premium quality dental equipment and accessories</p>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="text-sm font-semibold text-green-600">✓ ISO Certified</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
              <div className="text-sm font-semibold text-blue-600">24/7 Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}