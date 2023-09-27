const { submit, deleteComment, getComments, getCommentsByUser } = require('../controllers/CommentController')
const { authorize } = require('../middleware/authorize')

module.exports = (app) => {
  app.delete('/api/comment', authorize, deleteComment)
  app.post('/api/comment', authorize, submit)
  app.get('/api/comments', authorize, getComments)
  app.get('/api/comments/user', getCommentsByUser)
}
