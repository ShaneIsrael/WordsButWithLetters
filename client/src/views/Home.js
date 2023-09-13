import React from 'react'
import { Alert, Sheet, Button } from '@mui/joy'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import AuthService from '../services/AuthService'
import CommentService from '../services/CommentService'
import { useNavigate } from 'react-router-dom'
import CommentBox from '../components/comments/CommentBox'
import CommentThread from '../components/comments/CommentThread'
import _ from 'lodash'
import { convertFlatCommentsToNested, getSessionUser } from '../common/utils'
import CommentCard from '../components/comments/CommentCard'
import PageWrapper from '../components/wrappers/PageWrapper'

const THREAD_ID = '2a58f241-85d0-45e3-b908-abc343b5d213'

const Home = (props) => {
  const navigate = useNavigate()
  const [comments, setComments] = React.useState([])
  const [nestedComments, setNestedComments] = React.useState([])

  const handleLogout = async () => {
    try {
      await AuthService.logout()
      navigate('login')
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchComments() {
    try {
      const commentData = (await CommentService.getComments(THREAD_ID)).data
      setComments(commentData)
      setNestedComments(convertFlatCommentsToNested(commentData))
    } catch (err) {
      console.error(err)
    }
  }

  const handleCommentSubmission = (newComment) => {
    setNestedComments((prev) => ({ [newComment.id]: { ...newComment, User: newComment.User }, ...prev }))
  }

  React.useEffect(() => {
    fetchComments()
  }, [])

  const commentThreads = Object.keys(nestedComments).map((nck, index) => (
    <CommentCard key={nck} comment={nestedComments[nck]} level={0} />
  ))

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
        <CommentBox threadId={THREAD_ID} onSubmit={handleCommentSubmission} />
        {commentThreads}
      </Sheet>
      <Sheet
        sx={{
          width: 400,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Button color="danger" variant="solid" size="md" sx={{ mt: 1 }} onClick={handleLogout}>
          Logout
        </Button>
      </Sheet>
    </PageWrapper>
  )
}

Home.propTypes = {}

export default Home
