import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import DiscoverView from '@/views/DiscoverView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import AvailableSoonView from '@/views/AvailableSoonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
