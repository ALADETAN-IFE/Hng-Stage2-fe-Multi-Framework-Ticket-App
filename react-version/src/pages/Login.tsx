import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      const existingUsers = JSON.parse(
        localStorage.getItem("ticketapp_session_users") || "[]"
      );

      // Find user by email
      const user = existingUsers.find(
        (u: { user: { email: string } }) => u.user.email === formData.email
      );

      if (!user) {
        toast.error("User not found");
        return;
      }

      // Validate password
      if (user.user.password !== formData.password) {
        toast.error("Incorrect password");
        return;
      }

      localStorage.setItem(
        "ticketapp_session",
        JSON.stringify({
          user: user.user,
          token: "mock-jwt-token",
          expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })
      );

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <main className="min-h-screen w-full relative bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Circles */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-60 animate-pulse"
        data-testid="test-react-login-circle-1"
      ></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-bounce"
        data-testid="test-react-login-circle-2"
      ></div>

      <div className="max-w-md w-full space-y-8">
        <section
          className="bg-white rounded-2xl shadow-xl p-8"
          data-testid="test-react-login-form-container"
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 relative z-10"
            data-testid="test-react-login-go-back"
            aria-label="Go back"
          >
            ← Go back
          </button>
          <header className="text-center">
            <h2
              className="text-3xl font-bold text-gray-900 mb-2"
              data-testid="test-react-login-title"
            >
              Welcome to <span className="text-purple-600">TicketStressed</span>
            </h2>
            <p
              className="text-gray-600 mb-8"
              data-testid="test-react-login-subtitle"
            >
              Sign in to your account
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-testid="test-react-login-form"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                data-testid="test-react-email-input"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  data-testid="test-react-email-error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                  data-testid="test-react-password-input"
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm text-red-600"
                  data-testid="test-react-password-error"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              data-testid="test-react-login-submit-button"
              aria-label={
                isLoading ? "Signing in..." : "Sign in to your account"
              }
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 z-10">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-purple-600 hover:text-purple-700 font-semibold"
                data-testid="test-react-signup-link"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <aside
            className="mt-6 p-4 bg-blue-50 rounded-lg"
            data-testid="test-react-demo-credentials"
          >
            <p className="text-sm text-blue-800 font-medium">
              Demo Credentials:
            </p>
            <p className="text-sm text-blue-700">
              Email: demo@ticketstressed.com
            </p>
            <p className="text-sm text-blue-700">Password: password123</p>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default Login;
