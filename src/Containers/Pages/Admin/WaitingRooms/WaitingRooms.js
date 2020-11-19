import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'rebass'

// import get from 'lodash/get'

import { FilterForm } from 'Components/Blocks/Admin'
import { Title } from 'Components/UI'

import WaitingRoomsTable from './WaitingRoomsTable'

const { WaitingRoomsFilterForm } = FilterForm

class WaitingRooms extends PureComponent {
  state = {
    isLoaded: true,
    // isEmpty: false,
  }

  componentDidMount = async () => {
    const { onLoadWaitingRooms, waitingRooms, paged } = this.props

    if (!waitingRooms.isLoaded) {
      const result = await onLoadWaitingRooms({
        paged: true,
        filters: {},
        ...paged,
      })

      if (result) {
        this.setState({
          isLoaded: true,
          // isEmpty: get(result, 'paged.recordCount', 0) < 1,
        })
      }
    } else {
      this.setState({ isLoaded: true })
    }
  }

  handleSearchUser = values => {
    return values
  }

  onPageChanged = number => {
    const { onPageChange } = this.props
    onPageChange('waitingRooms', number + 1)
  }

  render() {
    const {
      history,
      waitingRooms,
      paged,
      // onPageChange,
      onPageSizeChange,
    } = this.props
    const { onPageChanged } = this
    const { isLoaded } = this.state
    return (
      <div>
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Title>Waiting Rooms</Title>
        </Flex>
        <Flex flexWrap="wrap">
          <WaitingRoomsFilterForm />
          <WaitingRoomsTable
            data={waitingRooms.entities}
            defaultPage={paged.number}
            history={history}
            isLoaded={isLoaded}
            paged={paged}
            onPageChange={onPageChanged}
            onPageSizeChange={onPageSizeChange}
          />
        </Flex>
      </div>
    )
  }
}

WaitingRooms.propTypes = {
  history: PropTypes.object.isRequired,
  paged: PropTypes.object.isRequired,
  waitingRooms: PropTypes.object.isRequired,
  onLoadWaitingRooms: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
}

export default WaitingRooms
