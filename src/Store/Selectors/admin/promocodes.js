import { getEntities } from 'rapidux'
import { createSelector } from 'reselect'

import { getData } from '../data'

export const getState = state => state.admin.promotionCodes

export const getPromocodes = getEntities(getState, getData, {
  type: 'promotionCodes',
  sorted: true,
})

export const getPromocode = getEntities(getState, getData, {
  type: 'promotionCodes',
  field: 'promotionCode',
  singular: true,
})

export const getPromocodeId = createSelector(
  getState,
  state => state.promotionCode,
)

export const getPromocodesPaged = createSelector(
  getState,
  state => state.paged,
)

export const getPromocodesDefaultSize = createSelector(
  getState,
  state => state.defaultSize,
)
