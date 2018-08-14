// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state

const state = {
  initStatus: false,
  title: '',
  adminTitle: '',
  siteTitle: '',
  share: {}
}

// getters
// 获取当前状态的
const getters = {
  initStatus: state => state.initStatus,
  title: state => state.title,
  adminTitle: state => state.adminTitle,
  siteTitle: state => state.siteTitle,
  share: state => state.share
}

// actions
const actions = {

  setInitStatus ({ commit, state }, status) {
    commit(types.CHANGE_INITSTATUS, { initStatus: status })
  },

  setSiteTitle ({ commit, state }, title) {
    if (title instanceof Object) {
      title = { siteTitle: title.title }
    } else {
      title = {title}
    }
    commit(types.CHANGE_SITETITLE, title)
  },
  setAdminTitle ({ commit, state }, title) {
    commit(types.CHANGE_ADMINTITLE, title)
  },

  setShareInfo ({ commit, state }, info) {
    commit(types.CHANGE_SHAREINFO, info)
  }
}

// mutations
const mutations = {

    // 初始化状态 by falost
  [types.CHANGE_INITSTATUS] (state, { initStatus }) {
    state.initStatus = initStatus
  },
    // 页面标题设置 by falost
  [types.CHANGE_SITETITLE] (state, titles) {
    if (titles.siteTitle) {
      state.siteTitle = titles.siteTitle
    } else {
      state.title = titles.title
    }
  },
    // 页面标题设置 by falost
  [types.CHANGE_ADMINTITLE] (state, titles) {
    state.adminTitle = titles.title
  },
    // 页面分享信息
  [types.CHANGE_SHAREINFO] (state, info) {
    if (typeof info === 'string') { state.share = {} }
    state.share = {...state.share, ...info}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
