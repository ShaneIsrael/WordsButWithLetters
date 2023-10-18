import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Checkbox, Grid, IconButton, Modal, Sheet, Typography } from '@mui/joy'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'

import ClearIcon from '@mui/icons-material/Clear'

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
  standard: {
    backgroundLight: 'white',
    backgroundDark: 'black',
    borderLight: '#B6B6B6',
    borderDark: '#616161',
    borderActiveLight: '#B6B6B6',
    borderActiveDark: '#616161',
  },
  yellow: {
    backgroundLight: '#FFBA17A3',
    backgroundDark: '#EACB4F59',
    borderLight: 'yellow',
    borderDark: 'yellow',
    borderActiveLight: 'yellow',
    borderActiveDark: 'yellow',
  },
  'yellow-highlight': {
    backgroundLight: '',
    backgroundDark: '',
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

const LetterHolder = styled(Sheet)(({ theme, color = 'red', sx }) => ({
  ...theme.typography['body-sm'],
  backgroundColor:
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].backgroundDark : HIGHLIGHT_COLORS[color].backgroundLight,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `2px solid ${
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].borderActiveDark : HIGHLIGHT_COLORS[color].borderActiveLight
  }`,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  fontWeight: 'bold',
  ...sx,
}))

function InstructionModal({ open, onClose }) {
  const theme = useTheme()
  const [animate, setAnimate] = React.useState(false)
  const [instructionsDisabled, setInstructionsDisabled] = React.useState(false)

  useEffect(() => {
    const disabled = Cookies.get('instructionsDisabled')
    if (disabled && disabled === 'true') setInstructionsDisabled(true)
  }, [])

  const lhsx = {
    width: { xs: 28, md: 34 },
    height: { xs: 28, md: 34 },
    fontSize: { xs: 16, md: 18 },
  }
  return (
    <Modal
      open={open}
      onClose={() => onClose(instructionsDisabled)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(3px)',
      }}
      hideBackdrop
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: { xs: 350, md: 500 },
          borderRadius: 'md',
          p: { xs: 1.5, md: 3 },
          boxShadow: 'lg',
          display: 'flex',
        }}
        onMouseEnter={() => setAnimate(true)}
        onMouseLeave={() => setAnimate(false)}
      >
        <IconButton
          variant="plain"
          onClick={() => onClose(instructionsDisabled)}
          sx={{
            height: 20,
            width: 20,
            right: 10,
            top: 10,
            position: 'absolute',
            color: theme.palette.mode === 'dark' ? 'white' : 'black',
          }}
        >
          <ClearIcon />
        </IconButton>
        <Grid container sx={{ gap: { xs: 0.5, md: 1 } }}>
          <Typography level="h1">How to Play</Typography>
          <Typography
            width="100%"
            fontSize={{ xs: 12, md: 18 }}
            fontWeight={700}
            lineHeight={{ md: '14px' }}
            sx={{ borderBottom: `3px solid ${theme.palette.neutral[600]}`, pb: { xs: 1, md: 2 }, lineHeight: '1.5' }}
          >
            Get the highest score you can by creating 5 letter words while using the score modifier letters.
          </Typography>
          <Box sx={{ display: 'grid', p: '8px 16px', gap: 1 }}>
            <Typography sx={{ display: 'list-item', fontSize: { xs: 12, md: 18 } }}>
              Multiply your word score by using{' '}
              <Typography fontWeight={900} sx={{ color: theme.palette.mode === 'dark' ? 'yellow' : 'goldenrod' }}>
                score modifiers
              </Typography>
              .
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, mt: 1, mb: 1 }}>
              <LetterHolder color="standard" sx={lhsx}>
                S
              </LetterHolder>
              <LetterHolder color="yellow" sx={lhsx}>
                C
              </LetterHolder>
              <LetterHolder color="standard" sx={lhsx}>
                O
              </LetterHolder>
              <LetterHolder color="yellow" sx={lhsx}>
                R
              </LetterHolder>
              <LetterHolder color="standard" sx={lhsx}>
                E
              </LetterHolder>
            </Box>
            <Typography sx={{ display: 'list-item', fontSize: { xs: 12, md: 18 } }}>
              Letters placed within{' '}
              <Typography fontWeight={900} sx={{ color: 'red' }}>
                red tiles
              </Typography>{' '}
              are moved to the bonus word section and will become unusable.
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, mt: 1, mb: 1 }}>
              <LetterHolder color="standard" sx={lhsx}>
                M
              </LetterHolder>
              <LetterHolder color="red" sx={lhsx}>
                O
              </LetterHolder>
              <LetterHolder color="standard" sx={lhsx}>
                N
              </LetterHolder>
              <LetterHolder color="standard" sx={lhsx}>
                E
              </LetterHolder>
              <LetterHolder color="red" sx={lhsx}>
                Y
              </LetterHolder>
            </Box>
            <Typography sx={{ display: 'list-item', fontSize: { xs: 12, md: 18 } }}>
              If your word is valid, the tiles will change.
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, mt: 1, mb: 1 }}>
              <LetterHolder color="completed" className={clsx({ hop0: animate })} sx={lhsx}>
                P
              </LetterHolder>
              <LetterHolder
                color="yellow"
                className={clsx({ hop1: animate })}
                sx={{
                  animationDelay: '300ms',
                  ...lhsx,
                }}
              >
                L
              </LetterHolder>
              <LetterHolder
                color="yellow"
                className={clsx({ hop2: animate })}
                sx={{
                  animationDelay: '600ms',
                  ...lhsx,
                }}
              >
                A
              </LetterHolder>
              <LetterHolder
                color="completed"
                className={clsx({ hop3: animate })}
                sx={{
                  animationDelay: '900ms',
                  ...lhsx,
                }}
              >
                C
              </LetterHolder>
              <LetterHolder
                color="completed"
                className={clsx({ hop4: animate })}
                sx={{
                  animationDelay: '1200ms',
                  ...lhsx,
                }}
              >
                E
              </LetterHolder>
            </Box>
            <Typography sx={{ display: 'list-item', fontSize: { xs: 12, md: 18 } }}>
              Once your puzzle is complete, the first five letter word found in the bonus section will be added to your
              score.
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, mt: 1 }}>
              <LetterHolder color="standard" sx={lhsx}>
                U
              </LetterHolder>
              <LetterHolder color="standard" sx={lhsx}>
                X
              </LetterHolder>
              <LetterHolder color="red" sx={lhsx}>
                R
              </LetterHolder>
              <LetterHolder color="red" sx={lhsx}>
                H
              </LetterHolder>
              <LetterHolder color="red" sx={lhsx}>
                Y
              </LetterHolder>
              <LetterHolder color="red" sx={lhsx}>
                M
              </LetterHolder>
              <LetterHolder color="red" sx={lhsx}>
                E
              </LetterHolder>
              <LetterHolder color="standard" sx={lhsx}>
                P
              </LetterHolder>
            </Box>
          </Box>
          <Box display="flex" width="100%" justifyContent="center" mt={{ xs: 0.5, md: 1 }}>
            <Checkbox
              color="primary"
              size="md"
              label="Don't show again"
              checked={instructionsDisabled}
              onChange={(e) => setInstructionsDisabled(e.target.checked)}
            />
          </Box>
        </Grid>
      </Sheet>
    </Modal>
  )
}

export default InstructionModal
