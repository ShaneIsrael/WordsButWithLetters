import { useTheme } from '@emotion/react'
import { Box, IconButton, Sheet, Typography } from '@mui/joy'
import React from 'react'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

function Appbar({ setModalOpen }) {
  const theme = useTheme()

  return (
    <Sheet
      sx={{
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        width: '100%',
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
      }}
    >
      <Box />
      <Typography sx={{ fontSize: 32, fontWeight: 1000, fontFamily: 'Bubblegum Sans' }}>
        Words But With Letters
      </Typography>
      <IconButton variant="outlined" sx={{ borderRadius: 24 }} onClick={() => setModalOpen(true)}>
        <QuestionMarkIcon />
      </IconButton>
    </Sheet>
  )
}

export default Appbar
