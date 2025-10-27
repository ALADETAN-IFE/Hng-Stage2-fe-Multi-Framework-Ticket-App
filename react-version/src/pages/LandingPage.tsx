import React from 'react';
import { Link } from 'react-router-dom';
import { WavyBackground } from '../assets/icons';
import LandingPageCards from '../components/landingPageCard';
import Footer from '../components/footer';

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 w-full">
      {/* Hero Section with Wavy Background */}
      <section className="relative overflow-hidden" data-testid="test-react-hero-section">
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-60 animate-pulse" data-testid="test-react-decorative-circle-1"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-bounce" data-testid="test-react-decorative-circle-2"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-40 animate-pulse" data-testid="test-react-decorative-circle-3"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32" data-testid="test-react-hero-content">
          <header className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6" data-testid="test-react-hero-title">
              Ticket<span className="text-teal-600">Stressed</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto" data-testid="test-react-hero-description">
              At TicketStressed, your ticket gets the spotlight it deserves. 
              Discover, buy, and sell event tickets that are sold out elsewhere — 
              all in one seamless platform.
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/login"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                data-testid="test-react-login-button"
                aria-label="Navigate to login page"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="bg-white hover:bg-gray-50 text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-teal-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
                data-testid="test-react-signup-button"
                aria-label="Navigate to signup page"
              >
                Get Started
              </Link>
            </nav>
          </header>
        </div>
        
        {/* Wavy Background */}
        <div className="absolute bottom-0 left-0 w-full" data-testid="test-react-wavy-background">
          <WavyBackground />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="test-react-features-title">Why Choose TicketStressed?</h2>
          <p className="text-xl text-gray-600" data-testid="test-react-features-subtitle">Making ticket management stress-free for everyone</p>
        </header>
        
        <div className="grid md:grid-cols-3 gap-8">
          <LandingPageCards />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default LandingPage;
