import React from 'react'
import PropTypes from 'prop-types'
import CommentCard from './CommentCard'

const CommentThread = ({ comment }) => {
  // return comments.map((c, index) => <CommentCard key={index} comment={c} />)
  return <CommentCard comment={comment} level={0} />
}

CommentThread.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default CommentThread
