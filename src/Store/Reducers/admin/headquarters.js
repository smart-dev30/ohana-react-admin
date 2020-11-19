import {
  createFields,
  createReducerHandlers,
  createDeleteHandler,
} from 'rapidux'

import { createLoadHandler } from 'rapidux/lib/entityHandlers'

import { createReducer } from 'Store/utils'

import { LOG_OUT } from 'Store/Actions/viewer'

import {
  CREATE_HEADQUARTER,
  LOAD_HEADQUARTERS,
  LOAD_HEADQUARTER,
  DELETE_HEADQUARTER,
} from 'Store/Actions/admin/headquarters'

const initialState = {
  ...createFields('headquarters'),
  ...createFields('headquarters', 'headquarter', true),
  paged: {},
  defaultSize: 10,
}

const handlers = {
  ...createReducerHandlers('headquarters', LOAD_HEADQUARTERS, {
    withReplace: true,
  }),

  ...createReducerHandlers('headquarters', LOAD_HEADQUARTER, {
    withReplace: true,
    mapToKey: 'headquarter',
    singular: true,
  }),

  ...createReducerHandlers('headquarters', CREATE_HEADQUARTER, {
    mapToKey: 'headquarter',
    singular: true,
  }),

  [CREATE_HEADQUARTER.SUCCESS]: createLoadHandler('headquarters', {
    withLoading: false,
  }),

  [DELETE_HEADQUARTER.SUCCESS]: createDeleteHandler('headquarters', {
    withLoading: false,
  }),

  [LOG_OUT]: state => state.merge(initialState),
}

export default createReducer(initialState, handlers)
