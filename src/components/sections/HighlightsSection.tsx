import { ShieldCheckIcon, WrenchScrewdriverIcon, AcademicCapIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const highlights = [
  {
    icon: ShieldCheckIcon,
    title: 'Safe and High-Quality Equipment',
    description: 'Offering a wide range of safe and high-quality biomedical equipment and consumables tailored to meet the needs of healthcare facilities in the UAE and Oman.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: WrenchScrewdriverIcon,
    title: 'Reliable Maintenance and Repair',
    description: 'Beats Medical maintains a team of biomedical engineers and service professionals to ensure reliable after-sales maintenance and repair services.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: AcademicCapIcon,
    title: 'Unparalleled Training and Support',
    description: 'We deliver unparalleled training programs, product demos, and technical support to ensure our customers enjoy proper and efficient usage of the equipment.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'Top-Class Consultation and Planning',
    description: 'We offer expert and highly professional consultation services for selecting and integrating medical devices, ensuring seamless operation within healthcare systems.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
];

export default function HighlightsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Beats Medical?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to delivering excellence in every aspect of our service, from equipment quality to customer support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${highlight.bgColor} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <highlight.icon className={`w-8 h-8 ${highlight.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {highlight.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Beats Medical Difference?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of healthcare facilities that trust us for their medical equipment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200"
              >
                Get Started Today
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-900 text-blue-900 font-semibold rounded-lg hover:bg-blue-900 hover:text-white transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}