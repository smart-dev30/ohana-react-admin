import { all, fork, put, take, select, race } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist'

import { getAccess } from 'Store/Selectors/persist'

import { appReady } from 'Store/Actions/app'
import { logOut, loadViewer, LOAD_VIEWER } from 'Store/Actions/viewer'
import { AUTHENTICATE } from 'Store/Actions/auth'

function* restoreSession() {
  while (true) {
    yield take([AUTHENTICATE.SUCCESS, REHYDRATE])

    const access = yield select(getAccess)

    if (access) {
      yield put(loadViewer())

      const { success } = yield race({
        success: take(LOAD_VIEWER.SUCCESS),
        failure: take(LOAD_VIEWER.FAILURE),
      })

      if (!success) {
        yield put(logOut())
      }
    }

    yield put(appReady())
  }
}

export default function* root() {
  yield all([fork(restoreSession)])
}
