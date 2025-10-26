<template>
  <div v-if="isAuthenticated === null" class="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Checking authentication...</p>
    </div>
  </div>
  <div v-else-if="isAuthenticated">
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
const router = useRouter();
const isAuthenticated = ref(null);

onMounted(() => {
  checkAuth();
});

const checkAuth = () => {
  try {
    const session = localStorage.getItem('ticketapp_session');
    if (!session) {
      setTimeout(() => {
        toast.info('Please login to view dashboard');
        isAuthenticated.value = false;
      }, 1500);
      return;
    }

    const sessionData = JSON.parse(session);
    const now = Date.now();
    
    // Check if session is expired
    if (sessionData.expires && now > sessionData.expires) {
      setTimeout(() => {
        toast.info('Your session has expired — please log in again.');
        localStorage.removeItem('ticketapp_session');
        isAuthenticated.value = false;
      }, 1500);
      return;
    }

    isAuthenticated.value = true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    localStorage.removeItem('ticketapp_session');
    isAuthenticated.value = false;
  }
};
</script>

