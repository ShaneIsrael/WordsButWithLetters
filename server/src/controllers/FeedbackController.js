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

controller.submitFeedback = async (req, res, next) => {
  console.log('------------Here------------')

  const { message } = req.body
  if (!message) res.status(400).send('Cannot submit feedback with message being empty')
  try {
    const accepted = await submitUserFeedback(message)
    console.log(accepted)
    return res.status(200).send({
      accepted,
    })
  } catch (err) {
    next(err)
  }
}

module.exports = controller
