import { mergers } from 'rapidux'

import mergeWith from 'lodash/mergeWith'
import reduce from 'lodash/reduce'
import set from 'lodash/set'

const reducers = {}

export default (state, action) =>
  mergeWith(
    {},
    state,
    reduce(
      reducers,
      (acc, reducer, key) => set(acc, key, reducer(state[key], action)),
      {},
    ),
    mergers.latestArrayMerger,
  )
