import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex } from 'rebass'

import { loadingGlyph } from 'Assets/Svg'

import Icon from '../Icon'

export const Container = styled(Flex)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: ${themeGet('colors.lightBlue')};
  justify-content: center;
  align-items: center;
`

class Loader extends PureComponent {
  state = {}

  render() {
    return (
      <Container>
        <Icon glyph={loadingGlyph} size={40} />
      </Container>
    )
  }
}

Loader.displayName = 'Loader'

export default Loader
