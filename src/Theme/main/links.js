import { darken, lighten } from 'polished'

import colors from './colors'

export default {
  color: {
    light: colors.brownishGray,
    default: colors.secondary,
  },
  hover: {
    light: darken(0.2, colors.brownishGray),
    default: darken(0.2, colors.secondary),
  },
  active: {
    light: lighten(0.2, colors.brownishGray),
    default: lighten(0.2, colors.secondary),
  },
}
