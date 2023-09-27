import React from 'react'
import PropTypes from 'prop-types'
import { Sheet, Typography } from '@mui/joy'

const BonusWordScore = ({ bonusWordScore }) => {
  return (
    <Sheet sx={{ display: 'flex', alignItems: 'center', pt: 1, pb: 1, pl: 1 }}>
      <Typography level="h2" fontSize={24} textAlign="center">
        {bonusWordScore ? bonusWordScore.toLocaleString('en-US') : 0}
      </Typography>
    </Sheet>
  )
}

BonusWordScore.propTypes = {}

export default BonusWordScore
