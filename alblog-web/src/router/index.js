import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const AdminLayout = () => import('@/page/admin/layout')
const AdminIndex = () => import('@/page/admin/index')
const AdminLogin = () => import('@/page/admin/admin_login')

const AdminSetting = () => import('@/page/admin/setting/basic')

const AdminArticleNew = () => import('@/page/admin/article/new')
const AdminArticle = () => import('@/page/admin/article/list')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      alias: [''],
      redirect: '/admin/index',
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
          path: 'article',
          name: 'adminArticle',
          component: AdminArticle,
          children: [
          ]
        },
        {
          path: 'article/new',
          name: 'adminArticleNew',
          component: AdminArticleNew
        },
        {
          path: 'article/list',
          name: 'adminArticleList',
          component: AdminArticle
        }
      ]
    }
  ]
})
