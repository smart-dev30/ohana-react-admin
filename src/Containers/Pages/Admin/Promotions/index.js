import { withRouter } from 'react-router'
import { compose } from 'recompose'

import { withAppContext } from 'Services/Context'

import Promotions from './Promotions'

export default compose(
  withRouter,
  withAppContext,
)(Promotions)
