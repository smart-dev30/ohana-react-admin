import {
  createFields,
  createReducerHandlers,
  createDeleteHandler,
} from 'rapidux'

import { createLoadHandler } from 'rapidux/lib/entityHandlers'

import { createReducer } from 'Store/utils'

import { LOG_OUT } from 'Store/Actions/viewer'

import {
  CREATE_ORGANIZATION,
  LOAD_ORGANIZATIONS,
  LOAD_ORGANIZATION,
  DELETE_ORGANIZATION,
} from 'Store/Actions/admin/organizations'

const initialState = {
  ...createFields('organizations'),
  ...createFields('organizations', 'organization', true),
  paged: {},
  defaultSize: 10,
}

const handlers = {
  ...createReducerHandlers('organizations', LOAD_ORGANIZATIONS, {
    withReplace: true,
  }),

  ...createReducerHandlers('organizations', LOAD_ORGANIZATION, {
    withReplace: true,
    mapToKey: 'organization',
    singular: true,
  }),

  [CREATE_ORGANIZATION.SUCCESS]: createLoadHandler('organizations', {
    withLoading: false,
  }),

  [DELETE_ORGANIZATION.SUCCESS]: createDeleteHandler('organizations'),

  [LOG_OUT]: state => state.merge(initialState),
}

export default createReducer(initialState, handlers)
