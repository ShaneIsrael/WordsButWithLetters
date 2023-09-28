import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

const LetterHolder = styled(Sheet)(({ theme }) => ({
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  // border: active
  //   ? `3px solid ${theme.palette.mode === 'dark' ? '#fff' : 'black'}`
  //   : `3px solid ${theme.palette.mode === 'dark' ? '#616161' : '#B6B6B6'}`,
  // borderColor: highlightborder || false,
  border: `2px solid #FFC934`,
  background: theme.palette.mode === 'dark' ? '#5C4300' : 'gold',
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 30,
  height: 30,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

const ScoreModifiers = ({ modifiers, hide }) => {
  const theme = useTheme()

  return (
    <>
      <Sheet
        sx={{
          width: 140,
          paddingTop: 1,
          background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography level="h2" fontSize={24} fontWeight={800} textAlign="center" width={135}>
          Score Modifiers
        </Typography>
      </Sheet>

      <Sheet
        variant="plain"
        sx={{
          padding: '14px 8px 8px 8px',
          width: 140,
          height: 262,
          background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        }}
      >
        <Grid container height="100%" direction="column">
          <Grid xs>
            <Typography level="h2" fontSize={26} fontWeight={900} textAlign="center">
              x2
            </Typography>
            <Grid container xs justifyContent="center" gap={0.5}>
              {modifiers[0].map((letter) => (
                <LetterHolder key={`modifier_${letter}`}>{letter}</LetterHolder>
              ))}
            </Grid>
          </Grid>
          <Grid xs>
            <Typography level="h2" fontSize={26} fontWeight={900} textAlign="center">
              x4
            </Typography>
            <Grid container xs justifyContent="center" gap={0.5}>
              {modifiers[1].map((letter) => (
                <LetterHolder key={`modifier_${letter}`}>{letter}</LetterHolder>
              ))}
            </Grid>
          </Grid>

          <Grid xs>
            <Typography level="h2" fontSize={26} fontWeight={900} textAlign="center">
              x8
            </Typography>
            <Grid container xs justifyContent="center" gap={0.5}>
              {modifiers[2].map((letter) => (
                <LetterHolder key={`modifier_${letter}`}>{letter}</LetterHolder>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Sheet>
    </>
  )
}

ScoreModifiers.propTypes = {
  modifiers: PropTypes.array,
}
ScoreModifiers.defaultProps = {
  modifiers: [[], [], []],
}

export default ScoreModifiers
