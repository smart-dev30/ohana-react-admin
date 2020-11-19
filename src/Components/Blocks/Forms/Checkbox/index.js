import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { Checkbox as BaseCheckbox } from 'Components/UI'
import { Container, Tooltip } from '../Input/styles'

const renderField = ({ meta, className, label, input, ...rest }) => {
  const error = meta.touched && meta.error ? 1 : 0

  return (
    <Container className={className} error={error}>
      <BaseCheckbox {...input} {...rest}>
        {label}
      </BaseCheckbox>

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
  label: null,
}

renderField.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
}

const Checkbox = props => (
  <Field type="checkbox" {...props} render={renderField} />
)

export default Checkbox
