import Cookies from 'js-cookie'
import _ from 'lodash'

export const getUrl = () => {
  const portWithColon = window.location.port ? `:${window.location.port}` : ''
  return window.location.port === 3000 ||
    (window.location.hostname.indexOf('localhost') >= 0 && window.location.port !== '')
    ? 'http://localhost:3001'
    : `${window.location.protocol}//${window.location.hostname}${portWithColon}`
}

export const convertFlatCommentsToNested = (comments) => {
  let index = _.mapKeys(comments, 'id')
  let obj = {}
  _.each(index, function (v) {
    if (!v.parentId) {
      obj[v.id] = v
    } else {
      if (!index[v.parentId].children) {
        index[v.parentId].children = []
      }
      index[v.parentId].children.push(v)
    }
  })
  return obj
}

export const getSessionUser = () => {
  const cookie = Cookies.get('user')
  if (!cookie) return null
  return JSON.parse(cookie)
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
