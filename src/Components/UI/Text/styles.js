import styled, { css } from 'styled-components'
import { Text, Box } from 'rebass'
import { themeGet, fontSize } from 'styled-system'

export const Container = styled(Text).attrs({
  lineHeight: '1.41em',
})`
  ${props =>
    props.ellipsis &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `};

  ${fontSize};
`

export const Mark = styled(Box).attrs({ as: 'mark' })`
  background-color: ${themeGet('colors.secondaryActive')};
  color: ${themeGet('colors.dodgerBlue')};
`
