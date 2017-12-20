/**
 * @author falost
 * @name 配置公共方法
 * @params{*}:params
 *
 */
import momentJs from 'moment'

export const isEmpty = function (str) {
  if (str === null || typeof str === 'undefined' || str === '') {
    return true
  }
  return false
}

export const isNotEmpty = function (str) {
  return !isEmpty(str)
}

export const toNumber = function (val) {
  var n = parseFloat(val)
  return isNaN(n) ? val : n
}

export const arrayConcat = function (arr, arr1) {
  arr.push.apply(arr, arr1)
  return arr
}

// 时间戳
export const timeStamp = function () {
  return parseInt(new Date().getTime() / 1000) + ''
}

/* 随机数 */
export const randomString = function () {
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export const formatDate = function (date, friendly = false) {
  date = momentJs(date)
  if (friendly) {
    return date.fromNow()
  } else {
    return date.format('YYYY-MM-DD HH:mm')
  }
}

export const randomColor = function() {
  let colors = [ '#19a2de', '#19A2B4', '#d9534f', '#d43f3a', '#d43f3a', '#4a4a4a', '#46b8da', '#007046', '#b433ff', '#567e95', '#ec971f', '#1B8C31', '#d43f3a', '#5cb85c', '#d43f3a', '#d58512', '#5cb85c', '#036717', '#4cae4c', '#5bc0de' ]
  let random = parseInt(Math.random() * colors.length)
  return colors[random]
}
