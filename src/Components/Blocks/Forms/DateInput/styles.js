import styled from 'styled-components'
import { layout } from '@styled-system/layout'
import { margin } from '@styled-system/space'
import { themeGet } from '@styled-system/theme-get'
import { mapToTheme } from 'styled-map'

import { calendarGlyph } from 'Assets/Svg'

import { Icon } from 'Components/UI'

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  padding: ${themeGet('space.1')}px ${themeGet('space.2')}px;
  background-color: ${themeGet('colors.bg')};
  border-radius: 4px;
  height: 40px;
  color: ${themeGet('colors.gray')};
  cursor: pointer;

  ${mapToTheme('inputs.field.font')};
  ${mapToTheme('inputs.field.border')};

  :hover,
  :focus {
    border-color: ${mapToTheme('inputs.field.borderHover')};
  }

  ::placeholder {
    color: ${themeGet('colors.input.font.placeholder')};
  }

  ${layout.width}
  ${margin}
`

export const Value = styled.input`
  white-space: nowrap;
  text-align: center;
  width: 100%;
  border: none;
  cursor: pointer;
  color: ${themeGet(`colors.font.primary`)};
  :disabled {
    background-color: ${themeGet(`colors.bg`)};
  }
  ${margin}
`
export const CalendarIcon = styled(Icon).attrs({
  glyph: calendarGlyph,
  size: 16,
})`
  position: absolute;
  bottom: 12px;
  right: 8px;
  z-index: 0;
  fill: ${themeGet('colors.blueyGrey')};
`
