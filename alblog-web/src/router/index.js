import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex/store'
import NotFound from '@/components/HelloWorld'
import Admin from './admin'
import Web from './web'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  // return { x: 0, y: 0 }
}
const router = new Router({
  mode: 'history',
  scrollBehavior,
  routes: [
    ...Web,
    ...Admin,
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
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
