import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import data from './data'
import admin from './admin'
import auth from './auth'
import app from './app'
import persist from './persist'
import viewer from './viewer'
import ui from './ui'

export default history =>
  combineReducers({
    app,
    persist,
    viewer,
    auth,
    router: connectRouter(history),
    data,
    admin,
    ui,
  })
