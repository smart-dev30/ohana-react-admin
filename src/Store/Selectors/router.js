import { createSelector } from 'reselect'

export const getState = state => state.router

export const getLocation = createSelector(
  getState,
  state => state.location,
)
