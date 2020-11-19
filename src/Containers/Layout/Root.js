import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import { RootContainer } from './styles'

const Root = ({ route }) => (
  <RootContainer>{renderRoutes(route.routes)}</RootContainer>
)

Root.propTypes = {
  route: PropTypes.object.isRequired,
}

export default Root
