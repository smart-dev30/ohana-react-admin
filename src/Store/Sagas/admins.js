import {
  throttle,
  all,
  put,
  fork,
  select,
  cancel,
  takeEvery,
} from 'redux-saga/effects'

import get from 'lodash/get'
import pick from 'lodash/pick'
import reduce from 'lodash/reduce'
import flattenDeep from 'lodash/flattenDeep'
import isEmpty from 'lodash/isEmpty'

import { formReducer } from 'Constants/utilsReducer'

import {
  UPDATE_FILTER_FORM,
  CHANGE_PAGE,
  CHANGE_PAGE_SIZE,
  CHANGE_SORTED,
} from 'Store/Actions/ui'

import { getState as getUiState } from 'Store/Selectors/ui'
import { loadUsers } from 'Store/Actions/admin/users'

import {
  deleteInvitation,
  deleteParticipant,
  loadWaitingRoom,
  loadWaitingRoomInvitations,
  loadWaitingRooms,
  REQUEST_DELETE_INVITATION,
  REQUEST_DELETE_PARTICIPANT,
} from 'Store/Actions/admin/waitingRooms'

import { loadHeadquarters } from 'Store/Actions/admin/headquarters'

import { loadOrganizations } from 'Store/Actions/admin/organizations'
import { loadPromocodes } from 'Store/Actions/admin/promocodes'

function* makeRequest({ type, payload }) {
  const action = get(
    {
      users: loadUsers,
      waitingRooms: loadWaitingRooms,
      headquarters: loadHeadquarters,
      organizations: loadOrganizations,
      promotionCodes: loadPromocodes,
    },
    payload.type,
  )

  if (!action) yield cancel()

  const uiState = yield select(getUiState)

  const sorted = get(uiState, `${payload.type}Sorted`)

  const filtred = pick(get(uiState, `${payload.type}FilterForm`), [
    'fullname',
    'phone',
    'email',
    'createdAt',
    'date_range',
    'search',
    'laborKind',
    'kind',
    'updatedAt',
    'userId',
    'checkinStatus',
    'startAt',
    'lastLogin',
    'ownerName',
    'headquarterName',
    'organizationName',
    'promotionCodesName',
    'promotionCodesState',
  ])

  yield put(
    action({
      paged: true,
      sort: !isEmpty(sorted)
        ? reduce(
            pick(flattenDeep(get(uiState, `${payload.type}Sorted`).sorted)[0], [
              'id',
              'desc',
            ]),
            (acc, value, key) => {
              if (key === 'id') return `${acc}${value}`
              if (key === 'desc') return `${value ? '' : '-'}${acc}`

              return acc
            },
            '',
          )
        : '',
      filters: reduce(filtred, formReducer(payload), {}),
      ...(type !== UPDATE_FILTER_FORM
        ? pick(get(yield select(getUiState), `${payload.type}Paged`), [
            'number',
            'size',
          ])
        : {}),
    }),
  )
}

function* deleteInvitationHandler({ id, waitingRoomId }) {
  yield yield put(deleteInvitation({ id }))
  yield put(loadWaitingRoom(waitingRoomId))
  yield put(loadWaitingRoomInvitations(waitingRoomId))
}

function* deleteParticipantHandler({ id, waitingRoomId }) {
  yield yield put(deleteParticipant({ id }))
  yield put(loadWaitingRoom(waitingRoomId))
  yield put(loadWaitingRoomInvitations(waitingRoomId))
}

function* filterFormUpdating() {
  yield throttle(2000, UPDATE_FILTER_FORM, makeRequest)
}

export default function* admins() {
  yield all([
    fork(filterFormUpdating),
    takeEvery([CHANGE_PAGE, CHANGE_PAGE_SIZE, CHANGE_SORTED], makeRequest),
    takeEvery(REQUEST_DELETE_INVITATION, deleteInvitationHandler),
    takeEvery(REQUEST_DELETE_PARTICIPANT, deleteParticipantHandler),
  ])
}
