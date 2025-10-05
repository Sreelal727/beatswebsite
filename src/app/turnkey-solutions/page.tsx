import Link from 'next/link';
import { 
  ClipboardDocumentListIcon, 
  ShieldCheckIcon, 
  PencilSquareIcon, 
  CubeIcon, 
  ComputerDesktopIcon, 
  WrenchScrewdriverIcon, 
  BuildingOfficeIcon, 
  AcademicCapIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const turnkeySolutions = [
  {
    id: 1,
    title: 'Feasibility Study and Planning',
    description: 'Comprehensive analysis and strategic planning for your medical facility project. We conduct thorough market research, site evaluation, and financial feasibility studies to ensure your project\'s success from the ground up.',
    icon: ClipboardDocumentListIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    features: [
      'Market analysis and demand assessment',
      'Site evaluation and space planning',
      'Financial feasibility and ROI analysis',
      'Risk assessment and mitigation strategies'
    ]
  },
  {
    id: 2,
    title: 'Regulatory Permissions and Licensing',
    description: 'Navigate complex regulatory requirements with our expert guidance. We handle all necessary permits, licenses, and compliance documentation to ensure your facility meets all local and international standards.',
    icon: ShieldCheckIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    features: [
      'Healthcare facility licensing',
      'Medical equipment certifications',
      'Regulatory compliance documentation',
      'International standards alignment'
    ]
  },
  {
    id: 3,
    title: 'Design and Architecture',
    description: 'Professional architectural design services tailored for medical facilities. Our team creates functional, efficient, and patient-friendly spaces that optimize workflow and enhance the healthcare experience.',
    icon: PencilSquareIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      'Architectural design and planning',
      'Interior design and space optimization',
      'Workflow analysis and improvement',
      '3D visualization and modeling'
    ]
  },
  {
    id: 4,
    title: 'Medical Equipment Planning and Supply',
    description: 'Complete medical equipment solutions from planning to installation. We help you select the right equipment for your needs and ensure seamless integration with your facility\'s operations.',
    icon: CubeIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    features: [
      'Equipment selection and specification',
      'Vendor management and procurement',
      'Installation and commissioning',
      'Quality assurance and testing'
    ]
  },
  {
    id: 5,
    title: 'IT Infrastructure and Integration',
    description: 'Modern healthcare requires robust IT infrastructure. We design and implement comprehensive technology solutions including HMIS, networking, and digital integration systems.',
    icon: ComputerDesktopIcon,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    features: [
      'Hospital Management Information Systems (HMIS)',
      'Network infrastructure design',
      'Digital equipment integration',
      'Cybersecurity implementation'
    ]
  },
  {
    id: 6,
    title: 'Construction and Project Management',
    description: 'End-to-end project management services ensuring timely and budget-conscious delivery. Our experienced team coordinates all aspects of construction and installation.',
    icon: WrenchScrewdriverIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    features: [
      'Project timeline management',
      'Quality control and supervision',
      'Vendor coordination',
      'Budget management and cost control'
    ]
  },
  {
    id: 7,
    title: 'Clinic Modernization and Facility Upgrade',
    description: 'Transform existing healthcare facilities with modern equipment and improved layouts. We specialize in upgrading clinics and hospitals to meet current standards and improve efficiency.',
    icon: BuildingOfficeIcon,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    features: [
      'Facility assessment and analysis',
      'Equipment upgrade planning',
      'Minimal disruption implementation',
      'Performance optimization'
    ]
  },
  {
    id: 8,
    title: 'Staff Training and Operational Setup',
    description: 'Comprehensive training programs to ensure your staff can effectively operate all equipment and systems. We provide ongoing support to maximize your investment.',
    icon: AcademicCapIcon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    features: [
      'Equipment operation training',
      'Safety protocols and procedures',
      'Maintenance training programs',
      'Ongoing technical support'
    ]
  },
  {
    id: 9,
    title: 'Final Approval and Handover',
    description: 'Complete project closure with all necessary approvals and documentation. We ensure smooth handover and provide comprehensive support during the transition period.',
    icon: CheckCircleIcon,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    features: [
      'Final inspections and approvals',
      'Documentation handover',
      'Warranty and service agreements',
      'Post-handover support'
    ]
  }
];

export default function TurnkeySolutionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Turnkey Solutions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Complete healthcare facility solutions from concept to commissioning. 
              We deliver end-to-end turnkey projects that bring your medical facility vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Healthcare Facility Development
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From initial planning to final handover, we provide comprehensive turnkey solutions 
              to ensure your healthcare facility project succeeds at every stage.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="space-y-8">
            {turnkeySolutions.map((solution, index) => (
              <div key={solution.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="lg:flex">
                  {/* Solution Content */}
                  <div className="lg:w-2/3 p-8">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 p-3 ${solution.bgColor} rounded-lg`}>
                        <solution.icon className={`h-8 w-8 ${solution.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${solution.bgColor} ${solution.color} text-sm font-bold`}>
                            {solution.id}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {solution.description}
                        </p>
                        
                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {solution.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircleIcon className={`h-5 w-5 ${solution.color} flex-shrink-0`} />
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <button className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200">
                          Request Project Quote
                          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Solution Image/Visual */}
                  <div className="lg:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                    <div className="text-center">
                      <solution.icon className={`h-24 w-24 ${solution.color} mx-auto mb-4`} />
                      <p className="text-gray-600 font-medium">Phase {solution.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Turnkey Process
            </h2>
            <p className="text-lg text-gray-600">
              A systematic approach to delivering exceptional healthcare facility solutions
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300 hidden lg:block"></div>
            
            <div className="space-y-8 lg:space-y-12">
              {turnkeySolutions.slice(0, 5).map((solution, index) => (
                <div key={solution.id} className={`relative flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-900 rounded-full border-4 border-white shadow-lg hidden lg:block"></div>
                  
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <solution.icon className={`h-6 w-6 ${solution.color}`} />
                        <h3 className="text-lg font-semibold text-gray-900">{solution.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{solution.description}</p>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Turnkey Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experienced team guide you through every step of your healthcare facility project. 
            Contact us today for a free consultation and project assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Get Free Consultation
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