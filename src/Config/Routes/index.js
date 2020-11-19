import { Public, Root, App, Auth, Admin } from 'Containers/Layout'

import { ROOT_PATH, APP_ROOT, AUTH_ROOT, ADMIN_ROOT } from 'Constants/paths'

import { USER_TYPES } from 'Constants/types'
import publicRoutes from './public'
import authRoutes from './auth'
import appRoutes from './app'
import adminRoutes from './admin'

const routesForType = viewer => ({
  [USER_TYPES.superAdmins]: [
    {
      path: ADMIN_ROOT,
      component: Admin,
      routes: adminRoutes(viewer),
    },
  ],
})

const routes = viewer => {
  let viewerRoutes = []

  if (viewer.isAuthenticated) {
    viewerRoutes = routesForType(viewer)[viewer.type]
  }

  const allRoutes = [
    ...viewerRoutes,
    {
      path: AUTH_ROOT,
      component: Auth,
      routes: authRoutes(viewer),
    },
    {
      path: APP_ROOT,
      component: App,
      routes: appRoutes(viewer),
    },
    {
      path: ROOT_PATH,
      component: Public,
      routes: publicRoutes(viewer),
    },
  ]

  return [
    {
      component: Root,
      routes: allRoutes,
    },
  ]
}

export default routes
