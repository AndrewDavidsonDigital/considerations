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
import AccessibleForAccesibilitiesSake from '@/views/AccessibleForAccesibilitiesSake.vue'
import SnakeBorders from '@/views/SnakeBorders.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dialog-html',
    name: 'dialog-html',
    title: "Native dialog",
    component: DialogHtml
  },
  {
    path: '/date-time-translations',
    name: 'date-time-translations',
    title: "Date Time Translations",
    component: DateTimeTlView
  },
  {
    path: '/progressive-styled-text',
    name: 'progressive-styled-text',
    title: "NYI: Dynamic Text Styling (broken due to tailwind update to 4.x)",
    component: ProgressivlyStyledText
  },
  {
    path: '/progressive-styled-text-css',
    name: 'progressive-styled-text-css',
    title: "Dynamic Text Styling (CSS)",
    component: ProgressivlyStyledTextCssOnly
  },
  {
    path: '/paralax-image',
    name: 'paralax-image',
    title: "NYI: Images displayed and layered behind content",
    component: ParalaxImage
  },
  {
    path: '/saving-canvas',
    name: 'saving-canvas',
    title: "Saving from a Canvas",
    component: SavingCanvas
  },
  {
    path: '/dynamic-bg',
    name: 'dynamic-bg',
    title: "Dynamic Image bleed to BG",
    component: ImageWithDynamicBG
  },
  {
    path: '/border-images',
    name: 'border-images',
    title: "NYI: Custom Border Images",
    component: BorderImages
  },
  {
    path: '/tooltips',
    name: 'tooltips',
    title: "Anchor CSS Tooltips",
    component: CSSAnchorTooltips
  },
  {
    path: '/discrete-animations',
    name: 'discrete-animations',
    title: "Discrete Animations",
    component: DiscreteAnimations
  },
  {
    path: '/odd-truncations',
    name: 'odd-truncations',
    title: "Odd Truncations",
    component: OddTruncations
  },
  {
    path: '/select-placeholders',
    name: 'select-placeholders',
    title: "Select Placeholders",
    component: AccessibleSelectPlaceholders
  },
  {
    path: '/accessibility-at-any-cost',
    name: 'accessibility-at-any-cost',
    title: "Accessibility at any Cost",
    component: AccessibleForAccesibilitiesSake
  },
  {
    path: '/snake-border',
    name: 'snake-border',
    title: "Snake gradient Borders",
    component: SnakeBorders,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

