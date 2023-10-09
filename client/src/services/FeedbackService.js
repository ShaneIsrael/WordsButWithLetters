import Api from './Api'

class FeedbackService {
  getAllFeedback() {
    return Api().get('/feedback')
  }
  submitFeedback(message) {
    return Api().post('/feedback', { message })
  }
}

const service = new FeedbackService()

export default service
