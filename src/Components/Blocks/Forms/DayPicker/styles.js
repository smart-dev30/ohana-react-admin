import styled, { css } from 'styled-components'
import { themeGet, alignSelf, space } from 'styled-system'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { Flex } from 'rebass'

import { calendarGlyph } from 'Assets/Svg'

import { Icon } from 'Components/UI'

export const StyledDayPickerInput = styled(DayPickerInput)``

const activeCss = props =>
  props.active &&
  css`
    &:focus {
      border: 1px solid ${themeGet('colors.primary')} !important;
    }
  `

const errorCss = props =>
  props.error &&
  css`
    border-color: ${themeGet('colors.danger')} !important;
  `

export const Container = styled(Flex).attrs({
  width: 1,
})`
  flex-direction: column;
  position: relative;
  color: ${themeGet('colors.gray')};
  border-radius: 8px;

  ${props =>
    props.joined &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `};

  ${space};

  .DayPickerInput {
    margin-top: 0px;
    height: 40px;
    width: 100%;

    > input {
      height: 40px;
      width: 100%;
      margin: 0;
      padding: 4px 16px 7px 16px;
      border-radius: 4px;
      box-shadow: none !important;
      border: 1px solid ${themeGet('colors.blueyGrey')} !important;
      appearance: none;
      outline: none;

      ::placeholder {
        color: ${themeGet('colors.font.placeholder')};
      }

      ${activeCss};
      ${errorCss};
    }

    ${props =>
      props.ranged &&
      css`
        .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
          background-color: #f0f8ff !important;
          color: #4a90e2;
        }
        .DayPicker-Day {
          border-radius: 0 !important;
        }
        .DayPicker-Day--start {
          border-top-left-radius: 50% !important;
          border-bottom-left-radius: 50% !important;
        }
        .DayPicker-Day--end {
          border-top-right-radius: 50% !important;
          border-bottom-right-radius: 50% !important;
        }
      `}
  }

  input {
    cursor: pointer;
  }

  label {
    margin-bottom: 8px;
  }

  ${alignSelf};
`

export const CalendarIcon = styled(Icon).attrs({
  glyph: calendarGlyph,
  size: 16,
})`
  position: absolute;
  bottom: 12px;
  right: 8px;
  z-index: 0;
  fill: ${themeGet('colors.secondary')};
`
