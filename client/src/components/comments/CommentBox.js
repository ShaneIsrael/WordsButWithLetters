import SendIcon from '@mui/icons-material/Send'
import { ButtonGroup, Sheet } from '@mui/joy'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import Textarea from '@mui/joy/Textarea'
import PropTypes from 'prop-types'
import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'
import CommentService from '../../services/CommentService'

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null
}

const CommentBox = ({ threadId, parentId, onSubmit, onCancel }) => {
  const [comment, setComment] = React.useState('')
  const [preview, setPreview] = React.useState(false)

  const handleSubmit = () => {
    if (!isEmptyOrSpaces(comment)) {
      CommentService.submit(threadId, parentId, comment).then((comment) => {
        setComment('')
        onSubmit(comment.data)
      })
    }
  }

  return (
    <FormControl>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write comment here…"
        minRows={4}
        variant="soft"
        autoFocus
        startDecorator={
          <Box
            sx={{
              display: 'flex',
              pb: 1,
              flex: 'auto',
            }}
          >
            <Box>
              <Button
                onClick={() => setPreview(!preview)}
                color="neutral"
                variant="outlined"
                size="sm"
                aria-pressed={preview ? 'true' : 'false'}
                sx={(theme) => ({
                  '&[aria-pressed="true"]': {
                    ...theme.variants.outlinedActive.primary,
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                  },
                })}
              >
                Preview
              </Button>
            </Box>
          </Box>
        }
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              pt: 1,
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            {!!onCancel && (
              <ButtonGroup variant="soft" size="sm" sx={{ ml: 'auto' }}>
                <Button onClick={handleSubmit} startDecorator={<SendIcon />}>
                  Submit
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
              </ButtonGroup>
            )}
            {!onCancel && (
              <Button
                size="sm"
                variant="outlined"
                sx={{ ml: 'auto' }}
                onClick={handleSubmit}
                startDecorator={<SendIcon />}
              >
                Submit
              </Button>
            )}
          </Box>
        }
        sx={{
          minWidth: 300,
        }}
      />
      {preview && comment && (
        <Sheet variant="outlined" sx={{ mt: 1, p: 1, borderRadius: 'sm' }}>
          <ReactMarkdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>{comment}</ReactMarkdown>
        </Sheet>
      )}
    </FormControl>
  )
}

CommentBox.propTypes = {
  threadId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}
CommentBox.defaultProps = {
  onSubmit: () => {},
  onCancel: null,
  parentId: null,
}

export default CommentBox
