import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import { createAsyncAction } from 'Store/utils'

import apiCall from 'Services/Api'
import { transformToRequest } from 'Services/Entities/User'
import { getUserId } from 'Store/Selectors/admin/users'

export const LOAD_USERS = createAsyncAction('admin/users/LOAD')
export const LOAD_USER = createAsyncAction('admin/user/LOAD')
export const UPDATE_USER = createAsyncAction('admin/user/UPDATE')

const usersIncludes = [
  'profile',
  'emailCredential',
  'avatar',
  'fullName',
  'profile.verifiedPrimaryPhoneNumber',
  'createdWaitingRooms',
  'profile.avatar',
  'profile.pendingPrimaryPhoneNumber',
  'roomsParticipating',
]

export const loadUsers = ({
  paged = true,
  number = 1,
  size = 10,
  sort,
  filters,
} = {}) => (dispatch, getState) => {
  const params = {
    endpoint: '/admin/users',
    types: LOAD_USERS,
    query: {
      include: usersIncludes.join(),
    },
    paged: true,
  }

  if (paged) {
    merge(params, {
      paged,
      query: pickBy(
        {
          include: usersIncludes.join(),
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

export const loadUser = userId =>
  apiCall({
    endpoint: `/admin/users/${userId}`,
    types: LOAD_USER,
    query: {
      include: usersIncludes.join(),
    },
  })

export const updateUser = values => (dispatch, getState) => {
  const userId = getUserId(getState())

  return dispatch(
    apiCall({
      method: 'PATCH',
      endpoint: `/admin/users/${userId}/profile`,
      types: UPDATE_USER,
      query: {
        include: usersIncludes.join(),
        data: {
          type: 'profiles',
          ...transformToRequest(values),
        },
      },
    }),
  )
}
