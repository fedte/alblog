import Vue from 'vue'
import VueRouter from 'vue-router'

import WebLayout from 'views/web/layout'
import WebArticleInfo from 'views/web/article/article'
import WebArticleList from 'views/web/article/list'
import WebIndex from 'views/web/index'
import WebTagsList from 'views/web/tags/list'
import WebCatetoryList from 'views/web/catetory/list'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // linkActiveClass: 'active',
  base: __dirname,
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'WebLayout',
      component: WebLayout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: WebIndex,
          alias: ['/']
        },
        {
          path: 'article/list',
          name: 'articleList',
          component: WebArticleList,
          alias: ['blog']
        },
        {
          path: 'article/:id',
          name: 'articleInfo',
          component: WebArticleInfo
        },
        {
          path: 'tags',
          name: 'tagsList',
          component: WebTagsList
        },
        {
          path: 'tags/:tag',
          name: 'tags',
          component: WebArticleList
        },
        {
          path: 'catetory',
          name: 'catetoryList',
          component: WebCatetoryList
        },
        {
          path: 'catetory/:id',
          name: 'catetory',
          component: WebArticleList
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // if (typeof window !== 'undefined') {
  //   document.body.scrollTop = 0
  //   window.scrollTo(0, 0)
  // }
  next()
})
router.afterEach((to, from) => {
  if (typeof window !== 'undefined') {
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
  }
})
export default router
