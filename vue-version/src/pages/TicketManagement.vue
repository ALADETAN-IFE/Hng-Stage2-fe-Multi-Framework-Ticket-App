<template>
  <div v-if="isLoading" class="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading tickets...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 w-full">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg w-full" data-testid="test-react-ticket-nav relative">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <router-link
              to="/dashboard"
              class="text-2xl font-bold text-teal-600"
              data-testid="test-react-ticket-brand"
            >
              TicketStressed
            </router-link>
            <span class="hidden md:inline-block text-gray-500">|</span>
            <span
              class="text-gray-700 hidden sm:inline-block"
              data-testid="test-react-ticket-page-title"
            >
              Ticket Management
            </span>
          </div>

          <!-- Desktop actions -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link
              to="/dashboard"
              class="text-gray-600 hover:text-gray-900 transition-colors"
              data-testid="test-react-dashboard-link"
            >
              Dashboard
            </router-link>
            <button
              @click="handleLogout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              data-testid="test-react-ticket-logout-button"
              aria-label="Logout from your account"
            >
              Logout
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Open menu"
              :aria-expanded="mobileMenuOpen"
            >
              <svg v-if="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile menu panel -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-2 pb-4 border-b border-gray-100 absolute left-0 top-[87%] bg-white/5 backdrop-blur-sm w-full">
          <div class="flex flex-col px-2 space-y-2">
            <router-link
              to="/dashboard"
              @click="mobileMenuOpen = false"
              class="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              data-testid="test-react-dashboard-link"
            >
              Dashboard
            </router-link>
            <button
              @click="mobileMenuOpen = false; handleLogout()"
              class="px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              data-testid="test-react-ticket-logout-button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            Ticket Management
          </h1>
          <p class="text-gray-600 mt-2">
            Manage all your tickets in one place
          </p>
        </div>
        <button
          @click="showForm = true"
          class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Create New Ticket
        </button>
      </div>

      <!-- Ticket Form Modal -->
      <div v-if="showForm" class="fixed inset-0 bg-black/30 backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                {{ editingTicket ? 'Edit Ticket' : 'Create New Ticket' }}
              </h2>
              <button
                @click="resetForm"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon class="w-6 h-6" />
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title *
                </label>
                <input
                  id="title"
                  v-model="formData.title"
                  name="title"
                  type="text"
                  :class="['w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors', errors.title ? 'border-red-500' : 'border-gray-300']"
                  placeholder="Enter ticket title"
                />
                <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                  {{ errors.title }}
                </p>
              </div>

              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  name="description"
                  rows="4"
                  :class="['w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors', errors.description ? 'border-red-500' : 'border-gray-300']"
                  placeholder="Enter ticket description"
                ></textarea>
                <p v-if="errors.description" class="mt-1 text-sm text-red-600">
                  {{ errors.description }}
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="status"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    v-model="formData.status"
                    name="status"
                    :class="['w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors', errors.status ? 'border-red-500' : 'border-gray-300']"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <p v-if="errors.status" class="mt-1 text-sm text-red-600">
                    {{ errors.status }}
                  </p>
                </div>

                <div>
                  <label
                    for="priority"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    v-model="formData.priority"
                    name="priority"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors duration-200"
                >
                  {{ editingTicket ? 'Update Ticket' : 'Create Ticket' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Tickets List -->
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-if="tickets.length === 0" class="col-span-full text-center py-12">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TicketIcon class="w-12 h-12 text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            No tickets yet
          </h3>
          <p class="text-gray-600 mb-6">
            Create your first ticket to get started
          </p>
          <button
            @click="showForm = true"
            class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Create Your First Ticket
          </button>
        </div>

        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
              {{ ticket.title }}
            </h3>
            <div class="flex space-x-2">
              <button
                @click="handleEdit(ticket)"
                class="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <EditIcon class="w-5 h-5" />
              </button>
              <button
                @click="handleDelete(ticket.id)"
                class="text-red-600 hover:text-red-800 transition-colors"
              >
                <DeleteIcon class="w-5 h-5" />
              </button>
            </div>
          </div>

          <p v-if="ticket.description" class="text-gray-600 mb-4 line-clamp-3">
            {{ ticket.description }}
          </p>

          <div class="flex flex-wrap gap-2 mb-4">
            <span
              :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor(ticket.status)]"
            >
              {{ ticket.status.replace('_', ' ').toUpperCase() }}
            </span>
            <span
              :class="['px-3 py-1 rounded-full text-sm font-medium', getPriorityColor(ticket.priority)]"
            >
              {{ ticket.priority.toUpperCase() }}
            </span>
          </div>

          <div class="text-sm text-gray-500">
            <p>
              Created: {{ new Date(ticket.createdAt).toLocaleDateString() }}
            </p>
            <p v-if="ticket.updatedAt !== ticket.createdAt">
              Updated: {{ new Date(ticket.updatedAt).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import EditIcon from '../assets/icons/EditIcon.vue';
import DeleteIcon from '../assets/icons/DeleteIcon.vue';
import CloseIcon from '../assets/icons/CloseIcon.vue';
import TicketIcon from '../assets/icons/TicketIcon.vue';

const router = useRouter();
const route = useRoute();
const tickets = ref([]);
const isLoading = ref(true);
const showForm = ref(false);
const editingTicket = ref(null);
const formData = ref({
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
});
const errors = ref({});
const mobileMenuOpen = ref(false);

const loadTickets = () => {
  try {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      tickets.value = JSON.parse(storedTickets);
    }
  } catch (error) {
    console.error('Error loading tickets:', error);
    toast.error('Failed to load tickets. Please retry.');
  } finally {
    isLoading.value = false;
  }
};

const saveTickets = (updatedTickets) => {
  localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  tickets.value = updatedTickets;
};

const validateForm = () => {
  const newErrors = {};

  if (!formData.value.title.trim()) {
    newErrors.title = 'Title is required';
  } else if (formData.value.title.trim().length < 3) {
    newErrors.title = 'Title must be at least 3 characters';
  }

  if (!formData.value.status) {
    newErrors.status = 'Status is required';
  } else if (!['open', 'in_progress', 'closed'].includes(formData.value.status)) {
    newErrors.status = 'Status must be open, in_progress, or closed';
  }

  if (formData.value.description && formData.value.description.length > 500) {
    newErrors.description = 'Description must be less than 500 characters';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
  if (!validateForm()) {
    return;
  }

  try {
    const now = new Date().toISOString();
    const user = JSON.parse(localStorage.getItem('ticketapp_session') || '{}');

    if (editingTicket.value) {
      const updatedTickets = tickets.value.map((ticket) =>
        ticket.id === editingTicket.value.id
          ? {
              ...ticket,
              ...formData.value,
              updatedAt: now,
            }
          : ticket
      );
      saveTickets(updatedTickets);
      toast.success('Ticket updated successfully!');
    } else {
      const newTicket = {
        id: Date.now().toString(),
        ...formData.value,
        createdBy: user.name,
        createdAt: now,
        updatedAt: now,
      };
      const updatedTickets = [...tickets.value, newTicket];
      saveTickets(updatedTickets);
      toast.success('Ticket created successfully!');
    }

    resetForm();
  } catch (error) {
    console.error('Error saving ticket:', error);
    toast.error('Failed to save ticket');
  }
};

const handleEdit = (ticket) => {
  const user = JSON.parse(localStorage.getItem('ticketapp_session') || '{}');
  if (user.name === ticket.createdBy) {
    formData.value = {
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    };
    editingTicket.value = ticket;
    showForm.value = true;
  } else {
    toast.error('You can only edit tickets created by you');
  }
};

const handleDelete = (ticketId) => {
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    try {
      const updatedTickets = tickets.value.filter(
        (ticket) => ticket.id !== ticketId
      );
      saveTickets(updatedTickets);
      toast.success('Ticket deleted successfully!');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.error('Failed to delete ticket');
    }
  }
};

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
  };
  if (route.params.mode === 'create') {
    router.push('/tickets');
  }
  errors.value = {};
  editingTicket.value = null;
  showForm.value = false;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'open':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-amber-100 text-yellow-800';
    case 'closed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session');
  toast.success('Logged out successfully');
  router.push('/');
};

onMounted(() => {
  loadTickets();
  if (route.params.mode === 'create') {
    showForm.value = true;
  }
});
</script>

