import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { Flex } from 'rebass'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { withAppContext } from 'Services/Context'

import { Title } from 'Components/UI'
import DashboardInformation from 'Components/Blocks/Admin/DashboardInformation'

class Dashboard extends PureComponent {
  state = {}

  render() {
    return (
      <div>
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Title>Dashboard</Title>
        </Flex>
        <Flex justifyContent="flex-start">
          <DashboardInformation />
        </Flex>
      </div>
    )
  }
}

Dashboard.propTypes = {
  // viewer: PropTypes.object.isRequired
}

export default connect()(withRouter(withAppContext(Dashboard)))
