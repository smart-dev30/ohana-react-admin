import styled, { css } from 'styled-components'
import { themeGet } from 'styled-system'
import { mapToTheme } from 'styled-map'
import { NavLink } from 'react-router-dom'
import { Flex, Box } from 'rebass'

export const Container = styled(Flex)`
  height: 100%;
  width: ${mapToTheme('sizes.sidebarWidth')};
  flex-direction: row;
  z-index: 300;
  order: 1;
  flex: initial;
  background: ${themeGet('colors.primary')};
  transition: all 0.25s ease-in-out;
`

export const Label = styled(Text).attrs({
  as: 'span',
})`
  transition: opacity 0.25s ease-in-out;
`

export const StyledNav = styled(NavLink)`
  display: flex;
  width: 100%;
  height: ${themeGet('sizes.header')};
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-direction: row;
  color: ${themeGet('colors.white')};
  text-decoration: none;
  padding-left: 32px;
  transition: padding 0.25s ease-in-out;

  svg {
    fill: ${themeGet('colors.dodgerBlue')};
    margin-right: 16px;
  }

  ${props =>
    !props.logo
      ? css`
          &.active {
            background-color: ${themeGet('colors.dodgerBlue')};
            color: ${themeGet('colors.white')};

            svg {
              fill: ${themeGet('colors.white')};
            }
          }
        `
      : css`
          color: ${themeGet('colors.veryLightPink')};
          background-color: ${themeGet('colors.navy')};
          padding-left: 26px;
        `};

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
  }
`

export const Bar = styled(Box)`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  width: ${mapToTheme('sizes.sidebarWidth')};
  background: ${themeGet('colors.primary')};
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.34);
  align-items: center;
  color: rgb(222, 235, 255);
  overflow-x: hidden;
  transition: all 0.25s ease-in-out;

  ${props =>
    props.shrinked &&
    css`
      ${Label} {
        opacity: 0;
      }

      ${StyledNav} {
        padding-left: 20px;
      }
    `}
`

export const Menu = styled(Flex)`
  width: ${themeGet('sizes.sidebarWidth.default')};
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
`

export const Top = styled(Flex)`
  flex-direction: column;
  flex-shrink: 0;
`

export const Bottom = styled(Flex)`
  flex-direction: column;
  flex-shrink: 0;
`
