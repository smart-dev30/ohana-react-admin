import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'

import { changePage, changePageSize } from 'Store/Actions/ui'
import { loadUsers } from 'Store/Actions/admin/users'
import { getWaitingRooms, getWRPaged } from 'Store/Selectors/admin/waitingRooms'
import { loadWaitingRooms } from 'Store/Actions/admin/waitingRooms'

import { withAppContext } from 'Services/Context'

import WaitingRooms from './WaitingRooms'

export default compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({
      waitingRooms: getWaitingRooms,
      paged: getWRPaged,
    }),
    {
      onLoadUsers: loadUsers,
      onPageChange: changePage,
      onPageSizeChange: changePageSize,
      onLoadWaitingRooms: loadWaitingRooms,
    },
  ),
)(WaitingRooms)
