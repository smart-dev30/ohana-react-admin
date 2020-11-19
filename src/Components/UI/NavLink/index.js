import styled from 'styled-components'
import { themeGet, space } from 'styled-system'
import { Link } from 'rebass'

import { NavLink } from 'react-router-dom'
import { mapToTheme } from 'styled-map'

export default styled(Link.withComponent(NavLink))`
  display: inline-block;
  color: ${mapToTheme('links.color')};
  text-decoration: underline;
  transition: all ${themeGet('transitionTime')} ease;

  &:hover {
    color: ${mapToTheme('links.hover')};
  }

  &:focus,
  &:active,
  &.active {
    outline: none;
    color: ${mapToTheme('links.active')};
  }

  ${space};
`
