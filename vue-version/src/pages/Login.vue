<template>
  <main class="min-h-screen w-full relative bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <!-- Decorative Circles -->
    <div
      class="absolute top-20 left-10 w-32 h-32 bg-teal-200 rounded-full opacity-60 animate-pulse"
      data-testid="test-react-login-circle-1"
    ></div>
    <div
      class="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-50 animate-bounce"
      data-testid="test-react-login-circle-2"
    ></div>

    <div class="max-w-md w-full space-y-8">
      <section
        class="bg-white rounded-2xl shadow-xl p-8"
        data-testid="test-react-login-form-container"
      >
        <button
          type="button"
          @click="router.back()"
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 relative z-10"
          data-testid="test-react-login-go-back"
          aria-label="Go back"
        >
          ← Go back
        </button>
        <header class="text-center">
          <h2
            class="text-3xl font-bold text-gray-900 mb-2"
            data-testid="test-react-login-title"
          >
            Welcome to <span class="text-teal-600">TicketStressed</span>
          </h2>
          <p
            class="text-gray-600 mb-8"
            data-testid="test-react-login-subtitle"
          >
            Sign in to your account
          </p>
        </header>

        <form
          @submit.prevent="handleSubmit"
          class="space-y-6"
          data-testid="test-react-login-form"
        >
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              :class="errors.email ? 'border-red-500' : 'border-gray-300'"
              placeholder="Enter your email"
              data-testid="test-react-email-input"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600" data-testid="test-react-email-error">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="formData.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                :class="errors.password ? 'border-red-500' : 'border-gray-300'"
                placeholder="Enter your password"
                data-testid="test-react-password-input"
              />
              <button
                type="button"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <EyeOffIcon v-if="showPassword" class="w-5 h-5" />
                <EyeIcon v-else class="w-5 h-5" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600" data-testid="test-react-password-error">
              {{ errors.password }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            data-testid="test-react-login-submit-button"
            :aria-label="isLoading ? 'Signing in...' : 'Sign in to your account'"
          >
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-600 z-10">
            Don't have an account?
            <router-link
              to="/auth/signup"
              class="text-teal-600 hover:text-teal-700 font-semibold"
              data-testid="test-react-signup-link"
            >
              Sign up here
            </router-link>
          </p>
        </div>

        <aside
          class="mt-6 p-4 bg-blue-50 rounded-lg"
          data-testid="test-react-demo-credentials"
        >
          <p class="text-sm text-blue-800 font-medium">
            Demo Credentials:
          </p>
          <p class="text-sm text-blue-700">
            Email: demo@ticketstressed.com
          </p>
          <p class="text-sm text-blue-700">Password: password123</p>
        </aside>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import EyeIcon from '../assets/icons/EyeIcon.vue';
import EyeOffIcon from '../assets/icons/EyeOffIcon.vue';

const router = useRouter();
const formData = ref({
  email: '',
  password: '',
});
const errors = ref({});
const isLoading = ref(false);
const showPassword = ref(false);

const validateForm = () => {
  const newErrors = {};

  if (!formData.value.email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    newErrors.email = 'Email is invalid';
  }

  if (!formData.value.password) {
    newErrors.password = 'Password is required';
  } else if (formData.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const existingUsers = JSON.parse(
      localStorage.getItem('ticketapp_session_users') || '[]'
    );

    const user = existingUsers.find((u) => u.user.email === formData.value.email);

    if (!user) {
      toast.error('User not found');
      return;
    }

    if (user.user.password !== formData.value.password) {
      toast.error('Incorrect password');
      return;
    }

    localStorage.setItem(
      'ticketapp_session',
      JSON.stringify({
        user: user.user,
        token: 'mock-jwt-token',
        expires: Date.now() + 24 * 60 * 60 * 1000,
      })
    );

    toast.success('Login successful!');
    router.push('/dashboard');
  } catch (error) {
    console.log(error);
    toast.error('Login failed. Please try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>

