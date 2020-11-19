import { createReducer } from 'Store/utils'

import {
  TOGGLE_SIDEBAR,
  UPDATE_FILTER_FORM,
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  CHANGE_SORTED,
} from 'Store/Actions/ui'

const initialState = {
  sidebarShrinked: true,
  usersFilterForm: {},
  waitingRoomsFilterForm: {},
  headquartersFilterForm: {},
  organizationsFilterForm: {},
  promotionCodesFilterForm: {},
}

const handlers = {
  [TOGGLE_SIDEBAR]: state =>
    state.merge({ sidebarShrinked: !state.sidebarShrinked }),

  [UPDATE_FILTER_FORM]: (state, { payload: { type, data } }) =>
    state.merge({ [`${type}FilterForm`]: data }),

  [CHANGE_PAGE]: (state, { payload: { type, page } }) =>
    state.setIn([`${type}Paged`, 'number'], page),

  [CHANGE_PAGE_SIZE]: (state, { payload: { type, size } }) =>
    state.setIn([`${type}Paged`, 'size'], size),

  [CHANGE_SORTED]: (state, { payload: { type, sorted } }) =>
    state.setIn([`${type}Sorted`, 'sorted'], sorted),
}

export default createReducer(initialState, handlers)
