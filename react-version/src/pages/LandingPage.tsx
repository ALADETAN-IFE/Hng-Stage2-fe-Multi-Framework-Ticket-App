import React from 'react';
import { Link } from 'react-router-dom';
import { WavyBackground, TicketIcon, ClockIcon, ShieldIcon } from '../assets/icons';

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 w-full">
      {/* Hero Section with Wavy Background */}
      <section className="relative overflow-hidden" data-testid="test-react-hero-section">
        {/* Decorative Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-pulse" data-testid="test-react-decorative-circle-1"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-bounce" data-testid="test-react-decorative-circle-2"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-40 animate-pulse" data-testid="test-react-decorative-circle-3"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32" data-testid="test-react-hero-content">
          <header className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6" data-testid="test-react-hero-title">
              Ticket<span className="text-purple-600">Stressed</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto" data-testid="test-react-hero-description">
              At TicketStressed, your ticket gets the spotlight it deserves. ✨✨ 
              Discover, buy, and sell event tickets that are sold out elsewhere — 
              all in one seamless platform.
            </p>
            <nav className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/login"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                data-testid="test-react-login-button"
                aria-label="Navigate to login page"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="bg-white hover:bg-gray-50 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-purple-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
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
          <article className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-testid="test-react-feature-card-1">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <TicketIcon className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="test-react-feature-title-1">Easy Ticket Management</h3>
            <p className="text-gray-600" data-testid="test-react-feature-description-1">Create, view, edit, and delete tickets with our intuitive interface.</p>
          </article>
          
          <article className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-testid="test-react-feature-card-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ClockIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="test-react-feature-title-2">Real-time Updates</h3>
            <p className="text-gray-600" data-testid="test-react-feature-description-2">Stay updated with instant notifications and status changes.</p>
          </article>
          
          <article className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300" data-testid="test-react-feature-card-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <ShieldIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid="test-react-feature-title-3">Secure & Reliable</h3>
            <p className="text-gray-600" data-testid="test-react-feature-description-3">Your data is protected with enterprise-grade security measures.</p>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12" data-testid="test-react-footer">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" data-testid="test-react-footer-title">TicketStressed</h3>
            <p className="text-gray-400 mb-6" data-testid="test-react-footer-description">Making ticket management stress-free for everyone</p>
            <nav className="flex justify-center space-x-6" data-testid="test-react-footer-links">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="test-react-privacy-link">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="test-react-terms-link">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" data-testid="test-react-contact-link">Contact</a>
            </nav>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400" data-testid="test-react-copyright">&copy; 2024 TicketStressed. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
