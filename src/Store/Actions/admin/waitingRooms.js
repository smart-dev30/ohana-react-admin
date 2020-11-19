import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import { createAsyncAction } from 'Store/utils'
import apiCall from 'Services/Api'

import { transformToRequest } from 'Services/Entities/WaitingRoom'

export const LOAD_WAITING_ROOMS = createAsyncAction('admin/waiting-rooms/LOAD')
export const LOAD_WAITING_ROOM = createAsyncAction('admin/waiting-room/LOAD')
export const UPDATE_WAITING_ROOM = createAsyncAction(
  'admin/waiting-room/UPDATE',
)
export const LOAD_WAITING_ROOM_INVITATIONS = createAsyncAction(
  'admin/waiting-room/invitations/LOAD',
)
export const RESEND_INVITE = 'admin/RESEND_INVITE'
export const DELETE_INVITATION = createAsyncAction('admin/DELETE_INVITATION')
export const REQUEST_DELETE_INVITATION = 'admin/DELETE_INVITATION'
export const DELETE_PARTICIPANT = createAsyncAction('admin/DELETE_PARTICIPANT')
export const REQUEST_DELETE_PARTICIPANT = 'admin/DELETE_PARTICIPANT'

const WRIncludes = [
  'roomsParticipants.user.profile',
  'createdBy.profile',
  'avatar',
]

export const loadWaitingRooms = ({
  paged = true,
  number = 1,
  size = 10,
  sort,
  filters,
} = {}) => (dispatch, getState) => {
  const params = {
    endpoint: '/admin/waiting_rooms',
    types: LOAD_WAITING_ROOMS,
    query: {
      include: WRIncludes.join(),
    },
    paged: true,
  }

  if (paged) {
    merge(params, {
      paged,
      query: pickBy(
        {
          include: WRIncludes.join(),
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

export const loadWaitingRoom = id => (dispatch, getState) => {
  const params = {
    endpoint: `/admin/waiting_rooms/${id}`,
    types: LOAD_WAITING_ROOM,
    query: {
      include: WRIncludes.join(),
    },
  }

  return apiCall(params)(dispatch, getState)
}

export const loadWaitingRoomInvitations = id => (dispatch, getState) => {
  const params = {
    endpoint: `/admin/waiting_rooms/${id}/invitations`,
    types: LOAD_WAITING_ROOM_INVITATIONS,
    query: {
      include: 'name,createdBy,waitingRoom',
    },
  }

  return apiCall(params)(dispatch, getState)
}

export const updateWaitingRoom = payload => (dispatch, getState) => {
  const params = {
    method: 'PATCH',
    endpoint: `/admin/waiting_rooms/${payload.id}`,
    types: UPDATE_WAITING_ROOM,
    query: {
      include: WRIncludes.join(),
      data: {
        type: 'waitingRooms',
        ...transformToRequest(payload),
      },
    },
  }

  return apiCall(params)(dispatch, getState)
}

export const resendEmailConfirmation = ({ id }) =>
  apiCall({
    endpoint: `/admin/invitations/${id}/resendings`,
    method: 'POST',
    types: RESEND_INVITE,
    query: {
      data: {
        attributes: {},
      },
    },
    needsNormalization: false,
  })

export const deleteInvitation = ({ id }) =>
  apiCall({
    endpoint: `/admin/invitations/${id}`,
    method: 'DELETE',
    types: DELETE_INVITATION,
    needsNormalization: false,
  })

export const deleteParticipant = ({ id }) =>
  apiCall({
    endpoint: `/admin/rooms_participants/${id}`,
    method: 'DELETE',
    types: DELETE_PARTICIPANT,
    needsNormalization: false,
  })

export const requestDeleteInvitation = ({ id, waitingRoomId }) => ({
  type: REQUEST_DELETE_INVITATION,
  id,
  waitingRoomId,
})

export const requestDeleteParticipant = ({ id, waitingRoomId }) => ({
  type: REQUEST_DELETE_PARTICIPANT,
  id,
  waitingRoomId,
})
