import { lazy } from 'react'

const SignIn = lazy(() =>
  import('./SignIn' /* webpackChunkName: "auth-sign-in" */),
)

export default SignIn
