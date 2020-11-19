import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose } from 'recompose'

import { withAppContext } from 'Services/Context'

import { createPromocode } from 'Store/Actions/admin/promocodes'

import HeadquarterEditModal from './HeadquarterEditModal'
import OrganizationEditModal from './OrganizationEditModal'
import PromocodeModal from './PromoCodeAddModal'

const PromoCodeAddModal = compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({}),
    {
      onCreatePromoCodes: createPromocode,
    },
  ),
)(PromocodeModal)

export { HeadquarterEditModal, OrganizationEditModal, PromoCodeAddModal }
