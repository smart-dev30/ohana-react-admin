import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose, withProps } from 'recompose'

import get from 'lodash/get'

import { withAppContext } from 'Services/Context'

import { loadUser, updateUser } from 'Store/Actions/admin/users'
import { getUser } from 'Store/Selectors/admin/users'

import User from './User'

export default compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({ user: getUser }),
    {
      onLoadUser: loadUser,
      onUpdateUser: updateUser,
    },
  ),
  withProps(props => {
    const userId = get(props, 'match.params.userId')

    return {
      onLoadUser: () => props.onLoadUser(userId),
    }
  }),
)(User)
