const { dismissFeedback, getAllFeedback, submitFeedback } = require('../controllers/FeedbackController')
const { authorize, verifyAdmin } = require('../middleware/authorize')

module.exports = (app) => {
  app.get('/api/feedback', authorize, verifyAdmin, getAllFeedback)
  app.put('/api/feedback', authorize, verifyAdmin, dismissFeedback)
  app.post('/api/feedback', submitFeedback)
}
