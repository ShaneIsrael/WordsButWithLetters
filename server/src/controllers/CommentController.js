const { Comment, User } = require('../database/models')
const controller = {}

controller.submit = async (req, res, next) => {
  try {
    const { threadId, parentId, comment } = req.body

    if (!threadId) return res.status(400).send('thread id is required.')
    if (!comment) return res.status(400).send('comment body is required.')

    const created = await Comment.create({
      threadId,
      parentId,
      userId: req.user.id,
      body: comment,
    })
    const c = await Comment.findOne({
      where: {
        id: created.id,
      },
      attributes: { exclude: ['userId', 'archivedBody'] },
      include: [{ model: User, attributes: ['displayName', 'id'] }],
    })
    return res.status(201).send(c)
  } catch (err) {
    next(err)
  }
}

controller.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.query
    if (!id) return res.status(400).send('id is required.')

    const comment = await Comment.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['userId', 'archivedBody'] },
      include: [{ model: User, attributes: ['id', 'displayName'] }],
    })
    if (!comment) res.status(404).send('invalid comment id')
    if (comment.User.id !== req.user.id) res.status(400).send('you are not the owner of this comment')

    comment.deleted = true
    comment.archivedBody = comment.body
    comment.body = '*[ comment deleted ]*'
    comment.save()

    return res.status(201).send(comment)
  } catch (err) {
    next(err)
  }
}

controller.getComments = async (req, res, next) => {
  try {
    const { threadId } = req.query

    if (!threadId) return res.status(400).send('thread id is required')

    const comments = await Comment.findAll({
      where: { threadId },
      attributes: { exclude: ['userId', 'archivedBody'] },
      include: [{ model: User, attributes: ['id', 'displayName'] }],
      order: [['createdAt', 'DESC']],
    })

    return res.status(200).send(comments)
  } catch (err) {
    next(err)
  }
}

controller.getCommentsByUser = async (req, res, next) => {
  try {
    const { displayName } = req.query

    if (!displayName) return res.status(400).send('user name is required')

    const comments = await Comment.findAll({
      where: { '$User.displayName$': displayName },
      attributes: { exclude: ['userId', 'archivedBody'] },
      include: [{ model: User, attributes: ['id', 'displayName'] }],
      order: [['createdAt', 'DESC']],
    })

    return res.status(200).send(comments)
  } catch (err) {
    next(err)
  }
}

module.exports = controller
