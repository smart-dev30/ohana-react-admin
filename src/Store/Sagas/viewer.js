import { all, put, take, fork } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { APP_READY } from 'Store/Actions/app'
import { LOAD_VIEWER, LOG_OUT } from 'Store/Actions/viewer'
import { AUTHENTICATE } from 'Store/Actions/auth'

import { ROOT_PATH } from 'Constants/paths'

import afterRefetch from './afterRefetch'

function* watchConfirmEmail() {
  yield take(AUTHENTICATE.SUCCESS)

  yield put(push(ROOT_PATH))
}

function* redirectLogOut() {
  while (true) {
    yield take(LOG_OUT)
    yield put(push(ROOT_PATH))
  }
}

function* runAfterRefetch() {
  yield take(LOAD_VIEWER.SUCCESS)
  yield take(APP_READY)

  yield all([fork(afterRefetch)])
}

export default function* root() {
  yield all([
    fork(redirectLogOut),
    fork(runAfterRefetch),
    fork(watchConfirmEmail),
  ])
}
