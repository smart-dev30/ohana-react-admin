import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex, Box } from 'rebass'

export const RootContainer = styled(Flex)`
  min-height: 100vh;
  width: 100%;
  background-color: ${themeGet('colors.bg')};
`

export const PublicContainer = styled(Flex)`
  min-height: 100vh;
  width: 100%;
  background-color: ${themeGet('colors.bg')};
`

export const AuthContainer = styled(Flex)`
  min-height: 100vh;
  width: 100%;
  background-color: ${themeGet('colors.bg')};
`

export const AppContainer = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  min-width: fit-content;
  background-color: ${themeGet('colors.bg')};
`

export const AppContent = styled(Box).attrs({
  px: [0, 4, 5],
  pb: 3,
})`
  width: 100%;
  flex: 1;
  order: 2;
  margin-top: ${themeGet('sizes.header')};
  clear: both;
  position: relative;
  transition: height 0.25s ease-in-out;
`
