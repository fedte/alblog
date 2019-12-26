import config from 'config'
import { createAPI } from 'create-api'
import md5 from '../utils/md5'
import Store from 'store'

export const api = createAPI(config)

const admin = '/admin/api/v1'
const web = '/api/v1'

function vRequest (params, url, type = '') {
  const API = createAPI(config)
  let timestamp = Date.parse(new Date()) / 1000
  let sign = md5.hex_md5(timestamp + 'alblog')

  const USER = Store.get('user')

  params.data['userId'] = USER ? USER.id : undefined
  params.data['uuid'] = USER ? USER.uuid : undefined
  params.data['sign'] = sign
  params.data['timestamp'] = timestamp

  url = (type === 'admin' ? admin : web) + url
  console.log('--------------')
  console.log(url, params.method)
  console.log('--------------')

  // 判断当前的请求类型 by falost
  if (params.method === 'POST' || params.method === 'PUT') {
    // config = {
    //   method: params.method || 'POST',
    //   baseURL: HOST + url,
    //   data: qs.stringify(params.data),
    //   withCredentials: false,
    //   headers: {}
    // }
    if (params.success) {
      API.post(url, params.data).then((response) => {
        params.success && params.success(response)
      }).catch((error) => {
        params.fail && params.fail(error)
      })
    } else {
      return API.post(url, params.data)
    }
  } else if (params.method === 'UPLOAD') {
    // config = {
    //   method: 'POST',
    //   baseURL: HOST + url,
    //   data: params.data,
    //   withCredentials: false,
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }
    API.upload(url, params.data).then((response) => {
      params.success && params.success(response)
    }).catch((error) => {
      params.fail && params.fail(error)
    })
  } else if (params.method === 'DELETE') {
    // config = {
    //   method: 'DELETE',
    //   baseURL: HOST + url,
    //   data: params.data,
    //   withCredentials: false,
    //   headers: {}
    // }
    API.delete(url, params.data).then((response) => {
      params.success && params.success(response)
    }).catch((error) => {
      params.fail && params.fail(error)
    })
  } else {
  //   config = {
  //     params: params.data,
  //     method: params.method || 'GET',
  //     baseURL: HOST + url,
  //     withCredentials: false,
  //     headers: {}
  //   }
    API.get(url, params.data).then((response) => {
      params.success && params.success(response)
    }).catch((error) => {
      params.fail && params.fail(error)
    })
  }
}
/**
 * 网站前台
 */
export const getArticleList = (params) => vRequest(params, '/article/list')

export const getArticleInfo = (params) => vRequest(params, '/article/get')

export const saveComment = (params) => vRequest(params, '/comment/save')

export const getCommentsList = (params) => vRequest(params, '/comment/list')

export const updateDigg = (params) => vRequest(params, '/update/digg')
