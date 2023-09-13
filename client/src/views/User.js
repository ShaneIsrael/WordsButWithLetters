import React from 'react'
import { Sheet } from '@mui/joy'
import CommentService from '../services/CommentService'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import CommentCard from '../components/comments/CommentCard'
import PageWrapper from '../components/wrappers/PageWrapper'

const User = (props) => {
  const { id } = useParams()
  const [comments, setComments] = React.useState([])

  async function fetchComments() {
    try {
      const commentData = (await CommentService.getCommentsByUser(id)).data
      setComments(commentData)
    } catch (err) {
      console.error(err)
    }
  }

  React.useEffect(() => {
    fetchComments()
  }, [])

  const commentThreads = comments.map((c, index) => <CommentCard key={c.id} comment={c} level={0} readonly />)

  return (
    <PageWrapper>
      <Sheet
        sx={{
          width: '100%',
          maxWidth: 1200,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
        }}
        variant="outlined"
      >
        {commentThreads}
      </Sheet>
    </PageWrapper>
  )
}

User.propTypes = {}

export default User
