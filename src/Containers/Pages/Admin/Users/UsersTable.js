import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import get from 'lodash/get'

import { Loader, Text, NavLink } from 'Components/UI'

import { ADMIN_PATHS } from 'Constants/paths'

import { DataTable } from './styles'

const { HeaderCell, Pagination } = DataTable

class UsersTable extends PureComponent {
  columns = [
    {
      id: 'user.name',
      Header: props => <HeaderCell {...props}>Full Name</HeaderCell>,
      accessor: user => (
        <NavLink to={ADMIN_PATHS.USER_DETAILS(user.id)}>
          <Text ellipsis highlight={get(this.props, 'formSearchValue', '')}>
            {get(user, 'profile.firstName')} {get(user, 'profile.lastName')}
          </Text>
        </NavLink>
      ),
      sortable: false,
    },
    {
      id: 'user.email',
      Header: props => <HeaderCell {...props}>Email</HeaderCell>,
      accessor: user => <Text ellipsis>{get(user, 'profile.email', '')}</Text>,
      sortable: false,
    },
    {
      id: 'user.phone',
      Header: props => <HeaderCell {...props}>Phone</HeaderCell>,
      accessor: user => (
        <Text ellipsis>
          {get(user, 'profile.verifiedPrimaryPhoneNumber.normalizedNumber', '')}
        </Text>
      ),
      sortable: false,
    },
    {
      id: 'user.last_login',
      Header: props => <HeaderCell {...props}>Last Login</HeaderCell>,
      accessor: 'createdAt',
      Cell: ({ value }) => {
        const date = DateTime.fromISO(value)

        if (!DateTime.isDateTime(date)) return null

        return date.toFormat('LL/dd/yyyy')
      },
      sortable: false,
    },
    {
      Header: 'WRs created by user',
      columns: [
        {
          id: 'wrs.baby',
          Header: props => <HeaderCell {...props}>#Baby</HeaderCell>,
          accessor: user => (
            <Text ellipsis>{get(user, 'babyWaitingRoomsCount', 0)}</Text>
          ),
          sortable: false,
        },
        {
          id: 'wrs.omni',
          Header: props => <HeaderCell {...props}>#Omni</HeaderCell>,
          accessor: user => (
            <Text ellipsis>{get(user, 'omniWaitingRoomsCount', 0)}</Text>
          ),
          sortable: false,
        },
      ],
    },
    {
      Header: 'User guest in #WRs',
      columns: [
        {
          id: 'guest.baby',
          Header: props => <HeaderCell {...props}>#Baby</HeaderCell>,
          accessor: user => (
            <Text ellipsis>{get(user, 'babyRoomsParticipatingCount', 0)}</Text>
          ),
          sortable: false,
        },
        {
          id: 'guest.omni',
          Header: props => <HeaderCell {...props}>#Omni</HeaderCell>,
          accessor: user => (
            <Text ellipsis>{get(user, 'omniRoomsParticipatingCount', 0)}</Text>
          ),
          sortable: false,
        },
      ],
    },
  ]

  render() {
    const { data, paged, onPageChange, isLoaded, size } = this.props

    if (!isLoaded) return <Loader />

    return (
      <DataTable
        PaginationComponent={Pagination}
        className="-highlight"
        columns={this.columns}
        data={data}
        defaultPage={paged.number}
        defaultPageSize={size}
        defaultSorted={[{ id: 'createdAt' }]}
        filterable={false}
        loading={data.isLoading}
        manual
        pages={paged.pageCount || -1}
        resizable={false}
        style={{
          width: '100%',
          marginTop: '20px',
        }}
        onPageChange={onPageChange}
      />
    )
  }
}

UsersTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  paged: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default UsersTable
