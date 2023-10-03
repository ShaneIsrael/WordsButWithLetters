import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Sheet, styled } from '@mui/joy'
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
    borderLight: 'yellow',
    borderDark: 'yellow',
    borderActiveLight: 'yellow',
    borderActiveDark: 'yellow',
  },
  completed: {
    backgroundLight: '#0660EEB0',
    backgroundDark: '#014CC273',
    borderLight: '#0034ff',
    borderDark: '#00c3ff',
    borderActiveLight: '#0034ff',
    borderActiveDark: '#00c3ff',
  },
}

const LetterHolder = styled(Sheet)(({ theme, color = 'red' }) => ({
  ...theme.typography['body-sm'],
  backgroundColor:
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].backgroundDark : HIGHLIGHT_COLORS[color].backgroundLight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].borderActiveDark : HIGHLIGHT_COLORS[color].borderActiveLight
  }`,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 34,
  height: 34,
  fontSize: 18,
  fontWeight: 'bold',
}))

const Diagonal = styled(Box)(({ theme, leftright }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '140%',
  transform: leftright ? 'translate3d(-50%, -50%, 0) rotate(45deg)' : 'translate3d(-50%, -50%, 0) rotate(-45deg)',
  borderTop: `1px solid ${
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS['red'].borderDark : HIGHLIGHT_COLORS['red'].borderLight
  }`,
}))

const BonusWord = ({ bonusWord, scoreModifiers }) => {
  const flatModifiers = scoreModifiers?.reduce((prev, curr) => prev.concat(curr))
  if (!bonusWord) {
    return (
      <Sheet variant="outlined" sx={{ p: 1 }}>
        <Grid container gap={0.5}>
          <LetterHolder>
            <Diagonal />
            <Diagonal leftright="true" />
          </LetterHolder>
          <LetterHolder>
            <Diagonal />
            <Diagonal leftright="true" />
          </LetterHolder>
          <LetterHolder>
            <Diagonal />
            <Diagonal leftright="true" />
          </LetterHolder>
          <LetterHolder>
            <Diagonal />
            <Diagonal leftright="true" />
          </LetterHolder>
          <LetterHolder>
            <Diagonal />
            <Diagonal leftright="true" />
          </LetterHolder>
        </Grid>
      </Sheet>
    )
  }
  return (
    <Sheet variant="outlined" sx={{ p: 1 }}>
      <Grid container gap={0.5}>
        {bonusWord.split('').map((letter, index) => (
          <LetterHolder key={`${letter}_${index}`} color={flatModifiers?.includes(letter) ? 'yellow' : 'red'}>
            {letter}
          </LetterHolder>
        ))}
      </Grid>
    </Sheet>
  )
}

BonusWord.propTypes = {}

export default BonusWord
