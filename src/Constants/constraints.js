import validate from 'validate.js'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { addUSCode } from 'Services/Utils'

validate.validators.phoneNumber = (value, options) => {
  if (!value && !options.presence) return undefined

  const usPhoneNumber = addUSCode(value)
  if (!usPhoneNumber) return options.message

  const phoneNumber = parsePhoneNumberFromString(usPhoneNumber)
  if (!phoneNumber) return options.message

  return phoneNumber.isValid() ? undefined : options.message
}

export const emailConstraint = {
  email: {
    presence: true,
    email: {
      message: 'should be correct',
    },
  },
}

export const passwordConstraint = {
  password: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 characters',
    },
  },
}

export const phoneNumberConstraint = (field, presence = false) => ({
  [field]: {
    phoneNumber: {
      presence,
      message: 'is invalid',
    },
  },
})

export const passwordConfirmationConstraint = {
  passwordConfirmation: {
    presence: true,
    equality: 'password',
  },
}

export const typeConstraint = {
  type: {
    presence: true,
  },
}

export const fieldLengthConstraint = (field, maximum = 30, minimum = 2) => ({
  [field]: {
    presence: true,
    length: {
      maximum,
      minimum,
      message: `must be ${minimum}-${maximum} characters`,
    },
  },
})

export const presenceFieldConstraint = (field, presence = true) => ({
  [field]: { presence },
})

export const presenceFieldNumberConstraint = (
  field,
  presence = true,
  maximum = 4,
  minimum = 1,
) => ({
  [field]: {
    format: {
      pattern: '^[1-9][0-9]*$',
      message: 'allow only positive numbers',
    },
    length: {
      maximum,
      minimum,
      message: `must be ${minimum}-${maximum} characters`,
    },
    presence,
  },
})

export const checkboxConstraint = field => ({
  [field]: {
    presence: true,
    inclusion: { within: [true], message: 'should be selected' },
  },
})

export const birthdayConstraint = {
  birthday: {
    presence: true,
    format: /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/,
  },
}

export const socialSecurityConstraint = {
  socialSecurity: {
    presence: true,
    length: {
      is: 9,
    },
    format: /[1-9]+/,
  },
}

export const zipConstraint = {
  zip: {
    presence: true,
    format: /\d{5}(-\d{4})?/,
  },
}
