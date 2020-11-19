import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'

import { Loader, Text } from 'Components/UI'

import DashboardTable from './DashboardTable'
import useNormalizedData from './useNormalizedData'

function DashboardInformation({ statistics, isLoaded, onLoadStatistic }) {
  useEffect(() => {
    if (isEmpty(statistics)) {
      onLoadStatistic()
    }
  }, [statistics])

  const {
    babyWaitingRoomsCount,
    currentMonthAcceptedBabyInvitationsCount,
    currentMonthAcceptedInvitationsCount,
    currentMonthAcceptedOmniInvitationsCount,
    omniWaitingRoomsCount,
    usersCount,
    waitingRoomsCount,
  } = useNormalizedData({ statistics })

  if (!isLoaded) return <Loader />

  return (
    <DashboardTable
      data={[
        {
          type: 'Baby',
          usersCount: 0,
          wrCount: babyWaitingRoomsCount,
          invitesCount: currentMonthAcceptedBabyInvitationsCount,
        },
        {
          type: 'Omni',
          usersCount: 0,
          wrCount: omniWaitingRoomsCount,
          invitesCount: currentMonthAcceptedOmniInvitationsCount,
        },
        {
          type: <Text fontWeight="bold">Total amount</Text>,
          usersCount: <Text fontWeight="bold">{usersCount}</Text>,
          wrCount: <Text fontWeight="bold">{waitingRoomsCount}</Text>,
          invitesCount: (
            <Text fontWeight="bold">
              {currentMonthAcceptedInvitationsCount}
            </Text>
          ),
        },
      ]}
    />
  )
}

DashboardInformation.defaultProps = {
  isLoaded: false,
}

DashboardInformation.propTypes = {
  isLoaded: PropTypes.bool,
  statistics: PropTypes.object.isRequired,
  onLoadStatistic: PropTypes.func.isRequired,
}

export default DashboardInformation
