import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import { themeGet } from 'styled-system'
import { Flex } from 'rebass'

const Container = styled(Flex)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  color: ${themeGet('colors.primary')};
`

const NotFound = props => {
  const { staticContext } = props

  if (staticContext) {
    staticContext.status = 404
  }

  return <Container>404</Container>
}

NotFound.defaultProps = {
  staticContext: null,
}

NotFound.propTypes = {
  staticContext: PropTypes.object,
}

export default NotFound
