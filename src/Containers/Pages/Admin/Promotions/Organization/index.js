import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose, withProps } from 'recompose'

import get from 'lodash/get'

import { withAppContext } from 'Services/Context'

import { loadOrganization } from 'Store/Actions/admin/organizations'

import { getOrganization } from 'Store/Selectors/admin/organizations'

import Organization from './Organization'

export default compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({ organization: getOrganization }),
    {
      onLoadOrganization: loadOrganization,
    },
  ),
  withProps(props => {
    const organizationId = get(props, 'match.params.organizationId')
    return {
      onLoadOrganization: () => props.onLoadOrganization(organizationId),
    }
  }),
)(Organization)
