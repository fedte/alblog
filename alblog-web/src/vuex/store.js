import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// 导航位置 by falost
import ActionPosition from './modules/actionPosition'
// 站点状态 by falost
import SiteBase from './modules/siteBase'
// 用户 by falost
import User from './modules/user'
// 分销 by falost
import Distribute from './modules/distribute'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    ActionPosition,
    SiteBase,
    User,
    Distribute
  }
})
