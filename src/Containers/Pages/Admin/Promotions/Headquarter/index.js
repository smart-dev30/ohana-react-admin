import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose } from 'recompose'

import { withAppContext } from 'Services/Context'

import {
  loadHeadquarter,
  updateHeadquarter,
} from 'Store/Actions/admin/headquarters'
import { getHeadquarter } from 'Store/Selectors/admin/headquarters'

import Headquarter from './Headquarter'

export default compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({ headquarter: getHeadquarter }),
    {
      onLoadHeadquarter: loadHeadquarter,
      onUpdateHeadquarter: updateHeadquarter,
    },
  ),
)(Headquarter)
