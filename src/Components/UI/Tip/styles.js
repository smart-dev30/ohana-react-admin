import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Box } from 'rebass'

export const Button = styled(Box).attrs({ as: 'button', type: 'button' })`
  border: none;
  background: transparent;
  position: absolute;
  width: 16px;
  height: 16px;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: 0;
  }
`

export const Content = styled(Box)`
  display: none;
  position: absolute;
  right: 30px;
  top: 0;
  margin-top: -50px;
  z-index: 301;
  padding: 26px 29px 34px 42px;
  background-color: ${themeGet('colors.lightGray')};
  border-radius: 4px;
  box-shadow: 0 1px 5px ${themeGet('colors.brownGray')};
  width: 344px;

  :before,
  :after {
    top: 50px;
    right: 0;
    border: solid transparent;
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-bottom-color: ${themeGet('colors.lightGray')};
    border-width: 12px;
    margin-right: -24px;
    transform: rotate(90deg);
  }
`

export const Text = styled(Box)`
  width: 100%;
  min-height: 50px;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0.1px;
`

export const Container = styled(Box)`
  position: relative;

  &:hover > ${Content} {
    display: block;
  }
`
