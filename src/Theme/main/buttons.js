import { opacify } from 'polished'

import colors from './colors'

const HOVER_VALUE = 0.05

export default {
  bg: {
    white: colors.white,
    secondary: colors.secondary,
    disabled: colors.brownGray,
    default: colors.primary,
  },
  color: {
    white: colors.secondary,
    secondary: colors.white,
    disabled: colors.white,
    default: colors.white,
  },
  colorHover: {
    white: colors.lightBlue,
    secondary: colors.white,
    disabled: colors.white,
    default: colors.white,
  },
  shadow: {
    white: `0 0 15px 0 rgba(0, 0, 0, 0.1)`,
    secondary: `0 0 15px 0 rgba(0, 0, 0, 0.1)`,
    default: `0 0 15px 0 rgba(0, 0, 0, 0.2)`,
  },
  shadowActive: {
    white: `0 0 15px 0 rgba(0, 0, 0, 0.05)`,
    secondary: `none`,
    default: `none`,
  },
  hover: {
    white: opacify(HOVER_VALUE, colors.white),
    disabled: colors.brownGray,
    secondary: opacify(HOVER_VALUE, colors.secondaryHover),
    default: opacify(HOVER_VALUE, colors.primaryHover),
  },
}
