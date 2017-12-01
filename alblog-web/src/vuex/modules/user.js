// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state

const state = {
  isLogin: false,
  message: {}
}

// getters
// 获取当前状态的
const getters = {
  isLogin: state => state.isLogin,
  message: state => state.message
}

// actions
const actions = {

  setLogin ({ commit, state }, key) {
    // console.log(key);
    commit(types.CHANGE_ISLOGIN, { isLogin: key })
  },

  setMessage ({ commit, state }, message) {
    commit(types.CHANGE_MESSAGE, { message: message })
  }
}

// mutations
const mutations = {
  // 改变被激活的状态
  [types.CHANGE_ISLOGIN] (state, { isLogin }) {
    // console.log(isLogin);
    state.isLogin = isLogin
  },

  [types.CHANGE_MESSAGE] (state, { message }) {
    state.message = {...state.message, ...message}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
