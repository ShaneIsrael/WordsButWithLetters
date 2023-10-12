import Api from './Api'

class FeedbackService {
  getAllFeedback() {
    return Api().get('/feedback')
  }
  submitFeedback(message) {
    return Api().post('/feedback', { message })
  }
  dismissFeedback(id) {
    return Api().put('/feedback', { id })
  }
}

const service = new FeedbackService()

export default service
