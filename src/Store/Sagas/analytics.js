import { all, fork, take, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import ReactGA from 'react-ga'

import { getLocation } from 'Store/Selectors/router'

import { getFullLocation } from 'Services/Utils'

function* locationTracking() {
  while (true) {
    const prevLocation = yield select(getLocation)
    const { payload } = yield take(LOCATION_CHANGE)

    const fullPrevLocation = getFullLocation(prevLocation)
    const fullLocation = getFullLocation(payload.location)

    if (fullPrevLocation !== fullLocation) {
      ReactGA.pageview(fullLocation)
    }
  }
}

export default function* analytics() {
  yield all([fork(locationTracking)])
}
