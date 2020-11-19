import React from 'react'
import PropTypes from 'prop-types'

import { DataTable, NavLink } from 'Components/UI'

import { ADMIN_PATHS } from 'Constants/paths'

const { HeaderCell } = DataTable

function DashboardTable({ data }) {
  const columns = [
    {
      id: 'type',
      accessor: 'type',
      sortable: false,
    },
    {
      id: 'users',
      Header: props => (
        <HeaderCell {...props}>
          <NavLink to={ADMIN_PATHS.USERS}>Users</NavLink>
        </HeaderCell>
      ),
      accessor: 'usersCount',
      sortable: false,
    },
    {
      id: 'wr',
      Header: props => (
        <HeaderCell {...props}>
          <NavLink to={ADMIN_PATHS.WAITING_ROOMS}>Waiting rooms</NavLink>
        </HeaderCell>
      ),
      accessor: 'wrCount',
      sortable: false,
    },
    {
      id: 'invites',
      Header: props => (
        <HeaderCell {...props}>Invites Current Month</HeaderCell>
      ),
      accessor: 'invitesCount',
      sortable: false,
    },
  ]

  return (
    <DataTable
      className="-highlight"
      columns={columns}
      data={data}
      defaultPageSize={1}
      filterable={false}
      manual
      pagination={false}
      resizable={false}
      style={{
        width: '100%',
        marginTop: '0px',
      }}
    />
  )
}

DashboardTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default DashboardTable
