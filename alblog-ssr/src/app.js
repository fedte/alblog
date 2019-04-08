import Vue from 'vue'

import STORE from 'store'

import App from './App.vue'
import store from './vuex/store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as uiv from 'uiv'
import titleMixin from './utils/title'
import * as utils from './utils/util'
import * as API from './api'

Vue.mixin(titleMixin)
Vue.use(uiv)

export function createApp () {
  // 设置、获取 local Storage Edit by falost
  Vue.prototype.$STORE = STORE

  // 全局公用方法 Edit by falost
  Vue.prototype.$utils = utils
  Vue.prototype.$API = API
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return { app, router, store }
}
