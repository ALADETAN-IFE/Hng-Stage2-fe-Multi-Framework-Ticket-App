import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TicketIcon, ClockIcon, LightningIcon, CheckIcon, PlusIcon } from '../assets/icons';
import type { Ticket } from './TicketManagement';

interface User {
  name: string;
  email: string;
}

interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  closed: number;
}


const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = () => {
      try {
        const session = localStorage.getItem('ticketapp_session');
        if (!session) {
          navigate('/auth/login');
          return;
        }

        const sessionData = JSON.parse(session);
        setUser(sessionData.user);

        // Load ticket stats from localStorage
        const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
        const ticketList: Ticket[] = (Array.isArray(tickets) ? tickets : []);
        
        const ticketStats = {
          total: ticketList.length,
          open: ticketList.filter((ticket) => ticket.status === 'open').length,
          inProgress: ticketList.filter((ticket) => ticket.status === 'in_progress').length,
          closed: ticketList.filter((ticket) => ticket.status === 'closed').length
        };
        setStats(ticketStats);
      } catch (error) {
        console.error('Error loading dashboard:', error);
        toast.error('Failed to load dashboard data');
        navigate('/auth/login');
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg" data-testid="test-react-dashboard-nav">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600" data-testid="test-react-dashboard-title">TicketStressed</h1>
            </div>
            <div className="flex items-center space-x-4">
              
              <span className="text-gray-700 flex flex-col md:flex-row" data-testid="test-react-welcome-message">
                <span>Welcome, </span>
                <span
                  className="text-gray-700 inline-block max-w-20 md:max-w-52 truncate align-middle"
                  data-testid="test-react-welcome-message"
                  title={user?.name}
                >
                  {user?.name}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                data-testid="test-react-logout-button"
                aria-label="Logout from your account"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden mb-12">
          {/* Decorative Circles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-bounce"></div>
          
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome to Your <span className="text-purple-600">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Manage your tickets and stay on top of everything
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <TicketIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <ClockIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-green-600">{stats.open}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <LightningIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-full">
                <CheckIcon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Closed Tickets</p>
                <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/tickets"
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg text-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center mb-4">
                <TicketIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Manage Tickets</h3>
              <p className="text-purple-100">View, create, edit, and delete tickets</p>
            </Link>

            <Link
              to="/tickets"
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg text-center transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center mb-4">
                <PlusIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create New Ticket</h3>
              <p className="text-blue-100">Start a new ticket to get help</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
