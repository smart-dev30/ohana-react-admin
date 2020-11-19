import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'

import get from 'lodash/get'
import map from 'lodash/map'
import capitalize from 'lodash/capitalize'

import { Loader, DataTable, Text } from 'Components/UI'

const { HeaderCell, Pagination } = DataTable

class WaitingRoomsTable extends PureComponent {
  columns = [
    {
      id: 'name',
      Header: props => <HeaderCell {...props}>Name</HeaderCell>,
      accessor: 'name',
      aggregate: row => <Text ellipsis>{get(row, 'name')}</Text>,
      sortable: false,
    },
    {
      id: 'email',
      Header: props => <HeaderCell {...props}>Email</HeaderCell>,
      accessor: row => <Text ellipsis>{get(row, 'email', '')}</Text>,
      sortable: false,
    },
    {
      id: 'wr.createdAt',
      Header: props => <HeaderCell {...props}>Date Created</HeaderCell>,
      accessor: 'createdAt',
      Cell: ({ value }) => {
        const date = DateTime.fromISO(value)

        if (!DateTime.isDateTime(date)) return null

        return date.toFormat('LL/dd/yyyy')
      },
      sortable: false,
    },
    {
      id: 'wr.users',
      Header: props => <HeaderCell {...props}>#Users in the room</HeaderCell>,
      accessor: row => <Text ellipsis>{get(row, 'users', '0')}</Text>,
      sortable: false,
    },
    {
      id: 'wr.type',
      Header: props => <HeaderCell {...props}>WR Type</HeaderCell>,
      accessor: row => <Text ellipsis>{get(row, 'wrType', '')}</Text>,
      sortable: false,
    },
    {
      id: 'wr.plan',
      Header: props => <HeaderCell {...props}>PLAN</HeaderCell>,
      accessor: wr => <Text ellipsis>{get(wr, 'planType', '')}</Text>,
      sortable: false,
    },
  ]

  render() {
    const { data, onPageChange, onPageSizeChange, paged } = this.props

    if (!data) return <Loader />

    const remappedData = map(data, wr => ({
      id: wr.id,
      name: wr.name,
      email: get(wr, 'createdBy.profile.email'),
      createdAt: get(wr, 'createdAt'),
      users: get(wr, 'roomsParticipantsCount'),
      wrType: capitalize(get(wr, 'kind')),
      planType: capitalize(get(wr, 'createdBy.plan')),
    }))

    return (
      <Fragment>
        <DataTable
          className="-highlight"
          columns={this.columns}
          data={remappedData}
          defaultPage={paged.currentPage}
          defaultPageSize={10}
          filterable={false}
          getTrProps={(state, rowInfo) => ({
            style: {
              cursor: 'pointer',
            },
            onClick: () => {
              const wrId = get(rowInfo, 'original.id')
              const { history } = this.props
              history.push(`/admin/waiting-rooms/${wrId}`)
            },
          })}
          manual
          page={(paged.currentPage || 1) - 1}
          pages={get(paged, 'pageCount') || -1}
          // eslint-disable-next-line react/jsx-sort-props
          PaginationComponent={Pagination}
          resizable={false}
          style={{
            width: '100%',
            marginTop: '20px',
          }}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          // onSortedChange={onSortedChange}
        />
      </Fragment>
    )
  }
}

WaitingRoomsTable.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  paged: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
}

export default WaitingRoomsTable
