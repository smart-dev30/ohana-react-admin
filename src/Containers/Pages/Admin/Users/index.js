import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'

import { loadUsers } from 'Store/Actions/admin/users'
import { getUsers, getUsersPaged } from 'Store/Selectors/admin/users'
import { getFilterForm } from 'Store/Selectors/ui'
import { changePage, changePageSize } from 'Store/Actions/ui'

import { withAppContext } from 'Services/Context'

import Users from './Users'

export default compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({
      users: getUsers,
      paged: getUsersPaged,
      formData: getFilterForm('users'),
    }),
    {
      onLoadUsers: loadUsers,
      onPageChange: changePage,
      onPageSizeChange: changePageSize,
    },
  ),
)(Users)
