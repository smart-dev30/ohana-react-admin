import React from 'react'

const Dashboard = React.lazy(() =>
  import('./Dashboard' /* webpackChunkName: "admin-dashboard" */),
)

const Users = React.lazy(() =>
  import('./Users' /* webpackChunkName: "admin-users" */),
)

const User = React.lazy(() =>
  import('./Users/User' /* webpackChunkName: "admin-user" */),
)

const WaitingRooms = React.lazy(() =>
  import('./WaitingRooms' /* webpackChunkName: "waiting-rooms" */),
)

const WaitingRoom = React.lazy(() =>
  import('./WaitingRooms/WaitingRoom' /* webpackChunkName: "waiting-room" */),
)

const WaitingRoomGuests = React.lazy(() =>
  import('./WaitingRooms/Guests' /* webpackChunkName: "waiting-room-guests" */),
)

const Promotions = React.lazy(() =>
  import('./Promotions' /* webpackChunkName: "admin-promotions" */),
)

const Headquarter = React.lazy(() =>
  import(
    './Promotions/Headquarter' /* webpackChunkName: "admin-headquarter" */
  ),
)
const Organization = React.lazy(() =>
  import(
    './Promotions/Organization' /* webpackChunkName: "admin-organization" */
  ),
)

export {
  Dashboard,
  Users,
  User,
  WaitingRooms,
  WaitingRoom,
  WaitingRoomGuests,
  Promotions,
  Headquarter,
  Organization,
}
