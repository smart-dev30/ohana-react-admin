import get from 'lodash/get'

import { createReducer } from 'Store/utils'

import { LOAD_STATISTIC } from 'Store/Actions/admin/statistics'

const initialState = {
  statistics: {},
  isLoaded: false,
  isLoading: false,
}

const handlers = {
  [LOAD_STATISTIC.SUCCESS]: (state, action) => {
    return state.merge({
      statistics: get(action, 'payload.data') || {},
      isLoaded: true,
      isLoading: false,
    })
  },
}

export default createReducer(initialState, handlers)
