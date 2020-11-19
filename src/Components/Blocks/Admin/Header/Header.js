import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { hideMenuGlyph } from 'Assets/Svg'

import { Avatar } from 'Components/UI'

import {
  Container,
  Bar,
  LeftMenu,
  SidebarToggleIcon,
  Menu,
  User,
  UserBlock,
  Logout,
  UserMobile,
} from './styles'

class Header extends Component {
  state = {}

  handleLogout = () => {
    const { onLogOut } = this.props
    onLogOut()
  }

  render() {
    const { viewer, onToggleSidebar, shrinked } = this.props
    const { email } = viewer.emailCredential
    return (
      <Container shrinked={shrinked}>
        <Bar>
          <LeftMenu>
            <SidebarToggleIcon
              glyph={hideMenuGlyph}
              size={20}
              onClick={onToggleSidebar}
            />
          </LeftMenu>
          <Menu>
            <User>
              <UserBlock>
                {email}
                <Logout onClick={this.handleLogout}>Logout</Logout>
              </UserBlock>
              <Avatar size={36} />
            </User>
          </Menu>
        </Bar>
        <UserMobile>
          <Avatar size={36} onClick={this.handleLogout} />
        </UserMobile>
      </Container>
    )
  }
}

Header.propTypes = {
  shrinked: PropTypes.bool.isRequired,
  viewer: PropTypes.object.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
}

export default Header
