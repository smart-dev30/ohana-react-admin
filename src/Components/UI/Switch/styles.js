import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Box } from 'rebass'

export const Wrapper = styled(Box)`
  position: relative;
  width: 60px;
  height: 32px;
`

export const Label = styled(Box).attrs({ as: 'label' })`
  text-indent: -9999px;
  width: 100%;
  height: 100%;
  border: 1px solid ${themeGet('colors.blueyGrey')};
  background: ${themeGet('colors.lightGray')};
  border-radius: 32px;
  position: absolute;
  transition: all ease 0.2s;

  &:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 4px;
    width: 24px;
    height: 24px;
    background: ${themeGet('colors.blueyGrey')};
    border-radius: 90px;
    transition: all ease 0.2s;
  }
`

export const Input = styled(Box).attrs({
  as: 'input',
  type: 'checkbox',
})`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  opacity: 0;
  margin: 0;
  cursor: pointer;

  &:checked + ${Label} {
    border: 1px solid ${themeGet('colors.secondary')};

    :after {
      left: calc(100% - 4px);
      transform: translateX(-100%);
      background: ${themeGet('colors.secondary')};
    }
  }
`
