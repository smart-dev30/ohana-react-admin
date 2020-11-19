import { NotFound } from 'Containers/Layout'

import { ROOT_PATH, PUBLIC_PATHS } from 'Constants/paths'

import * as PublicPages from 'Containers/Pages/Public'

const routes = () => [
  /* Public */
  {
    path: ROOT_PATH,
    exact: true,
    component: PublicPages.Landing,
  },
  {
    path: PUBLIC_PATHS.MOBILE_CONFIRM_EMAIL,
    exact: true,
    component: PublicPages.MobileRedirector,
  },
  {
    path: PUBLIC_PATHS.MOBILE_CHANGE_PASSWORD,
    exact: true,
    component: PublicPages.MobileRedirector,
  },
  {
    path: PUBLIC_PATHS.MOBILE_CHANGE_EMAIL,
    exact: true,
    component: PublicPages.MobileRedirector,
  },
  {
    path: PUBLIC_PATHS.MOBILE_INVITATION,
    exact: true,
    component: PublicPages.MobileRedirector,
  },
  { component: NotFound },
]

export default routes
