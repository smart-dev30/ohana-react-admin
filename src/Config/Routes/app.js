import { APP_PATHS } from 'Constants/paths'

import * as AppPages from 'Containers/Pages/App'

const routes = () => [
  /* App */
  {
    path: APP_PATHS.DASHBOARD,
    exact: true,
    component: AppPages.Dashboard,
  },
  {
    path: APP_PATHS.SETTINGS,
    exact: true,
    component: AppPages.Settings,
  },
]

export default routes
