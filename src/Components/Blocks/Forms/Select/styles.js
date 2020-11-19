import styled, { css } from 'styled-components'
import { themeGet } from 'styled-system'
import { mapToTheme } from 'styled-map'
import { Flex, Text } from 'rebass'

export const Container = styled(Flex)`
  flex-direction: column;
  position: relative;
  flex-shrink: 0;
`

export const Label = styled(Text).attrs({
  as: 'label',
})`
  color: ${themeGet('colors.brownishGray')};

  ${mapToTheme('inputs.label.font')};
`
export const Tooltip = styled(Text).attrs({
  as: 'span',
  fontSize: 1,
})`
  white-space: nowrap;
  color: ${themeGet('colors.danger')};
  text-align: center;
  padding: 0 10px;
  border-radius: 6px;
  transition: opacity 1s;

  position: absolute;

  top: 104%;

  right: 0;

  ${props =>
    props.centered &&
    css`
      right: 50%;
      transform: translateX(50%);
    `};
`
