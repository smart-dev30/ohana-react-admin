import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { Flex, Box } from 'rebass'

export const Input = styled(Box).attrs({ as: 'input', type: 'file' })`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0;
  opacity: 0;
`

export const Container = styled(Box)``

export const Thumbnail = styled(Flex)`
  position: relative;
  width: 100%;
  height: 115px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${themeGet(`colors.blueyGrey`)};
`

export const Preview = styled(Box)`
  width: 100%;
  height: 100%;
  background: url('${({ value }) => value}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
  }
`

export const RemoveButton = styled(Box).attrs({
  as: 'button',
  type: 'button',
})`
  outline: none;
  background: transparent;
  border: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 0;
  padding: 0;
  z-index: 1;
`
