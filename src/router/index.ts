import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DialogHtml from '../views/DialogHtml.vue'
import DateTimeTlView from '../views/DateTimeTlView.vue'
import ProgressivlyStyledText from '../views/ProgressivlyStyledText.vue'
import ProgressivlyStyledTextCssOnly from '../views/ProgressivlyStyledTextCssOnly.vue'
import ParalaxImage from '../views/ParalaxImage.vue'
import SavingCanvas from '../views/SavingCanvas.vue'
import ImageWithDynamicBG from '../views/ImageWithDynamicBG.vue'
import BorderImages from '../views/BorderImages.vue'
import CSSAnchorTooltips from '../views/CSSAnchorTooltips.vue'
import DiscreteAnimations from '../views/DiscreteAnimations.vue'
import OddTruncations from '../views/OddTruncations.vue'
import AccessibleSelectPlaceholders from '../views/AccessibleSelectPlaceholders.vue'

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
      component: DialogHtml
    },
    {
      path: '/date-time-translations',
      name: 'date-time-translations',
      component: DateTimeTlView
    },
    {
      path: '/progressive-styled-text',
      name: 'progressive-styled-text',
      component: ProgressivlyStyledText
    },
    {
      path: '/progressive-styled-text-css',
      name: 'progressive-styled-text-css',
      component: ProgressivlyStyledTextCssOnly
    },
    {
      path: '/paralax-image',
      name: 'paralax-image',
      component: ParalaxImage
    },
    {
      path: '/saving-canvas',
      name: 'saving-canvas',
      component: SavingCanvas
    },
    {
      path: '/dynamic-bg',
      name: 'dynamic-bg',
      component: ImageWithDynamicBG
    },
    {
      path: '/border-images',
      name: 'border-images',
      component: BorderImages
    },
    {
      path: '/tooltips',
      name: 'tooltips',
      component: CSSAnchorTooltips
    },
    {
      path: '/discrete-animations',
      name: 'discrete-animations',
      component: DiscreteAnimations
    },
    {
      path: '/odd-truncations',
      name: 'odd-truncations',
      component: OddTruncations
    },
    {
      path: '/select-placeholders',
      name: 'select-placeholders',
      component: AccessibleSelectPlaceholders
    },
  ]
});

export default router;

