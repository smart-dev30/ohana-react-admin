import { combineReducers } from 'redux'

import users from './users'
import waitingRooms from './waitingRooms'
import statistics from './statistics'
import headquarters from './headquarters'
import organizations from './organizations'
import promotionCodes from './promocodes'

export default combineReducers({
  users,
  waitingRooms,
  statistics,
  headquarters,
  organizations,
  promotionCodes,
})
