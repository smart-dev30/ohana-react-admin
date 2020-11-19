import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import { createAsyncAction } from 'Store/utils'

import apiCall from 'Services/Api'
import { transformToRequest } from 'Services/Entities/Organization'
import { getOrganizationId } from 'Store/Selectors/admin/organizations'

export const LOAD_ORGANIZATIONS = createAsyncAction('admin/organizations/LOAD')
export const LOAD_ORGANIZATION = createAsyncAction(
  'admin/organizations/LOAD_ONE',
)
export const UPDATE_ORGANIZATION = createAsyncAction(
  'admin/organizations/UPDATE',
)
export const DELETE_ORGANIZATION = createAsyncAction(
  'admin/organizations/DELETE',
)
export const CREATE_ORGANIZATION = createAsyncAction(
  'admin/organizations/CREATE',
)

const organizationsIncludes = ['logo', 'headquarter', 'headquarterLogo']

export const loadOrganizations = ({
  paged = true,
  number = 1,
  size = 10,
  sort,
  filters,
} = {}) => (dispatch, getState) => {
  const params = {
    endpoint: '/admin/organizations/',
    types: LOAD_ORGANIZATIONS,
    query: {
      include: organizationsIncludes.join(),
      filter: {
        state: {
          eq: 'active',
        },
      },
    },
    paged: true,
  }
  if (paged) {
    merge(params, {
      paged,
      query: pickBy(
        {
          include: organizationsIncludes.join(),
          page: {
            number,
            size,
          },
          filter: filters,
          sort,
        },
        identity,
      ),
      payload: {
        paged: {
          number,
          size,
        },
      },
    })
  }

  return apiCall(params)(dispatch, getState)
}

export const loadOrganization = organizationId =>
  apiCall({
    endpoint: `/admin/organizations/${organizationId}`,
    types: LOAD_ORGANIZATION,
    query: {
      include: organizationsIncludes.join(),
    },
  })

export const updateOrganization = values => (dispatch, getState) => {
  const organizationId = getOrganizationId(getState()) || values.id
  return dispatch(
    apiCall({
      method: 'PATCH',
      endpoint: `/admin/organizations/${organizationId}`,
      types: UPDATE_ORGANIZATION,
      query: {
        include: 'logo',
        data: {
          type: 'organization',
          ...transformToRequest(values),
        },
      },
    }),
  )
}

export const createOrganization = values => dispatch => {
  const query = {
    include: organizationsIncludes.join(),
    data: {
      type: 'organizations',
      ...transformToRequest(values),
    },
  }

  return dispatch(
    apiCall({
      method: 'POST',
      endpoint: '/admin/organizations/',
      types: CREATE_ORGANIZATION,
      query,
    }),
  )
}

export const deleteOrganization = values => (dispatch, getState) => {
  const organizationId = getOrganizationId(getState()) || values.id

  return dispatch(
    apiCall({
      method: 'DELETE',
      endpoint: `/admin/organizations/${organizationId}`,
      types: DELETE_ORGANIZATION,
      query: {
        include: organizationsIncludes.join(),
        data: {
          type: 'organization',
          ...transformToRequest(values),
        },
      },
      payload: {
        deletedId: organizationId,
      },
    }),
  )
}
