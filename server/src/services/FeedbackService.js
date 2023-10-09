const { Feedback } = require('../database/models')
const service = {}

/**
 * Retrieve all feedback
 */
service.getAllFeedback = async () => {
  const feedback = await Feedback.findAll({
    order: [['createdAt', 'DESC']],
  })
  return feedback
}

/**
 * Submits feedback from user
 * @param {String} message
 */
service.submitUserFeedback = async (message) => {
  const accepted = await Feedback.create({
    body: message,
  })
  return accepted
}

module.exports = service
