import React from 'react'
import PropTypes from 'prop-types'
import { FormSpy } from 'react-final-form'
import { Prompt } from 'react-router-dom'
import isEqual from 'lodash/isEqual'

const UnsavedChangesChecker = ({ initialValues, values }) => (
  <Prompt
    message="You have unsaved changes. Are you sure you want to leave?"
    when={!isEqual(initialValues, values)}
  />
)

UnsavedChangesChecker.defaultProps = { initialValues: {} }
UnsavedChangesChecker.propTypes = {
  initialValues: PropTypes.object,
  values: PropTypes.object.isRequired,
}

export default props => <FormSpy {...props} component={UnsavedChangesChecker} />
