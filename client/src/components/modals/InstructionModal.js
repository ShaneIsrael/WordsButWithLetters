import styled from '@emotion/styled'
import { Box, Grid, Modal, ModalClose, Sheet, Typography } from '@mui/joy'
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
  border: `1px solid ${
    theme.palette.mode === 'dark' ? HIGHLIGHT_COLORS[color].borderActiveDark : HIGHLIGHT_COLORS[color].borderActiveLight
  }`,
  color: theme.palette.mode === 'dark' ? '#fff' : 'black',
  width: 34,
  height: 34,
  fontSize: 18,
  fontWeight: 'bold',
}))

function InstructionModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          display: 'flex',
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Grid container sx={{ gap: 1 }}>
          <Typography>Instructions</Typography>
          <Box sx={{ display: 'grid', p: '8px 16px', gap: 1 }}>
            <Typography sx={{ display: 'list-item' }}>
              Fill in each row with a 5 letter word. Every red square will be added to your bonus word, but watch out!
              The red squares will also be elimiated from further use.
            </Typography>
            <Typography sx={{ display: 'list-item' }}>
              The Score Modifiers section will display which letters provide a bonus when used.
            </Typography>
            <Typography sx={{ display: 'list-item' }}>
              After finishing all rows, your bonus word section will be checked to see if there are any valid words and
              a final score will be calculated.
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', p: '8px 16px', gap: 1 }}>
            <Typography>Examples:</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <LetterHolder color="standard"></LetterHolder>
              <LetterHolder color="red"></LetterHolder>
              <LetterHolder color="standard"></LetterHolder>
              <LetterHolder color="standard"></LetterHolder>
              <LetterHolder color="red"></LetterHolder>
            </Box>
            <Typography>
              The second and last letters for this word will be added to the bonus word and then disabled from being
              used for any word after.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <LetterHolder color="completed">P</LetterHolder>
              <LetterHolder color="yellow">L</LetterHolder>
              <LetterHolder color="yellow">A</LetterHolder>
              <LetterHolder color="completed">C</LetterHolder>
              <LetterHolder color="completed">E</LetterHolder>
            </Box>
            <Typography>L and A in this example will apply a multiplier to the score for this word.</Typography>
          </Box>
        </Grid>
      </Sheet>
    </Modal>
  )
}

export default InstructionModal
