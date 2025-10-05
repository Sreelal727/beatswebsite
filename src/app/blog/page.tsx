import Link from 'next/link';
import { CalendarIcon, UserIcon, TagIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Dental Technology: Innovations in 2024',
    excerpt: 'Explore the latest advancements in dental equipment technology, from AI-powered diagnostics to minimally invasive treatment solutions that are revolutionizing patient care.',
    author: 'Dr. Ahmed Hassan',
    date: '2024-01-15',
    category: 'Dental Technology',
    readTime: '5 min read',
    image: '/placeholder-dental-tech.svg',
    tags: ['Dental Equipment', 'Innovation', 'AI Technology']
  },
  {
    id: 2,
    title: 'Essential Medical Equipment for Modern Emergency Departments',
    excerpt: 'A comprehensive guide to the critical medical equipment every emergency department needs to provide life-saving care and improve patient outcomes.',
    author: 'Rafeek Kabeer',
    date: '2024-01-10',
    category: 'Emergency Medicine',
    readTime: '7 min read',
    image: '/placeholder-emergency.svg',
    tags: ['Emergency Equipment', 'Healthcare', 'Patient Safety']
  },
  {
    id: 3,
    title: 'Ultrasound Technology Advances: From 2D to 4D Imaging',
    excerpt: 'Discover how ultrasound technology has evolved and the benefits of modern 4D imaging systems for various medical specialties.',
    author: 'Dr. Sarah Al-Mansouri',
    date: '2024-01-05',
    category: 'Medical Imaging',
    readTime: '6 min read',
    image: '/placeholder-ultrasound.svg',
    tags: ['Ultrasound', 'Medical Imaging', 'Diagnostics']
  },
  {
    id: 4,
    title: 'Sterilization Best Practices in Healthcare Facilities',
    excerpt: 'Learn about the latest sterilization protocols and equipment that ensure patient safety and prevent healthcare-associated infections.',
    author: 'Jassar Muhammed',
    date: '2023-12-28',
    category: 'Infection Control',
    readTime: '8 min read',
    image: '/placeholder-sterilization.svg',
    tags: ['Sterilization', 'Infection Control', 'Safety Protocols']
  },
  {
    id: 5,
    title: 'Choosing the Right Medical Refrigeration Solutions',
    excerpt: 'A detailed guide to selecting appropriate medical refrigeration equipment for vaccines, blood products, and pharmaceutical storage.',
    author: 'Akshay Kumar',
    date: '2023-12-20',
    category: 'Medical Storage',
    readTime: '5 min read',
    image: '/placeholder-refrigeration.svg',
    tags: ['Medical Refrigeration', 'Vaccine Storage', 'Pharmaceuticals']
  },
  {
    id: 6,
    title: 'Physiotherapy Equipment: Enhancing Patient Recovery',
    excerpt: 'Explore modern physiotherapy equipment and how it contributes to faster patient recovery and improved treatment outcomes.',
    author: 'Dr. Maria Santos',
    date: '2023-12-15',
    category: 'Physiotherapy',
    readTime: '6 min read',
    image: '/placeholder-physio.svg',
    tags: ['Physiotherapy', 'Rehabilitation', 'Patient Recovery']
  }
];

const categories = [
  'All Posts',
  'Dental Technology',
  'Emergency Medicine',
  'Medical Imaging',
  'Infection Control',
  'Medical Storage',
  'Physiotherapy'
];

const featuredPost = blogPosts[0];
const recentPosts = blogPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Medical Equipment Insights
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay informed with the latest trends, innovations, and best practices in medical equipment 
              and healthcare technology from our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Article</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="lg:flex">
              {/* Featured Image */}
              <div className="lg:w-1/2">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-blue-200 to-blue-300 h-64 lg:h-full flex items-center justify-center">
                  <div className="text-center">
                    <TagIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-blue-700 font-medium">Featured Article Image</p>
                  </div>
                </div>
              </div>

              {/* Featured Content */}
              <div className="lg:w-1/2 p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">{featuredPost.readTime}</span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">
                        {new Date(featuredPost.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Articles</h2>
              </div>

              <div className="space-y-8">
                {recentPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="md:flex">
                      {/* Post Image */}
                      <div className="md:w-1/3">
                        <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-gray-200 to-gray-300 h-48 md:h-full flex items-center justify-center">
                          <div className="text-center">
                            <TagIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 text-sm">Article Image</p>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                            {post.category}
                          </span>
                          <span className="text-gray-500 text-sm">{post.readTime}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <UserIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600 text-sm">{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600 text-sm">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={`/blog/${post.id}`}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/blog?category=${category.toLowerCase().replace(' ', '-')}`}
                      className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['Medical Equipment', 'Healthcare Technology', 'Patient Safety', 'Innovation', 'Diagnostics', 'Sterilization', 'Emergency Care', 'Dental Equipment'].map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${tag.toLowerCase().replace(' ', '-')}`}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-blue-900 text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-blue-100 mb-4">
                  Subscribe to our newsletter for the latest medical equipment insights and industry news.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}