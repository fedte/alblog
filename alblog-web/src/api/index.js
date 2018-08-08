import Axios from 'axios'

import Store from 'store'

import qs from 'qs'

import md5 from '../utils/md5'

const URI = 'http://192.168.1.111:3000/'
// const URI = 'https://api.falost.cc/'
const admin = 'admin/api/v1'
const web = 'api/v1'

const vRequest = function (params, url, type = '') {
  const USER = Store.get('user')
  let timestamp = Date.parse(new Date()) / 1000
  let sign = md5.hex_md5(timestamp + 'alblog')
  let config = {}

  params.data['userId'] = USER ? USER.id : undefined
  params.data['uuid'] = USER ? USER.uuid : undefined
  params.data['sign'] = sign
  params.data['timestamp'] = timestamp

  const HOST = URI + (type === 'admin' ? admin : web)
  console.log('--------------')
  console.log(HOST, params.method)
  console.log('--------------')

  // 判断当前的请求类型 by falost
  if (params.method === 'POST' || params.method === 'PUT') {
    config = {
      method: params.method || 'POST',
      baseURL: HOST + url,
      data: qs.stringify(params.data),
      withCredentials: false,
      headers: {
        // 'Access-Control-Allow-Origin': '*'
      }
    }
  } else if (params.method === 'UPLOAD') {
    config = {
      method: 'POST',
      baseURL: HOST + url,
      data: params.data,
      withCredentials: false,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  } else if (params.method === 'DELETE') {
    config = {
      method: 'DELETE',
      baseURL: HOST + url,
      data: params.data,
      withCredentials: false,
      headers: {}
    }
  } else {
    config = {
      params: params.data,
      method: params.method || 'GET',
      baseURL: HOST + url,
      withCredentials: false,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

  Axios(config).then(function (res) {
    params.success && params.success(res)
  }).catch(function (error) {
    params.fail && params.fail(error)
  }).then(function () {
    params.complete && params.complete()
  })
}

/**
 * 全局API
 */
export const test = (params) => vRequest(params, '/test')

export const userLogin = (params) => vRequest(params, '/login')

export const isLogin = (params) => vRequest(params, '/isLogin')

/**
 * 管理后台
 */

export const isAdmin = (params) => vRequest(params, '/isAdmin', 'admin')

export const adminSaveArticle = (params) => vRequest(params, '/article/save', 'admin')

export const adminArticleInfo = (params) => vRequest(params, '/article/get', 'admin')

export const adminArticleList = (params) => vRequest(params, '/article/list', 'admin')

export const adminSaveCatetory = (params) => vRequest(params, '/catetory/save', 'admin')

export const adminCatetoryList = (params) => vRequest(params, '/catetory/list', 'admin')

export const adminCatetoryInfo = (params) => vRequest(params, '/catetory/get', 'admin')

export const adminDeleteItem = (params) => vRequest(params, '/delete/item', 'admin')
/**
 * 网站前台
 */
export const getArticleList = (params) => vRequest(params, '/article/list')

export const getArticleInfo = (params) => vRequest(params, '/article/get')

export const saveComment = (params) => vRequest(params, '/comment/save')

export const getCommentsList = (params) => vRequest(params, '/comment/list')

export const updateDigg = (params) => vRequest(params, '/update/digg')
