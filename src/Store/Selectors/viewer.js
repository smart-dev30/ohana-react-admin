import { createSelector } from 'reselect'
import { denormalize } from 'rapidux'

import { getData } from './data'

import { /* getAccess, */ getAccessToken } from './persist'

export const getState = state => state.viewer

export const getViewerId = createSelector(
  getState,
  state => state.id,
)
export const getViewerType = createSelector(
  getState,
  state => state.type,
)

const appendValuesToViewer = (viewer, { type, ...rest }) => ({
  ...viewer,
  ...rest,
  type,
})

export const getViewer = createSelector(
  getData,
  getViewerId,
  getViewerType,
  (data, viewerId, viewerType) =>
    viewerId && viewerType
      ? appendValuesToViewer(denormalize(data, viewerType, viewerId), {
          type: viewerType,
          isAuthenticated: true,
        })
      : {},
)

export const getError = createSelector(
  getState,
  state => state.error,
)

export const getAuthorizationHeader = createSelector(
  getAccessToken,
  access => (access ? `Bearer ${access}` : null),
)
