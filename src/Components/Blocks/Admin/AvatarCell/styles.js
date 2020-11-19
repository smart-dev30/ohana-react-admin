import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Box } from 'rebass'

import noImage from 'Assets/no-image.png'

export const Photo = styled(Box)`
  display: none;
  position: absolute;
  margin-left: ${props => props.avatarSize + props.theme.space[1]}px;
  margin-top: -${props => props.height + props.avatarSize / 2}px;
  width: ${props => props.height / 1.2}px;
  height: ${props => props.height}px;
  background: ${props =>
    `url(${props.src || noImage}) no-repeat center center`};
  background-color: ${themeGet('colors.white')};
  background-size: cover;
  box-shadow: 0 1px 6px 0 ${themeGet('color.blackOpacity')};
  z-index: 1;
`

export const Container = styled(Box)`
  &:hover > ${Photo} {
    display: block;
  }
`
