import React from 'react'
import PropTypes from 'prop-types'

import { Container, Input, Label } from './styles'

const Radio = ({ name, value, children, ...rest }) => (
  <Container htmlFor={`${name}_${value}`}>
    <Input id={`${name}_${value}`} name={name} value={value} {...rest} />

    <Label>{children}</Label>
  </Container>
)

Radio.defaultProps = { children: null }
Radio.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Radio
