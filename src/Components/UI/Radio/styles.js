import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex, Box } from 'rebass'

export const Container = styled(Flex).attrs({ as: 'label' })`
  cursor: pointer;
`

export const Input = styled(Box).attrs({ as: 'input', type: 'radio' })`
  outline: none;
  box-shadow: none;
  margin: 10px 8px;

  &:not(checked) {
    position: relative;

    &:before {
      content: '';
      left: -5px;
      top: -3px;
      width: 24px;
      height: 24px;
      position: absolute;
      border-radius: 12px;
      background-color: ${themeGet('colors.blueyGrey')};
    }
  }

  &:checked {
    &:before {
      background-color: ${themeGet('colors.secondary')};
    }

    &:after {
      content: '';
      top: 1px;
      left: -1px;
      width: 16px;
      height: 16px;
      position: absolute;
      border-radius: 8px;
      background-color: ${themeGet('colors.white')};
    }
  }
`

export const Label = styled(Flex)`
  margin: 9px 0 0 5px;
  font-size: 12px;
  font-weight: bold;
  color: ${themeGet('colors.brownGray')};
  letter-spacing: 0.1px;
  width: 100%;
`
