import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'rebass'

import Text from '../Text'
import { Wrapper, Input, Label } from './styles'

const Checkbox = ({ checked, onChange, children }) => (
  <Flex>
    <Wrapper>
      <Input checked={checked} onChange={onChange} />

      <Label />
    </Wrapper>

    <Text
      color={checked ? 'dodgerBlue' : 'brownishGray'}
      fontSize={12}
      fontWeight="bold"
      ml={2}
    >
      {children}
    </Text>
  </Flex>
)

Checkbox.defaultProps = {
  checked: false,
  onChange: () => null,
  children: null,
}
Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  onChange: PropTypes.func,
}

export default Checkbox
