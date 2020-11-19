import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Flex } from 'rebass'

import { Title, Button, Modal } from 'Components/UI'

import ConfirmModal from './styles'

class Confirm extends PureComponent {
  handleConfirm = () => {
    const { onConfirm } = this.props

    onConfirm()
  }

  handleCallback = () => {
    const { onCallback } = this.props

    onCallback()
  }

  render() {
    const { isOpen, okTitle, cancelTitle, title } = this.props

    return (
      <Modal isOpen={isOpen} onCallback={this.handleCallback}>
        <Modal.Close onClick={this.handleCallback} />
        <ConfirmModal>
          <Flex alignItems="center" mb={4} mt={2}>
            <Title.H2 color="brownishGray" textAlign="center">
              {title}
            </Title.H2>
          </Flex>

          <Flex justifyContent="space-between" mb={[0, 4]} width={1}>
            <Button
              maxWidth={196}
              mr={2}
              mt={4}
              primary
              type="submit"
              width={1 / 2.2}
              onClick={this.handleCallback}
            >
              {cancelTitle}
            </Button>

            <Button
              maxWidth={196}
              mt={4}
              secondary
              type="submit"
              width={1 / 2.2}
              onClick={this.handleConfirm}
            >
              {okTitle}
            </Button>
          </Flex>
        </ConfirmModal>
      </Modal>
    )
  }
}

Confirm.defaultProps = {
  title: 'Confirm edit user profile',
  okTitle: 'OK',
  cancelTitle: 'CANCEL',
}

Confirm.propTypes = {
  cancelTitle: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  okTitle: PropTypes.string,
  title: PropTypes.string,
  onCallback: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default Confirm
