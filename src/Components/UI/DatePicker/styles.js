import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'

import DayPicker from 'react-day-picker'

export const Picker = styled(DayPicker)`
  background-color: ${themeGet('colors.bg')};
  border-radius: 4px;
  border: 1px solid ${themeGet('colors.blueyGrey')};
  box-shadow: ${themeGet('shadow')};

  .DayPicker-Day {
    :focus {
      outline: none;
    }
    :hover & {
      background-color: ${themeGet('colors.primary')}17;
    }
  }

  .DayPicker-Day--start,
  .DayPicker-Day--end {
    background-color: ${themeGet('colors.primary')} !important;
    color: ${themeGet('colors.bg')} !important;
  }

  .DayPicker-Day--selected {
    border: none !important;
    outline: none !important;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: ${themeGet('colors.primary')}17 !important;
    color: ${themeGet('colors.primary')};
  }
`

export default {}
