import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user registration 
      const userData = {
        name: formData.name.trim(),
        email: formData.email,
        id: Date.now().toString()
      };

      const existingUsers = JSON.parse(localStorage.getItem('ticketapp_session_users') || '[]');
      if (existingUsers.some((user: { email: string; }) => user.email === formData.email)) {
        toast.error('Email already exists');
        return;
      }
      if (existingUsers.some((user: { name: string; }) => user.name === formData.name)) {
        toast.error('Name already exists');
        return;
      }

      const data =  {
        user: userData,
        token: 'mock-jwt-token',
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }

      
      // Store session in localStorage
      localStorage.setItem('ticketapp_session_users', JSON.stringify([...existingUsers, data]));

      localStorage.setItem('ticketapp_session', JSON.stringify(data));
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <main className="min-h-screen w-full relative bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-pulse" data-testid="test-react-signup-circle-1"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-bounce" data-testid="test-react-signup-circle-2"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-40 animate-pulse" data-testid="test-react-signup-circle-3"></div>
      
      <div className="max-w-md w-full space-y-8">
        <section className="bg-white rounded-2xl shadow-xl p-8" data-testid="test-react-signup-form-container">
          <header className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2" data-testid="test-react-signup-title">
              Join <span className="text-purple-600">TicketStressed</span>
            </h2>
            <p className="text-gray-600 mb-8" data-testid="test-react-signup-subtitle">Create your account to get started</p>
          </header>
          
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="test-react-signup-form">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                data-testid="test-react-name-input"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
                data-testid="test-react-email-input"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a password"
                data-testid="test-react-password-input"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
                data-testid="test-react-confirm-password-input"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              data-testid="test-react-signup-submit-button"
              aria-label="Create account"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 z-10">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-purple-600 hover:text-purple-700 font-semibold" data-testid="test-react-signup-login-link" aria-label="Navigate to login page">
                Sign in here
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
