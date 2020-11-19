import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper, ImageHolder } from './styles'

const Avatar = ({ image, ...rest }) => (
  <Wrapper {...rest}>
    <ImageHolder src={image} {...rest} />
  </Wrapper>
)

Avatar.defaultProps = {
  image: null,
}

Avatar.propTypes = {
  image: PropTypes.string,
}

Avatar.displayName = 'Avatar'

export default Avatar
