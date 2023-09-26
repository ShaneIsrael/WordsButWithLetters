import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Divider, Sheet, Typography } from '@mui/joy'
import React from 'react'

const HIGHLIGHT_COLORS = {
  red: {
    backgroundLight: '#FF000057',
    backgroundDark: '#ff000026',
    borderLight: '#ff000026',
    borderDark: '#FF000057',
    borderActiveLight: 'red',
    borderActiveDark: 'red',
  },
  green: {},
  yellow: {
    backgroundLight: '#FFBA17A3',
    backgroundDark: '#EACB4F59',
    borderLight: '',
    borderDark: '',
    borderActiveLight: 'yellow',
    borderActiveDark: 'yellow',
  },
  completed: {
    // backgroundLight: '#13FF2B88',
    // backgroundDark: '#13FF2B38',
    // borderLight: '',
    // borderDark: '',
    // borderActiveLight: 'green',
    // borderActiveDark: 'green',
    backgroundLight: '#0660EEB0',
    backgroundDark: '#014CC273',
    borderLight: '',
    borderDark: '',
    borderActiveLight: '#0034ff',
    borderActiveDark: '#00c3ff',
  },
}

const LetterHolder = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  border: `2px solid ${theme.palette.mode === 'dark' ? '#616161' : '#B6B6B6'}`,
  // borderColor: highlightborder || false,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 46,
  height: 46,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

const HighlightLetterHolder = styled(Sheet)(({ theme, color }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].backgroundDark : HIGHLIGHT_COLORS[color].backgroundLight,
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  border: `2px solid ${
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].borderActiveDark : HIGHLIGHT_COLORS[color].borderActiveLight
  }`,
  // borderColor: highlightborder || false,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 46,
  height: 46,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

function BonusWordComponent({ letters, maxLetters, bonusWordFound }) {
  const theme = useTheme()
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
        width: 534,
        height: 'auto',
        background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        // border: '1px solid ' + theme.palette.primary[600],
      }}
    >
      <Typography level="h2" sx={{ fontWeight: 'bold', fontSize: 26 }}>
        Bonus Word
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
          mt: 1,
        }}
      >
        {new Array(maxLetters).fill().map((_, index) =>
          bonusWordFound.includes(letters[index]) ? (
            <HighlightLetterHolder color="red" key={`bonus_word_letter_${letters[index] || index}`}>
              {letters[index]}
            </HighlightLetterHolder>
          ) : (
            <LetterHolder key={`bonus_word_letter_${letters[index] || index}`}>{letters[index] || ''}</LetterHolder>
          ),
        )}
      </Box>
    </Sheet>
  )
}

export default BonusWordComponent
