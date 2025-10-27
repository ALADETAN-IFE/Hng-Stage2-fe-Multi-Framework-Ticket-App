<template>
  <div v-if="isLoading" class="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading dashboard...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg" data-testid="test-react-dashboard-nav">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-teal-600" data-testid="test-react-dashboard-title">TicketStressed</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700 flex flex-col md:flex-row" data-testid="test-react-welcome-message">
              <span>Welcome, </span>
              <span
                class="text-gray-700 inline-block max-w-20 md:max-w-52 truncate align-middle"
                data-testid="test-react-welcome-message"
                :title="user?.name"
              >
                &nbsp;{{ user?.name }}
              </span>
            </span>
            <button
              @click="handleLogout"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              data-testid="test-react-logout-button"
              aria-label="Logout from your account"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="relative overflow-hidden mb-12">
        <!-- Decorative Circles -->
        <div class="absolute top-10 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-60 animate-pulse"></div>
        <div class="absolute top-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-bounce"></div>
        
        <div class="relative z-10 text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to Your <span class="text-teal-600">Dashboard</span>
          </h1>
          <p class="text-xl text-gray-700 mb-8">
            Manage your tickets and stay on top of everything
          </p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-full">
              <TicketIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Tickets</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-full">
              <ClockIcon class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Open Tickets</p>
              <p class="text-2xl font-bold text-green-600">{{ stats.open }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-full">
              <LightningIcon class="w-6 h-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-2xl font-bold text-yellow-600">{{ stats.inProgress }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div class="flex items-center">
            <div class="p-3 bg-gray-100 rounded-full">
              <CheckIcon class="w-6 h-6 text-gray-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Closed Tickets</p>
              <p class="text-2xl font-bold text-gray-600">{{ stats.closed }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center md:text-left">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <router-link
            to="/tickets"
            class="bg-teal-600 hover:bg-teal-700 text-white p-6 rounded-lg text-center transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <div class="flex items-center justify-center mb-4">
              <TicketIcon class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Manage Tickets</h3>
            <p class="text-teal-100">View, create, edit, and delete tickets</p>
          </router-link>

          <router-link
            to="/tickets/create"
            class="bg-gray-600 hover:bg-gray-700 text-white p-6 rounded-lg text-center transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <div class="flex items-center justify-center mb-4">
              <PlusIcon class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Create New Ticket</h3>
            <p class="text-gray-100">Start a new ticket to get help</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import TicketIcon from '../assets/icons/TicketIcon.vue';
import ClockIcon from '../assets/icons/ClockIcon.vue';
import LightningIcon from '../assets/icons/LightningIcon.vue';
import CheckIcon from '../assets/icons/CheckIcon.vue';
import PlusIcon from '../assets/icons/PlusIcon.vue';

const router = useRouter();
const user = ref(null);
const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0
});
const isLoading = ref(true);

const loadDashboard = () => {
  try {
    const session = localStorage.getItem('ticketapp_session');
    if (!session) {
      router.push('/auth/login');
      return;
    }

    const sessionData = JSON.parse(session);
    user.value = sessionData.user;

    // Load ticket stats from localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const ticketList = Array.isArray(tickets) ? tickets : [];
    
    const ticketStats = {
      total: ticketList.length,
      open: ticketList.filter((ticket) => ticket.status === 'open').length,
      inProgress: ticketList.filter((ticket) => ticket.status === 'in_progress').length,
      closed: ticketList.filter((ticket) => ticket.status === 'closed').length
    };
    stats.value = ticketStats;
  } catch (error) {
    console.error('Error loading dashboard:', error);
    toast.error('Failed to load dashboard data');
    router.push('/auth/login');
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  }
};

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session');
  toast.success('Logged out successfully');
  router.push('/');
};

onMounted(() => {
  loadDashboard();
});
</script>

