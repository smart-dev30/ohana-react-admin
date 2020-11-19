import Immutable from 'seamless-immutable'

import get from 'lodash/get'

export const transformToImmutable = state =>
  get(state, 'withoutImmutable') === true ? state : Immutable(state)

export const createReducer = (initialState, handlers) => (
  state = transformToImmutable(initialState),
  action,
) => (handlers[action.type] ? handlers[action.type](state, action) : state)

export const createAsyncAction = type => ({
  REQUEST: `${type}.REQUEST`,
  SUCCESS: `${type}.SUCCESS`,
  FAILURE: `${type}.FAILURE`,
})
