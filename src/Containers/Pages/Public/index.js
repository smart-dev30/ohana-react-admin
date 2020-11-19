import { lazy } from 'react'

const Landing = lazy(() =>
  import('./Landing' /* webpackChunkName: "public-landing" */),
)

const MobileRedirector = lazy(() =>
  import(
    './MobileRedirector' /* webpackChunkName: "public-mobile-redirector" */
  ),
)

export { Landing, MobileRedirector }
