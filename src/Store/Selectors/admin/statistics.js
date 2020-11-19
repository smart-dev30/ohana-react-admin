import { createSelector } from 'reselect'

export const getState = state => state.admin.statistics

export const getStatistics = createSelector(
  getState,
  state => state.statistics,
)

export const getIsLoading = createSelector(
  getState,
  state => state.isLoading,
)

export const getIsLoaded = createSelector(
  getState,
  state => state.isLoaded,
)
