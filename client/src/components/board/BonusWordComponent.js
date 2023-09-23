import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Divider, Sheet, Typography } from '@mui/joy'
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
  width: 38,
  height: 38,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

function BonusWordComponent({ letters, maxLetters }) {
  const theme = useTheme()
  console.log(letters)
  return (
    <Sheet
      variant="plain"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.25,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 2,
        paddingTop: 1,
        borderRadius: 8,
        width: 366,
        height: 'auto',
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        // border: '1px solid ' + theme.palette.primary[600],
      }}
    >
      <Typography level="h2" sx={{ fontWeight: 'bold', fontSize: 32 }}>
        Bonus Word
      </Typography>
      {/* <Divider sx={{ background: theme.palette.primary[600] }} /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
        }}
      >
        {new Array(maxLetters).fill().map((_, index) => (
          <LetterHolder key={`bonus_word_letter_${letters[index] || index}`}>{letters[index] || ''}</LetterHolder>
        ))}

        {/* {letters.length > 0 ? (
          letters.map((letter) => <LetterHolder key={`removed-letter-${letter}`}>{letter}</LetterHolder>)
        ) : (
          <LetterHolder key={`placeholder`} />
        )} */}
      </Box>
    </Sheet>
  )
}

export default BonusWordComponent
