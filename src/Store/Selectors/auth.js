import { createSelector } from 'reselect'

export const getState = state => state.auth

export const getIsLoaded = createSelector(
  getState,
  state => state.isLoaded,
)

export const getIsLoading = createSelector(
  getState,
  state => state.isLoading,
)

export const getError = createSelector(
  getState,
  state => state.error,
)
