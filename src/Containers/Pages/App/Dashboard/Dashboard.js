import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { withAppContext } from 'Services/Context'

import { Title } from 'Components/UI'

class Dashboard extends PureComponent {
  state = {}

  render() {
    return (
      <div>
        <Title>Dashboard</Title>
      </div>
    )
  }
}

Dashboard.propTypes = {
  // viewer: PropTypes.object.isRequired,
}

export default connect()(withRouter(withAppContext(Dashboard)))
