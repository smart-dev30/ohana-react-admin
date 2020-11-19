import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex, Box } from 'rebass'

import noImage from 'Assets/no-image.png'

export const Container = styled(Flex).attrs({
  bg: 'lightGray',
  p: 4,
  color: 'brownishGray',
})`
  position: relative;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  height: 250px;
`

export const MenuWrapper = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
`

export const Photo = styled(Box)`
  width: 100%;
  height: 100%;
  background: ${props =>
    `url(${props.src || noImage}) no-repeat center center`};
  background-color: ${themeGet('colors.white')};
  background-size: cover;
`

export const Content = styled(Flex).attrs({
  flexDirection: 'column',
  justifyContent: 'space-between',
})`
  overflow-y: auto;
`
