import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'

import {
  loadHeadquarters,
  updateHeadquarter,
  createHeadquarter,
  deleteHeadquarter,
} from 'Store/Actions/admin/headquarters'

import {
  getHeadquarters,
  getHeadquartersPaged,
  getHeadquartersDefaultSize,
} from 'Store/Selectors/admin/headquarters'

import {
  loadOrganizations,
  updateOrganization,
  createOrganization,
  deleteOrganization,
} from 'Store/Actions/admin/organizations'

import {
  getOrganizations,
  getOrganizationsPaged,
  getOrganizationsDefaultSize,
} from 'Store/Selectors/admin/organizations'

import { getFilterForm } from 'Store/Selectors/ui'
import { changePage, changePageSize, changeSorted } from 'Store/Actions/ui'

import { withAppContext } from 'Services/Context'

import HeadquarersBase from './Headquarters'
import OrganizationsBase from './Organizations'

const Headquarters = compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({
      headquarters: getHeadquarters,
      paged: getHeadquartersPaged,
      defaultSize: getHeadquartersDefaultSize,
      formData: getFilterForm('headquarters'),
    }),
    {
      onCreateHeadquarter: createHeadquarter,
      onDeleteHeadquarter: deleteHeadquarter,
      onLoadHeadquarters: loadHeadquarters,
      onUpdateHeadquarter: updateHeadquarter,
      onPageChange: changePage,
      onPageSizeChange: changePageSize,
      onSortedChange: changeSorted,
    },
  ),
)(HeadquarersBase)

const Organizations = compose(
  withRouter,
  withAppContext,
  connect(
    createStructuredSelector({
      organizations: getOrganizations,
      headquarters: getHeadquarters,
      paged: getOrganizationsPaged,
      defaultSize: getOrganizationsDefaultSize,
      formData: getFilterForm('organizations'),
    }),
    {
      onCreateOrganization: createOrganization,
      onDeleteOrganization: deleteOrganization,
      onLoadOrganizations: loadOrganizations,
      onLoadHeadquarters: loadHeadquarters,
      onUpdateOrganization: updateOrganization,
      onPageChange: changePage,
      onPageSizeChange: changePageSize,
      onSortedChange: changeSorted,
    },
  ),
)(OrganizationsBase)

export { Headquarters, Organizations }
