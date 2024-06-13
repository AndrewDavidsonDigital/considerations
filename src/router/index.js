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
      path: '/dialog-html',
      name: 'dialog-html',
      component: () => import('../views/DialogHtml.vue')
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
      path: '/progressive-styled-text-css',
      name: 'progressive-styled-text-css',
      component: () => import('../views/ProgressivlyStyledTextCssOnly.vue')
    },
    {
      path: '/paralax-image',
      name: 'paralax-image',
      component: () => import('../views/ParalaxImage.vue')
    },
    {
      path: '/saving-canvas',
      name: 'saving-canvas',
      component: () => import('../views/SavingCanvas.vue')
    },
    {
      path: '/dynamic-bg',
      name: 'dynamic-bg',
      component: () => import('../views/ImageWithDynamicBG.vue')
    },
    {
      path: '/border-images',
      name: 'border-images',
      component: () => import('../views/BorderImages.vue')
    },
    {
      path: '/tooltips',
      name: 'tooltips',
      component: () => import('../views/CSSAnchorTooltips.vue')
    },
  ]
});

export default router;
