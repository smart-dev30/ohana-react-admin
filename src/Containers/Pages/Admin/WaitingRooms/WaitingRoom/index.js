import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose } from 'recompose'

// import get from 'lodash/get'

import { withAppContext } from 'Services/Context'

import {
  loadWaitingRoom,
  updateWaitingRoom,
} from 'Store/Actions/admin/waitingRooms'
import { getWaitingRoom } from 'Store/Selectors/admin/waitingRooms'

import WaitingRoom from './WaitingRoom'

export default compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({ waitingRoom: getWaitingRoom }),
    {
      onLoadWaitingRoom: loadWaitingRoom,
      onUpdateWaitingRoom: updateWaitingRoom,
    },
  ),
)(WaitingRoom)
