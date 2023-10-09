const { dismissFeedback, getAllFeedback, submitFeedback } = require('../controllers/FeedbackController')
const { authorize } = require('../middleware/authorize')

module.exports = (app) => {
  app.get('/api/feedback', authorize, getAllFeedback)
  app.put('/api/feedback', authorize, dismissFeedback)
  app.post('/api/feedback', submitFeedback)
}
