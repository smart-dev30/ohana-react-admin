import { mergers } from 'rapidux'

import get from 'lodash/get'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import mergeWith from 'lodash/mergeWith'

import { LOG_OUT } from 'Store/Actions/viewer'

import handlersReducer from './handlers'

const initialState = {
  withoutImmutable: true,
}

const excludedReducers = []

export default (state = initialState, action) => {
  const data = get(action, 'payload.data')
  const ok = get(action, 'ok', false)
  const isRaw = get(action, 'isRaw', false)

  if (action.type === LOG_OUT) {
    return mergeWith(
      pick(state, excludedReducers),
      initialState,
      mergers.latestArrayMerger,
    )
  }

  if (data && ok && !isRaw) {
    const nextState = mergeWith(
      {},
      state,
      omit(data, 'meta'),
      mergers.latestArrayMerger,
    )

    // Listen only for API success events
    return handlersReducer(nextState, action)
  }

  return state
}
