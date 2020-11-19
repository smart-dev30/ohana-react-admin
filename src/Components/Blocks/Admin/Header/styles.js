import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { mapToTheme } from 'styled-map'

import { Flex, Box } from 'rebass'

import { Icon } from 'Components/UI'

export const Container = styled(Flex)`
  width: calc(100vw - ${mapToTheme('sizes.sidebarWidth')});
  height: ${themeGet('sizes.header')};
  flex-direction: row;
  position: fixed;
  left: ${mapToTheme('sizes.sidebarWidth')};
  z-index: 300;
  order: 1;
  flex: initial;
  background: ${themeGet('colors.white')};
  flex-shrink: 0;
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.34);
  transition: all 0.25s ease-in-out;

  @media screen and (max-width: ${themeGet('breakpoints.0')}) {
    background: none;
    width: ${themeGet('sizes.header')};
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
    display: block;
  }
`

export const Bar = styled(Flex)`
  align-items: center;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  flex-shrink: 0;

  @media screen and (max-width: ${themeGet('breakpoints.0')}) {
    display: none;
  }
`

export const Menu = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const LeftMenu = styled(Flex).attrs({
  ml: 3,
  pl: 2,
})``

export const SidebarToggleIcon = styled(Icon)`
  fill: ${themeGet('colors.veryLightPink')};
  stroke: ${themeGet('colors.veryLightPink')};
  cursor: pointer;
`

export const UserBlock = styled(Flex).attrs({ mr: 3 })`
  flex-direction: column;
`

export const User = styled(Flex)`
  flex-shrink: 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 24px;
  font-weight: bold;
`

export const UserMobile = styled(Box)`
  position: absolute;
  right: 16px;
  top: 32px;
  display: none;

  @media screen and (max-width: ${themeGet('breakpoints.0')}) {
    display: block;
  }
`

export const Logout = styled(Box).attrs({
  as: 'a',
  fontSize: 1,
})`
  flex: 0;
  display: inline;
  text-align: right;
  text-decoration: underline;
  color: ${themeGet('colors.secondary')};
  cursor: pointer;
  font-weight: normal;
`
