import { Button, IconButton, Modal, Sheet, Textarea, Typography, useTheme } from '@mui/joy'
import React from 'react'

import ClearIcon from '@mui/icons-material/Clear'

function FeedbackModal({ open, onClose }) {
  const theme = useTheme()

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
          height: 440,
          borderRadius: 'md',
          p: '16px 16px 24px 16px',
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
        <Typography sx={{ ml: '4px', fontSize: 22, fontWeight: 1000, fontFamily: 'Bubblegum Sans', mb: 1 }}>
          Feedback
        </Typography>
        <Textarea
          placeholder="Please enter your feedback here."
          sx={{
            width: '100%',
            height: 'calc(100% - 81px)',
            '& .MuiTextarea-textarea': { overflow: 'auto !important' },
          }}
        />
        <Button sx={{ height: 40, mt: 1, width: '100%' }}>Submit</Button>
      </Sheet>
    </Modal>
  )
}

export default FeedbackModal
