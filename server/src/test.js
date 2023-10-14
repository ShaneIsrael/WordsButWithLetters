const fs = require('fs')
const path = require('path')
const md5 = require('md5')

async function main() {
  console.log(md5('192.168.0.1'))
}

try {
  main()
} catch (error) {
  console.error(error)
}
