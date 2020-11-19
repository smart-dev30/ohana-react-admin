import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { withAppContext } from 'Services/Context'

import { toggleSidebar } from 'Store/Actions/ui'
import { logOut } from 'Store/Actions/viewer'

import Header from './Header'

export default compose(
  withRouter,
  withAppContext,
  connect(
    null,
    {
      onToggleSidebar: toggleSidebar,
      onLogOut: logOut,
    },
  ),
)(Header)
