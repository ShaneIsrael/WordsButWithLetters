const { Feedback } = require('../database/models')
const service = {}

/**
 * Retrieve all feedback
 */
service.getAllFeedback = async () => {
  const feedback = await Feedback.findAll({
    order: [['createdAt', 'DESC']],
    where: {
      dismissed: false,
    },
  })
  return feedback
}

/**
 * Dismiss specific feedback message
 * @param {String} id
 */
service.dismissFeedbackMessage = async (id) => {
  const feedback = await Feedback.update(
    {
      dismissed: true,
    },
    { where: { id: id } },
  )
  return feedback
}

/**
 * Submits feedback from user
 * @param {String} message
 */
service.submitUserFeedback = async (message) => {
  const accepted = await Feedback.create({
    body: message,
    dismissed: false,
  })
  return accepted
}

module.exports = service
