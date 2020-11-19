import { getEntities } from 'rapidux'
import { createSelector } from 'reselect'

import { getData } from '../data'

export const getState = state => state.admin.users

export const getUsers = getEntities(getState, getData, {
  type: 'users',
  sorted: true,
})

export const getUser = getEntities(getState, getData, {
  type: 'users',
  field: 'user',
  singular: true,
})

export const getUserId = createSelector(
  getState,
  state => state.user,
)
export const getUsersPaged = createSelector(
  getState,
  state => state.paged,
)
