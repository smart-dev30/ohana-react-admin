import { USER_TYPES } from './types'

const access = {
  [USER_TYPES.admins]: {
    can: {
      create: ['all'],
      read: ['all'],
      update: ['all'],
      delete: ['all'],
    },
  },
}

export default access
