import Api from './Api'

class CommentService {
  getComments(threadId) {
    return Api().get('/comments', { params: { threadId } })
  }
  getCommentsByUser(displayName) {
    return Api().get('/comments/user', { params: { displayName } })
  }
  submit(threadId, parentId, comment) {
    return Api().post('/comment', { threadId, parentId, comment })
  }
  delete(id) {
    return Api().delete('/comment', { params: { id } })
  }
}

const service = new CommentService()

export default service
