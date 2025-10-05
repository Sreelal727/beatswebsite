'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CounterProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ end, duration, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span className="text-4xl md:text-5xl font-bold text-white">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function VideoHero() {
  return (
    <section style={{ height: '100vh', backgroundColor: '#1f2937', position: 'relative' }}>
      {/* Video Background */}
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <video
          src="/homevideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        {/* Video Overlay */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.4)' 
        }}></div>
      </div>

      {/* Content */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 10,
        padding: '0 1rem'
      }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Advanced Medical
            <span className="block text-blue-400">Technology Solutions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Leading the future of healthcare with cutting-edge biomedical equipment and innovative solutions for medical professionals worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Products
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Get Consultation
            </Link>
          </div>

          {/* Statistics Counter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mb-2">
                <Counter end={500} duration={2000} suffix="+" />
              </div>
              <p className="text-gray-300 text-lg font-medium">Projects Completed</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <Counter end={8} duration={2000} suffix="+" />
              </div>
              <p className="text-gray-300 text-lg font-medium">Years Experience</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <Counter end={5000} duration={2000} suffix="+" />
              </div>
              <p className="text-gray-300 text-lg font-medium">Satisfied Customers</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-white">24/7</span>
              </div>
              <p className="text-gray-300 text-lg font-medium">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}