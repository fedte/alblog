// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state

const state = {
  dbKey: 'default',
  rootURL: '/default',
  initStatus: false,
  title: '',
  siteTitle: '',
  share: {}
}

// getters
// 获取当前状态的
const getters = {
  dbKey: state => state.dbKey,
  rootURL: state => state.rootURL,
  initStatus: state => state.initStatus,
  title: state => state.title,
  siteTitle: state => state.siteTitle,
  share: state => state.share
}

// actions
const actions = {

  setDBKey ({ commit, state }, dbKey) {
        // console.log(commit);
    commit(types.CHANGE_DBKEY, { dbKey: dbKey })
  },

  setRootURL ({ commit, state }, rootURL) {
    commit(types.CHANGE_ROOTURL, { rootURL: rootURL })
  },

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

  setShareInfo ({ commit, state }, info) {
    commit(types.CHANGE_SHAREINFO, info)
  }
}

// mutations
const mutations = {
    // 改变被激活的状态
  [types.CHANGE_DBKEY] (state, { dbKey }) {
        // console.log(index);
    state.dbKey = dbKey
  },
    // 改变 当前是否显示这个模块
  [types.CHANGE_ROOTURL] (state, { rootURL }) {
        // console.log(index);
    state.rootURL = rootURL
  },
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
