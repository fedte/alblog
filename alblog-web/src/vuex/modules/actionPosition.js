// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state

const state = {
  index: 'home',
  showFooterBar: false,
  toolsBar: true
}

// getters
// 获取当前状态的
const getters = {
  actionPosition: state => state.index,
  showFooterBar: state => state.showFooterBar,
  toolsBar: state => state.toolsBar
}

// actions
const actions = {
    /**
     * 设置action的位置
     * @param {*} commit
     * @param {*} index
     */
  setActionPosition ({ commit, state }, index) {
        // console.log(commit);
    commit(types.CHANGE_ACTION, { index: index })
  },
    /**
     * 设置是否显示footbar
     * @param {*} commit
     * @param {*} showFooterBar
     */
  setShowFooterBar ({ commit, state }, showFooterBar) {
    commit(types.CHANGE_FOOTERBARACTION, { showFooterBar: showFooterBar })
  },
  setToolsBar ({ commit, state }, toolsBar) {
    commit(types.CHANGE_TOOLSBAR, { toolsBar: toolsBar })
  }
}

// mutations
const mutations = {
    // 改变被激活的状态
  [types.CHANGE_ACTION] (state, { index }) {
        // console.log(index);
    state.index = index
  },
    // 改变 当前是否显示这个模块
  [types.CHANGE_FOOTERBARACTION] (state, { showFooterBar }) {
        // console.log(index);
    state.showFooterBar = showFooterBar
  },
  [types.CHANGE_TOOLSBAR] (state, { toolsBar }) {
    state.toolsBar = toolsBar
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
