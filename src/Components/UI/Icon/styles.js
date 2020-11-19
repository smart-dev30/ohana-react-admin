import styled, { css } from 'styled-components'
import { themeGet, size } from 'styled-system'
import { Box } from 'rebass'

export default styled(Box).attrs({ as: 'svg' })`
  vertical-align: middle;
  flex-shrink: 0;

  ${props =>
    props.stroke &&
    css`
      stroke: ${themeGet(`colors.${props.stroke}`)};
    `};

  ${props =>
    props.fill &&
    css`
      fill: ${themeGet(`colors.${props.fill}`)};
    `};

  ${size};
`
