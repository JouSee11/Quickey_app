import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AvailableSoonView from '@/views/AvailableSoonView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/app',
      name: 'app',
      component: HomeView,
    },
    {
      path: '/discover',
      name: 'discover',
      component: AvailableSoonView,
    },
    {
      path: '/firmware',
      name: 'firmware',
      component: AvailableSoonView,
    },
    {
      path: '/login',
      name: 'login',
      component: AvailableSoonView,
    },
    {
      path: '/faq',
      name: 'faq',
      component: AvailableSoonView,
    },
    {
      path: '/shop',
      name: 'shop',
      component: AvailableSoonView,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
