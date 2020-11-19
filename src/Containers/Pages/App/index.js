import React from 'react'

const Dashboard = React.lazy(() =>
  import('./Dashboard' /* webpackChunkName: "app-dashboard" */),
)

const Settings = React.lazy(() =>
  import('./Settings' /* webpackChunkName: "app-settings" */),
)

export { Dashboard, Settings }
