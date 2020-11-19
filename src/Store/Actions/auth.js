import apiCall from 'Services/Api'

import { createAsyncAction } from 'Store/utils'

export const AUTHENTICATE = createAsyncAction('auth/AUTHENTICATE')
export const CONFIRM_EMAIL = createAsyncAction('auth/CONFIRM_EMAIL')
export const RESET_PASSWORD = createAsyncAction('auth/RESET_PASSWORD')
export const CHANGE_PASSWORD = createAsyncAction('auth/CHANGE_PASSWORD')

export const signIn = (email, password) =>
  apiCall({
    method: 'POST',
    endpoint: '/user/tokens',
    query: {
      data: {
        type: 'tokens',
        attributes: {
          email,
          password,
        },
      },
    },
    types: AUTHENTICATE,
    needsNormalization: false,
    withoutAuthorization: true,
  })

export const authenticateByToken = token =>
  apiCall({
    method: 'POST',
    endpoint: '/user/tokens',
    query: {
      data: {
        type: 'tokens',
        attributes: {
          token,
        },
      },
    },
    types: AUTHENTICATE,
    needsNormalization: false,
    withoutAuthorization: true,
  })

export const confirmEmail = token =>
  apiCall({
    method: 'POST',
    endpoint: '/confirm_email',
    query: {
      data: {
        attributes: {
          token,
        },
      },
    },
    types: CONFIRM_EMAIL,
    withoutAuthorization: true,
  })

export const resetPassword = email =>
  apiCall({
    method: 'POST',
    endpoint: '/reset_password',
    query: {
      data: {
        attributes: {
          email,
        },
      },
    },
    types: RESET_PASSWORD,
    withoutAuthorization: true,
  })

export const changePassword = ({ token, password, passwordConfirmation }) =>
  apiCall({
    method: 'POST',
    endpoint: '/change_password',
    query: {
      data: {
        attributes: {
          token,
          password,
          passwordConfirmation,
        },
      },
    },
    types: CHANGE_PASSWORD,
    withoutAuthorization: true,
  })
