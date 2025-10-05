import { UserIcon } from '@heroicons/react/24/outline';

const leaders = [
  {
    name: 'Rafeek Kabeer',
    position: 'CEO',
    description: 'Leading the company with vision and strategic direction, ensuring excellence in all operations.',
    color: 'bg-blue-500',
  },
  {
    name: 'Jassar Muhammed',
    position: 'Director',
    description: 'Overseeing business development and maintaining strong partnerships with international brands.',
    color: 'bg-green-500',
  },
  {
    name: 'Akshay',
    position: 'Sales Head',
    description: 'Driving sales growth and building lasting relationships with healthcare facilities across the region.',
    color: 'bg-purple-500',
  },
  {
    name: 'Varun Mathew',
    position: 'Finance Manager',
    description: 'Managing financial operations and ensuring sustainable growth and profitability.',
    color: 'bg-orange-500',
  },
];

export default function LeadershipSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            The Beats Driving Force
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experienced leadership team that drives our commitment to excellence and innovation in biomedical equipment solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Avatar */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className={`w-24 h-24 ${leader.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {leader.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {leader.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {leader.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Leadership Values
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">
                Committed to delivering the highest quality in everything we do
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h4>
              <p className="text-gray-600 text-sm">
                Working together to achieve common goals and mutual success
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                Continuously improving and adapting to meet evolving healthcare needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}