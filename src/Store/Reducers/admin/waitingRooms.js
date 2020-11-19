import { createFields, createReducerHandlers } from 'rapidux'

import { createReducer } from 'Store/utils'

import {
  LOAD_WAITING_ROOMS,
  LOAD_WAITING_ROOM,
  LOAD_WAITING_ROOM_INVITATIONS,
} from 'Store/Actions/admin/waitingRooms'

const initialState = {
  ...createFields('waitingRooms'),
  ...createFields('waitingRooms', 'waitingRoom', true),
  ...createFields('smsInvitations'),
  ...createFields('emailInvitations'),
  paged: {},
}

const handlers = {
  ...createReducerHandlers('waitingRooms', LOAD_WAITING_ROOMS, {
    withReplace: true,
  }),

  ...createReducerHandlers('waitingRooms', LOAD_WAITING_ROOM, {
    withReplace: true,
    mapToKey: 'waitingRoom',
    singular: true,
  }),
  ...createReducerHandlers('smsInvitations', LOAD_WAITING_ROOM_INVITATIONS, {
    withReplace: true,
    mapToKey: 'smsInvitations',
  }),
  ...createReducerHandlers('emailInvitations', LOAD_WAITING_ROOM_INVITATIONS, {
    withReplace: true,
    mapToKey: 'emailInvitations',
  }),
}

export default createReducer(initialState, handlers)
