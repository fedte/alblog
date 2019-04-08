import { createApp } from './app'
import NProgress from 'nprogress'
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    // start loading indicator
    Promise.all(activated.map(c => {
      NProgress.start()
      if (c.asyncData) {
        let asyncData = c.asyncData({app, store, route: to})
        if (asyncData instanceof Array) {
          return Promise.all(asyncData)
        } else {
          return asyncData
        }
      }
    })).then(() => {
      // stop loading indicator
      NProgress.done()
      next()
    }).catch(next)
  })
  app.$mount('#app')
})

// service worker
if (window.location.protocol === 'https:' && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
