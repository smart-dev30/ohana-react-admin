import styled, { css } from 'styled-components'
import { themeGet, space, fontSize } from 'styled-system'
import { mapToTheme } from 'styled-map'
import { Flex, Box } from 'rebass'

import { Text } from 'Components/UI'

export const Tooltip = styled(Text).attrs({
  as: 'span',
  fontSize: 1,
})`
  white-space: nowrap;
  height: 30px;
  color: ${themeGet('colors.danger')};
  text-align: center;
  padding: 0 10px;
  border-radius: 6px;
  transition: opacity 1s;

  position: absolute;

  top: 95%;

  right: 0;

  ${props =>
    props.centered &&
    css`
      right: 50%;
      transform: translateX(50%);
    `};

  ${fontSize};
`

export const Container = styled(Flex).attrs({
  width: 1,
})`
  flex-direction: column;
  position: relative;
  font-size: 16px;

  border-radius: 8px;

  ${props =>
    props.joined &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `};

  ${space};

  input {
    cursor: pointer;
  }

  label {
    margin-bottom: 8px;
  }
`

export const Label = styled(Text).attrs({
  as: 'label',
})`
  color: ${themeGet('colors.brownishGray')};

  ${mapToTheme('inputs.label.font')};
`

export const TipWrapper = styled(Box)`
  border: none;
  position: absolute;
  right: -24px;
  bottom: 10px;
  height: 16px;
  width: 16px;
`
