import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Sheet, styled } from '@mui/joy'

const LetterHolder = styled(Sheet)(({ theme, active }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#3D3D4F' : '#bdbdbd',
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  border: active
    ? `1px solid ${theme.palette.mode === 'dark' ? '#fff' : 'black'}`
    : `1px solid ${theme.palette.mode === 'dark' ? '#616161' : '#B6B6B6'}`,
  // color: theme.vars.palette.text.secondary,
  width: 60,
  height: 60,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

const BoardRow = ({ active, letters }) => {
  if (letters) {
    return (
      <Grid container gap={1}>
        {letters.map((letter, index) => (
          <LetterHolder key={(letter ? letter : 'blank_') + index} active={letter}>
            {letter}
          </LetterHolder>
        ))}
      </Grid>
    )
  }
  return (
    <Grid container gap={1}>
      <LetterHolder />
      <LetterHolder />
      <LetterHolder />
      <LetterHolder />
      <LetterHolder />
    </Grid>
  )
}

BoardRow.propTypes = {
  active: PropTypes.bool.isRequired,
  letters: PropTypes.array,
}

export default BoardRow
