import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'rebass'

import get from 'lodash/get'

import { ADMIN_PATHS } from 'Constants/paths'

import { Title, Button, Icon } from 'Components/UI'

import { chevronLeftGlyph } from 'Assets/Svg'

import WaitingRoomGuestsTable from './WaitingRoomGuestsTable'

class WaitingRoomsGuests extends PureComponent {
  state = {
    isLoaded: true,
  }

  componentDidMount() {
    const {
      onLoadWaitingRoom,
      onLoadWaitingRoomInvitations,
      match,
    } = this.props
    const id = get(match, 'params.roomId') || 0
    onLoadWaitingRoom(id)
    onLoadWaitingRoomInvitations(id)
  }

  handleClickBack = () => {
    const { history, match } = this.props
    const id = get(match, 'params.roomId') || 0
    history.push(ADMIN_PATHS.WAITING_ROOM_DETAILS(id))
  }

  render() {
    const { history, waitingRoom } = this.props
    const { isLoaded } = this.state
    const name = get(waitingRoom, 'entity.name') || ''
    const tableData = get(waitingRoom, 'entity.roomsParticipants') || []
    return (
      <div>
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Title>Waiting Room {name}</Title>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Button white onClick={this.handleClickBack}>
            <Icon
              fill="dodgerBlue"
              glyph={chevronLeftGlyph}
              size={20}
              stroke="dodgerBlue"
            />
            Waiting Rooms
          </Button>
        </Flex>
        <Flex flexWrap="wrap">
          <WaitingRoomGuestsTable
            data={tableData}
            history={history}
            isLoaded={isLoaded}
          />
        </Flex>
      </div>
    )
  }
}

WaitingRoomsGuests.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  waitingRoom: PropTypes.object.isRequired,
  onLoadWaitingRoom: PropTypes.func.isRequired,
  onLoadWaitingRoomInvitations: PropTypes.func.isRequired,
}

export default WaitingRoomsGuests
