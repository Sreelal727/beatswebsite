import Link from 'next/link';
import { HeartIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

const companyInfo = [
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Careers', href: '/careers' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy' },
];

const productCategories = [
  { name: 'Emergency', href: '/products/emergency' },
  { name: 'Cardiology', href: '/products/cardiology' },
  { name: 'Dental Products', href: '/products/dental' },
  { name: 'Medical Refrigerators', href: '/products/refrigerators' },
  { name: 'Physiotherapy', href: '/products/physiotherapy' },
  { name: 'Sterilization', href: '/products/sterilization' },
  { name: 'Ultrasound', href: '/products/ultrasound' },
];

const partners = [
  { name: 'Woson', href: '/brands/woson' },
  { name: 'Chison', href: '/brands/chison' },
  { name: 'Instramed', href: '/brands/instramed' },
  { name: 'YaraMed', href: '/brands/yaramed' },
  { name: 'YaraDent', href: '/brands/yaradent' },
  { name: 'Johari', href: '/brands/johari' },
  { name: 'Plement', href: '/brands/plement' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'YouTube', href: '#', icon: 'youtube' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/beatslogo.png" 
                alt="Beats Medical Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h2 className="text-xl font-bold">BEATS</h2>
                <p className="text-xs text-gray-300">Medical Equipment Trading L.L.C.</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Beats Medical is a Leading Biomedical Equipment Supplier Based in Dubai, With a Global Presence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Kasco Tower, Office No. 109,</p>
                  <p>Al Qusais Industrial Area 3,</p>
                  <p>Dubai, United Arab Emirates</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-300">+971 56 522 5437</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-gray-300">sales@beatsmed.com</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company Info</h3>
            <ul className="space-y-2">
              {companyInfo.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              {productCategories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Partners</h3>
            <ul className="space-y-2">
              {partners.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="h-6 w-6 bg-gray-600 hover:bg-blue-600 rounded transition-colors duration-200"></div>
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              <p>&copy; 2024 Beats Medical Equipment Trading L.L.C. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}