import { getEntities } from 'rapidux'
import { createSelector } from 'reselect'

import { getData } from '../data'

export const getState = state => state.admin.headquarters

export const getHeadquarters = getEntities(getState, getData, {
  type: 'headquarters',
  sorted: true,
})

export const getHeadquarter = getEntities(getState, getData, {
  type: 'headquarters',
  field: 'headquarter',
  singular: true,
})

export const getHeadquarterId = createSelector(
  getState,
  state => state.headquarter,
)

export const getHeadquartersPaged = createSelector(
  getState,
  state => state.paged,
)

export const getHeadquartersDefaultSize = createSelector(
  getState,
  state => state.defaultSize,
)
