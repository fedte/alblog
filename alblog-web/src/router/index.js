import Vue from 'vue'
import Router from 'vue-router'
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

const WebLayout = () => import('@/page/web/layout')
const WebArticleInfo = () => import('@/page/web/article/article')
const WebArticleList = () => import('@/page/web/article/list')
const WebIndex = () => import('@/page/web/index')
const WebTagsList = () => import('@/page/web/tags/list')
const WebTag = () => import('@/page/web/tags/tag')

export default new Router({
  mode: 'history',
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
          component: WebTag
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
      // redirect: '/index',
      meta: {
        title: 'NotFound'
      }
    }
  ]
})
