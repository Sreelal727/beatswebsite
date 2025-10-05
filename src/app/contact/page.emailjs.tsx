'use client';

import { useState } from 'react';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  BuildingOfficeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    serviceType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon. You can also reach us directly via WhatsApp.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          serviceType: ''
        });

        // Optionally open WhatsApp link
        if (result.data?.whatsappUrl) {
          setTimeout(() => {
            if (window.confirm('Would you like to also send this message via WhatsApp?')) {
              window.open(result.data.whatsappUrl, '_blank');
            }
          }, 2000);
        }
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with our expert team for all your medical equipment needs. 
              We&rsquo;re here to help you find the perfect solutions for your healthcare facility.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get In Touch
              </h2>
              
              {/* Head Office */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Head Office</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-medium">Kasco Tower, Office No. 109</p>
                      <p className="text-gray-600">Al Qusais Industrial Area 3</p>
                      <p className="text-gray-600">Dubai, United Arab Emirates</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <WhatsAppIcon className="h-5 w-5 text-green-500" />
                    <a href="https://wa.me/971565225437" className="text-green-600 hover:text-green-800">
                      +971 56 522 5437 (WhatsApp)
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    <a href="mailto:sales@beatsmed.com" className="text-blue-600 hover:text-blue-800">
                      sales@beatsmed.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Warehouse */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BuildingOfficeIcon className="h-8 w-8 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Warehouse</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 font-medium">Warehouse No. 7</p>
                      <p className="text-gray-600">Al Qusais Industrial Area 3</p>
                      <p className="text-gray-600">Tiger Roundabout</p>
                      <p className="text-gray-600">Dubai, UAE</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <ClockIcon className="h-8 w-8 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900 font-medium">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900 font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900 font-medium">Closed</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Emergency support available 24/7 for existing customers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Send us a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interest
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="equipment-purchase">Equipment Purchase</option>
                      <option value="maintenance-repair">Maintenance & Repair</option>
                      <option value="facility-planning">Facility Planning</option>
                      <option value="training-support">Training & Support</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please provide details about your inquiry, including specific equipment needs, timeline, and any other relevant information..."
                    ></textarea>
                  </div>

                  {/* Status Message */}
                  {submitStatus.type && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        : 'bg-blue-900 text-white hover:bg-blue-800'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Find Us
            </h2>
            <p className="text-lg text-gray-600">
              Visit our office in Dubai for in-person consultations and equipment demonstrations
            </p>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Interactive Map</h3>
              <p className="text-gray-500">
                Al Qusais Industrial Area 3, Dubai, UAE
              </p>
              <button className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors duration-200">
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-blue-100">
              Choose the fastest way to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <WhatsAppIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
              <p className="text-blue-100 mb-4">Quick responses for urgent inquiries</p>
              <a
                href="https://wa.me/971565225437"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Chat Now
              </a>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <EnvelopeIcon className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-blue-100 mb-4">Detailed inquiries and documentation</p>
              <a
                href="mailto:sales@beatsmed.com"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Send Email
              </a>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <PhoneIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-blue-100 mb-4">Direct consultation with our experts</p>
              <a
                href="tel:+971565225437"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}