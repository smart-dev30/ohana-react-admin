import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, Input, Label } from './styles'

const Switch = ({ checked, onChange, disabled }) => (
  <Wrapper>
    <Input checked={checked} disabled={disabled} onChange={onChange} />
    <Label />
  </Wrapper>
)

Switch.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => null,
}
Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

export default Switch
