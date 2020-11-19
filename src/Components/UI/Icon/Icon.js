import React from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'

import StyledIcon from './styles'

const Icon = ({ glyph, ...rest }) => (
  <StyledIcon {...rest}>
    <use xlinkHref={`#${get(glyph, 'id')}`} />
  </StyledIcon>
)

Icon.displayName = 'Icon'

Icon.defaultProps = {
  size: null,
  width: null,
  height: null,
}

Icon.propTypes = {
  /** Glyph by svg-loader */
  glyph: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number,
  width: PropTypes.number,
}

export default Icon
