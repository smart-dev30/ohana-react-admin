import 'react-toastify/dist/ReactToastify.min.css'
import 'react-table/react-table.css'
import 'react-day-picker/lib/style.css'

import colors from './colors'
import buttons from './buttons'
import inputs from './inputs'
import links from './links'

import './Styles/fonts.css'

import baseTheme from '../baseTheme'

const theme = {
  ...baseTheme,

  name: 'Main theme',

  colors,

  buttons,

  inputs,

  links,
}

export default theme
