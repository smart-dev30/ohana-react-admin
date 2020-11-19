import { all, fork, take } from 'redux-saga/effects'

import get from 'lodash/get'

import { UPLOAD_FILE, CANCEL_UPLOAD } from 'Store/Actions/uploading'

function* watchFileUpload() {
  while (true) {
    const { request, payload } = yield take(UPLOAD_FILE.REQUEST)
    const requestFileId = get(payload, 'id')
    if (requestFileId) {
      const cancelAction = yield take(CANCEL_UPLOAD)

      if (get(cancelAction, 'payload.id') === requestFileId) {
        request.abort()
      }
    }
  }
}

export default function* rootSaga() {
  yield all([fork(watchFileUpload)])
}
