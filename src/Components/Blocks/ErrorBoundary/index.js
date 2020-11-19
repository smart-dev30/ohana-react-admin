import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/browser'

import { Container } from './styles'

class ErrorBoundary extends Component {
  state = { error: null }

  handleReport = () => {
    Sentry.showReportDialog()
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
    })
    Sentry.captureException(error)
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    return (
      <Fragment>
        {children}
        {error && (
          <Container onClick={this.handleReport}>
            <p>Hmmm... Something gone wrong.</p>
            <p>Our team has been notified, but click here fill out a report.</p>
          </Container>
        )}
      </Fragment>
    )
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
