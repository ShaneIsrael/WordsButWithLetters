import React from 'react'
import { Sheet, Typography } from '@mui/joy'
import { useTheme } from '@emotion/react'

const BonusWordScore = ({ bonusWordScore }) => {
  const theme = useTheme()

  return (
    <Sheet
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1,
        minWidth: 20,
        borderRight: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
        borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#25252D' : '#D8D8DF'}`,
      }}
    >
      <Typography level="h2" fontSize={24} textAlign="center">
        {bonusWordScore ? bonusWordScore.toLocaleString('en-US') : '00'}
      </Typography>
    </Sheet>
  )
}

BonusWordScore.propTypes = {}

export default BonusWordScore
