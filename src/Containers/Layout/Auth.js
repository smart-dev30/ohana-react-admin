import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import { Loader } from 'Components/UI'

import { AuthContainer } from './styles'

const Auth = ({ route }) => (
  <AuthContainer>
    <Suspense fallback={<Loader />}>{renderRoutes(route.routes)}</Suspense>
  </AuthContainer>
)

Auth.propTypes = {
  route: PropTypes.object.isRequired,
}

export default Auth
