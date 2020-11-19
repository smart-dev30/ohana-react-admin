import { createFields, createReducerHandlers } from 'rapidux'

import { createReducer } from 'Store/utils'

import { LOG_OUT } from 'Store/Actions/viewer'
import { LOAD_USERS, LOAD_USER } from 'Store/Actions/admin/users'

const initialState = {
  ...createFields('users'),
  ...createFields('users', 'user', true),
  paged: {},
}

const handlers = {
  ...createReducerHandlers('users', LOAD_USERS, {
    withReplace: true,
  }),

  ...createReducerHandlers('users', LOAD_USER, {
    withReplace: true,
    mapToKey: 'user',
    singular: true,
  }),

  [LOG_OUT]: state => state.merge(initialState),
}

export default createReducer(initialState, handlers)
