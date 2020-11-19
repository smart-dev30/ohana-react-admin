import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box } from 'rebass'
import { themeGet, maxWidth } from 'styled-system'
import { mapToTheme } from 'styled-map'

const Button = styled(Box).attrs({
  as: 'button',
  type: 'button',
  px: 4,
})`
  height: 40px;
  border-radius: 4px;
  position: relative;
  user-select: none;
  outline: none;
  box-shadow: none;
  display: inline-block;
  border: none;
  font-weight: normal;
  z-index: 0;
  color: ${mapToTheme('buttons.color')};
  background: ${mapToTheme('buttons.bg')};
  transition: all ${themeGet('transitionTime')} ease;
  box-shadow: ${mapToTheme('buttons.shadow')};
  cursor: pointer;

  svg {
    position: absolute;
    left: 8px;
    top: 10px;
  }

  &:disabled {
    box-shadow: none;
  }

  &:focus:enabled,
  &:active:enabled {
    outline: none;
    box-shadow: ${mapToTheme('buttons.shadowActive')};
  }

  &:hover:enabled {
    background: ${mapToTheme('buttons.hover')};
    color: ${mapToTheme('buttons.colorHover')};
  }

  &:active:enabled {
    background: ${mapToTheme('buttons.hover')};
  }
  ${maxWidth}
`

Button.defaultProps = {
  minWidth: 160,
  fontSize: 2,
  shadow: true,
}

Button.propTypes = {
  centered: PropTypes.bool,
  shadow: PropTypes.bool,
}

Button.displayName = 'Button'

export default Button
