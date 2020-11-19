import map from 'lodash/map'

export const USER_TYPES = {
  superAdmins: 'superAdmins',
}

export const HUMAN_USER_TYPES = {
  [USER_TYPES.superAdmins]: 'Admin',
}

export const MOBILE_TYPES = {
  iOS: 'iOS',
  android: 'android',
  unknown: 'unknown',
}

export const WR_TYPES = {
  baby: 'Baby',
  health: 'Health',
}

export const WR_SELECT_OPTIONS = map(WR_TYPES, (wr, index) => {
  return {
    label: wr,
    value: index,
  }
})
