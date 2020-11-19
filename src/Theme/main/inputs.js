import { css } from 'styled-components'
import { themeGet } from 'styled-system'

export default {
  label: {
    font: {
      default: css`
        font-size: ${themeGet('fontSizes.1')}px;
        font-weight: bold;
      `,
    },
  },
  select: {
    font: {
      default: css`
        font-size: ${themeGet('fontSizes.3')}px;
      `,
    },
    padding: {
      default: props => `0 ${props.icon ? 22 : 16}px`,
    },
    border: {
      error: css`
        border: 1px solid ${themeGet('colors.danger')};
      `,
      default: css`
        border: 1px solid ${themeGet('colors.blueyGrey')};
      `,
    },
    bg: {
      default: themeGet('colors.white'),
    },
  },
  field: {
    font: {
      default: css`
        font-size: ${themeGet('fontSizes.3')}px;
      `,
    },
    padding: {
      default: props =>
        `4px ${props.icon ? 32 : 16}px 7px ${props.icon ? 32 : 16}px`,
    },
    border: {
      error: css`
        border: 1px solid ${themeGet('colors.danger')};
      `,
      default: css`
        border: 1px solid ${themeGet('colors.blueyGrey')};
      `,
    },
    bg: {
      default: themeGet('colors.clear'),
    },
    borderHover: {
      default: themeGet('colors.primary'),
    },
  },
}
