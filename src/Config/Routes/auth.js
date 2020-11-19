import { AUTH_PATHS } from 'Constants/paths'

import { NotFound } from 'Containers/Layout'

import SignIn from 'Containers/Pages/Auth'

import { redirectAuthorized } from 'Services/Utils'

const routes = viewer => [
  /* Auth */
  {
    path: AUTH_PATHS.SIGN_IN,
    exact: true,
    component: redirectAuthorized(viewer)(SignIn),
  },
  { component: NotFound },
]

export default routes
