import { createFields, createReducerHandlers } from 'rapidux'

import { createLoadHandler } from 'rapidux/lib/entityHandlers'

import { createReducer } from 'Store/utils'

import { LOG_OUT } from 'Store/Actions/viewer'

import {
  CREATE_PROMOCODES,
  LOAD_PROMOCODES,
  LOAD_PROMOCODE,
  ACTIVATION_PROMOCODE,
  DEACTIVATION_PROMOCODE,
} from 'Store/Actions/admin/promocodes'

const initialState = {
  ...createFields('promotionCodes'),
  ...createFields('promotionCodes', 'promotionCode', true),
  paged: {},
  defaultSize: 10,
}

const handlers = {
  ...createReducerHandlers('promotionCodes', LOAD_PROMOCODES, {
    withReplace: true,
  }),

  ...createReducerHandlers('promotionCodes', LOAD_PROMOCODE, {
    withReplace: true,
    mapToKey: 'promotionCode',
    singular: true,
  }),

  ...createReducerHandlers('promotionCodes', ACTIVATION_PROMOCODE, {
    withReplace: true,
    mapToKey: 'promotionCode',
    singular: true,
  }),

  ...createReducerHandlers('promotionCodes', DEACTIVATION_PROMOCODE, {
    withReplace: true,
    mapToKey: 'promotionCode',
    singular: true,
  }),

  [CREATE_PROMOCODES.SUCCESS]: createLoadHandler('promotionCodes', {
    withLoading: false,
  }),

  [LOG_OUT]: state => state.merge(initialState),
}

export default createReducer(initialState, handlers)
