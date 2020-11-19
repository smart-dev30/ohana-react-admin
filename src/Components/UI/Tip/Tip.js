import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'rebass'

import { tipInfoGlyph } from 'Assets/Svg'

import Icon from '../Icon'

import { Container, Button, Content, Text } from './styles'

const Tip = ({ children }) => (
  <Container>
    <Button>
      <Icon fill="brownGray" glyph={tipInfoGlyph} size={16} />
    </Button>

    {children && (
      <Content>
        <Flex justifyContent="center" mb={2}>
          <Icon fill="secondary" glyph={tipInfoGlyph} size={16} />
        </Flex>

        <Text>{children}</Text>
      </Content>
    )}
  </Container>
)

Tip.defaultProps = { children: null }
Tip.propTypes = { children: PropTypes.node }

export default Tip
