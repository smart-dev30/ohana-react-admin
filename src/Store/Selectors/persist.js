import { createSelector } from 'reselect'

import get from 'lodash/get'

export const getState = state => state.persist

export const getAccess = createSelector(
  getState,
  state => state.access,
)
export const getRefresh = createSelector(
  getState,
  state => state.refresh,
)

export const getAccessToken = createSelector(
  getAccess,
  access => get(access, 'access'),
)

export const getRefreshToken = createSelector(
  getRefresh,
  refresh => get(refresh, 'refresh'),
)

export const getCSRF = createSelector(
  getState,
  state => state.csrf,
)

export const getTheme = createSelector(
  getState,
  state => state.theme,
)
