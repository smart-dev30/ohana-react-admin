import { getEntities } from 'rapidux'
import { createSelector } from 'reselect'

import { getData } from '../data'

export const getState = state => state.admin.organizations

export const getOrganizations = getEntities(getState, getData, {
  type: 'organizations',
  sorted: true,
})

export const getOrganization = getEntities(getState, getData, {
  type: 'organizations',
  field: 'organization',
  singular: true,
})

export const getOrganizationId = createSelector(
  getState,
  state => state.organization,
)

export const getOrganizationsPaged = createSelector(
  getState,
  state => state.paged,
)

export const getOrganizationsDefaultSize = createSelector(
  getState,
  state => state.defaultSize,
)
