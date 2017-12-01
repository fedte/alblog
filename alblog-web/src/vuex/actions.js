import * as types from './mutation-types'

/**
 * 改变激活状态
 * @param {*} params
 * @param {*} index
 */
export const changeAction = ({ commit }, index) => {
    // console.log(index)

  commit(types.CHANGE_ACTION, {
    index: index
  })
}
