import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withRouter } from 'react-router'
import { createStructuredSelector } from 'reselect'

import get from 'lodash/get'
import map from 'lodash/map'

import { Loader, DataTable, Text, MenuButton } from 'Components/UI'

import {
  requestDeleteInvitation,
  requestDeleteParticipant,
  resendEmailConfirmation,
} from 'Store/Actions/admin/waitingRooms'
import { getWaitingRoomsInvitations } from 'Store/Selectors/admin/waitingRooms'
import { updateRoomParticipants } from 'Store/Actions/admin/roomsParticipants'

import {
  resendInvationGlyph,
  removeFromRoomGlyph,
  makeHelperGlyph,
  removeHelperGlyph,
} from 'Assets/Svg/Table'

import Confirm from 'Components/Blocks/Admin/Modals/Confirm'

const { HeaderCell, Pagination } = DataTable

class WaitingRoomGuestsTable extends PureComponent {
  state = {
    isConfirmOpen: false,
    selectedUserAction: '',
    selectedRow: {},
  }

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
      id: 'wr.status',
      Header: props => <HeaderCell {...props}>Status</HeaderCell>,
      accessor: 'status',
      sortable: false,
    },

    {
      Header: props => (
        <HeaderCell {...props} justifyContent="center">
          Action
        </HeaderCell>
      ),
      width: 64,
      accessor: 'id',
      Cell: row => <MenuButton actions={this.generateButtons(row)} />,
      style: { overflow: 'visible' },
      sortable: false,
    },
  ]

  generateButtons = row => {
    const buttons = []
    const status = get(row, 'original.status') || ''
    if (status === 'pending') {
      buttons.push({
        key: 'Resend Invation',
        glyph: resendInvationGlyph,
        label: 'Resend Invation',
        entity: row.original.id,
        onSelect: () => {
          this.handleOpenConfirm('invite', get(row, 'original'))
        },
      })
    }
    if (status === 'guest' || status === 'helper') {
      buttons.push({
        key: 'Remove From Waiting Room',
        glyph: removeFromRoomGlyph,
        label: 'Remove From Waiting Room',
        entity: row.original.id,
        onSelect: () => {
          this.handleOpenConfirm('removePaticipant', get(row, 'original'))
        },
      })
    }
    if (status === 'pending') {
      buttons.push({
        key: 'Remove Invitation',
        glyph: removeFromRoomGlyph,
        label: 'Remove Invitation',
        entity: row.original.id,
        onSelect: () => {
          this.handleOpenConfirm('removeInvite', get(row, 'original'))
        },
      })
    }
    if (status === 'guest') {
      buttons.push({
        key: 'Make a helper',
        glyph: makeHelperGlyph,
        label: 'Make a helper',
        entity: row.original.id,
        onSelect: () => {
          this.handleOpenConfirm('addHelper', get(row, 'original'))
        },
      })
    }
    if (status === 'owner' || status === 'helper') {
      buttons.push({
        key: 'activateDeactivate',
        glyph: removeHelperGlyph,
        entity: row.original.id,
        label:
          get(row, 'original.state') === 'active'
            ? 'Make a helper'
            : 'Remove From Helpers',
        onSelect: () => {
          this.handleOpenConfirm('removeHelper', get(row, 'original'))
        },
      })
    }
    return buttons
  }

  getTableData = () => {
    const { data, waitingRoomInvitations } = this.props
    const guestsList = map(data, item => {
      const id = get(item, 'id')
      const name = get(item, 'user.profile.firstName')
      const email = get(item, 'user.profile.email')
      const status = item.role
      return {
        id,
        name,
        email,
        status,
      }
    })
    const invitationsList = map(waitingRoomInvitations, item => {
      const id = get(item, 'id')
      const name = get(item, 'name')
      const email = get(item, 'normalizedNumber') || get(item, 'email')
      const status = item.state
      return {
        id,
        name,
        email,
        status,
      }
    })
    return [...guestsList, ...invitationsList]
  }

  handleOpenConfirm = (action, selectedRow) => {
    this.setState({
      isConfirmOpen: true,
      selectedUserAction: action,
      selectedRow,
    })
  }

  handleCloseConfirm = () => {
    this.setState({
      isConfirmOpen: false,
      selectedRow: {},
    })
  }

  handleResendConfirmation = () => {
    const { onResendEmailConfirmation, match } = this.props
    const { selectedRow } = this.state
    const waitingRoomId = get(match, 'params.roomId') || 0
    onResendEmailConfirmation({ id: selectedRow.id, waitingRoomId })
    this.handleCloseConfirm()
  }

  handleMakeAHelper = () => {
    const { onRequestChangeRoomParticipant } = this.props
    const { selectedRow } = this.state
    onRequestChangeRoomParticipant({ userId: selectedRow.id, role: 'helper' })
    this.handleCloseConfirm()
  }

  handleMakeAGuest = () => {
    const { onRequestChangeRoomParticipant } = this.props
    const { selectedRow } = this.state
    onRequestChangeRoomParticipant({ userId: selectedRow.id, role: 'guest' })
    this.handleCloseConfirm()
  }

  handleDeleteInvitationConfirm = () => {
    const { onRequestDeleteInvitation, match } = this.props
    const { selectedRow } = this.state
    const waitingRoomId = get(match, 'params.roomId') || 0
    onRequestDeleteInvitation({ id: selectedRow.id, waitingRoomId })
    this.handleCloseConfirm()
  }

  handleDeleteParticipantConfirm = () => {
    const { onRequestDeleteParticipant } = this.props
    const { selectedRow } = this.state
    onRequestDeleteParticipant({ id: selectedRow.id })
    this.handleCloseConfirm()
  }

  handleConfirmCallback = () => {
    const { selectedUserAction } = this.state

    const ACTION_CALLBACKS = {
      invite: this.handleResendConfirmation,
      removeInvite: this.handleDeleteInvitationConfirm,
      removePaticipant: this.handleDeleteParticipantConfirm,
      addHelper: this.handleMakeAHelper,
      removeHelper: this.handleMakeAGuest,
    }

    return ACTION_CALLBACKS[selectedUserAction]()
  }

  render() {
    const { isLoaded } = this.props
    const { isConfirmOpen } = this.state
    if (!isLoaded) return <Loader />
    return (
      <Fragment>
        <Confirm
          isOpen={isConfirmOpen}
          title="Are you sure ?"
          onCallback={this.handleCloseConfirm}
          onConfirm={this.handleConfirmCallback}
        />

        <DataTable
          className="-highlight"
          columns={this.columns}
          data={this.getTableData()}
          defaultPage={1}
          defaultPageSize={1}
          filterable={false}
          manual
          pages={1}
          // eslint-disable-next-line react/jsx-sort-props
          PaginationComponent={Pagination}
          // onPageChange={onPageChange}
          // onPageSizeChange={onPageSizeChange}
          resizable={false}
          style={{
            width: '100%',
            marginTop: '20px',
          }}
          // onSortedChange={onSortedChange}
        />
      </Fragment>
    )
  }
}

WaitingRoomGuestsTable.propTypes = {
  data: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  waitingRoomInvitations: PropTypes.array,
  onRequestChangeRoomParticipant: PropTypes.func.isRequired,
  onRequestDeleteInvitation: PropTypes.func.isRequired,
  onRequestDeleteParticipant: PropTypes.func.isRequired,
  onResendEmailConfirmation: PropTypes.func.isRequired,
  // paged: PropTypes.object.isRequired,
  // onPageChange: PropTypes.func.isRequired,
  // onPageSizeChange: PropTypes.func.isRequired,
}

WaitingRoomGuestsTable.defaultProps = {
  waitingRoomInvitations: [],
}

export default compose(
  withRouter,
  connect(
    createStructuredSelector({
      waitingRoomInvitations: getWaitingRoomsInvitations,
    }),
    {
      onResendEmailConfirmation: resendEmailConfirmation,
      onRequestDeleteInvitation: requestDeleteInvitation,
      onRequestDeleteParticipant: requestDeleteParticipant,
      onRequestChangeRoomParticipant: updateRoomParticipants,
    },
  ),
)(WaitingRoomGuestsTable)
