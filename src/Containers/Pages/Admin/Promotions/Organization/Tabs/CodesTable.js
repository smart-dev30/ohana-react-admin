import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'

import { Loader, DataTable, Text, Dropdown } from 'Components/UI'

const PROMOCODES_ACTIONS = {
  activate: 'deactivated',
  deactivate: 'active',
}

export const PROMOCODES_ACTION_OPTIONS = [
  {
    label: 'Activate',
    value: PROMOCODES_ACTIONS.activate,
  },
  {
    label: 'Deactivate',
    value: PROMOCODES_ACTIONS.deactivate,
  },
]

const { HeaderCell, Pagination, Cell } = DataTable

const CodesTable = ({
  data,
  paged,
  isLoaded,
  size,
  onActivatePromocode,
  onDeactivatePromocode,
  onPageChange,
  onPageSizeChange,
  onSortedChange,
}) => {
  const handleSelectAction = promocode => selectedAction => {
    const actionValue = selectedAction.value
    if (actionValue === PROMOCODES_ACTIONS.activate) {
      onActivatePromocode(promocode)
    }
    if (actionValue === PROMOCODES_ACTIONS.deactivate) {
      onDeactivatePromocode(promocode)
    }
  }

  const columns = [
    {
      id: 'code',
      Header: props => <HeaderCell {...props}>Promotion Code</HeaderCell>,
      accessor: promocode => (
        <Cell>
          <Text ellipsis>{get(promocode, 'code')}</Text>
        </Cell>
      ),
      sortable: true,
    },
    {
      id: 'expirationDate',
      Header: props => <HeaderCell {...props}>Code Expiration Date</HeaderCell>,
      accessor: promocode => (
        <Cell>
          <Text ellipsis>{get(promocode, 'expirationDate')}</Text>
        </Cell>
      ),
      sortable: true,
    },
    {
      id: 'daysCount',
      Header: props => (
        <HeaderCell {...props}>Promotion Durauion, days</HeaderCell>
      ),
      accessor: promocode => (
        <Cell>
          <Text ellipsis>{get(promocode, 'daysCount')}</Text>
        </Cell>
      ),
      sortable: true,
    },
    {
      id: 'maxUseTimesCount',
      Header: props => <HeaderCell {...props}>Max Use Times Count</HeaderCell>,
      accessor: promocode => (
        <Cell>
          <Text ellipsis>{get(promocode, 'maxUseTimesCount')}</Text>
        </Cell>
      ),
      sortable: true,
    },
    {
      id: 'timesUsedCount',
      Header: props => <HeaderCell {...props}>Times used</HeaderCell>,
      accessor: promocode => (
        <Cell>
          <Text ellipsis>{get(promocode, 'timesUsedCount')}</Text>
        </Cell>
      ),
      sortable: true,
    },
    {
      id: 'status',
      Header: props => <HeaderCell {...props}>Status</HeaderCell>,
      accessor: promocode => (
        <Cell>
          <Text ellipsis>{get(promocode, 'state')}</Text>
        </Cell>
      ),
      sortable: false,
    },
    {
      id: 'actions',
      Header: props => <HeaderCell {...props}>Actions</HeaderCell>,
      accessor: promocode => {
        const options = filter(
          PROMOCODES_ACTION_OPTIONS,
          item => item.value === promocode.state,
        )
        return (
          <Cell>
            <Dropdown
              disabled={isEmpty(options)}
              options={options}
              rounded
              onChange={handleSelectAction(promocode)}
            >
              Select Action
            </Dropdown>
          </Cell>
        )
      },
      sortable: false,
      maxWidth: 200,
    },
  ]

  if (!isLoaded) return <Loader />

  return (
    <DataTable
      PaginationComponent={Pagination}
      className="-highlight"
      columns={columns}
      data={data}
      defaultPage={paged.number}
      defaultPageSize={size}
      defaultSorted={[{ id: 'code' }]}
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
  )
}

CodesTable.defaultProps = {}

CodesTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  paged: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  onActivatePromocode: PropTypes.func.isRequired,
  onDeactivatePromocode: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onSortedChange: PropTypes.func.isRequired,
}

export default CodesTable
