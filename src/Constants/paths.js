export const ROOT_PATH = '/'
export const APP_ROOT = `${ROOT_PATH}app/`
export const ADMIN_ROOT = `${ROOT_PATH}admin/`
export const AUTH_ROOT = `${ROOT_PATH}auth/`

// App paths
export const APP_PATHS = {
  DASHBOARD: `${APP_ROOT}dashboard`,
  SETTINGS: `${APP_ROOT}settings`,
}

// Public paths
export const PUBLIC_PATHS = {
  MOBILE_CONFIRM_EMAIL: `${ROOT_PATH}confirm_email`,
  MOBILE_CHANGE_PASSWORD: `${ROOT_PATH}change_password`,
  MOBILE_CHANGE_EMAIL: `${ROOT_PATH}change_email`,
  MOBILE_INVITATION: `${ROOT_PATH}invitation`,
}

// Auth paths
export const AUTH_PATHS = {
  SIGN_IN: `${AUTH_ROOT}sign-in`,
}

// Admin paths
export const ADMIN_PATHS = {
  DASHBOARD: `${ADMIN_ROOT}dashboard`,
  USERS: `${ADMIN_ROOT}users`,
  USER_DETAILS: userId => `${ADMIN_ROOT}users/${userId || ':userId'}`,
  WAITING_ROOMS: `${ADMIN_ROOT}waiting-rooms`,
  WAITING_ROOM_DETAILS: roomId =>
    `${ADMIN_ROOT}waiting-rooms/${roomId || ':roomId'}`,
  WAITING_ROOM_GUESTS: roomId =>
    `${ADMIN_ROOT}waiting-room/${roomId || ':roomId'}/guests`,
  PROMOTIONS: `${ADMIN_ROOT}promotions`,
  HEADQUARTER_DETAILS: headquarterId =>
    `${ADMIN_ROOT}headquarter/${headquarterId || ':headquarterId'}`,
  ORGANIZATION_DETAILS: organizationId =>
    `${ADMIN_ROOT}organization/${organizationId || ':organizationId'}`,
}
