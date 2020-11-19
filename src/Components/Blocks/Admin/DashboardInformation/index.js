import { connect } from 'react-redux'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'

import { loadStatistic } from 'Store/Actions/admin/statistics'
import { getStatistics, getIsLoaded } from 'Store/Selectors/admin/statistics'

import Component from './DashboardInformation'

export default compose(
  connect(
    createStructuredSelector({
      statistics: getStatistics,
      isLoaded: getIsLoaded,
    }),
    {
      onLoadStatistic: loadStatistic,
    },
  ),
)(Component)
