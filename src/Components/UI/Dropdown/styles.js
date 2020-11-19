import styled, { css } from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import styledMap from 'styled-map'

import { Flex, Box } from 'rebass'

const itemColor = styledMap`
  primary: ${themeGet(`colors.primary`)};
  default: inherit;
`

const roundedPane = styledMap`
  rounded: ${'4px'};
  default: 0;
`

export const Placeholder = styled(Box)`
  color: ${themeGet(`colors.primary`)};
`

export const StyledOption = styled(Box).attrs({
  px: 3,
  py: '6px',
})`
  min-width: 144px;
  color: ${itemColor};

  &:hover {
    background-color: ${themeGet('colors.primaryHover')};
  }
  &:active {
    background-color: ${themeGet('colors.primaryActive')};
  }

  &.selected {
    color: ${themeGet(`colors.primary`)};
    font-weight: bold;
  }
`

export const Menu = styled(Box).attrs({
  mt: '14px',
})`
  padding: 10px 0;
  background-color: ${themeGet('colors.white')};
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px ${themeGet(`colors.primary`)};
  position: absolute;
  top: 100%;
  min-width: ${props => (props.minWidth !== 'auto' ? props.minWidth : 0)}px;
  width: auto;
  max-height: 300px;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;

  :before {
    position: absolute;
    top: -10px;
    right: 8px;
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
    z-index: 1001;
    display: ${props => (props.hideArrow ? 'none' : 'block')};
  }

  :after {
    position: absolute;
    top: -11px;
    right: 7px;
    content: '';
    width: 0;
    height: 0;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 11px solid ${themeGet(`colors.primary`)};
    z-index: 1000;
    display: ${props => (props.hideArrow ? 'none' : 'block')};
  }

  ${props =>
    props.left
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};

  ${props =>
    props.userCard &&
    css`
      right: -10px;
      margin-top: 6px;
    `};

  overflow: visible;

  border-radius: ${roundedPane};
`

export const Opener = styled(Box).attrs({
  p: 2,
})`
  display: inline-flex;
  width: 100%;
  border-radius: 4px;
  border: 1px solid
    ${props =>
      !props.disabled
        ? themeGet(`colors.primary`)
        : themeGet(`colors.font.disabled`)};
`

export const DefaultItem = styled(Box).attrs({
  px: 3,
  py: 2,
})``

export const StyledDropdown = styled(Box)`
  display: inline-flex;
  position: relative;
  color: ${props =>
    !props.disabled
      ? themeGet('colors.font.primary')
      : themeGet('colors.font.disabled')};
  font-family: ${themeGet('font')};
  margin: 0;
  overflow: visible;
  text-transform: none;
  box-shadow: none;
  white-space: nowrap;

  cursor: ${props => (!props.disabled ? 'pointer' : 'default')};
  transition: all ${themeGet('transitionTime')};
`

export const PickerWrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;

  > svg {
    margin-left: 4px;
    transition: all 270ms ease;
    transform: rotate(-180deg);

    ${props =>
      props.opened &&
      css`
        transform: rotate(0deg);
      `};
  }
`
