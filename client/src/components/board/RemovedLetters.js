import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Sheet, Typography } from '@mui/joy'
import React from 'react'

const LetterHolder = styled(Sheet)(({ theme, active, highlight, highlightborder }) => ({
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  border: active
    ? `2px solid ${theme.palette.mode === 'dark' ? '#fff' : 'black'}`
    : `2px solid ${theme.palette.mode === 'dark' ? '#616161' : '#B6B6B6'}`,
  borderColor: highlightborder || false,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 40,
  height: 40,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

function RemovedLettersComponent({ letters }) {
  const theme = useTheme()

  return (
    <Sheet
      variant="plain"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        padding: 1,
        borderRadius: 8,
        width: 534,
        height: 120,
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
      }}
    >
      <Typography>Removed Letters</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        {letters.map((letter) => (
          <LetterHolder key={`removed-letter-${letter}`}>{letter}</LetterHolder>
        ))}
      </Box>
    </Sheet>
  )
}

export default RemovedLettersComponent
