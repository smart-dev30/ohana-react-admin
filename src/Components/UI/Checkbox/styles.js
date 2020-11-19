import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Box, Text } from 'rebass'

export const Wrapper = styled(Box)`
  position: relative;
  width: 24px;
  height: 24px;
`

export const Label = styled(Text).attrs({ as: 'label' })`
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px solid ${themeGet('colors.blueyGrey')};
  background: ${themeGet('colors.white')};
  border-radius: 4px;
  margin: 0;
  top: -2px;

  &:after {
    content: '';
    width: 14px;
    height: 8px;
    position: absolute;
    top: 4px;
    left: 3px;
    border: 2px solid ${themeGet('colors.white')};
    border-top: none;
    border-right: none;
    background: transparent;
    opacity: 0;
    transform: rotate(-48deg);
  }

  &:hover::after {
    opacity: 0.5;
    border-color: ${themeGet('colors.black')};
  }
`

export const Input = styled(Box).attrs({ as: 'input', type: 'checkbox' })`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  opacity: 0;
  margin: 0;
  cursor: pointer;

  &:checked + ${Label} {
    border: 2px solid ${themeGet('colors.secondary')};
    background: ${themeGet('colors.secondary')};

    &:after {
      opacity: 1;
    }
  }
`
