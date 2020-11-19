import { createSelector } from 'reselect'

export const getState = state => state.app

export const getIsReady = createSelector(
  getState,
  state => state.ready,
)
