import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import TicketManagement from '../pages/TicketManagement.vue';
import Layout from '../layout/Layout.vue';
import ProtectedRoute from '../pages/ProtectedRoute.vue';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'LandingPage',
        component: LandingPage
      },
      {
        path: 'auth/login',
        name: 'Login',
        component: Login
      },
      {
        path: 'auth/signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: 'dashboard',
        meta: { requiresAuth: true },
        component: ProtectedRoute,
        props: { default: true },
        children: [
          {
            path: '',
            name: 'Dashboard',
            component: Dashboard
          }
        ]
      },
      {
        path: 'tickets/:mode?',
        meta: { requiresAuth: true },
        component: ProtectedRoute,
        props: { default: true },
        children: [
          {
            path: '',
            name: 'Tickets',
            component: TicketManagement
          }
        ]
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ticketapp_session');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;

