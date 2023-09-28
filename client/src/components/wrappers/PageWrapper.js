import React, { useRef } from 'react'
import { Box } from '@mui/joy'

const PageWrapper = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={'40px 20px'}
      width="100%"
      height="calc(100vh - 50px)"
      sx={{
        ['@media (max-width:1200px)']: { scale: '0.9' },
        ['@media (max-width:800px)']: { scale: '0.7' },
      }}
    >
      <Box sx={{ height: 'auto' }}>{children}</Box>
    </Box>
  )
}

PageWrapper.propTypes = {}

export default PageWrapper
