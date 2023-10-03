import React from 'react'
import PropTypes from 'prop-types'
import { Box, Grid, Sheet, styled } from '@mui/joy'
import clsx from 'clsx'

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

const LetterHolder = styled(Sheet)(({ theme, color = 'completed' }) => ({
  ...theme.typography['body-sm'],
  backgroundColor:
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].backgroundDark : HIGHLIGHT_COLORS[color].backgroundLight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].borderDark : HIGHLIGHT_COLORS[color].borderLight
  }`,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  boxShadow: `inset 0 0 6px ${
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].borderActiveDark : HIGHLIGHT_COLORS[color].borderActiveLight
  }`,
  width: 34,
  height: 34,
  fontSize: 18,
  fontWeight: 'bold',
}))

const NoLetterHolder = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#616161' : '#B6B6B6'}`,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 34,
  height: 34,
}))

const Diagonal = styled(Box)(({ theme, leftright }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  width: '140%',
  transform: leftright ? 'translate3d(-50%, -50%, 0) rotate(45deg)' : 'translate3d(-50%, -50%, 0) rotate(-45deg)',
  borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#616161' : '#B6B6B6'}`,
}))

const MiniBoard = ({ wordMatrix, scoreModifiers }) => {
  const flatModifiers = scoreModifiers?.reduce((prev, curr) => prev.concat(curr))
  return (
    <Sheet variant="outlined" sx={{ p: 1 }}>
      <Grid container gap={0.5} width={186}>
        {wordMatrix.map((word, index) => (
          <Grid key={`${word}_row_${index}`} container height={`calc(100%/6)`} gap={0.5}>
            {word.map((letter, index) => (
              <Grid xs key={`${letter}_${index}`}>
                {letter && (
                  <LetterHolder color={flatModifiers?.includes(letter) ? 'yellow' : 'completed'}>{letter}</LetterHolder>
                )}
                {!letter && (
                  <NoLetterHolder>
                    <Diagonal />
                    <Diagonal leftright="true" />
                  </NoLetterHolder>
                )}
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </Sheet>
  )
}

MiniBoard.propTypes = {}

export default MiniBoard
