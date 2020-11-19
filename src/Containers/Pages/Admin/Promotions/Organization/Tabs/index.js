import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { compose, withProps } from 'recompose'

import get from 'lodash/get'

import { withAppContext } from 'Services/Context'

import {
  loadOrganization,
  updateOrganization,
} from 'Store/Actions/admin/organizations'

import { getOrganization } from 'Store/Selectors/admin/organizations'

import {
  loadPromocodes,
  activationPromocode,
  deactivationPromocode,
} from 'Store/Actions/admin/promocodes'

import {
  getPromocodes,
  getPromocodesPaged,
  getPromocodesDefaultSize,
} from 'Store/Selectors/admin/promocodes'

import { changePage, changePageSize, changeSorted } from 'Store/Actions/ui'

import { getFilterForm } from 'Store/Selectors/ui'

import General from './GeneralInformation'
import Codes from './CodesInformaion'

const GeneralInformation = compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({ organization: getOrganization }),
    {
      onLoadOrganization: loadOrganization,
      onUpdateOrganization: updateOrganization,
    },
  ),
  withProps(props => {
    const organizationId = get(props, 'match.params.organizationId')
    return {
      onLoadOrganization: () => props.onLoadOrganization(organizationId),
    }
  }),
)(General)

const CodesInformation = compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({
      organization: getOrganization,
      promotionCodes: getPromocodes,
      paged: getPromocodesPaged,
      defaultSize: getPromocodesDefaultSize,
      formData: getFilterForm('promotionCodes'),
    }),
    {
      onLoadPromocodes: loadPromocodes,
      onActivatePromocode: activationPromocode,
      onDeactivatePromocode: deactivationPromocode,
      onPageChange: changePage,
      onPageSizeChange: changePageSize,
      onSortedChange: changeSorted,
    },
  ),
)(Codes)

export { CodesInformation, GeneralInformation }
