import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import ReplyIcon from '@mui/icons-material/Reply'
import { Box, Button, ButtonGroup, Grid } from '@mui/joy'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import IconButton from '@mui/joy/IconButton'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import { getSessionUser } from '../../common/utils'
import CommentService from '../../services/CommentService'
import CommentBox from './CommentBox'

const LEVEL_COLORS = ['#1f77ff', '#65ffe9', '#0bff0b', '#ff4040', '#ff720b', '#ffff74', 'white']
const STRIPE_COLORS = ['#0952C0', '#24B8A1', '#28A928', '#A41616', '#A55013', '#A3A31F', 'gray']
const STRIPE = 'repeating-linear-gradient(45deg,c1,c1 10px,c2 10px,c2 20px)'

const CommentCard = ({ comment, level, readonly }) => {
  const [intComment, setIntComment] = React.useState(comment)
  const [reply, setReply] = React.useState(false)
  const [children, setChildren] = React.useState(comment.children)
  const [close, setClose] = React.useState(comment.deleted)
  const [hovering, setHovering] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState(false)

  const sessionUser = getSessionUser()

  const handleReplySubmit = (c) => {
    const ctemp = { ...c, User: c.User }
    if (typeof children === 'object') {
      setChildren((prev) => [ctemp, ...prev])
    } else {
      setChildren([ctemp])
    }
    setReply(false)
  }

  const handleDeleteComment = async () => {
    setConfirmDelete(false)
    try {
      const res = await CommentService.delete(comment.id)
      setIntComment(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const isSelfComment = () => intComment.User.id === sessionUser?.id

  const getDeleteButtons = () => {
    return confirmDelete ? (
      <ButtonGroup>
        <Button size="sm" variant="plain" color="neutral" onClick={() => setConfirmDelete(false)}>
          Cancel
        </Button>
        <Button size="sm" variant="plain" color="danger" onClick={handleDeleteComment}>
          Delete
        </Button>
      </ButtonGroup>
    ) : (
      <Button
        size="sm"
        variant="plain"
        color="neutral"
        onClick={() => setConfirmDelete(true)}
        startDecorator={<DeleteIcon />}
      >
        Delete
      </Button>
    )
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: level > 0 ? 0 : 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: children && !close ? 'unset' : false,
        borderRight: level > 0 ? 'unset' : false,
        pb: 0,
        pl: 0,
        pt: 0,
        pr: level === 0 ? 0.25 : 0,
        boxShadow: 'unset',
      }}
      // onMouseEnter={(e) => {
      //   e.stopPropagation()
      //   setHovering(true)
      // }}
      // onMouseLeave={(e) => {
      //   e.stopPropagation()
      //   setHovering(false)
      // }}
    >
      <Grid container>
        <Grid bgcolor={'text.secondary'}>
          <Box
            variant="solid"
            onClick={() => setClose((prev) => !prev)}
            sx={{
              width: 8,
              height: '100%',
              borderRadius: 0,
              borderTopLeftRadius: 0,
              padding: 'unset',
              // background: hovering ? '#1f77ff' : '#6d6d6d',
              cursor: 'pointer',
              background: hovering
                ? STRIPE.replace(/c1/g, LEVEL_COLORS[level % LEVEL_COLORS.length]).replace(
                    /c2/g,
                    STRIPE_COLORS[level % LEVEL_COLORS.length],
                  )
                : LEVEL_COLORS[level % LEVEL_COLORS.length],
            }}
          />
        </Grid>
        <Grid xs sx={{ pl: 1.5 }}>
          <CardOverflow variant="plain">
            <CardContent orientation="horizontal" sx={{ height: 30, pt: 0.5, ml: children ? -0.5 : 0 }}>
              {children && (
                <IconButton
                  variant="text"
                  size="small"
                  sx={{
                    p: 0,
                    mt: 1,
                    mr: -0.5,
                  }}
                  onClick={() => setClose((prev) => !prev)}
                >
                  {close ? <OpenInFullIcon sx={{ height: 15 }} /> : <CloseFullscreenIcon sx={{ height: 15 }} />}
                </IconButton>
              )}
              <Typography level="body-xs" fontSize={13} fontStyle={close ? 'italic' : 'normal'}>
                <Link href={`/#/user/${comment.User.displayName}`} underline="none">
                  {comment.User.displayName}
                </Link>
              </Typography>

              <Typography level="body-xs" fontSize={13} fontWeight="bold">
                •
              </Typography>
              <Typography
                level="body-xs"
                fontSize={13}
                sx={{ color: 'text.secondary' }}
                fontStyle={close ? 'italic' : 'normal'}
              >
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </Typography>
              {intComment.deleted && close && (
                <Typography level="body-xs" fontSize={13} sx={{ color: 'text.secondary' }} fontStyle="italic">
                  [ comment deleted ]
                </Typography>
              )}
            </CardContent>
          </CardOverflow>
          {!close && (
            <CardContent>
              {/* biome-ignore lint/correctness/noChildrenProp: <explanation> */}
              <ReactMarkdown children={intComment.body} remarkPlugins={[[remarkGfm, { singleTilde: false }]]} />
              {reply && (
                <Box pt={1} pb={1} mr={1}>
                  <CommentBox
                    parentId={comment.id}
                    threadId={comment.threadId}
                    onCancel={() => setReply(false)}
                    onSubmit={handleReplySubmit}
                  />
                </Box>
              )}
              {!reply && !intComment.deleted && (
                <Box mt={-1.5} mb={0.5} height={32} display="flex" justifyContent="flex-end">
                  {isSelfComment() && getDeleteButtons()}
                  {!readonly && (
                    <Button
                      size="sm"
                      variant="plain"
                      color="neutral"
                      onClick={() => setReply(true)}
                      startDecorator={<ReplyIcon />}
                    >
                      Reply
                    </Button>
                  )}
                </Box>
              )}
              {children?.map((child, index) => (
                <Box key={`${child.id}-${level}-${index}`} mt={0.5} ml={-0.75}>
                  <CommentCard comment={child} level={level + 1} sessionUser={sessionUser} readonly={readonly} />
                </Box>
              ))}
            </CardContent>
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  readonly: PropTypes.bool,
}
CommentCard.defaultProps = {
  readonly: false,
}

export default CommentCard
