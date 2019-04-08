// initial state

const state = {
  title: '',
  adminTitle: '',
  siteTitle: ''
}

// getters
// 获取当前状态的
const getters = {
  title: state => state.title,
  adminTitle: state => state.adminTitle,
  siteTitle: state => state.siteTitle
}

// actions
const actions = {
  setSiteTitle ({ commit, state }, title) {
    if (title instanceof Object) {
      title = { siteTitle: title.title }
    } else {
      title = {title}
    }
    commit('SITE_TITLE', title)
  },
  setAdminTitle ({ commit, state }, title) {
    commit('ADMIN_TITLE', title)
  }
}

// mutations
const mutations = {
  // 页面标题设置 by falost
  SITE_TITLE (state, titles) {
    if (titles.siteTitle) {
      state.siteTitle = titles.siteTitle
    } else {
      state.title = titles.title
    }
  },
    // 页面标题设置 by falost
  ADMIN_TITLE (state, titles) {
    state.adminTitle = titles.title
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
