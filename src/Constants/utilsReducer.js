import set from 'lodash/set'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { DateTime } from 'luxon'
import { transformToNormalizedPhoneNumber } from '../Services/Utils'

const userFormReducer = payload => (acc, value, key) => {
  switch (key) {
    case 'email':
      set(acc, 'profile.email.ilike', `%${value}%`)

      break
    case 'fullname':
      if (value.value !== 'all') {
        set(acc, 'profile.fullName.ilike', `%${value}%`)
      }
      break
    case 'laborKind':
      if (value.value !== 'all') {
        set(acc, 'laborKind.eq', value.value)
      }
      break
    case 'kind':
      if (value.value !== 'all') {
        set(acc, 'kind.eq', value.value)
      }
      break
    case 'userId': {
      set(acc, 'userId.eq', value)
      break
    }
    case 'checkinStatus': {
      set(acc, 'status.eq', value)
      break
    }
    case 'date_range': {
      const from = DateTime.fromJSDate(value.from)
      const to = DateTime.fromJSDate(value.to)

      if (!from.invalid && !to.invalid) {
        set(acc, 'date_range.between', [from.toISO(), to.toISO()])
      }

      break
    }
    case 'startAt': {
      const from = DateTime.fromJSDate(value.from)
      const to = DateTime.fromJSDate(value.to)

      if (!from.invalid && !to.invalid) {
        set(acc, 'startAt.between', [from.toISO(), to.toISO()])
      }

      break
    }
    case 'createdAt': {
      const date = DateTime.fromJSDate(value)

      if (!date.invalid) {
        set(acc, 'createdAt.between', [
          date.toISO(),
          date.plus({ days: 1 }).toISO(),
        ])
      }

      break
    }
    case 'updatedAt': {
      const date = DateTime.fromJSDate(value)

      if (!date.invalid) {
        set(acc, 'updatedAt.between', [
          date.toISO(),
          date.plus({ days: 1 }).toISO(),
        ])
      }
      break
    }
    case 'lastLogin': {
      const date = DateTime.fromJSDate(value)

      if (!date.invalid) {
        set(acc, 'lastLogin.qt', date.toISO())
      }
      break
    }
    case 'search': {
      if (payload.type === 'projects') {
        set(acc, 'name.ilike', `%${value}%`)
      } else {
        set(acc, 'profile.fullName.ilike', `%${value}%`)
      }
      break
    }
    case 'phone':
      {
        const phoneNumber = transformToNormalizedPhoneNumber(value)
        set(
          acc,
          'profile.verifiedPrimaryPhoneNumber.normalizedNumber.like',
          `%${phoneNumber}%`,
        )
      }
      break
    default:
      break
  }

  return acc
}

const WRFormReducer = (acc, value, key) => {
  switch (key) {
    case 'fullname':
      if (value.value !== 'all') {
        set(acc, 'name.ilike', `%${value}%`)
      }
      break
    case 'ownerName':
      if (value.value !== 'all') {
        set(acc, 'createdBy.profile.fullName.like', `%${value.value}%`)
      }
      break
    case 'createdAt': {
      const date = DateTime.fromJSDate(value)

      if (!date.invalid) {
        set(acc, 'createdAt.between', [
          date.toISO(),
          date.plus({ days: 1 }).toISO(),
        ])
      }
      break
    }
    case 'kind':
      if (get(value, 'value')) {
        set(acc, 'kind.eq', value.value)
      }
      break
    default:
      break
  }

  return acc
}

const headquarterFormReducer = (acc, value, key) => {
  switch (key) {
    case 'headquarterName':
      if (value.value !== 'all') {
        set(acc, 'name.ilike', `%${value}%`)
      }
      break

    default:
      break
  }

  return acc
}

const organizationFormReducer = (acc, value, key) => {
  switch (key) {
    case 'organizationName':
      if (value.value !== 'all') {
        set(acc, 'name.ilike', `%${value}%`)
      }
      break
    case 'headquarterName':
      set(acc, 'headquarter.name.ilike', `%${value}%`)
      break
    default:
      break
  }
  return acc
}

const promocodeFormReducer = (acc, value, key) => {
  switch (key) {
    case 'promotionCodesName':
      if (value.value !== 'all') {
        set(acc, 'code.ilike', `%${value}%`)
      }
      break
    case 'promotionCodesState':
      if (!isEmpty(value)) {
        set(acc, 'state.eq', value.value)
      }
      break

    default:
      break
  }
  return acc
}

export const formReducer = payload => {
  const type = get(payload, 'type') || ''
  switch (type) {
    case 'waitingRooms':
      return WRFormReducer
    case 'users':
      return userFormReducer(payload)
    case 'headquarters':
      return headquarterFormReducer
    case 'organizations':
      return organizationFormReducer
    case 'promotionCodes':
      return promocodeFormReducer
    default:
      return null
  }
}

export default {}
