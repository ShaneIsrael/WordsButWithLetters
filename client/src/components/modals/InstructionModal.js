import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Box, Checkbox, Grid, Modal, ModalClose, Sheet, Typography } from '@mui/joy'
import clsx from 'clsx'
import React from 'react'

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

const LetterHolder = styled(Sheet)(({ theme, color = 'red' }) => ({
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
  width: 34,
  height: 34,
  fontSize: 18,
  fontWeight: 'bold',
}))

function InstructionModal({ open, onClose }) {
  const theme = useTheme()
  const [animate, setAnimate] = React.useState(false)
  const [instructionsDisabled, setInstructionsDisabled] = React.useState(false)

  return (
    <Modal
      open={open}
      onClose={() => onClose(instructionsDisabled)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          display: 'flex',
        }}
        onMouseEnter={() => setAnimate(true)}
        onMouseLeave={() => setAnimate(false)}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Grid container sx={{ gap: 1 }}>
          <Typography level="h1">How to Play</Typography>
          <Typography
            width="100%"
            fontSize={18}
            fontWeight={700}
            lineHeight={'14px'}
            sx={{ borderBottom: `3px solid ${theme.palette.neutral[600]}`, pb: 2 }}
          >
            Build score by creating 5 letter words.
          </Typography>
          <Box sx={{ display: 'grid', p: '8px 16px', gap: 1 }}>
            <Typography sx={{ display: 'list-item' }}>
              Multiply your word score by using{' '}
              <Typography fontWeight={900} sx={{ color: 'yellow' }}>
                golden letters
              </Typography>
              .
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 1 }}>
              <LetterHolder color="standard">S</LetterHolder>
              <LetterHolder color="yellow-highlight">C</LetterHolder>
              <LetterHolder color="standard">O</LetterHolder>
              <LetterHolder color="yellow-highlight">R</LetterHolder>
              <LetterHolder color="standard">E</LetterHolder>
            </Box>
            <Typography sx={{ display: 'list-item' }}>
              Letters placed within{' '}
              <Typography fontWeight={900} sx={{ color: 'red' }}>
                red tiles
              </Typography>{' '}
              are moved to the bonus word section and will become unusable.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 1 }}>
              <LetterHolder color="standard">M</LetterHolder>
              <LetterHolder color="red">O</LetterHolder>
              <LetterHolder color="standard">N</LetterHolder>
              <LetterHolder color="standard">E</LetterHolder>
              <LetterHolder color="red">Y</LetterHolder>
            </Box>
            <Typography sx={{ display: 'list-item' }}>If your word is valid, the tiles will change.</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 1 }}>
              <LetterHolder color="completed" className={clsx({ hop0: animate })}>
                P
              </LetterHolder>
              <LetterHolder
                color="yellow"
                className={clsx({ hop1: animate })}
                sx={{
                  animationDelay: '300ms',
                }}
              >
                L
              </LetterHolder>
              <LetterHolder
                color="yellow"
                className={clsx({ hop2: animate })}
                sx={{
                  animationDelay: '600ms',
                }}
              >
                A
              </LetterHolder>
              <LetterHolder
                color="completed"
                className={clsx({ hop3: animate })}
                sx={{
                  animationDelay: '900ms',
                }}
              >
                C
              </LetterHolder>
              <LetterHolder
                color="completed"
                className={clsx({ hop4: animate })}
                sx={{
                  animationDelay: '1200ms',
                }}
              >
                E
              </LetterHolder>
            </Box>
            <Typography sx={{ display: 'list-item' }}>
              Once your puzzle is complete, the bonus word section might look something like this.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <LetterHolder color="standard">U</LetterHolder>
              <LetterHolder color="standard">X</LetterHolder>
              <LetterHolder color="standard">R</LetterHolder>
              <LetterHolder color="standard">H</LetterHolder>
              <LetterHolder color="standard">Y</LetterHolder>
              <LetterHolder color="standard">M</LetterHolder>
              <LetterHolder color="standard">E</LetterHolder>
              <LetterHolder color="standard">P</LetterHolder>
            </Box>
            <Typography sx={{ display: 'list-item' }}>
              You would be awarded{' '}
              <Typography fontWeight={900} sx={{ color: 'red' }}>
                Rhyme
              </Typography>{' '}
              as your bonus word.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <LetterHolder color="standard">U</LetterHolder>
              <LetterHolder color="standard">X</LetterHolder>
              <LetterHolder color="red">R</LetterHolder>
              <LetterHolder color="red">H</LetterHolder>
              <LetterHolder color="red">Y</LetterHolder>
              <LetterHolder color="red">M</LetterHolder>
              <LetterHolder color="red">E</LetterHolder>
              <LetterHolder color="standard">P</LetterHolder>
            </Box>
          </Box>
          <Box display="flex" width="100%" justifyContent="center" mt={1}>
            <Checkbox
              color="primary"
              size="md"
              label="Don't show again"
              onChange={(e) => setInstructionsDisabled(e.target.checked)}
            />
          </Box>
        </Grid>
      </Sheet>
    </Modal>
  )
}

export default InstructionModal
