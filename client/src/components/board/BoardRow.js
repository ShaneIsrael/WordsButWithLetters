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

const HighlightLetterHolder = styled(Sheet)(({ theme, active }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#ff000026' : '#FF000057',
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  border: active
    ? `2px solid ${theme.palette.mode === 'dark' ? 'red' : 'red'}`
    : `2px solid ${theme.palette.mode === 'dark' ? '#ff000026' : '#FF000057'}`,
  width: 60,
  height: 60,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

const BoardRow = ({ active, letters, highlightIndexes }) => {
  if (letters) {
    return (
      <Grid container gap={1}>
        {letters.map((letter, index) =>
          highlightIndexes.includes(index) ? (
            <HighlightLetterHolder
              key={(letter ? letter : 'blank_') + index}
              className={'skew-shake-infinite'}
              active={letter}
              highlight={highlightIndexes.includes(index) ? '#ff000026' : 0}
              highlightborder={highlightIndexes.includes(index) ? '#ff0000f2' : 0}
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
          ),
        )}
      </Grid>
    )
  }
  return (
    <Grid container gap={1}>
      {letters.map((_, index) =>
        highlightIndexes.includes(index) ? (
          <HighlightLetterHolder key={'blank_' + index} className="tilt-shake-infinite" />
        ) : (
          <LetterHolder key={'blank_' + index} />
        ),
      )}
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
