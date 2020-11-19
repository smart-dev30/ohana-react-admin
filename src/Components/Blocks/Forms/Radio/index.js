import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { Box } from 'rebass'

import { Radio as BaseRadio, Tip } from 'Components/UI'
import { Container } from '../Input/styles'

const renderField = ({ meta, className, tip, label, input, ...rest }) => (
  <Container className={className}>
    <BaseRadio {...input} {...rest}>
      {label}
      {tip && (
        <Box height={16} ml={1} mt="2px" width={16}>
          <Tip>{tip}</Tip>
        </Box>
      )}
    </BaseRadio>
  </Container>
)

renderField.defaultProps = {
  className: '',
  tip: null,
}

renderField.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  tip: PropTypes.string,
}

const Radio = props => <Field type="radio" {...props} render={renderField} />

export default Radio
