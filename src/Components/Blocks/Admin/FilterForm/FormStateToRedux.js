import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormSpy } from 'react-final-form'

import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'

import { updateFilterForm } from 'Store/Actions/ui'

class FormStateToRedux extends PureComponent {
  state = { oldValues: null }

  handleUpdateChange = () =>
    debounce(state => {
      const { type, onUpdateFilterForm } = this.props
      const { oldValues } = this.state
      const { values, initialValues } = state

      if (!isEqual(oldValues || initialValues || {}, values)) {
        onUpdateFilterForm(type, values)

        this.setState({ oldValues: values })
      }
    }, 700)

  render = () => <FormSpy onChange={this.handleUpdateChange()} />
}

FormStateToRedux.propTypes = {
  type: PropTypes.string.isRequired,
  onUpdateFilterForm: PropTypes.func.isRequired,
}

export default connect(
  undefined,
  { onUpdateFilterForm: updateFilterForm },
)(FormStateToRedux)
