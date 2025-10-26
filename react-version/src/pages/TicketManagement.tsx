import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { EditIcon, DeleteIcon, CloseIcon, TicketIcon } from "../assets/icons";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface TicketFormData {
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
}

const TicketManagement: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { mode } = useParams()

  useEffect(() => {
    loadTickets();
    if(mode == "create") {
      setShowForm(true)
    }
  }, [mode]);

  const loadTickets = () => {
    try {
      const storedTickets = localStorage.getItem("tickets");
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    } catch (error) {
      console.error("Error loading tickets:", error);
      toast.error("Failed to load tickets. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveTickets = (updatedTickets: Ticket[]) => {
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    } else if (!["open", "in_progress", "closed"].includes(formData.status)) {
      newErrors.status = "Status must be open, in_progress, or closed";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const user = JSON.parse(localStorage.getItem("ticketapp_session") || "{}");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const now = new Date().toISOString();

      if (editingTicket) {
        // Update existing ticket
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === editingTicket.id
            ? {
                ...ticket,
                ...formData,
                updatedAt: now,
              }
            : ticket
        );
        saveTickets(updatedTickets);
        toast.success("Ticket updated successfully!");
      } else {
        // Create new ticket
        const newTicket: Ticket = {
          id: Date.now().toString(),
          ...formData,
          createdBy: user.name,
          createdAt: now,
          updatedAt: now,
        };
        const updatedTickets = [...tickets, newTicket];
        saveTickets(updatedTickets);
        toast.success("Ticket created successfully!");
      }

      resetForm();
    } catch (error) {
      console.error("Error saving ticket:", error);
      toast.error("Failed to save ticket");
    }
  };

  const handleEdit = (ticket: Ticket) => {
    if (user.name == ticket.createdBy) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
      });
      setEditingTicket(ticket);
      setShowForm(true);
    } else {
      toast.error("You can only edit tickets created by you");
    }
  };

  const handleDelete = (ticketId: string) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        const updatedTickets = tickets.filter(
          (ticket) => ticket.id !== ticketId
        );
        saveTickets(updatedTickets);
        toast.success("Ticket deleted successfully!");
      } catch (error) {
        console.error("Error deleting ticket:", error);
        toast.error("Failed to delete ticket");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    if(mode == "create") {
      navigate("/tickets")
    }
    setErrors({});
    setEditingTicket(null);
    setShowForm(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-amber-100 text-yellow-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 w-full">
      {/* Navigation */}
      <nav className="bg-white shadow-lg w-full" data-testid="test-react-ticket-nav relative">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-2xl font-bold text-purple-600"
                data-testid="test-react-ticket-brand"
              >
                TicketStressed
              </Link>
              <span className="hidden md:inline-block text-gray-500">|</span>
              <span
                className="text-gray-700 hidden sm:inline-block"
                data-testid="test-react-ticket-page-title"
              >
                Ticket Management
              </span>
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                data-testid="test-react-dashboard-link"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                data-testid="test-react-ticket-logout-button"
                aria-label="Logout from your account"
              >
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu panel (shows when open) */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 pb-4 border-b border-gray-100 absolute left-0 top-[87%] bg-white/5 backdrop-blur-sm w-full">
              <div className="flex flex-col px-2 space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                  data-testid="test-react-dashboard-link"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
                  data-testid="test-react-ticket-logout-button"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Ticket Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all your tickets in one place
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Create New Ticket
          </button>
        </div>

        {/* Ticket Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingTicket ? "Edit Ticket" : "Create New Ticket"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <CloseIcon className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Title *
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter ticket title"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter ticket description"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Status *
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                          errors.status ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.status}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors duration-200"
                    >
                      {editingTicket ? "Update Ticket" : "Create Ticket"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tickets List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {tickets.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TicketIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tickets yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first ticket to get started
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Create Your First Ticket
              </button>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {ticket.title}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <EditIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <DeleteIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {ticket.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {ticket.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status.replace("_", " ").toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>

                <div className="text-sm text-gray-500">
                  <p>
                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                  {ticket.updatedAt !== ticket.createdAt && (
                    <p>
                      Updated: {new Date(ticket.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
