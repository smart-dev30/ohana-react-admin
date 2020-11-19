import { getEntities, denormalize } from 'rapidux'
import { createSelector } from 'reselect'

import { getData } from '../data'

export const getState = state => state.admin.waitingRooms

export const getWaitingRooms = getEntities(getState, getData, {
  type: 'waitingRooms',
  sorted: true,
})

export const getWaitingRoom = getEntities(getState, getData, {
  type: 'waitingRooms',
  field: 'waitingRoom',
  singular: true,
})
export const getWaitingRoomsInvitations = createSelector(
  getData,
  getState,
  (data, state) =>
    state.smsInvitations || state.emailInvitations
      ? [
          ...(denormalize(data, 'smsInvitations', state.smsInvitations) || []),
          ...(denormalize(data, 'emailInvitations', state.emailInvitations) ||
            []),
        ]
      : null,
)

export const getWRPaged = createSelector(
  getState,
  state => state.paged,
)
