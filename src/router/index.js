import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/date-time-translations',
      name: 'date-time-translations',
      // route level code-splitting
      // this generates a separate chunk (DateTimeTlView.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DateTimeTlView.vue')
    },
    {
      path: '/progressive-styled-text',
      name: 'progressive-styled-text',
      component: () => import('../views/ProgressivlyStyledText.vue')
    },
    {
      path: '/saving-canvas',
      name: 'saving-canvas',
      component: () => import('../views/SavingCanvas.vue')
    },
    
  ]
})

export default router
