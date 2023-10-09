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
      const resp = await FeedbackService.submitFeedback(message)
      console.log(resp)
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
        // '@media (max-width:1400px) (max-height:1400px)': { scale: '1' },
        // '@media (max-width:1200px), (max-height:1200px)': { scale: '0.9' },
        // '@media (max-width:700px), (max-height:800px)': { scale: '0.8' },
        // '@media (max-width:600px), (max-height:700px)': { scale: '0.7' },
        // '@media (min-height:500px)': { mt: '-40px' },
        backdropFilter: 'blur(3px)',
      }}
      hideBackdrop
    >
      <Sheet
        variant="outlined"
        sx={{
          width: 400,
          height: 480,
          borderRadius: 'md',
          p: '16px 16px 40px 16px',
          boxShadow: 'lg',
        }}
      >
        <IconButton
          variant="plain"
          onClick={() => onClose()}
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
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <Button sx={{ height: 40, mt: 2, mb: 2, width: '100%' }} onClick={onSubmit}>
          Submit
        </Button>
      </Sheet>
    </Modal>
  )
}

export default FeedbackModal
