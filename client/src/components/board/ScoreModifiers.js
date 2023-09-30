import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'

const COLORS = {
  active: {
    backgroundDark: '#5C4300',
    backgroundLight: 'gold',
    borderDark: '#FFC934',
    borderLight: '#FFC934',
    fontColorLight: 'black',
    fontColorDark: '#ffffff',
  },
  inactive: {
    backgroundDark: '#251F0E',
    backgroundLight: '#896500',
    borderDark: '#7A5D0B',
    borderLight: '#C7960F',
    fontColorLight: '#1F1F1F',
    fontColorDark: '#6968686E',
  },
}

const LetterHolder = styled(Sheet)(({ theme, color }) => ({
  ...theme.typography['body-sm'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  border: `2px solid ${theme.palette.mode === 'dark' ? COLORS[color].borderDark : COLORS[color].borderLight}`,
  background: theme.palette.mode === 'dark' ? COLORS[color].backgroundDark : COLORS[color].backgroundLight,
  color: theme.palette.mode === 'dark' ? COLORS[color].fontColorDark : COLORS[color].fontColorLight,
  width: 30,
  height: 30,
  fontSize: '1.25em',
  fontWeight: 'bold',
}))

const ScoreModifiers = ({ modifiers, disabledKeys, hide }) => {
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
                <LetterHolder key={`modifier_${letter}`} color={disabledKeys.includes(letter) ? 'inactive' : 'active'}>
                  {letter}
                </LetterHolder>
              ))}
            </Grid>
          </Grid>
          <Grid xs>
            <Typography level="h2" fontSize={26} fontWeight={900} textAlign="center">
              x4
            </Typography>
            <Grid container xs justifyContent="center" gap={0.5}>
              {modifiers[1].map((letter) => (
                <LetterHolder key={`modifier_${letter}`} color={disabledKeys.includes(letter) ? 'inactive' : 'active'}>
                  {letter}
                </LetterHolder>
              ))}
            </Grid>
          </Grid>

          <Grid xs>
            <Typography level="h2" fontSize={26} fontWeight={900} textAlign="center">
              x8
            </Typography>
            <Grid container xs justifyContent="center" gap={0.5}>
              {modifiers[2].map((letter) => (
                <LetterHolder key={`modifier_${letter}`} color={disabledKeys.includes(letter) ? 'inactive' : 'active'}>
                  {letter}
                </LetterHolder>
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
