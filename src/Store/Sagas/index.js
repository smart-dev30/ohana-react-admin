import { all, fork } from 'redux-saga/effects'

import analytics from './analytics'
import restoreSession from './restoreSession'
import viewer from './viewer'
import admins from './admins'

const rootSaga = function* root() {
  yield all([fork(analytics), fork(restoreSession), fork(viewer), fork(admins)])
}

export default rootSaga
