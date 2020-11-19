import styled from 'styled-components'
import { themeGet } from 'styled-system'
import styledMap from 'styled-map'
import { Flex } from 'rebass'

// import max from 'lodash/max'

const getWidth = props => (props.count - 1) * (2 * (props.gap - 4))

const getActiveWidth = props => {
  return (
    (Math.max(props.stepIndex, props.completedLength || 0) - 1) *
    (2 * (props.gap - 4))
  )
}

const getSize = props => props.size + props.line

const itemBorder = styledMap`
  completed: ${themeGet('colors.secondary')};
  active: ${themeGet('colors.secondary')};
  default: ${themeGet('colors.veryLightPink')};
`

const itemBg = styledMap`
  completed: ${themeGet('colors.secondary')};
  active: ${themeGet('colors.white')};
  default: ${themeGet('colors.white')};
`

const itemFill = styledMap`
  completed: ${themeGet('colors.white')};
  active: ${themeGet('colors.secondary')};
  default: ${themeGet('colors.secondary')};
`

export const Container = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: ${getWidth}px;
  overflow: hidden;
  flex-shrink: 0;

  :after {
    content: '';
    position: absolute;
    top: ${props => getSize(props) / 2 - props.line / 2}px;
    left: 0;
    right: 0;
    width: ${getActiveWidth}px;
    height: ${({ line }) => line}px;
    background-color: ${themeGet('colors.secondary')};
    transition: all ${themeGet('transitionTime')} ease;
  }

  :before {
    content: '';
    position: absolute;
    top: ${props => getSize(props) / 2 - props.line / 2}px;
    left: 0;
    right: 0;
    width: ${getWidth}px;
    height: ${({ line }) => line}px;
    background-color: ${themeGet('colors.veryLightPink')};
    transition: all ${themeGet('transitionTime')} ease;
  }
`

export const Step = styled(Flex)`
  width: ${getSize}px;
  height: ${getSize}px;
  border-radius: ${getSize}px;
  border: ${({ line }) => line}px solid ${itemBorder};
  color: ${themeGet('colors.white')};
  background-color: ${itemBg};
  justify-content: center;
  align-items: center;
  font-family: ${themeGet('font')};
  font-size: 12px;
  font-weight: 500;
  z-index: 1;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all ${themeGet('transitionTime')} ease;

  > svg {
    fill: ${itemFill};
  }
`
