import { darken, lighten } from 'polished'

const palette = {
  navy: '#002839',
  darkTeal: '#003850',
  dodgerBlue: '#449aff',
  coolBlue: '#4582ca',
  lightBlue: '#96c6ff',
  blue: '#060e41',
  green: '#31d28f',
  yellow: '#ffec3e',
  orange: '#ff8827',
  salmon: '#ff6666',
  brownishGray: '#666666',
  silver: '#909090',
  brownGray: '#aeaeae',
  blueyGrey: '#a4a4ad',
  veryLightPink: '#c6c6c6',
  veryLightGray: '#ededed',
  lightGray: '#f1f5f6',
  white: '#ffffff',
  black: '#333333',
  blackOpacity: 'rgba(0, 0, 0, 0.5)',
}

const colors = {
  clear: 'rgba(255, 255, 255, 0)',
  clearFromBlack: 'rgba(0, 0, 0, 0)',

  bg: palette.white,

  // Colors
  primary: palette.darkTeal,
  secondary: palette.dodgerBlue,

  danger: palette.salmon,
  success: palette.green,

  ...palette,
}

colors.whiteHover = darken(0.05, colors.white)
colors.whiteActive = darken(0.1, colors.white)

colors.primaryHover = lighten(0.14, colors.primary)
colors.primaryActive = lighten(0.24, colors.primary)

colors.secondaryHover = lighten(0.14, colors.secondary)
colors.secondaryActive = lighten(0.24, colors.secondary)

// Fonts
colors.font = {
  primary: colors.black,
  secondary: palette.silver,
  link: colors.secondary,
  disabled: darken(0.1, palette.silver),
}

colors.gradients = {
  white: {
    toLeft: `linear-gradient(to left, ${colors.white}, ${colors.clear})`,
    toRight: `linear-gradient(to right, ${colors.white}, ${colors.clear})`,
    toTop: `linear-gradient(to top, ${colors.white}, ${colors.clear})`,
    toBottom: `linear-gradient(to bottom, ${colors.white}, ${colors.clear})`,
  },
}

export default colors
