import { useTheme } from '@emotion/react'
import { Box, Sheet, Typography } from '@mui/joy'
import React from 'react'

function Appbar() {
  const theme = useTheme()

  return (
    <Sheet
      sx={{
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: 28, fontWeight: 1000, fontFamily: 'Bubblegum Sans' }}>
        Words But With Letters
      </Typography>
    </Sheet>
  )
}

export default Appbar
