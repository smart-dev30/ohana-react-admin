import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex, Box } from 'rebass'

import { Text } from 'Components/UI'

export const Container = styled(Flex).attrs({
  alignItems: ['flex-start', 'center'],
})`
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 0;
`

export const Panel = styled(Flex).attrs({
  p: 3,
  mb: 4,
})`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 320px;
  background-color: ${themeGet('colors.white')};

  @media screen and (max-width: ${themeGet('breakpoints.0')}) {
    box-shadow: none;
  }
`

export const FormBlock = styled(Box).attrs({ as: 'form' })`
  width: 100%;
`

export const InfoBlock = styled(Box).attrs({
  mb: 2,
})`
  min-height: 20px;
  text-align: center;
`

export const ErrorBlock = styled(Box).attrs({
  mb: 2,
})`
  min-height: 20px;
  text-align: center;
  color: ${themeGet('colors.danger')};
`

export const TextBlock = styled(Flex)`
  width: 100%;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${themeGet('colors.success')};
    margin: 16px 0;
  }

  p {
    margin: 8px 0;
  }
`

export const Links = styled(Flex).attrs({
  px: 2,
})`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

export const Role = styled(Text).attrs({
  mt: 4,
  mb: 3,
})`
  text-align: left;
  font-size: 24px;
  font-weight: bold;
`

export const Junk = styled(Text).attrs({
  mt: 4,
})`
  font-size: 13px;
  color: ${themeGet('colors.warmGrey')};
`
