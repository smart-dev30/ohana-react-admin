import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { toast } from 'react-toastify'
import validate from 'validate.js'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { Text, Flex } from 'rebass'

import { presenceFieldConstraint } from 'Constants/constraints'

import { Forms } from 'Components/Blocks'

import { Title, Button, Modal, Icon } from 'Components/UI'

import LogoUploader from 'Components/Blocks/Admin/LogoUploader'

import { loadingGlyph, headquarterGlyph } from 'Assets/Svg'

import { ConfirmModal, FormBlock, ErrorBlock } from './styles'

class HeadquarterEditModal extends PureComponent {
  getFormInitialValue = () => {
    const { headquarter } = this.props
    return isEmpty(headquarter)
      ? {}
      : {
          id: get(headquarter, 'id'),
          name: get(headquarter, 'name'),
          url: get(headquarter, 'url'),
          notes: get(headquarter, 'notes'),
          logo: get(headquarter, ['logo', 'id']),
        }
  }

  handleSubmit = async values => {
    const {
      headquarter,
      onConfirm,
      onCallback,
      onCreateHeadquarter,
      onUpdateHeadquarter,
    } = this.props
    const isEditing = !isEmpty(headquarter)
    const { ok } = isEditing
      ? await onUpdateHeadquarter(values)
      : await onCreateHeadquarter(values)

    if (ok) {
      toast.success(
        isEditing
          ? 'Parent organization updated'
          : 'Parent organization created',
      )
      onConfirm()
    } else {
      toast.error('Something went wrong. Please try again')
      onCallback()
    }
  }

  handleCallback = () => {
    const { onCallback } = this.props

    onCallback()
  }

  validate = values => {
    return validate(values, {
      ...presenceFieldConstraint('name'),
    })
  }

  renderForm = ({ handleSubmit, invalid }) => {
    const { error, headquarter, isLoading, okTitle } = this.props
    const isEditing = !isEmpty(headquarter)

    return (
      <FormBlock mt={4} onSubmit={handleSubmit}>
        <Text fontSize={3} mb={2} textAlign="center">
          <b>Parent Organization Name:*</b>
        </Text>
        <Forms.Input
          centered={1}
          defaultValue={isEditing ? get(headquarter, 'name') : ''}
          icon={null}
          mb={3}
          name="name"
          placeholder="Enter Name"
          type="text"
        />
        <Text fontSize={3} mb={2} textAlign="center">
          <b>URL:</b>
        </Text>
        <Forms.Input
          centered={1}
          defaultValue={isEditing ? get(headquarter, 'url') : ''}
          icon={null}
          mb={3}
          name="url"
          placeholder="Enter Parent Organization URL"
          type="text"
        />
        <Text fontSize={3} mb={2} textAlign="center">
          <b>Logo:</b>
        </Text>
        <Flex alignItems="center" flexDirection="column" mb={3}>
          <LogoUploader editable={false} glyph={headquarterGlyph} name="logo" />
        </Flex>
        <Text fontSize={3} mb={2} textAlign="center">
          <b>Notes:</b>
        </Text>
        <Forms.Input
          centered={1}
          defaultValue={isEditing ? get(headquarter, 'notes') : ''}
          icon={null}
          mb={3}
          name="notes"
          placeholder="Enter any notes related to the hospital."
          type="text"
        />
        <Flex
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          mt={4}
        >
          <Button
            disabled={invalid}
            secondary
            type="submit"
            width={240}
            onClick={this.handleConfirm}
          >
            {isLoading && <Icon glyph={loadingGlyph} size={28} />}
            {isEditing ? 'Save' : okTitle}
          </Button>
        </Flex>
        <ErrorBlock>{error}</ErrorBlock>
      </FormBlock>
    )
  }

  render() {
    const { isOpen, headquarter, title } = this.props

    return (
      <Modal isOpen={isOpen} onCallback={this.handleCallback}>
        <Modal.Close onClick={this.handleCallback} />
        <ConfirmModal>
          <Title.H2 color="brownishGray" mb={4} mt={1} textAlign="center">
            {isEmpty(headquarter) ? title : 'Edit Parent Organization'}
          </Title.H2>
          <Form
            initialValues={this.getFormInitialValue()}
            render={this.renderForm}
            validate={this.validate}
            validateOnBlur={false}
            onSubmit={this.handleSubmit}
          />
        </ConfirmModal>
      </Modal>
    )
  }
}

HeadquarterEditModal.defaultProps = {
  error: false,
  headquarter: null,
  isLoading: false,
  title: 'Add Parent Organization',
  okTitle: 'ADD',
}

HeadquarterEditModal.propTypes = {
  error: PropTypes.bool,
  headquarter: PropTypes.object,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  okTitle: PropTypes.string,
  title: PropTypes.string,
  onCallback: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCreateHeadquarter: PropTypes.func.isRequired,
  onUpdateHeadquarter: PropTypes.func.isRequired,
}

export default HeadquarterEditModal
