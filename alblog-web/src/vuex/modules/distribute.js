// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state

const state = {
  distributeAction: false,
  applyDistributor: false,
  isPromoters: false,
  inviteDistribute: false,
  traderInfo: {},
  invitationFriend: {},
  inviteRewards: false
}

// getters
// 获取当前状态的
const getters = {
  distributeAction: state => state.distributeAction,
  applyDistributor: state => state.applyDistributor,
  isPromoters: state => state.isPromoters,
  inviteDistribute: state => state.inviteDistribute,
  traderInfo: state => state.traderInfo,
  invitationFriend: state => state.invitationFriend,
  inviteRewards: state => state.inviteRewards
}

// actions
const actions = {

  setDistributeAction ({ commit, state }, value) {
      // console.log(value);
    commit(types.CHANGE_DISTRIBUTE, { distributeAction: value })
  },
  // 设置推广员申请开关状态 by falost
  setApplyDistributor ({ commit, state }, value) {
    commit(types.CHANGE_APPLYDISTRIBUTOR, { applyDistributor: value })
  },
  // 是否为推广员 by falost
  setIsPromoters ({ commit, state }, value) {
    commit(types.CHANGE_ISPROMOTERS, { isPromoters: value })
  },
  // 改变邀请开关状态 by falost
  setInviteDistribute ({ commit, state }, value) {
    commit(types.CHANGE_INVITEDISTRIBUTE, { inviteDistribute: value })
  },
  // setTraderInfo by falost
  setTraderInfo ({ commit, state }, value) {
    commit(types.CHANGE_TRADERINFO, { traderInfo: value })
  },
  // invitation friend jion promoters or customer by falost
  setInvitationFriend ({ commit, state }, value) {
    commit(types.CHANGE_INVITATIONFRIEND, { invitationFriend: value })
  },
  // invite rewards switch state by falost
  setInviteRewards ({ commit, state }, value) {
    commit(types.CHANGE_INVITEREWARDS, {inviteRewards: value})
  }
}

// mutations
const mutations = {
  // 改变被激活的状态
  [types.CHANGE_DISTRIBUTE] (state, { distributeAction }) {
      // console.log(isLogin);
    state.distributeAction = distributeAction
  },
  // 申请推广员申请开关状态 by falost
  [types.CHANGE_APPLYDISTRIBUTOR] (state, { applyDistributor }) {
    state.applyDistributor = applyDistributor
  },
  // 保存推广员状态 by falost
  [types.CHANGE_ISPROMOTERS] (state, { isPromoters }) {
    state.isPromoters = isPromoters
  },
  // 保存推广员状态信息 by falost
  [types.CHANGE_TRADERINFO] (state, { traderInfo }) {
    state.traderInfo = traderInfo
  },
  // 邀请开关状态 by falost
  [types.CHANGE_INVITEDISTRIBUTE] (state, { inviteDistribute }) {
    state.inviteDistribute = inviteDistribute
  },
  // invitation friend jion promoters or customer by falost
  [types.CHANGE_INVITATIONFRIEND] (state, { invitationFriend }) {
    state.invitationFriend = invitationFriend
  },
  [types.CHANGE_INVITEREWARDS] (state, { inviteRewards }) {
    state.inviteRewards = inviteRewards
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
