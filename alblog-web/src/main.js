// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/../static/common/bootstrap/css/bootstrap.min.css'
import '@/../static/common/bootstrap/js/bootstrap.min.js'
import '@/../static/common/bootstrap/css/ionicons.min.css'
import '@/../static/common/bootstrap/css/font-awesome.min.css'

Vue.config.productionTip = true

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
console.log(vm)
vm.$router.beforeEach((to, from, next) => {
  console.log(to)

  next()
})
