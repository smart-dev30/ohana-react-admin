import React from 'react'
import { Redirect } from 'react-router-dom'

import { ADMIN_ROOT, ADMIN_PATHS } from 'Constants/paths'

import * as AdminPages from 'Containers/Pages/Admin'

const routes = () => [
  /* Admin */
  {
    path: ADMIN_ROOT,
    exact: true,
    component: () => <Redirect to={ADMIN_PATHS.DASHBOARD} />,
  },
  {
    path: ADMIN_PATHS.DASHBOARD,
    exact: true,
    component: AdminPages.Dashboard,
  },
  {
    path: ADMIN_PATHS.USERS,
    exact: true,
    component: AdminPages.Users,
  },
  {
    path: ADMIN_PATHS.USER_DETAILS(),
    exact: true,
    component: AdminPages.User,
  },
  {
    path: ADMIN_PATHS.WAITING_ROOMS,
    exact: true,
    component: AdminPages.WaitingRooms,
  },
  {
    path: ADMIN_PATHS.WAITING_ROOM_DETAILS(),
    exact: true,
    component: AdminPages.WaitingRoom,
  },
  {
    path: ADMIN_PATHS.WAITING_ROOM_GUESTS(),
    exact: true,
    component: AdminPages.WaitingRoomGuests,
  },
  {
    path: ADMIN_PATHS.PROMOTIONS,
    exact: true,
    component: AdminPages.Promotions,
  },
  {
    path: ADMIN_PATHS.HEADQUARTER_DETAILS(),
    exact: true,
    component: AdminPages.Headquarter,
  },
  {
    path: ADMIN_PATHS.ORGANIZATION_DETAILS(),
    exact: true,
    component: AdminPages.Organization,
  },
]

export default routes
