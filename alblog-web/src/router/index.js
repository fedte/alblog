import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const AdminLayout = () => import('@/page/admin/layout')
const AdminIndex = () => import('@/page/admin/index')
const AdminLogin = () => import('@/page/admin/admin_login')

const AdminSetting = () => import('@/page/admin/setting/basic')
const AdminCatetoryNew = () => import('@/page/admin/catetory/new')
const AdminCatetoryList = () => import('@/page/admin/catetory/list')

const AdminArticleNew = () => import('@/page/admin/article/new')
const AdminArticleList = () => import('@/page/admin/article/list')

const WebLayout = () => import('@/template/web/layout')
const WebArticleInfo = () => import('@/template/web/article/article')
const WebArticleList = () => import('@/template/web/article/list')
const WebIndex = () => import('@/template/web/index')
const WebTagsList = () => import('@/template/web/tags/list')
const WebCatetoryList = () => import('@/template/web/catetory/list')
const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
}
const router = new Router({
  mode: 'history',
  scrollBehavior,
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
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      // redirect: '/admin/index',
      children: [
        {
          path: 'index',
          name: 'adminIndex',
          component: AdminIndex
        },
        {
          path: 'login',
          name: 'adminLogin',
          component: AdminLogin
        },
        {
          path: 'setting',
          name: 'adminSetting',
          component: AdminSetting
        },
        {
          path: 'catetory',
          name: 'adminCatetory',
          component: AdminCatetoryList,
          children: [
            {
              path: 'list',
              name: 'adminCatetoryList',
              component: AdminCatetoryList
            }
          ]
        },
        {
          path: 'catetory/new',
          name: 'adminCatetoryNew',
          component: AdminCatetoryNew,
          children: [
            {
              path: ':id',
              name: 'adminCatetoryEdit',
              component: AdminCatetoryNew
            }
          ]
        },
        {
          path: 'article',
          name: 'adminArticle',
          component: AdminArticleList,
          children: [
            {
              path: 'list',
              name: 'adminArticleList',
              component: AdminArticleList
            }
          ]
        },
        {
          path: 'article/new',
          name: 'adminArticleNew',
          component: AdminArticleNew,
          children: [
            {
              path: ':id',
              name: 'adminArticleEdit',
              component: AdminArticleNew
            }
          ]
        }

      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: HelloWorld,
      redirect: '/',
      meta: {
        title: 'NotFound'
      }
    }
  ]
})
const title = document.title

router.beforeEach((to, from, next) => {
  store.dispatch('setSiteTitle', '')
  store.dispatch('setAdminTitle', '')
  store.dispatch('setShareInfo', '')

  if (to.meta && to.meta.title !== '' && to.meta.title !== undefined) {
    // console.log("title:",to.meta.title);

    document.title = to.meta.title
  } else {
    document.title = title
  }

  store.dispatch('setSiteTitle', { title })

  next()
})
export default router
