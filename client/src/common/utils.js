import Cookies from 'js-cookie'
import _ from 'lodash'

const EMOJI_NUMBER_MAP = {
  0: '0️⃣',
  1: '1️⃣',
  2: '2️⃣',
  3: '3️⃣',
  4: '4️⃣',
  5: '5️⃣',
  6: '6️⃣',
  7: '7️⃣',
  8: '8️⃣',
  9: '9️⃣',
}

export const getUrl = () => {
  const portWithColon = window.location.port ? `:${window.location.port}` : ''
  return window.location.port === 3000 ||
    (window.location.hostname.indexOf('localhost') >= 0 && window.location.port !== '')
    ? 'http://localhost:3001'
    : `${window.location.protocol}//${window.location.hostname}${portWithColon}`
}

export const convertFlatCommentsToNested = (comments) => {
  const index = _.mapKeys(comments, 'id')
  const obj = {}
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

export const loadPuzzleData = (date) => {
  const progress = localStorage.getItem('progress')
  if (!progress) return null
  return JSON.parse(localStorage.getItem('progress'))[date]
}

export const savePuzzleData = (date, puzzle, progress) => {
  const existingProgress = localStorage.getItem('progress')
  if (existingProgress) {
    return localStorage.setItem(
      'progress',
      JSON.stringify({
        ...JSON.parse(existingProgress),
        [date]: {
          progress,
          puzzle,
        },
      }),
    )
  }
  return localStorage.setItem(
    'progress',
    JSON.stringify({
      [date]: { progress, puzzle },
    }),
  )
}

export const getPTDate = () =>
  new Date().toLocaleString('fr-CA', { timeZone: 'America/Los_Angeles' }).match(/\d{4}-\d{2}-\d{2}/g)[0]

export const convertNumberToEmoji = (number) => {
  let tempNumber = `${number}`
  const numberSize = tempNumber.length
  if (numberSize < 5) {
    for (let i = 0; i < 5 - numberSize; i++) {
      tempNumber = `0${tempNumber}`
    }
  }
  tempNumber = `${tempNumber.split('').reduce((prev, curr) => prev + EMOJI_NUMBER_MAP[curr], '')}\n`
  return tempNumber
}
