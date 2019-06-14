import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.5,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  // attempt: 4,
  lazyComponent: true,

  // set observer to true
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
