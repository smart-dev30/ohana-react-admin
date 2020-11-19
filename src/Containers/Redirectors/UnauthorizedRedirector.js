import React from 'react'
import { Redirect } from 'react-router'

import { ROOT_PATH } from 'Constants/paths'

const UnauthorizedRedirector = () => <Redirect to={ROOT_PATH} />

export default UnauthorizedRedirector
