import {
  getArticleList,
  getArticleInfo,
  getCommentsList
} from '@/api'
// initial state
const state = {
  ArticleList: null,
  ArticleInfo: null,
  ArticleComment: null
}

// getters
const getters = {
  GetArticleListData: state => state.ArticleList,
  GetArticleInfoData: state => state.ArticleInfo,
  GetArticleCommentData: state => state.ArticleComment
}

// actions
const actions = {
  GetArticleListData ({ commit, state }, data) {
    return getArticleList({
      data,
      method: 'POST'
    }).then((res) => {
      commit('ARTICLE_LIST', res)
    })
  },
  GetArticleInfoData ({ commit, state }, data) {
    return getArticleInfo({
      data,
      method: 'POST'
    }).then((res) => {
      commit('ARTICLE_INFO', res)
    })
  },
  GetArticleCommentData ({ commit, state }, data) {
    return getCommentsList({
      data,
      method: 'POST'
    }).then((res) => {
      commit('ARTICLE_COMMENT', res)
    })
  }
}

// mutations
const mutations = {
  // 文章列表 by falost
  ARTICLE_LIST: (state, data) => {
    state.ArticleList = data
  },
  // 文章详情
  ARTICLE_INFO: (state, data) => {
    state.ArticleInfo = data
  },
  // 文章评论
  ARTICLE_COMMENT: (state, data) => {
    state.ArticleComment = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
