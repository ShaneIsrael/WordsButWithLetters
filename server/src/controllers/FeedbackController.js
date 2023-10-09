const { getAllFeedback, submitUserFeedback } = require('../services/FeedbackService')

const controller = {}

controller.getAllFeedback = async (req, res, next) => {
  try {
    const allFeedback = await getAllFeedback()
    return res.status(200).send(allFeedback)
  } catch (err) {
    next(err)
  }
}

controller.dismissFeedback = async (req, res, next) => {
  try {
    const { id } = req.body
    const dismissed = await dismissFeedbackMessage(id)
    return res.status(200).send(dismissed)
  } catch (err) {
    next(err)
  }
}

controller.submitFeedback = async (req, res, next) => {
  const { message } = req.body
  if (!message) res.status(400).send('Cannot submit feedback with message being empty')
  if (message.length > 500) res.status(400).send('Cannot submit feedback with a length of over 500 characters')
  try {
    const accepted = await submitUserFeedback(message)
    return res.status(200).send({
      accepted,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = controller
