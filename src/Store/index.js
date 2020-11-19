import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable'

import { createBrowserHistory } from 'history'

import createRootReducer from 'Store/Reducers'
import rootSaga from 'Store/Sagas'

import { IS_PRODUCTION } from 'Config/app'

const transformerConfig = {
  whitelistPerReducer: {},
}

const persistConfig = {
  key: 'bam',
  storage,
  whitelist: ['persist'],

  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)],
}

export default () => {
  const history = createBrowserHistory()

  const middleware = [thunkMiddleware, routerMiddleware(history)]

  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)
  // middleware.push(accessExpireMiddleware)

  let enhancer = null

  // eslint-disable-next-line no-underscore-dangle
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (!IS_PRODUCTION) {
    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension ? devToolsExtension() : a => a,
    )
  } else if (devToolsExtension && window.location.hash === '#magic.exe') {
    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension ? devToolsExtension() : a => a,
    )
  } else {
    enhancer = applyMiddleware(...middleware)
  }

  const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer(history),
  )

  const store = createStore(persistedReducer, enhancer)

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('./Reducers', () =>
      store.replaceReducer(createRootReducer(history)),
    )
  }

  return { store, persistor, history }
}
