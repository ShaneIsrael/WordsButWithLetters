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
  background: '#5C4300',
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 30,
  height: 30,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

const ScoreModifiers = ({ modifiers }) => {
  console.log(modifiers)
  const theme = useTheme()

  return (
    <>
      <Sheet
        sx={{
          width: 366,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingTop: 1,
          borderBottom: `2px solid ${theme.palette.primary[500]}`,
        }}
      >
        <Typography level="h2" fontSize={28} fontWeight={800} textAlign="center">
          Score Modifiers
        </Typography>
      </Sheet>
      <Sheet
        variant="plain"
        sx={{
          gap: 1,
          padding: 1,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          width: 366,
          height: 100,
          background: theme.palette.mode === 'dark' ? false : theme.palette.neutral[100],
        }}
      >
        <Grid container height="100%">
          <Grid container xs={12}>
            <Grid xs>
              <Typography level="h2" fontSize={32} fontWeight={900} textAlign="center">
                x2
              </Typography>
            </Grid>
            <Grid xs>
              <Typography level="h2" fontSize={32} fontWeight={900} textAlign="center">
                x3
              </Typography>
            </Grid>
            <Grid xs>
              <Typography level="h2" fontSize={32} fontWeight={900} textAlign="center">
                x4
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} alignItems="stretch">
            <Grid container xs justifyContent="center" gap={0.5}>
              {modifiers[0].map((letter) => (
                <LetterHolder key={`modifier_${letter}`}>{letter}</LetterHolder>
              ))}
            </Grid>
            <Grid container xs justifyContent="center" gap={0.5}>
              {modifiers[1].map((letter) => (
                <LetterHolder key={`modifier_${letter}`}>{letter}</LetterHolder>
              ))}
            </Grid>
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

ScoreModifiers.propTypes = {}

export default ScoreModifiers
