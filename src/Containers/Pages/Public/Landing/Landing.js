import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import { logoGlyph } from 'Assets/Svg'

import { AUTH_PATHS } from 'Constants/paths'

import { Icon, Title, Button } from 'Components/UI'

import { getViewerRoot } from 'Services/Utils'

import { Container, Responsive } from './styles'

class Landing extends PureComponent {
  handleSignIn = () => {
    const { history } = this.props
    history.push(AUTH_PATHS.SIGN_IN)
  }

  handleGo = () => {
    const { viewer, history } = this.props
    history.push(getViewerRoot(viewer))
  }

  render() {
    const { viewer, onLogOut } = this.props

    return (
      <Container>
        <Responsive>
          <Icon glyph={logoGlyph} size={78} />
          <Title>OhanaLink Baby</Title>
          {viewer.isAuthenticated ? (
            <Fragment>
              <Button mt={5} onClick={this.handleGo}>
                Go to app
              </Button>

              <Button link={1} mt={2} onClick={onLogOut}>
                Logout
              </Button>
            </Fragment>
          ) : (
            <Button mt={5} onClick={this.handleSignIn}>
              Sign in
            </Button>
          )}
        </Responsive>
      </Container>
    )
  }
}

Landing.propTypes = {
  history: PropTypes.object.isRequired,
  viewer: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
}

export default Landing
