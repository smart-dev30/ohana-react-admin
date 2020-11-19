import React, { Suspense, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router'
import { compose } from 'recompose'

import { withAppContext } from 'Services/Context'

import { Sidebar, Header } from 'Components/Blocks/Admin'
import { Loader } from 'Components/UI'

import { AppContainer, AppContent } from './styles'

class Admin extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { route, ui } = this.props

    return (
      <AppContainer>
        <Sidebar shrinked={ui.sidebarShrinked} />
        <Header shrinked={ui.sidebarShrinked} />
        <AppContent shrinked={ui.sidebarShrinked}>
          <Suspense fallback={<Loader />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </AppContent>
      </AppContainer>
    )
  }
}

Admin.defaultProps = {}

Admin.propTypes = {
  route: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
}

export default compose(
  withAppContext,
  withRouter,
  connect(),
)(Admin)
