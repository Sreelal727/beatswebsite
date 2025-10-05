import Link from 'next/link';
import { ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline';

const partnerBrands = [
  {
    id: 'woson',
    name: 'Woson',
    tagline: 'Leading Dental Equipment Innovation',
    category: 'Dental Equipment',
    description: 'Woson is a premier manufacturer of dental equipment, specializing in dental chairs, delivery systems, and comprehensive dental solutions. Known for their innovative design and reliable performance.',
    specialties: ['Dental Chairs', 'Delivery Systems', 'Dental Units', 'Accessories'],
    established: '1988',
    origin: 'China',
    certifications: ['CE', 'FDA', 'ISO 13485'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'chison',
    name: 'Chison',
    tagline: 'Advanced Ultrasound Technology',
    category: 'Medical Imaging',
    description: 'Chison Medical Technologies is a leading manufacturer of ultrasound systems, providing innovative imaging solutions for various medical applications with cutting-edge technology.',
    specialties: ['Ultrasound Systems', 'Color Doppler', 'Portable Ultrasound', '4D Imaging'],
    established: '2002',
    origin: 'China',
    certifications: ['CE', 'FDA', 'ISO 13485'],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 'instramed',
    name: 'Instramed',
    tagline: 'Precision Medical Instruments',
    category: 'Medical Instruments',
    description: 'Instramed specializes in high-precision medical instruments and equipment, offering reliable solutions for various medical specialties with focus on quality and innovation.',
    specialties: ['Surgical Instruments', 'Diagnostic Equipment', 'Emergency Care', 'Sterilization'],
    established: '1995',
    origin: 'Germany',
    certifications: ['CE', 'ISO 13485', 'MDR'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'yaramed',
    name: 'YaraMed',
    tagline: 'Comprehensive Healthcare Solutions',
    category: 'General Medical Equipment',
    description: 'YaraMed provides comprehensive healthcare solutions including hospital furniture, medical equipment, and facility management systems for modern healthcare environments.',
    specialties: ['Hospital Furniture', 'Patient Monitors', 'Medical Refrigeration', 'Emergency Equipment'],
    established: '2005',
    origin: 'Turkey',
    certifications: ['CE', 'ISO 13485', 'ISO 9001'],
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 'yaradent',
    name: 'YaraDent',
    tagline: 'Complete Dental Solutions',
    category: 'Dental Equipment',
    description: 'YaraDent offers complete dental solutions including dental chairs, imaging systems, and dental instruments, focusing on ergonomic design and advanced functionality.',
    specialties: ['Dental Chairs', 'Dental Imaging', 'Dental Instruments', 'Sterilization Equipment'],
    established: '2008',
    origin: 'Turkey',
    certifications: ['CE', 'ISO 13485', 'FDA'],
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    id: 'johari',
    name: 'Johari',
    tagline: 'Reliable Medical Storage Solutions',
    category: 'Medical Storage & Refrigeration',
    description: 'Johari specializes in medical storage solutions, including pharmaceutical refrigerators, vaccine storage, and temperature-controlled medical equipment.',
    specialties: ['Medical Refrigerators', 'Vaccine Storage', 'Blood Bank Equipment', 'Laboratory Storage'],
    established: '1992',
    origin: 'India',
    certifications: ['CE', 'WHO PQS', 'ISO 13485'],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'plement',
    name: 'Plement',
    tagline: 'Advanced Sterilization Technology',
    category: 'Sterilization & Infection Control',
    description: 'Plement is a leading manufacturer of sterilization equipment, providing advanced autoclave systems and infection control solutions for healthcare facilities.',
    specialties: ['Steam Autoclaves', 'ETO Sterilizers', 'Washer Disinfectors', 'Sterilization Monitoring'],
    established: '1998',
    origin: 'South Korea',
    certifications: ['CE', 'FDA', 'ISO 13485'],
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  }
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Partner Brands
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We partner with world-class manufacturers to bring you the highest quality medical equipment 
              and innovative healthcare solutions from trusted global brands.
            </p>
          </div>
        </div>
      </section>

      {/* Brands Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted Global Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our carefully selected brand partners represent excellence in medical technology, 
              innovation, and reliability across various healthcare specialties.
            </p>
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partnerBrands.map((brand) => (
              <div key={brand.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Brand Header */}
                <div className={`${brand.bgColor} ${brand.borderColor} border-l-4 p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{brand.name}</h3>
                      <p className={`text-sm font-medium ${brand.color}`}>{brand.tagline}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${brand.bgColor} ${brand.color}`}>
                        {brand.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Brand Logo Placeholder */}
                  <div className="bg-white rounded-lg p-6 mb-4 text-center">
                    <div className="text-4xl font-bold text-gray-400 mb-2">{brand.name}</div>
                    <p className="text-sm text-gray-500">Brand Logo</p>
                  </div>
                </div>

                {/* Brand Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Brand Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Established</h4>
                      <p className="text-gray-600">{brand.established}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Origin</h4>
                      <p className="text-gray-600">{brand.origin}</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Certifications</h4>
                    <div className="flex space-x-2">
                      {brand.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${brand.bgColor} ${brand.color}`}
                        >
                          <StarIcon className="h-3 w-3 mr-1" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      href={`/products?brand=${brand.id}`}
                      className="flex-1 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200 text-center font-medium"
                    >
                      Explore Products
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why We Choose These Partners
            </h2>
            <p className="text-lg text-gray-600">
              Our brand selection criteria ensure you receive the best medical equipment available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">All partners meet international quality standards and certifications</p>
            </div>

            <div className="text-center">
              <div className="bg-green-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Cutting-edge technology and continuous product development</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600 text-sm">Proven track record of dependable equipment and service</p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Comprehensive after-sales support and training programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in Our Brand Partners?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover the full range of products available from our trusted brand partners. 
            Contact us to learn more about specific equipment and solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              View All Products
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-lg transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}