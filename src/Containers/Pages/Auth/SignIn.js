import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Form } from 'react-final-form'
import validate from 'validate.js'

import { signIn } from 'Store/Actions/auth'
import { getIsLoading, getError } from 'Store/Selectors/auth'

import { Forms } from 'Components/Blocks'
import { Button, Icon, Title } from 'Components/UI'

import { emailConstraint, passwordConstraint } from 'Constants/constraints'

import {
  logoGlyph,
  loadingGlyph,
  inputEmailGlyph,
  inputPassGlyph,
} from 'Assets/Svg'

import { Container, Panel, ErrorBlock, FormBlock } from './styles'

class SignIn extends PureComponent {
  state = {}

  handleSubmit = ({ email, password }) => {
    const { onSignIn } = this.props

    onSignIn(email, password)
  }

  validate = values =>
    validate(values, { ...emailConstraint, ...passwordConstraint })

  renderForm = ({ handleSubmit, pristine, invalid }) => {
    const { error, isLoading } = this.props

    return (
      <FormBlock mt={4} onSubmit={handleSubmit}>
        <Forms.Input
          centered={1}
          icon={inputEmailGlyph}
          name="email"
          placeholder="Email"
          required
          type="email"
        />

        <Forms.Input
          centered={1}
          icon={inputPassGlyph}
          mt={3}
          name="password"
          placeholder="Password"
          required
          type="password"
        />

        <Button
          disabled={pristine || invalid || isLoading}
          mt={4}
          secondary={1}
          type="submit"
          width={1}
        >
          {isLoading && <Icon glyph={loadingGlyph} size={28} />}
          Sign in
        </Button>
        <ErrorBlock>{error}</ErrorBlock>
      </FormBlock>
    )
  }

  render() {
    return (
      <Container>
        <Panel>
          <Icon glyph={logoGlyph} size={78} />
          <Title mb={4}>Sign in</Title>
          <Form
            render={this.renderForm}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          />
        </Panel>
      </Container>
    )
  }
}

SignIn.defaultProps = {
  error: null,
}

SignIn.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
}

export default connect(
  createStructuredSelector({
    error: getError,
    isLoading: getIsLoading,
  }),
  {
    onSignIn: signIn,
  },
)(SignIn)
