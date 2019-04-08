function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = `${title.title ? title.title : 'Alblog 一个轻博客！'} Powered by Alblog`
      this.$ssrContext.keywords = `${title.keywords && title.keywords + ',' || ''}falost,前端,vue,vue-ssr,html5,神棍`
      this.$ssrContext.description = `${title.description} - 非著名前端技术博客，记录生活中的点滴！`
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = `${title.title} Powered by Alblog`
      document.querySelector('meta[name="keywords"]').setAttribute('content', title.keywords)
      document.querySelector('meta[name="description"]').setAttribute('content', title.description)
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
