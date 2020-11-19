import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import get from 'lodash/get'

import { Flex } from 'rebass'

import { Loader, DataTable, Text, NavLink, Dropdown } from 'Components/UI'
import Confirm from 'Components/Blocks/Admin/Modals/Confirm'

import { ADMIN_PATHS } from 'Constants/paths'

import {
  PROMOTION_TABLE_ACTION_OPTIONS,
  PROMOTION_TABLE_ACTIONS,
} from 'Constants/ids'

const { HeaderCell, Pagination, Cell } = DataTable

const HeadquartersTable = ({
  data,
  history,
  paged,
  isLoaded,
  size,
  onDeleteHeadquarter,
  onEditHeadquarter,
  onPageChange,
  onPageSizeChange,
  onSortedChange,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [selectedHeadquarter, setSelectedHeadquarter] = useState(null)

  const handleCloseConfirm = () => {
    setSelectedHeadquarter(null)
    setIsConfirmOpen(false)
  }

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true)
  }

  const handleSelectAction = headquarter => selectedAction => {
    const actionValue = selectedAction.value
    if (actionValue === PROMOTION_TABLE_ACTIONS.SHOW) {
      history.push(ADMIN_PATHS.HEADQUARTER_DETAILS(headquarter.id))
    }
    if (actionValue === PROMOTION_TABLE_ACTIONS.EDIT) {
      onEditHeadquarter(headquarter.id)
    }
    if (actionValue === PROMOTION_TABLE_ACTIONS.DELETE) {
      setSelectedHeadquarter(headquarter)
      handleOpenConfirm()
    }
  }

  const handleSubmit = async () => {
    await onDeleteHeadquarter(selectedHeadquarter)
    handleCloseConfirm()
  }

  const columns = useMemo(
    () => [
      {
        id: 'name',
        Header: props => (
          <HeaderCell {...props}>Parent Organization</HeaderCell>
        ),
        accessor: headquarter => (
          <Cell>
            <NavLink to={ADMIN_PATHS.HEADQUARTER_DETAILS(headquarter.id)}>
              <Text ellipsis>{get(headquarter, 'name')}</Text>
            </NavLink>
          </Cell>
        ),
      },
      {
        id: 'organizationsCount',
        Header: props => (
          <HeaderCell {...props}>Organizations No. included</HeaderCell>
        ),
        accessor: headquarter => (
          <Cell>
            <Text ellipsis>{get(headquarter, 'organizationsCount', '')}</Text>
          </Cell>
        ),
        sortable: false,
      },
      {
        id: 'actions',
        Header: props => <HeaderCell {...props}>Actions</HeaderCell>,
        accessor: headquarter => (
          <Cell>
            <Dropdown
              options={PROMOTION_TABLE_ACTION_OPTIONS}
              rounded
              onChange={handleSelectAction(headquarter)}
            >
              Select Action
            </Dropdown>
          </Cell>
        ),
        sortable: false,
        maxWidth: 200,
      },
    ],
    [],
  )

  if (!isLoaded) return <Loader />

  return (
    <Flex>
      <Confirm
        isOpen={isConfirmOpen}
        title="Confirm remove Parent Organization"
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

HeadquartersTable.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  paged: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  onDeleteHeadquarter: PropTypes.func.isRequired,
  onEditHeadquarter: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onSortedChange: PropTypes.func.isRequired,
}

export default withRouter(HeadquartersTable)
