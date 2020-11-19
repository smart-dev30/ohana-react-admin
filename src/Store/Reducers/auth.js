import { LOCATION_CHANGE } from 'connected-react-router'

import { createReducer } from 'Store/utils'

import { AUTHENTICATE, RESET_PASSWORD } from 'Store/Actions/auth'
import { LOG_OUT } from 'Store/Actions/viewer'

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: null,
}

const humanizeError = (type, error) => {
  switch (type) {
    case AUTHENTICATE.FAILURE: {
      if (error.status === 404) {
        return 'Wrong email/password'
      }
      if (error.status === 422) {
        return 'Please confirm email address'
      }
      return null
    }

    default:
      return null
  }
}

const handleFailure = (state, { type, error }) =>
  state.merge({
    isLoading: false,
    isLoaded: false,
    error: humanizeError(type, error),
  })

const handleRequest = state =>
  state.merge({ error: null, isLoading: true, isLoaded: false })

const handleSuccess = state =>
  state.merge({
    isLoading: false,
    isLoaded: true,
    error: null,
  })

const handlers = {
  [AUTHENTICATE.REQUEST]: handleRequest,
  [AUTHENTICATE.SUCCESS]: handleSuccess,
  [AUTHENTICATE.FAILURE]: handleFailure,

  [RESET_PASSWORD.REQUEST]: handleRequest,
  [RESET_PASSWORD.SUCCESS]: handleSuccess,
  [RESET_PASSWORD.FAILURE]: handleFailure,

  [LOG_OUT]: state => state.merge(initialState),

  [LOCATION_CHANGE]: state => state.merge({ error: null }),
}

export default createReducer(initialState, handlers)
