import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/**
 * Don't load the app if the browser does not support
 * IntersectionObserver or ResizeObserver
 */
if (('IntersectionObserver' in window) &&
  ('IntersectionObserverEntry' in window) &&
  ('intersectionRatio' in window.IntersectionObserverEntry.prototype) &&
  ('ResizeObserver' in window !== false)) {
    createApp(App).mount('#app')
}
