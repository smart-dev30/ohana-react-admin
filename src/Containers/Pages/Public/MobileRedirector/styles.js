import styled from 'styled-components'
import { Flex } from 'rebass'

import { Title, Text } from 'Components/UI'

export const Container = styled(Flex)`
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const Responsive = styled(Flex)`
  /* Mobile */
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${Title} {
    text-align: center;
  }
`

export const Info = styled(Text)`
  margin-top: 32px;
  text-align: center;
`
