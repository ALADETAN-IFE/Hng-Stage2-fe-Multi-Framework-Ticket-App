import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const session = localStorage.getItem('ticketapp_session');
        if (!session) {
          setTimeout(() => {
            toast.info("Please login to view dashboard")
            setIsAuthenticated(false);
          }, 1500);
          return;
        }

        const sessionData = JSON.parse(session);
        const now = Date.now();
        
        // Check if session is expired
        if (sessionData.expires && now > sessionData.expires) {
        setTimeout(() => {
          toast.info("Your session has expired — please log in again.")
          localStorage.removeItem('ticketapp_session');
          setIsAuthenticated(false);
        }, 1500);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('ticketapp_session');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
