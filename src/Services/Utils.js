import qs from 'qs'

import get from 'lodash/get'
import pick from 'lodash/pick'
import head from 'lodash/head'

import { ADMIN_ROOT, ROOT_PATH } from 'Constants/paths'

import { MOBILE_TYPES, USER_TYPES } from 'Constants/types'

import {
  AuthorizedRedirector,
  UnauthorizedRedirector,
} from 'Containers/Redirectors'

export const getFullLocation = location =>
  `${get(location, 'pathname', '/')}${get(location, 'search', '')}${get(
    location,
    'hash',
    '',
  )}`

export const checkConfirmation = location => {
  const { auth_token: authToken, confirmation_token: confirmationToken } = pick(
    qs.parse(location.search.replace('?', '')),
    ['auth_token', 'confirmation_token'],
  )
  if (authToken && confirmationToken) {
    return {
      authToken,
      confirmationToken,
    }
  }
  return false
}

export const getViewerRoot = viewer => {
  switch (viewer.type) {
    case USER_TYPES.admins:
    case USER_TYPES.superAdmins:
      return ADMIN_ROOT

    default:
      return ROOT_PATH
  }
}

export const redirectAuthorized = viewer => component =>
  viewer.isAuthenticated ? AuthorizedRedirector : component

export const redirectUnauthorized = viewer => component =>
  !viewer.isAuthenticated ? UnauthorizedRedirector : component

export const addUSCode = phoneNumber =>
  phoneNumber ? `+1 ${phoneNumber}` : null

export const isOnboarded = (viewer, viewerType) =>
  viewerType === USER_TYPES.superAdmins ||
  get(viewer, 'profile.onboardingCompleted')

export const getSelectValue = (value, label) => ({
  value,
  label: label || value,
})

export const getSearchString = string => string.toLowerCase().replace(/ /g, '')

export const getProfileFullName = (firstName = '', lastName) =>
  `${firstName}${lastName ? ` ${lastName}` : ''}`

export const getCreatedDataId = (result, type) =>
  head(Object.keys(get(result, ['payload', 'data', type], {})))

export const transformToNormalizedPhoneNumber = phoneNumber => {
  return phoneNumber.replace(/[\s()-]+/gi, '')
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/android/i.test(userAgent)) {
    return MOBILE_TYPES.android
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return MOBILE_TYPES.iOS
  }

  return MOBILE_TYPES.unknown
}
