import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { init } from '@sentry/browser'
import { PersistGate } from 'redux-persist/integration/react'

import { SENTRY_DSN } from 'Config/app'

import App from 'Containers/App'

import { ErrorBoundary } from 'Components/Blocks'

import createStore from 'Store'

init({
  dsn: SENTRY_DSN,
})

const { store, persistor, history } = createStore({})

export default () => (
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
)
