import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex } from 'rebass'

export const Container = styled(Flex)`
  background: ${themeGet('colors.danger')};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  color: ${themeGet('colors.white')};
  z-index: 100000;
`

export default {}
