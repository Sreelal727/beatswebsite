'use client';

import { useState, useEffect } from 'react';
import { UserGroupIcon, HeartIcon, TrophyIcon, RocketLaunchIcon, CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import './animations.css';

export default function WhoWeArePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents = [
    {
      period: "2016 – 2018",
      title: "Foundation & Trust",
      description: "Beats Medical was born in Dubai's Al Qusais Industrial Area with a small team of biomedical engineers.",
      highlights: [
        "Began distribution partnerships with emerging Asian and European manufacturers",
        "Secured first large-scale project supplying sterilization and dental equipment to UAE private clinics",
        "Introduced preventive-maintenance contracts and calibration services"
      ]
    },
    {
      period: "2019 – 2020",
      title: "Growth & Recognition",
      description: "Expanded into Oman and the wider GCC.",
      highlights: [
        "Signed authorized dealership with Woson (Dental Units) and Chison (Imaging Systems)",
        "Established internal service training center for technicians",
        "Recognized by multiple UAE healthcare developers for reliability during the COVID-19 supply-chain crisis"
      ]
    },
    {
      period: "2021 – 2023",
      title: "Diversification & Innovation",
      description: "Launched new divisions in Physiotherapy, Rehabilitation, and Laboratory Equipment.",
      highlights: [
        "Partnered with YaraMed, Instramed, and Johari Digital to enhance product diversity",
        "Implemented digital ERP for inventory and project tracking",
        "Initiated long-term maintenance contracts with government hospitals",
        "Began collaboration with architects and consultants for turnkey clinic design and commissioning"
      ]
    },
    {
      period: "2024 – 2025",
      title: "Transformation & Global Presence",
      description: "Commenced development of a fully digital procurement and e-commerce platform.",
      highlights: [
        "Upgraded warehouse logistics and import operations to meet international cold-chain standards",
        "Expanded to African markets with focus on Kenya, Tanzania, and Nigeria through distributor partnerships",
        "By 2025, Beats Medical stands poised to become a cross-continental hub for medical technology integration"
      ]
    }
  ];

  const corePillars = [
    {
      icon: CheckCircleIcon,
      title: "Quality without Compromise",
      description: "Every product undergoes strict quality evaluation and compliance with global healthcare standards.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: HeartIcon,
      title: "Service as a Promise",
      description: "We ensure 24/7 maintenance, calibration, and operational readiness.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: RocketLaunchIcon,
      title: "Innovation for Access",
      description: "We invest in digital tools and AI-based monitoring to make healthcare more efficient.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: UserGroupIcon,
      title: "People First",
      description: "From our engineers to our clients, relationships are the heartbeat of Beats.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black opacity-20" />
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            WHO WE ARE
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animation-delay-300">
            Beats Medical Equipment Trading L.L.C.
          </p>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
            A Dubai-based biomedical solutions company committed to enhancing healthcare infrastructure across the Middle East and Africa
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Scroll One - Introduction & Essence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Essence</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Since 2016</h3>
                <p className="text-gray-700 leading-relaxed">
                  Beats Medical has grown from a small trading unit into a trusted partner for hospitals, clinics, and research centers, delivering reliable medical, dental, and laboratory equipment that meet international standards of precision and safety.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Our Name - &ldquo;Beats&rdquo;</h3>
                <p className="leading-relaxed">
                  Symbolizes life, rhythm, and consistency. Every piece of equipment we supply, every service we deliver, and every partnership we form is guided by that same principle: keeping the world&rsquo;s healthcare ecosystem beating stronger.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                We work closely with leading global manufacturers to source state-of-the-art medical devices and consumables, ensuring that innovation and reliability are never compromised.
              </p>
              
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Today, Beats Medical is synonymous with:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <TrophyIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="font-semibold text-gray-900">Trust</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <RocketLaunchIcon className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="font-semibold text-gray-900">Technical Expertise</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <HeartIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="font-semibold text-gray-900">Customer-Centric</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Two - The Founders' Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The <span className="text-blue-600">Founders&rsquo; Vision</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Behind Beats Medical stand two visionary professionals driven by the belief that advanced healthcare technology should be accessible, affordable, and seamlessly integrated.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Rafeek Kabeer */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-4 mr-4">
                  <UserGroupIcon className="h-12 w-12 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Rafeek Kabeer</h3>
                  <p className="text-blue-600 font-semibold">Co-Founder & CEO</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Brings a rare combination of technical mastery and leadership foresight. His years in biomedical project management and maintenance across the GCC shaped his conviction that service reliability must match equipment quality.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Under his leadership, Beats Medical&rsquo;s engineering division evolved into a benchmark for after-sales excellence.
              </p>
            </div>

            {/* Jassar Muhammed */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-full p-4 mr-4">
                  <UserGroupIcon className="h-12 w-12 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Jassar Muhammed</h3>
                  <p className="text-purple-600 font-semibold">Co-Founder & Director</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                With a background in medical technology integration and compliance, envisioned a platform that bridges the gap between equipment supply and healthcare system design.
              </p>
              <p className="text-gray-700 leading-relaxed">
                His operational discipline and client-relationship acumen have positioned Beats Medical as a preferred partner for large-scale institutional procurements and hospital turnkey solutions.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Company Culture</h3>
            <p className="text-lg leading-relaxed mb-6">
              Together, they cultivated a company culture grounded in honesty, technical rigor, and partnership-driven growth. Every engineer at Beats Medical is trained not merely to deliver equipment but to deliver outcomes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="font-semibold">Reducing Downtime</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Improving Efficiency</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Focusing on Patient Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Three - The Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600">2016 – 2025 Roadmap</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative mb-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex items-center`}>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {event.period}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>
                    <ul className="space-y-3">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll Four - Philosophy & Future */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Philosophy & <span className="text-blue-600">Future</span>
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Beats Medical, we believe that technology should serve humanity. Our mission is not only to trade equipment but to build sustainable healthcare ecosystems.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Pillars</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {corePillars.map((pillar, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`${pillar.bgColor} rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center`}>
                    <pillar.icon className={`h-8 w-8 ${pillar.color}`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">{pillar.title}</h4>
                  <p className="text-gray-600 text-center leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Looking Ahead */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">Looking Ahead</h3>
            <p className="text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              By 2026 and beyond, Beats Medical envisions building regional training academies, IoT-enabled maintenance networks, and public-private partnerships for sustainable medical infrastructure development.
            </p>
            <p className="text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              Our founders continue to champion the same philosophy that began this journey — that healthcare progress depends not just on equipment, but on commitment, reliability, and the courage to innovate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Join Our Journey
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}