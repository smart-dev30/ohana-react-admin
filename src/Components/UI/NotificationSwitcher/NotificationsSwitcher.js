import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { Flex } from 'rebass'

import { Switch, Text } from 'Components/UI'

import { FieldWrapper, Label } from './styles'

class NotificationSwitcher extends PureComponent {
  state = {}

  render = () => {
    const { fieldName, disabled } = this.props

    return (
      <FieldWrapper>
        <Label>Notifications</Label>

        <Field
          name={fieldName}
          render={props => (
            <Fragment>
              <Flex alignItems="center" justifyContent="center" mb={0}>
                <Text
                  color={props.input.checked ? 'brownishGrey' : 'dodgerBlue'}
                  fontSize={12}
                  fontWeight="bold"
                  mr={2}
                >
                  OFF
                </Text>

                <Switch {...props.input} disabled={disabled} />

                <Text
                  color={props.input.checked ? 'dodgerBlue' : 'brownishGrey'}
                  fontSize={12}
                  fontWeight="bold"
                  ml={2}
                >
                  ON
                </Text>
              </Flex>
            </Fragment>
          )}
          type="checkbox"
        />
      </FieldWrapper>
    )
  }
}

NotificationSwitcher.defaultProps = {
  disabled: false,
}
NotificationSwitcher.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
}

export default NotificationSwitcher
