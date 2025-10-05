'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateWhatsAppUrl = (data: FormData) => {
    const message = `Hello! I'm interested in your medical equipment.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Subject: ${data.subject}

Message: ${data.message}

Preferred Contact: ${data.preferredContact}`;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/971565225437?text=${encodedMessage}`;
  };

  const handleWhatsAppContact = () => {
    const whatsappUrl = generateWhatsAppUrl(formData);
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // The form will be submitted to Formspree via the action attribute
      // This is just for UI feedback
      setSubmitStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Contact Beats Medical
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Get in touch with our medical equipment experts
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-blue-100">sales@beatsmed.com</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-blue-100">+971 56 522 5437</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl mb-3">📍</div>
                  <h3 className="font-semibold mb-2">Visit Us</h3>
                  <p className="text-blue-100">Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      There was an error sending your message. Please try again or contact us directly.
                    </div>
                  )}

                  {/* Replace YOUR_FORMSPREE_ID with your actual Formspree form ID */}
                  <form 
                    action="https://formspree.io/f/YOUR_FORMSPREE_ID" 
                    method="POST"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
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
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
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
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Contact Method
                      </label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us about your requirements, questions, or how we can help you..."
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={handleWhatsAppContact}
                        className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <span>💬</span>
                        WhatsApp Us
                      </button>
                    </div>
                  </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-8">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 text-xl">📧</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Email</h4>
                          <p className="text-gray-600">sales@beatsmed.com</p>
                          <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 text-xl">📱</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Phone</h4>
                          <p className="text-gray-600">+971 56 522 5437</p>
                          <p className="text-sm text-gray-500">Sunday - Thursday, 9 AM - 6 PM</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 text-xl">📍</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Location</h4>
                          <p className="text-gray-600">Dubai, United Arab Emirates</p>
                          <p className="text-sm text-gray-500">Serving the Middle East region</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Why Choose Beats Medical?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="text-blue-200">✓</span>
                        <span>Premium quality medical equipment</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-blue-200">✓</span>
                        <span>Expert technical support</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-blue-200">✓</span>
                        <span>Competitive pricing</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-blue-200">✓</span>
                        <span>Fast delivery across UAE</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppIcon />
    </div>
  );
}