const { submit, deleteComment, getComments, getCommentsByUser } = require('../controllers/commentController')
const { authorize } = require('../middleware/authorize')

module.exports = (app) => {
  app.delete('/comment', authorize, deleteComment)
  app.post('/comment', authorize, submit)
  app.get('/comments', authorize, getComments)
  app.get('/comments/user', getCommentsByUser)
}
