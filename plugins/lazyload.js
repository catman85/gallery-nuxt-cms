import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
//   error: 'dist/error.png',
//   loading: 'dist/loading.gif',
  attempt: 4
})