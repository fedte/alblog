import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      process.Cookies = context.cookies
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          let asyncData = Component.asyncData({
            app,
            store,
            route: router.currentRoute,
            cookies: context.cookies
          })
          if (asyncData instanceof Array) {
            return Promise.all(asyncData)
          } else {
            return asyncData
          }
        }
      })).then(() => {
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
