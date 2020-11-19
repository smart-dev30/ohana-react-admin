import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'

import { getViewer } from 'Store/Selectors/viewer'

import { getIsReady } from 'Store/Selectors/app'
import { getTheme } from 'Store/Selectors/persist'
import { getState as getUIState } from 'Store/Selectors/ui'

import routes from 'Config/Routes'

import { AppContext } from 'Services/Context'
import { AbilityContext, viewerAbilities } from 'Services/Ability'

import GlobalStyle from 'Components/GlobalStyle'
import { Loader } from 'Components/UI'

import themes from 'Theme'

import { Container } from './styles'

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      breakpoint: this.theme.breakpointNames.DESKTOP,
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  get theme() {
    const { theme } = this.props
    return themes[theme]
  }

  handleResize = () => {
    const {
      theme: { breakpoints, breakpointNames },
    } = this
    const { breakpoint } = this.state

    const width = window.innerWidth

    const setBreakpoint = pointName => {
      if (pointName !== breakpoint) {
        this.setState({ breakpoint: pointName })
      }
    }

    if (width <= parseInt(breakpoints[0], 10)) {
      setBreakpoint(breakpointNames.MOBILE)
    } else if (width <= parseInt(breakpoints[1], 10)) {
      setBreakpoint(breakpointNames.TABLET)
    } else {
      setBreakpoint(breakpointNames.DESKTOP)
    }
  }

  render() {
    const { theme } = this
    const { breakpoint } = this.state
    const { isReady, viewer, theme: themeName, ui } = this.props

    return (
      <ThemeProvider theme={theme}>
        <AppContext.Provider
          value={{ breakpoint, viewer, theme, themeName, ui: ui.asMutable() }}
        >
          <AbilityContext.Provider value={viewerAbilities(viewer)}>
            <Container>
              <GlobalStyle />
              {isReady ? renderRoutes(routes(viewer)) : <Loader />}
              <ToastContainer className="bam-toast" />
            </Container>
          </AbilityContext.Provider>
        </AppContext.Provider>
      </ThemeProvider>
    )
  }
}

App.defaultProps = {
  viewer: null,
}

App.propTypes = {
  isReady: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  viewer: PropTypes.object,
}

export default withRouter(
  connect(
    createStructuredSelector({
      isReady: getIsReady,
      viewer: getViewer,
      theme: getTheme,
      ui: getUIState,
    }),
  )(App),
)
