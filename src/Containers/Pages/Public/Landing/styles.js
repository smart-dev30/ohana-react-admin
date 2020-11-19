import styled from 'styled-components'
import { Flex } from 'rebass'

import { Title } from 'Components/UI'

export const Container = styled(Flex)`
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
`

export const Responsive = styled(Flex)`
  /* Mobile */
  justify-content: center;
  flex-direction: column;
  align-items: center;

  ${Title} {
    text-align: center;
  }
`
