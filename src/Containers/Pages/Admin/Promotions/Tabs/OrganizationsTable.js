import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import get from 'lodash/get'

import { Flex } from 'rebass'

import Confirm from 'Components/Blocks/Admin/Modals/Confirm'

import { Loader, DataTable, Text, NavLink, Dropdown } from 'Components/UI'

import { ADMIN_PATHS } from 'Constants/paths'

import {
  PROMOTION_TABLE_ACTION_OPTIONS,
  PROMOTION_TABLE_ACTIONS,
} from 'Constants/ids'

const { HeaderCell, Pagination, Cell } = DataTable

const OrganizationsTable = ({
  data,
  history,
  paged,
  isLoaded,
  size,
  onDeleteOrganization,
  onEditOrganization,
  onPageChange,
  onPageSizeChange,
  onSortedChange,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState(null)

  const handleCloseConfirm = () => {
    setSelectedOrganization(null)
    setIsConfirmOpen(false)
  }

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true)
  }

  const handleSelectAction = organization => selectedAction => {
    const actionValue = selectedAction.value
    if (actionValue === PROMOTION_TABLE_ACTIONS.SHOW) {
      history.push(ADMIN_PATHS.ORGANIZATION_DETAILS(organization.id))
    }
    if (actionValue === PROMOTION_TABLE_ACTIONS.EDIT) {
      onEditOrganization(organization.id)
    }
    if (actionValue === PROMOTION_TABLE_ACTIONS.DELETE) {
      setSelectedOrganization(organization)
      handleOpenConfirm()
    }
  }

  const handleSubmit = async () => {
    await onDeleteOrganization(selectedOrganization)
    handleCloseConfirm()
  }

  const columns = [
    {
      id: 'headquarters.name',
      Header: props => <HeaderCell {...props}>Parent Organization</HeaderCell>,
      accessor: organization => (
        <Cell>
          <Text ellipsis>{get(organization, ['headquarter', 'name'])}</Text>
        </Cell>
      ),
      sortable: true,
    },
    {
      id: 'name',
      Header: props => <HeaderCell {...props}>Organization Name</HeaderCell>,
      accessor: organization => (
        <Cell>
          <NavLink to={ADMIN_PATHS.ORGANIZATION_DETAILS(organization.id)}>
            <Text ellipsis>{get(organization, 'name')}</Text>
          </NavLink>
        </Cell>
      ),
      sortable: true,
    },
    {
      id: 'actions',
      Header: props => <HeaderCell {...props}>Actions</HeaderCell>,
      accessor: organization => (
        <Cell>
          <Dropdown
            options={PROMOTION_TABLE_ACTION_OPTIONS}
            rounded
            onChange={handleSelectAction(organization)}
          >
            Select Action
          </Dropdown>
        </Cell>
      ),
      sortable: false,
      maxWidth: 200,
    },
  ]

  if (!isLoaded) return <Loader />

  return (
    <Flex>
      <Confirm
        isOpen={isConfirmOpen}
        title="Confirm remove Organization"
        onCallback={handleCloseConfirm}
        onConfirm={handleSubmit}
      />
      <DataTable
        PaginationComponent={Pagination}
        className="-highlight"
        columns={columns}
        data={data}
        defaultPage={paged.number}
        defaultPageSize={size}
        defaultSorted={[{ id: 'name' }]}
        filterable={false}
        loading={data.isLoading}
        manual
        pageSize={size}
        pages={paged.pageCount || -1}
        resizable={false}
        showSizeSelect
        style={{
          width: '100%',
          marginTop: '20px',
        }}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortedChange={onSortedChange}
      />
    </Flex>
  )
}

OrganizationsTable.defaultProps = {}

OrganizationsTable.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  paged: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  onDeleteOrganization: PropTypes.func.isRequired,
  onEditOrganization: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onSortedChange: PropTypes.func.isRequired,
}

export default withRouter(OrganizationsTable)
