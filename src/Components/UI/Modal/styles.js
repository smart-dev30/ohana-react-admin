import ReactModal from 'react-modal'
import styled, { css } from 'styled-components'
import { themeGet, space } from 'styled-system'
import withStyledClassNames from 'with-styled-class-names'

import { closeGlyph } from 'Assets/Svg'

import Icon from '../Icon'

const overflow = props =>
  props.isOverflow &&
  css`
    overflow-x: hidden;
    overflow-y: auto;
  `
const overflowVisible = props =>
  props.isOverflowVisible &&
  css`
    overflow: visible;
  `

export const Close = styled(Icon).attrs({
  glyph: closeGlyph,
})`
  position: absolute;
  top: 16px;
  right: 24px;
  padding: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  fill: ${themeGet('colors.darkTeal')};

  @media screen and (max-width: ${themeGet('breakpoints.0')}) {
    right: 16px;
  }
`

export const Container = withStyledClassNames(
  {
    className: {
      base: css`
        outline: none;
        opacity: 0;
        transform: scale(0.4);
        max-height: 96%;
        -webkit-overflow-scrolling: touch;
        padding: 16px 32px;
        border-radius: 4px;
        background: ${themeGet('colors.white')};
        box-shadow: 10px 10px 20px -10px ${themeGet('colors.blackOpacity')};

        transition: all ${themeGet('transitionTime')};
        transition-delay: 100ms;

        @media screen and (max-width: ${themeGet('breakpoints.0')}) {
          padding: 16px;
        }

        min-width: 320px;

        @media screen and (min-width: ${themeGet('breakpoints.1')}) {
          min-height: 240px;
        }
        ${overflow};
        ${overflowVisible};
        ${space};
      `,
      afterOpen: css`
        opacity: 1;
        transform: scale(1);
      `,
      beforeClose: css`
        opacity: 0;
      `,
    },
    overlayClassName: {
      base: css`
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${themeGet('colors.blackOpacity')};
        z-index: 9999;
        width: 100%;
        height: 100%;
        outline: none;
        opacity: 0;

        transition: all ${themeGet('transitionTime')};
      `,
      afterOpen: css`
        opacity: 1;
      `,
      beforeClose: css`
        opacity: 0;
      `,
    },
  },
  ReactModal,
)
