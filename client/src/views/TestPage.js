import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '../components/wrappers/PageWrapper'
import VKeyboard from '../components/keyboard/VKeyboard'

// This is a test page used to place and test new components

const TestPage = (props) => {
  const [disabledKeys, setDisabledKeys] = React.useState([])

  return (
    <PageWrapper>
      <VKeyboard onKeyPressed={(key) => setDisabledKeys((prev) => [...prev, key])} disabledKeys={disabledKeys} />
    </PageWrapper>
  )
}

TestPage.propTypes = {}

export default TestPage
