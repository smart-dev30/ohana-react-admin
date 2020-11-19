import { useMemo } from 'react'

import get from 'lodash/get'

export default ({ statistics }) => {
  return useMemo(() => {
    const babyWaitingRoomsCount = get(statistics, 'babyWaitingRoomsCount')
    const currentMonthAcceptedBabyInvitationsCount = get(
      statistics,
      'currentMonthAcceptedBabyInvitationsCount',
    )
    const currentMonthAcceptedInvitationsCount = get(
      statistics,
      'currentMonthAcceptedInvitationsCount',
    )
    const currentMonthAcceptedOmniInvitationsCount = get(
      statistics,
      'currentMonthAcceptedOmniInvitationsCount',
    )
    const omniWaitingRoomsCount = get(statistics, 'omniWaitingRoomsCount')
    const usersCount = get(statistics, 'usersCount')
    const waitingRoomsCount = get(statistics, 'waitingRoomsCount')

    return {
      babyWaitingRoomsCount,
      currentMonthAcceptedBabyInvitationsCount,
      currentMonthAcceptedInvitationsCount,
      currentMonthAcceptedOmniInvitationsCount,
      omniWaitingRoomsCount,
      usersCount,
      waitingRoomsCount,
    }
  }, [statistics])
}
