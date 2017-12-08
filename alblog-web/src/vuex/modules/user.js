// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state

const state = {
  isLogin: false,
  isAdmin: false
}

// getters
// 获取当前状态的
const getters = {
  isLogin: state => state.isLogin,
  isAdmin: state => state.isAdmin
}

// actions
const actions = {

  setLogin ({ commit, state }, key) {
    // console.log(key);
    commit(types.CHANGE_ISLOGIN, { isLogin: key })
  },

  setAdmin ({ commit, state }, user) {
    commit(types.CHANGE_ADMIN, { user: user })
  }
}

// mutations
const mutations = {
  // 改变被激活的状态
  [types.CHANGE_ISLOGIN] (state, { isLogin }) {
    // console.log(isLogin);
    state.isLogin = isLogin
  },

  [types.CHANGE_ADMIN] (state, { user }) {
    state.isAdmin = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
