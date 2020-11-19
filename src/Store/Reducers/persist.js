import get from 'lodash/get'
import pick from 'lodash/pick'

import { APPEARANCE } from 'Config/app'

import { createReducer } from 'Store/utils'

import { AUTHENTICATE } from 'Store/Actions/auth'
import { CHANGE_THEME } from 'Store/Actions/ui'
import { LOG_OUT } from 'Store/Actions/viewer'

const initialState = {
  access: null,
  refresh: null,
  csrf: null,
  theme: APPEARANCE.THEME,
}

const handlers = {
  [AUTHENTICATE.SUCCESS]: (state, { payload }) =>
    state.merge({
      access: pick(payload.data, ['access', 'accessExpiresAt']),
      refresh: pick(payload.data, ['refresh', 'refreshExpiresAt']),
      csrf: get(payload.data, 'csrf'),
    }),

  REFRESH_TOKEN: (state, { payload }) =>
    state.merge({
      access: pick(payload, ['access', 'accessExpiresAt']),
      csrf: get(payload, 'csrf'),
    }),

  [CHANGE_THEME]: (state, { theme }) => state.set('theme', theme),

  [LOG_OUT]: state =>
    state.merge({
      access: null,
      refresh: null,
      csrf: null,
    }),
}

export default createReducer(initialState, handlers)
