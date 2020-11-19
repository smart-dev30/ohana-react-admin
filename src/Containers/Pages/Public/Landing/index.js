import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withAppContext } from 'Services/Context'

import { logOut } from 'Store/Actions/viewer'

import Landing from './Landing'

export default compose(
  withAppContext,
  connect(
    null,
    {
      onLogOut: logOut,
    },
  ),
)(Landing)
