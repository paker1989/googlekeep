// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import 'bootstrap/less/bootstrap.less'
import 'bootstrap/js/tooltip'
import 'bootstrap/js/popover'
import './style/custom-bootstrap.less'

import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import store from './store'
import TagDeletePopover from './plugins/tagDeletePopover'
// import noteEdition from './plugins/noteEdition'
// import test from './plugins/test' // test

Vue.use(VueResource)
Vue.use(TagDeletePopover)
// Vue.use(noteEdition)
// Vue.use(test) // test

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
