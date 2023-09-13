import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/joy'

const PageWrapper = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={'40px 20px'} width="100%" height="100%">
      {children}
    </Box>
  )
}

PageWrapper.propTypes = {}

export default PageWrapper
