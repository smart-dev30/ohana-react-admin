import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'react-final-form'

import { Select as BaseSelect } from 'Components/UI'

import { Container, Label } from './styles'

import { Tooltip } from '../Input/styles'

const renderField = ({
  className,
  options,
  placeholder,
  components,
  meta,
  input,
  portal,
  top: topSpace,
  label,
  height,
  selectProps,
  isDisabled,
  isClearable,
  isSearchable,
  ...rest
}) => {
  const { touched, error, submitError, dirtySinceLastSubmit } = meta
  const hasError = touched && (error || (submitError && !dirtySinceLastSubmit))

  return (
    <Container
      className={className}
      error={hasError ? 'true' : undefined}
      {...rest}
    >
      {label && (
        <Label htmlFor={input.id} mb={2}>
          {label}
        </Label>
      )}

      <BaseSelect
        {...selectProps}
        blurInputOnSelect={false}
        className="react-select__container"
        classNamePrefix="react-select"
        components={components}
        error={hasError ? 1 : 0}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        menuPortalTarget={portal}
        options={options}
        {...input}
        height={height}
        placeholder={placeholder}
      />
      {hasError && <Tooltip>{meta.error.map(item => item)}</Tooltip>}
    </Container>
  )
}

renderField.defaultProps = {
  portal: null,
  height: null,
  selectProps: null,
  isDisabled: false,
  isClearable: false,
  isSearchable: true,
}

renderField.propTypes = {
  className: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired,
  height: PropTypes.number,
  input: PropTypes.object.isRequired,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  portal: PropTypes.object,
  selectProps: PropTypes.object,
  top: PropTypes.number.isRequired,
}

const Select = ({
  className,
  options,
  portal,
  placeholder,
  top,
  label,
  height,
  ...rest
}) => (
  <Field
    className={`${className} react-select__container`}
    height={height}
    label={label}
    options={options}
    placeholder={placeholder}
    portal={portal}
    render={renderField}
    top={top}
    {...rest}
  />
)

Select.defaultProps = {
  className: '',
  label: '',
  portal: null,
  top: 72,
  height: null,
}

Select.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  portal: PropTypes.object,
  top: PropTypes.number,
}

export default Select
