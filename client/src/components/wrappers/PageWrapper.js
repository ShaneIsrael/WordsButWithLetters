import React from 'react'
import { Box } from '@mui/joy'

const PageWrapper = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={'40px 20px'}
      width="100%"
      height="calc(100vh - 50px)"
      sx={{
        '@media (max-width:1000px) (max-height:1000px)': { scale: '0.9' },
        '@media (max-width:800px), (max-height:900px)': { scale: '0.8' },
        '@media (max-width:600px), (max-height:800px)': { scale: '0.7' },
        '@media (max-width:400px), (max-height:700px)': { scale: '0.6' },
        '@media (max-width:300px), (max-height:600px)': { scale: '0.5' },
        '@media (min-height:500px)': { mt: '-40px' },
      }}
    >
      <Box sx={{ height: 'auto' }}>{children}</Box>
    </Box>
  )
}

PageWrapper.propTypes = {}

export default PageWrapper
