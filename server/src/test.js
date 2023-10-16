const fs = require('fs')
const path = require('path')
const md5 = require('md5')

async function main() {
  let currentDateObj = new Date()
  currentDateObj.setDate(currentDateObj.getDate() - ((currentDateObj.getDay() + 6) % 7))
  tsObj = currentDateObj.toLocaleString('en-uS', { timeZone: 'America/Los_Angeles' })

  console.log(new Date(tsObj).toISOString())
}

try {
  main()
} catch (error) {
  console.error(error)
}
