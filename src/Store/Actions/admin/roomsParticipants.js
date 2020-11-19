import get from 'lodash/get'

import { createAsyncAction } from 'Store/utils'
import apiCall from 'Services/Api'
import { transformToRequest } from 'Services/Entities/RoomParticipants'

export const LOAD_ROOM_PARTICIPANTS = createAsyncAction(
  'admin/rooms_participants/LOAD',
)
export const UPDATE_ROOM_PARTICIPANTS = createAsyncAction(
  'admin/rooms_participants/UPDATE',
)

const roomParticipantsIncludes = ['waitingRoom', 'user']

export const loadRoomParticipants = () =>
  apiCall({
    endpoint: '/admin/rooms_participants',
    query: {
      include: roomParticipantsIncludes.join(),
    },
    paged: true,
    types: LOAD_ROOM_PARTICIPANTS,
  })

export const updateRoomParticipants = values => dispatch => {
  const userId = get(values, 'userId')
  return dispatch(
    apiCall({
      method: 'PATCH',
      endpoint: `/admin/rooms_participants/${userId}`,
      types: UPDATE_ROOM_PARTICIPANTS,
      query: {
        include: roomParticipantsIncludes.join(),
        data: {
          type: 'roomsParticipants',
          ...transformToRequest(values),
        },
      },
    }),
  )
}
