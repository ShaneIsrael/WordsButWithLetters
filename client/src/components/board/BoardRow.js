import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import useSound from 'use-sound'
import popSound from '../../sounds/pop.wav'
import { Grid, Sheet, styled } from '@mui/joy'
import { sleep } from '../../common/utils'

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
    backgroundLight: '#0660EEB0',
    backgroundDark: '#014CC273',
    borderLight: '',
    borderDark: '',
    borderActiveLight: '#0034ff',
    borderActiveDark: '#00c3ff',
  },
}

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
  width: 60,
  height: 60,
  fontSize: '1.75em',
  fontWeight: 'bold',
  // fontFamily: 'Bubblegum Sans',
}))

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
  color: '#fff',
  width: 60,
  height: 60,
  fontSize: '1.75em',
  fontWeight: 'bold',
  // fontFamily: 'Bubblegum Sans',
}))

const BoardRow = ({ active, completed, letters, highlightIndexes, puzzleComplete }) => {
  const [playPop] = useSound(popSound)

  React.useEffect(() => {
    async function play() {
      for (let i = 0; i < letters.length; i += 1) {
        playPop()
        await sleep(300)
      }
    }
    completed && play()
  }, [completed])

  if (letters) {
    return (
      <Grid container gap={1}>
        {letters.map((letter, index) => {
          const highlight = highlightIndexes.filter((e) => e.index === index)[0]
          let animationDelay = 'unset'
          if (completed) animationDelay = `${300 * index}ms`
          if (puzzleComplete) animationDelay = `${100 * index}ms`

          if (highlight)
            return (
              <HighlightLetterHolder
                key={(letter ? letter : 'blank_') + index}
                className={clsx(
                  highlight.animation,
                  { [`hop${index}`]: completed && !puzzleComplete },
                  { [`puzzleComplete${index}`]: puzzleComplete },
                )}
                active={letter}
                color={highlight.color}
                sx={{ animationDelay }}
              >
                {letter}
              </HighlightLetterHolder>
            )
          if (completed)
            return (
              <HighlightLetterHolder
                key={'completed_' + letter + index}
                // className={highlight.animation}
                className={clsx({ [`hop${index}`]: !puzzleComplete }, { [`puzzleComplete${index}`]: puzzleComplete })}
                active={letter}
                color={'completed'}
                sx={{ animationDelay }}
              >
                {letter}
              </HighlightLetterHolder>
            )
          return (
            <LetterHolder
              key={(letter ? letter : 'blank_') + index}
              className={letter ? 'tilt-shake' : ''}
              active={letter}
              sx={{ animationDelay }}
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
  completed: PropTypes.bool,
  puzzleComplete: PropTypes.bool,
}

BoardRow.defaultProps = {
  highlightIndexes: [],
  completed: false,
  puzzleComplete: false,
}

export default BoardRow
