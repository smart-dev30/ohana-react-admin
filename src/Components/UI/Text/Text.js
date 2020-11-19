import React from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'lodash/escapeRegExp'

import { getSearchString } from 'Services/Utils'
import { Container, Mark } from './styles'

const Text = ({ children, highlight, ...attrs }) => {
  const searchText = getSearchString(highlight)

  if (searchText.length > 0) {
    const parts = `${children}`.split(
      new RegExp(`(${escapeRegExp(searchText)})`, 'gi'),
    )

    return (
      /* eslint-disable react/no-array-index-key */
      <Container {...attrs}>
        {parts.map((part, key) =>
          getSearchString(part) === searchText ? (
            <Mark key={key}>{part}</Mark>
          ) : (
            <span key={key}>{part}</span>
          ),
        )}
      </Container>
      /* eslint-enable react/no-array-index-key */
    )
  }

  return <Container {...attrs}>{children}</Container>
}

Text.defaultProps = { highlight: '', children: '' }
Text.propTypes = {
  children: PropTypes.node,
  highlight: PropTypes.string,
}

export default Text
