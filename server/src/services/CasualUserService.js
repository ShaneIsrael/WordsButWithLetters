const { loadWordsFromFile, capitalizeFirstLetter } = require('../utils')

const service = {}

const adjectives = loadWordsFromFile('../lists/filtered/adjectives_7OrLess.txt')
const animals = loadWordsFromFile('../lists/filtered/animals_9OrLess.txt')

/**
 * Generate a random display name consisting of an adjective+animal
 * @returns {String} Display name
 */
service.generateCasualDisplayName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  return `${capitalizeFirstLetter(adjective)}${capitalizeFirstLetter(animal)}`
}

module.exports = service
