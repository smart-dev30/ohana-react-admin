import { createAsyncAction } from 'Store/utils'

import apiCall from 'Services/Api'

export const LOAD_STATISTIC = createAsyncAction('admin/statistic/LOAD')

export const loadStatistic = () =>
  apiCall({
    endpoint: '/admin/statistic',
    needsNormalization: false,
    types: LOAD_STATISTIC,
  })
