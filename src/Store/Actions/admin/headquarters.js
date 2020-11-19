import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import { createAsyncAction } from 'Store/utils'

import apiCall from 'Services/Api'
import { transformToRequest } from 'Services/Entities/Headquarter'
import { getHeadquarterId } from 'Store/Selectors/admin/headquarters'

export const LOAD_HEADQUARTERS = createAsyncAction('admin/headquarters/LOAD')
export const LOAD_HEADQUARTER = createAsyncAction('admin/headquarters/LOAD_ONE')
export const UPDATE_HEADQUARTER = createAsyncAction('admin/headquarters/UPDATE')
export const DELETE_HEADQUARTER = createAsyncAction('admin/headquarters/DELETE')
export const CREATE_HEADQUARTER = createAsyncAction('admin/headquarters/CREATE')

const headquartersIncludes = ['logo']

export const loadHeadquarters = ({
  paged = true,
  number = 1,
  size = 10,
  sort,
  filters,
} = {}) => (dispatch, getState) => {
  const params = {
    endpoint: '/admin/headquarters/',
    types: LOAD_HEADQUARTERS,
    query: {
      include: headquartersIncludes.join(),
      filter: {
        state: {
          eq: 'active',
        },
      },
    },
    paged: true,
  }

  if (paged && size !== 'all') {
    merge(params, {
      paged,
      query: pickBy(
        {
          include: headquartersIncludes.join(),
          page: {
            number,
            size,
          },
          sort,
          filter: filters,
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

export const loadHeadquarter = headquarterId => {
  return apiCall({
    endpoint: `/admin/headquarters/${headquarterId}`,
    types: LOAD_HEADQUARTER,
    query: {
      include: headquartersIncludes.join(),
    },
  })
}

export const updateHeadquarter = values => (dispatch, getState) => {
  const headquarterId = getHeadquarterId(getState()) || values.id
  const query = {
    include: headquartersIncludes.join(),
    data: {
      type: 'headquarter',
      ...transformToRequest(values),
    },
  }
  return dispatch(
    apiCall({
      method: 'PATCH',
      endpoint: `/admin/headquarters/${headquarterId}`,
      types: UPDATE_HEADQUARTER,
      query,
    }),
  )
}

export const createHeadquarter = values => dispatch => {
  const query = {
    include: headquartersIncludes.join(),
    data: {
      type: 'headquarters',
      ...transformToRequest(values),
    },
  }
  return dispatch(
    apiCall({
      method: 'POST',
      endpoint: '/admin/headquarters/',
      types: CREATE_HEADQUARTER,
      query,
    }),
  )
}

export const deleteHeadquarter = values => (dispatch, getState) => {
  const headquarterId = getHeadquarterId(getState()) || values.id

  return dispatch(
    apiCall({
      method: 'DELETE',
      endpoint: `/admin/headquarters/${headquarterId}`,
      types: DELETE_HEADQUARTER,
      query: {
        include: headquartersIncludes.join(),
        data: {
          type: 'headquarters',
          ...transformToRequest(values),
        },
      },
      payload: {
        deletedId: headquarterId,
      },
    }),
  )
}
