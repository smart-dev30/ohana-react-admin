import { createReducer } from 'Store/utils'

import { APP_READY } from 'Store/Actions/app'
import { AUTHENTICATE } from 'Store/Actions/auth'

const initialState = {
  ready: false,
}

const setAppReady = state =>
  state.merge({
    ready: true,
  })

const startRefetch = state =>
  state.merge({
    ready: false,
  })

const handlers = {
  [APP_READY]: setAppReady,
  [AUTHENTICATE.SUCCESS]: startRefetch,
}

export default createReducer(initialState, handlers)
