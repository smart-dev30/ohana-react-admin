import get from 'lodash/get'

import themes from './themes'

export const getColorFromBg = bg => props =>
  `${get(props.theme, `colors.${bg}`, 'primary')}`

export default themes
