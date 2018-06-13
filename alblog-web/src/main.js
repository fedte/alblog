// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/../static/common/bootstrap/css/bootstrap.min.css'
import '@/../static/common/css/animate.css'
import '@/scss/element-variables.scss'
import { Input, Button, Select, Message, MessageBox, Pagination, Popover, Dialog } from 'element-ui'
// 引入API接口配置 Edit by falost
import * as API from './api'
// 引入公共方法 Edit by falost
import * as Utils from './utils/utils'

import Store from 'store'
// 骨架
import VueContentPlaceholders from 'vue-content-placeholders'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 样式文件

Vue.config.productionTip = true
// Vue.config.productionTip = false
Vue.config.devtools = true
// Vue.config.devtools = false

// 指令
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
Vue.directive('onlaod', {
  inserted: function (el, {value}) {
    window.onscroll = function () {
      let scrollHeight
      let clientHeight
      let scrollTop
      if (document.documentElement) {
        scrollTop = document.documentElement.scrollTop
        clientHeight = document.documentElement.clientHeight
        scrollHeight = document.documentElement.scrollHeight
      } else if (document.body) {
        scrollTop = document.body.scrollTop
        clientHeight = document.body.clientHeight
        scrollHeight = document.body.scrollHeight
      }
      // console.log('----------------')
      // console.log(scrollTop, clientHeight, scrollHeight, scrollTop + clientHeight == scrollHeight)
      // console.log('------ End------')
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        if (typeof value === 'function') {
          value()
        }
      }
    }
  },
  unbind (el) {
    window.onscroll = null
  }
})

// 组件
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Pagination.name, Pagination)
Vue.component(Popover.name, Popover)
Vue.component(Dialog.name, Dialog)
// 插件
Vue.use(VueContentPlaceholders)

Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox

// 全局请求API Edit by falost
Vue.prototype.$API = API

// 设置、获取 local Storage Edit by falost
Vue.prototype.$STORE = Store

// 全局公用方法 Edit by falost
Vue.prototype.$utils = Utils

Vue.prototype.$ISLOGIN = function (callback) {
  let that = this
  let user = that.$STORE.get('user')
  let time = that.$STORE.get('time')
  let callbackData
    // console.log("time", time);
    // console.log(typeof callback);

  callback = callback || function () {}
    // console.log("callback" , callback);

  // console.log(user);

  if (user && !Utils.isEmpty(user.uuid) && !Utils.isEmpty(user.id)) {
    if (time === '' || time == null || time === undefined) {
      that.$STORE.set('time', new Date().getTime())
    } else {
      // console.log(new Date().getTime(), (new Date().getTime() - time) / 1000);

      // 上期访问时间差 by falost
      let timeDiff = (new Date().getTime() - time) / 1000
      if (timeDiff > 0) {
        console.log('登录超时了')
        that.$STORE.set('time', new Date().getTime())
        that.$API.isLogin({
          data: {
            userId: user.id,
            uuid: user.uuid
          },
          method: 'POST',
          success (res) {
            let data = res.data

            if (data.code == 10000 && data.entity) {
              // newFunction(that);
              that.$store.dispatch('setLogin', true)
                // console.log("请求回来", new Date())
              callbackData = { isLogin: true }
            } else {
              that.$store.dispatch('setLogin', false)
              // that.$dialog.toast({mes:"未登录" ,timeout:5000})
              callbackData = { isLogin: false }
            }
            callback(callbackData)
          }
        })
      } else {
        that.$store.dispatch('setLogin', true)
        callbackData = { isLogin: true }
        console.log('登录状态正常')
        callback(callbackData)
      }
    }
  } else {
    that.$store.dispatch('setLogin', false)
    console.log('未登录')
    callbackData = { isLogin: false }
    callback(callbackData)
  }
}

/* eslint-disable no-new */

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
console.log(app)
app.$router.beforeEach((to, from, next) => {
  console.log(to)
  next()
})
