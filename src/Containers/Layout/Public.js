import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import { Loader } from 'Components/UI'

import { PublicContainer } from './styles'

const Public = ({ route }) => (
  <PublicContainer>
    <Suspense fallback={<Loader />}>{renderRoutes(route.routes)}</Suspense>
  </PublicContainer>
)

Public.propTypes = {
  route: PropTypes.object.isRequired,
}

export default Public
