import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose } from 'recompose'

// import get from 'lodash/get'

import { withAppContext } from 'Services/Context'

import {
  loadWaitingRoom,
  loadWaitingRoomInvitations,
} from 'Store/Actions/admin/waitingRooms'
import { getWaitingRoom } from 'Store/Selectors/admin/waitingRooms'

import WaitingRoomGuests from './WaitingRoomGuests'

export default compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({ waitingRoom: getWaitingRoom }),
    {
      onLoadWaitingRoom: loadWaitingRoom,
      onLoadWaitingRoomInvitations: loadWaitingRoomInvitations,
    },
  ),
)(WaitingRoomGuests)
