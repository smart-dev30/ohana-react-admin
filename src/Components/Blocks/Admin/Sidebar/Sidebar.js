import React from 'react'
import PropTypes from 'prop-types'

import { ROOT_PATH, ADMIN_ROOT, ADMIN_PATHS } from 'Constants/paths'
import { HUMAN_USER_TYPES } from 'Constants/types'

// import { Can } from 'Services/Ability'

import { Icon } from 'Components/UI'

import { logoGlyph } from 'Assets/Svg'
import {
  menuDashboardGlyph,
  menuUsersGlyph,
  menuWaitingRoomsGlyph,
  menuPromotionsGlyph,
} from 'Assets/Svg/Menu'

import { Container, Bar, Menu, StyledNav, Label, Top, Bottom } from './styles'

const Sidebar = ({ viewer, shrinked }) => (
  <Container shrinked={shrinked}>
    <Bar shrinked={shrinked}>
      <Menu>
        <Top>
          <StyledNav exact href={ROOT_PATH} logo="true" to={ADMIN_ROOT}>
            <Icon glyph={logoGlyph} size={40} />
            {HUMAN_USER_TYPES[viewer.type]} Panel
          </StyledNav>
          <StyledNav
            exact
            href={ADMIN_PATHS.DASHBOARD}
            to={ADMIN_PATHS.DASHBOARD}
          >
            <Icon glyph={menuDashboardGlyph} size={24} />
            <Label>Dashboard</Label>
          </StyledNav>
          <StyledNav href={ADMIN_PATHS.USERS} to={ADMIN_PATHS.USERS}>
            <Icon glyph={menuUsersGlyph} size={24} />
            <Label>Users</Label>
          </StyledNav>

          <StyledNav
            href={ADMIN_PATHS.WAITING_ROOMS}
            to={ADMIN_PATHS.WAITING_ROOMS}
          >
            <Icon glyph={menuWaitingRoomsGlyph} size={24} />
            <Label>Waiting Rooms</Label>
          </StyledNav>
          <StyledNav href={ADMIN_PATHS.PROMOTIONS} to={ADMIN_PATHS.PROMOTIONS}>
            <Icon glyph={menuPromotionsGlyph} size={24} />
            <Label>Promotions</Label>
          </StyledNav>
        </Top>
        <Bottom />
      </Menu>
    </Bar>
  </Container>
)

Sidebar.propTypes = {
  shrinked: PropTypes.bool.isRequired,
  viewer: PropTypes.object.isRequired,
}

export default Sidebar
