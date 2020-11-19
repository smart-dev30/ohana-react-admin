import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { space, width } from 'styled-system'
import { mapToTheme } from 'styled-map'
import MaskedInput from 'react-text-mask'
import { Box } from 'rebass'

import Icon from '../Icon'

const Container = styled(Box)`
  > svg {
    position: absolute;
    bottom: 12px;
    left: 8px;
  }
`

const Field = styled(Box).attrs(props => ({
  as: props.mask ? MaskedInput : 'input',
}))`
  height: 40px;
  margin: 0;
  padding: ${mapToTheme('inputs.field.padding')};
  width: 100%;
  border-radius: 4px;

  ${mapToTheme('inputs.field.font')};
  ${mapToTheme('inputs.field.border')};
  background-color: ${mapToTheme('inputs.field.bg')};

  outline: none;
  -webkit-appearance: none;

  transition: all ease 0.3s;

  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};

  :hover,
  :focus {
    border-color: ${mapToTheme('inputs.field.borderHover')};
  }

  ${width}
  ${space};
`

const Input = ({
  label,
  name,
  type,
  error,
  icon,
  iconFill,
  iconSize,
  iconStroke,
  className,
  placeholder,
  defaultValue,
  ...rest
}) => (
  <Container className={className} error={error}>
    {icon && (
      <Icon fill={iconFill} glyph={icon} size={iconSize} stroke={iconStroke} />
    )}
    <Field
      error={error}
      icon={icon}
      label={label}
      name={name}
      placeholder={placeholder}
      type={type}
      value={defaultValue}
      {...rest}
    />
  </Container>
)

Input.defaultProps = {
  className: '',
  defaultValue: '',
  error: null,
  icon: null,
  iconFill: null,
  iconSize: 16,
  iconStroke: null,
  label: '',
  placeholder: '',
  type: 'text',
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  icon: PropTypes.object,
  iconFill: PropTypes.string,
  iconSize: PropTypes.number,
  iconStroke: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

Input.displayName = 'Input'

export default Input
