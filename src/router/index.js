import { createRouter, createWebHistory } from 'vue-router'
import HomeView     from '@/views/HomeView.vue'
import CheckoutView from '@/views/CheckoutView.vue'

const routes = [
  {
    path:      '/',
    name:      'home',
    component: HomeView
  },
  {
    path:      '/checkout',
    name:      'checkout',
    component: CheckoutView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

export default router
