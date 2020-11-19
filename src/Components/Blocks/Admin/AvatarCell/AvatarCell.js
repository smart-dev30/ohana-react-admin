import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

import { Avatar } from 'Components/UI'
import { Container, Photo } from './styles'

const AdminAvatarCell = ({ avatarSize, content, photoHeight }) => {
  const mediumUrl = get(content, 'medium.url')

  return (
    <Container>
      <Avatar image={get(content, 'smallThumb.url')} size={avatarSize} />

      {mediumUrl && (
        <Photo avatarSize={avatarSize} height={photoHeight} src={mediumUrl} />
      )}
    </Container>
  )
}
AdminAvatarCell.defaultProps = {
  avatarSize: 24,
  content: null,
  photoHeight: 220,
}
AdminAvatarCell.propTypes = {
  avatarSize: PropTypes.number,
  content: PropTypes.object,
  photoHeight: PropTypes.number,
}

export default AdminAvatarCell
