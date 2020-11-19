import { createAsyncAction } from 'Store/utils'

import apiCall from 'Services/Api'

export const LOAD_VIEWER = createAsyncAction('viewer/LOAD')
export const REFETCH_VIEWER = createAsyncAction('viewer/REFETCH')
export const UPLOAD_AVATAR = createAsyncAction('viewer/UPLOAD')

export const CLEAR_ERRORS = 'viewer/CLEAR_ERRORS'
export const LOG_OUT = 'viewer/LOG_OUT'

const viewerIncludes = [
  'emailCredential',
  'profile',
  'profile.ethnicity',
  'profile.militaryServiceType',
  'profile.personalPhoto',
  'profile.usState',
  'profile.socialSecurityCardPhoto',
  'profile.driverLicensePhoto',
  'profile.driverLicenseState',
]

export const loadViewer = () =>
  apiCall({
    endpoint: '/user',
    query: {
      include: viewerIncludes.join(),
    },
    types: LOAD_VIEWER,
  })

export const refetchViewer = () =>
  apiCall({
    endpoint: '/user',
    query: {
      include: viewerIncludes.join(),
    },
    types: REFETCH_VIEWER,
  })

export const uploadAvatar = file =>
  apiCall({
    endpoint: '/avatar',
    name: 'data[image]',
    file,
    types: UPLOAD_AVATAR,
  })

export const logOut = () => ({
  type: LOG_OUT,
})
