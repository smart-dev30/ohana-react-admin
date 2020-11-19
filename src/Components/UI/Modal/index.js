import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container, Close } from './styles'

class Modal extends Component {
  handleCancelClick = () => {
    const { onCallback } = this.props
    if (onCallback) onCallback(false)
  }

  render() {
    const {
      children,
      isOpen,
      isOverflow,
      isOverflowVisible,
      ...rest
    } = this.props

    return (
      <Container
        appElement={document.getElementById('root')}
        closeTimeoutMS={170}
        isOpen={isOpen}
        isOverflow={isOverflow}
        isOverflowVisible={isOverflowVisible}
        onRequestClose={this.handleCancelClick}
        {...rest}
      >
        {children}
      </Container>
    )
  }
}

Modal.defaultProps = {
  isOpen: false,
  isOverflow: true,
  isOverflowVisible: false,
  onCallback: () => {},
  children: null,
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isOpen: PropTypes.bool,
  isOverflow: PropTypes.bool,
  isOverflowVisible: PropTypes.bool,
  onCallback: PropTypes.func,
}

Modal.Close = Close

export default Modal
