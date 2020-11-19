import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { Input as BaseInput, Tip } from 'Components/UI'

import { Container, Tooltip, Label, TipWrapper } from './styles'

const renderField = ({
  input,
  meta,
  disabled,
  label,
  placeholder,
  type,
  className,
  tip,
  ...rest
}) => {
  const error = meta.touched && meta.error ? 1 : 0

  return (
    <Container className={className} error={error}>
      {label && <Label htmlFor={input.id}>{label}</Label>}

      {tip && (
        <TipWrapper>
          <Tip>{tip}</Tip>
        </TipWrapper>
      )}
      <BaseInput
        error={error}
        type={type}
        {...input}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />

      {meta.touched && meta.error && (
        <Tooltip centered={rest.centered}>
          {meta.error.map(item => item)}
        </Tooltip>
      )}
    </Container>
  )
}

renderField.defaultProps = {
  className: '',
  disabled: false,
  tip: null,
}

renderField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  tip: PropTypes.string,
  type: PropTypes.string.isRequired,
}

const Input = ({ label, name, placeholder, type, tip, ...rest }) => (
  <Field
    label={label}
    name={name}
    placeholder={placeholder}
    render={renderField}
    tip={tip}
    type={type}
    {...rest}
  />
)

Input.defaultProps = {
  label: '',
  placeholder: '',
  type: 'text',
  tip: null,
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  tip: PropTypes.string,
  type: PropTypes.string,
}

export default Input
