import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/joy'

const useScaleFactor = () => {
  const { innerWidth: width, innerHeight: height } = window
  const sw = (width) => (625 / width) * width
  return {
    sw,
  }
}

useScaleFactor.defaultProps = {}
useScaleFactor.propTypes = {}

export default useScaleFactor
