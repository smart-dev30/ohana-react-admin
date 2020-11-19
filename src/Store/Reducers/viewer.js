import { LOCATION_CHANGE } from 'connected-react-router'

import get from 'lodash/get'

import { createReducer } from 'Store/utils'

import { LOAD_VIEWER, CLEAR_ERRORS, LOG_OUT } from 'Store/Actions/viewer'

const initialState = {
  id: null,
  type: null,
  error: null,
  isLoading: false,
  isLoaded: false,
}

const loadViewer = (state, { payload }) =>
  state.merge({
    id: get(payload, 'data.meta[/user].data[0].id', null),
    type: get(payload, 'data.meta[/user].data[0].type', null),
    isLoaded: true,
  })

const handlers = {
  [CLEAR_ERRORS]: state => state.merge({ error: null }),

  [LOAD_VIEWER.SUCCESS]: loadViewer,

  [LOCATION_CHANGE]: state => state.merge({ error: false }),

  [LOG_OUT]: state => state.merge(initialState),
}

export default createReducer(initialState, handlers)
