import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import TicketManagement from "../pages/TicketManagement";
import ProtectedRoute from "../pages/ProtectedRoute";
import Layout from "../layout/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tickets/:mode?",
        element: (
          <ProtectedRoute>
            <TicketManagement />
          </ProtectedRoute>
        ),
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
