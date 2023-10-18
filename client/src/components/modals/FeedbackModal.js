import { Button, IconButton, Modal, Sheet, Textarea, Typography, useTheme } from '@mui/joy'
import React from 'react'

import FeedbackService from '../../services/FeedbackService'

import ClearIcon from '@mui/icons-material/Clear'
import { toast } from 'sonner'

function FeedbackModal({ open, onClose }) {
  const theme = useTheme()
  const [message, setMessage] = React.useState('')

  const onSubmit = async () => {
    try {
      await FeedbackService.submitFeedback(message)
      toast.success('Feedback submitted. Thank you!')
      setMessage('')
      onClose()
    } catch (err) {
      toast.error('Error submitting feedback')
      console.error(err)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => onClose()}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(3px)',
      }}
      hideBackdrop
    >
      <Sheet
        variant="outlined"
        sx={{
          width: { xs: 350, md: 400 },
          height: { xs: 400, md: 480 },
          borderRadius: 'md',
          p: '16px 16px 40px 16px',
          boxShadow: 'lg',
        }}
      >
        <IconButton
          variant="plain"
          onClick={() => {
            setMessage('')
            onClose()
          }}
          sx={{
            height: 20,
            width: 20,
            right: 12,
            top: 10,
            position: 'absolute',
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
          }}
        >
          <ClearIcon />
        </IconButton>
        <Typography sx={{ ml: '4px', fontSize: 22, fontWeight: 1000, fontFamily: 'Bubblegum Sans', mb: 2 }}>
          Feedback
        </Typography>
        <Textarea
          placeholder="Please tell us what you think about our game."
          sx={{
            width: '100%',
            height: 'calc(100% - 81px)',
            '& .MuiTextarea-textarea': { overflow: 'auto !important' },
          }}
          slotProps={{
            textarea: {
              id: 'feedbackTextarea',
            },
          }}
          value={message}
          onChange={(e) => {
            const val = e.target.value
            if (val.length <= 500) setMessage(e.target.value)
          }}
          endDecorator={
            <Typography level="body-xs" sx={{ ml: 'auto' }}>
              {message.length}/500 character(s)
            </Typography>
          }
          autoFocus
        />
        <Button sx={{ height: 40, mt: 2, mb: 2, width: '100%' }} onClick={onSubmit}>
          Submit
        </Button>
      </Sheet>
    </Modal>
  )
}

export default FeedbackModal
