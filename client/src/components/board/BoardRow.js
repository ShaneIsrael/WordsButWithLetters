import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Sheet, styled } from '@mui/joy'

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
  width: 60,
  height: 60,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

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
  yellow: {},
}

const HighlightLetterHolder = styled(Sheet)(({ theme, active, color }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].backgroundDark : HIGHLIGHT_COLORS[color].backgroundLight,
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  border: active
    ? `2px solid ${
        theme.palette.mode === 'dark'
          ? HIGHLIGHT_COLORS[color].borderActiveDark
          : HIGHLIGHT_COLORS[color].borderActiveLight
      }`
    : `2px solid ${
        theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].borderDark : HIGHLIGHT_COLORS[color].borderLight
      }`,
  width: 60,
  height: 60,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

const BoardRow = ({ active, letters, highlightIndexes }) => {
  if (letters) {
    return (
      <Grid container gap={1}>
        {letters.map((letter, index) => {
          const highlight = highlightIndexes.filter((e) => e.index === index)[0]

          return highlight ? (
            <HighlightLetterHolder
              key={(letter ? letter : 'blank_') + index}
              className={highlight.animation}
              active={letter}
              color={highlight.color}
            >
              {letter}
            </HighlightLetterHolder>
          ) : (
            <LetterHolder
              key={(letter ? letter : 'blank_') + index}
              className={letter ? 'tilt-shake' : ''}
              active={letter}
            >
              {letter}
            </LetterHolder>
          )
        })}
      </Grid>
    )
  }
  return (
    <Grid container gap={1}>
      {letters.map((_, index) => {
        const highlight = highlightIndexes.filter((e) => e.index === index)[0]
        return highlight ? (
          <HighlightLetterHolder key={'blank_' + index} className={highlight.animation} color={highlight.color} />
        ) : (
          <LetterHolder key={'blank_' + index} />
        )
      })}
    </Grid>
  )
}

BoardRow.propTypes = {
  active: PropTypes.bool.isRequired,
  letters: PropTypes.array.isRequired,
  highlightIndexes: PropTypes.array,
}

BoardRow.defaultProps = {
  highlightIndexes: [],
}

export default BoardRow
