import Link from 'next/link';
import { 
  WrenchScrewdriverIcon, 
  CogIcon, 
  AcademicCapIcon, 
  PhoneIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  UserGroupIcon, 
  DocumentTextIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const services = [
  {
    id: 1,
    title: 'Equipment Maintenance & Repair',
    description: 'Professional maintenance and repair services for all types of medical equipment. Our certified technicians ensure your equipment operates at peak performance with minimal downtime.',
    icon: WrenchScrewdriverIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    features: [
      'Preventive maintenance programs',
      'Emergency repair services',
      'Genuine spare parts supply',
      'Performance optimization'
    ]
  },
  {
    id: 2,
    title: 'Equipment Calibration',
    description: 'Precise calibration services to ensure your medical equipment meets accuracy standards and regulatory requirements. We provide certified calibration for all major equipment brands.',
    icon: CogIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    features: [
      'ISO certified calibration',
      'Regulatory compliance verification',
      'Calibration certificates',
      'Scheduled calibration programs'
    ]
  },
  {
    id: 3,
    title: 'Staff Training Programs',
    description: 'Comprehensive training programs for healthcare professionals on equipment operation, safety protocols, and best practices. Enhance your team&rsquo;s skills and confidence.',
    icon: AcademicCapIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      'Equipment operation training',
      'Safety protocol education',
      'Hands-on practical sessions',
      'Certification programs'
    ]
  },
  {
    id: 4,
    title: '24/7 Technical Support',
    description: 'Round-the-clock technical support to address any equipment issues or questions. Our expert support team is always ready to assist you when you need it most.',
    icon: PhoneIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    features: [
      '24/7 helpline support',
      'Remote diagnostic services',
      'Priority response for emergencies',
      'Multi-language support'
    ]
  },
  {
    id: 5,
    title: 'Warranty & Service Contracts',
    description: 'Comprehensive warranty coverage and flexible service contracts to protect your investment. Choose from various service levels to match your specific needs and budget.',
    icon: ShieldCheckIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    features: [
      'Extended warranty options',
      'Flexible service contracts',
      'Priority service levels',
      'Cost-effective maintenance plans'
    ]
  },
  {
    id: 6,
    title: 'Scheduled Maintenance',
    description: 'Proactive scheduled maintenance programs to prevent equipment failures and extend equipment life. Our systematic approach ensures optimal performance and reliability.',
    icon: ClockIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    features: [
      'Customized maintenance schedules',
      'Preventive maintenance protocols',
      'Performance monitoring',
      'Maintenance reporting'
    ]
  },
  {
    id: 7,
    title: 'Installation & Commissioning',
    description: 'Professional installation and commissioning services for new medical equipment. We ensure proper setup, testing, and validation for safe and effective operation.',
    icon: UserGroupIcon,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    features: [
      'Professional installation',
      'Equipment commissioning',
      'Safety testing and validation',
      'User acceptance testing'
    ]
  },
  {
    id: 8,
    title: 'Documentation & Compliance',
    description: 'Complete documentation services including user manuals, maintenance records, and compliance documentation to meet regulatory requirements and quality standards.',
    icon: DocumentTextIcon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    features: [
      'User manual translation',
      'Maintenance documentation',
      'Compliance reporting',
      'Quality assurance records'
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Professional medical equipment services to keep your healthcare facility running at peak performance. 
              From maintenance and calibration to training and support, we&rsquo;ve got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Medical Equipment Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our expert team provides reliable, professional services to ensure your medical equipment 
              operates safely, efficiently, and in compliance with all regulatory standards.
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="lg:flex">
                  {/* Service Content */}
                  <div className="lg:w-2/3 p-8">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 ${service.bgColor} rounded-lg`}>
                        <service.icon className={`h-8 w-8 ${service.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${service.bgColor} ${service.color} text-sm font-bold`}>
                            {service.id}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        
                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircleIcon className={`h-5 w-5 ${service.color} flex-shrink-0`} />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <button className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200">
                          Request Service Quote
                          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Service Image/Visual */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                    <div className="text-center">
                      <service.icon className={`h-24 w-24 ${service.color} mx-auto mb-4`} />
                      <p className="text-gray-600 font-medium">Service {service.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-gray-600">
              Professional expertise and reliable support for all your medical equipment needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certified Technicians</h3>
              <p className="text-gray-600">Our team consists of certified professionals with extensive experience in medical equipment servicing.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock support ensures your equipment issues are resolved quickly and efficiently.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compliance Assured</h3>
              <p className="text-gray-600">All our services meet international standards and regulatory compliance requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Professional Equipment Services?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help maintain, calibrate, and support your medical equipment. 
            Contact us today for reliable service solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Request Service Quote
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold rounded-lg transition-colors duration-200"
            >
              View Our Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}