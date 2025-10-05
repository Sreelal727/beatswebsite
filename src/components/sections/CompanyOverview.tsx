import { CalendarIcon, GlobeAltIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function CompanyOverview() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                About Beats Medical Equipment Trading L.L.C.
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  We specialize in high-quality, innovative, and solution-oriented medical products that adhere to international standards. Established in 2016, Beats Medical Equipment L.L.C. has rapidly built strong relationships with both domestic and foreign customers.
                </p>
                <p>
                  We design, manufacture, install, and maintain medical and dental equipment, along with related furniture and disposables, for clients worldwide. Our comprehensive approach ensures that every aspect of your medical equipment needs is covered.
                </p>
                <p>
                  We sell and service products in the Middle East and African countries. The company boasts an experienced technical team, advanced equipment, and high-quality products. Our sales network extends across the country.
                </p>
                <p>
                  Through effective quality analysis, Beats has earned a distinct reputation for preventive maintenance and calibration. Customer satisfaction is our motto. Beats is dedicated to marketing superior-quality scientific and medical products and believes in long-term relationships and mutual growth.
                </p>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">2016</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                  <GlobeAltIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">Global</div>
                <div className="text-sm text-gray-600">Presence</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                  <UserGroupIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">Expert</div>
                <div className="text-sm text-gray-600">Team</div>
              </div>
            </div>
          </div>

          {/* Showcase Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserGroupIcon className="w-16 h-16 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Beats Medical Team at WOSON Exhibition
                  </h3>
                  <p className="text-gray-600">
                    Our team of biomedical engineers with experience in various fields
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Achievement Cards */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-lg shadow-lg border-l-4 border-green-500">
              <div className="text-sm font-semibold text-green-600">ISO Certified</div>
              <div className="text-xs text-gray-600">Quality Assured</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500">
              <div className="text-sm font-semibold text-blue-600">8+ Years</div>
              <div className="text-xs text-gray-600">Industry Experience</div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To be the leading provider of innovative biomedical equipment solutions in the Middle East and Africa, 
              delivering exceptional quality, reliability, and service that empowers healthcare professionals to 
              provide the best possible care to their patients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}