import React, { Suspense, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router'
import { compose } from 'recompose'

import { withAppContext } from 'Services/Context'

import { Loader } from 'Components/UI'

import { AppContainer, AppContent } from './styles'

class Platform extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { route } = this.props

    return (
      <AppContainer>
        <AppContent>
          <Suspense fallback={<Loader />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </AppContent>
      </AppContainer>
    )
  }
}

Platform.defaultProps = {}

Platform.propTypes = {
  route: PropTypes.object.isRequired,
}

export default compose(
  withAppContext,
  withRouter,
  connect(),
)(Platform)
