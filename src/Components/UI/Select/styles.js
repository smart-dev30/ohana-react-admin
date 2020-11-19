import styled, { css } from 'styled-components'
import { themeGet, width, space, fontSize } from 'styled-system'
import { mapToTheme } from 'styled-map'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable'
import AsyncSelect from 'react-select/lib/Async'
import { Box } from 'rebass'

import { triangleDownGlyph } from 'Assets/Svg'

import Icon from '../Icon'

const errorCss = props =>
  props.error &&
  css`
    border-color: ${themeGet('colors.error')};
  `

const getSelectComponent = props => {
  if (props.creatable) return CreatableSelect
  if (props.async) return AsyncSelect
  return Select
}

export const DropdownIcon = styled(Icon).attrs({
  glyph: triangleDownGlyph,
  size: 14,
})`
  fill: ${themeGet('colors.secondary')};
`

export const StyledSelect = styled(Box).attrs(props => ({
  as: getSelectComponent(props),
  fontSize: 2,
}))`
  background: ${mapToTheme('inputs.select.bg')};
  font-family: ${themeGet('font')};

  .react-select {
    &__container {
      margin: 0;
      width: 100%;
      outline: none;
      position: relative;
      appearance: none;
      flex-shrink: 0;
      color: ${themeGet('colors.input.font.color')};
    }

    &__input {
      /* min-height: 40px; */
      /* margin-top: -1px; */
    }

    &__single-value {
      top: 45%;
    }

    &__value-container {
      /* padding: ${mapToTheme('inputs.select.padding')}; */
      justify-content: center;
      ${mapToTheme('inputs.select.font')};
      max-height: 38px;

      & > div:last-child {
        margin: 0 2px;
        padding: 0;
        /* height: 40px; */
      }
    }

    &__control {
      background-color: ${themeGet('colors.input.bg.color')};
      ${mapToTheme('inputs.select.border')};
      color: ${themeGet('colors.input.font.placeholder')};
      border-radius: 4px;
      min-height: auto;
      /* min-height: 40px; */
      ${errorCss};

      &--menu-is-open {
        z-index: 10;

        ${DropdownIcon} {
          transform: rotate(-180deg) !important;
        }
      }

      &:hover,
      &--is-focused,
      &--is-focused:hover,
      &:focus-within {
        background: ${themeGet('colors.input.bg.active')};
        border-color: ${themeGet('colors.primary')};
        box-shadow: none;
        outline-color: transparent;
      }
    }

    &__input {
      min-height: 40px;
    }

    &__indicator-separator {
      background-color: transparent;
    }

    &__indicators {
      /* height: 40px; */

      ${DropdownIcon} {
        transform: rotate(0deg);
        transition: 0.2s ease transform;
        transform: translateY(-2px);
        margin-right: 8px;
      }
    }

    &__placeholder {
      color: ${themeGet('colors.input.font.placeholder')};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &__menu {
      font-family: ${themeGet('font')};
      z-index: 9999;

      &-list {
        color: ${themeGet('colors.input.font.color')};
      }
    }

    &__option {
      cursor: pointer;

      &--is-focused,
      &--is-focused:active {
        background-color: ${themeGet('colors.input.select.hover')};
      }

      &--is-selected,
      &--is-selected:active {
        background-color: ${themeGet('colors.input.select.active')};
      }
    }
  }

  ${fontSize};
  ${space};
  ${width};
`
