import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { toast } from 'react-toastify'
import validate from 'validate.js'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { Text, Flex } from 'rebass'

import { presenceFieldConstraint } from 'Constants/constraints'

import { Forms } from 'Components/Blocks'

import { Title, Button, Modal, Icon, Input } from 'Components/UI'

import LogoUploader from 'Components/Blocks/Admin/LogoUploader'

import { loadingGlyph, organizationGlyph } from 'Assets/Svg'

import { ConfirmModal, FormBlock, ErrorBlock } from './styles'

class OrganizationEditModal extends PureComponent {
  getFormInitialValue = () => {
    const { organization } = this.props
    return isEmpty(organization)
      ? {}
      : {
          id: get(organization, 'id'),
          headquarterName: get(organization, ['headquarter', 'name']),
          logo: get(organization, 'logo.id'),
          name: get(organization, 'name'),
          url: get(organization, 'url'),
          notes: get(organization, 'notes'),
          visitingInstructionsUrl: get(organization, 'visitingInstructionsUrl'),
        }
  }

  validate = values => {
    const { organization } = this.props
    return validate(
      values,
      isEmpty(organization)
        ? {
            ...presenceFieldConstraint('headquarter'),
            ...presenceFieldConstraint('name'),
          }
        : {
            ...presenceFieldConstraint('name'),
          },
    )
  }

  handleSubmit = async values => {
    const {
      organization,
      onConfirm,
      onCallback,
      onCreateOrganization,
      onUpdateOrganization,
    } = this.props
    const isEditing = !isEmpty(organization)
    const { ok } = isEditing
      ? await onUpdateOrganization(values)
      : await onCreateOrganization(values)

    if (ok) {
      toast.success(isEditing ? 'Organization updated' : 'Organization created')
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

  renderForm = ({ handleSubmit, pristine, invalid }) => {
    const { error, isLoading, okTitle, headquarters, organization } = this.props
    const isEditing = !isEmpty(organization)
    return (
      <FormBlock mt={4} onSubmit={handleSubmit}>
        <Text fontSize={3} mb={2} textAlign="center">
          <b>Parent Organization:*</b>
        </Text>
        {isEditing ? (
          <Input
            centered={1}
            defaultValue={
              isEditing ? get(organization, ['headquarter', 'name']) : ''
            }
            disabled
            icon={null}
            mb={3}
            name="headquarter"
            type="text"
          />
        ) : (
          <Forms.Select
            mb={3}
            name="headquarter"
            options={headquarters}
            placeholder="Select Parent Organization"
          />
        )}

        <Text fontSize={3} mb={2} textAlign="center">
          <b>Organization name:*</b>
        </Text>
        <Forms.Input
          centered={1}
          defaultValue={isEditing ? get(organization, 'name') : ''}
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
          defaultValue={isEditing ? get(organization, 'url') : ''}
          icon={null}
          mb={3}
          name="url"
          placeholder="Enter Hospital URL"
          type="text"
        />
        <Text fontSize={3} mb={2} textAlign="center">
          <b>Visiting Instructions URL:</b>
        </Text>
        <Forms.Input
          centered={1}
          defaultValue={
            isEditing ? get(organization, 'visitingInstructionsUrl') : ''
          }
          icon={null}
          mb={3}
          name="visiting_url"
          placeholder="Enter Visiting Instructions URL"
          type="text"
        />
        <Text fontSize={3} mb={2} textAlign="center">
          <b>Logo:</b>
        </Text>
        <Flex alignItems="center" flexDirection="column" mb={3}>
          <LogoUploader
            editable={false}
            glyph={organizationGlyph}
            name="logo"
            width={1}
          />
        </Flex>
        <Text fontSize={3} mb={2} textAlign="center">
          <b>Notes:</b>
        </Text>
        <Forms.Input
          centered={1}
          defaultValue={isEditing ? get(organization, 'notes') : ''}
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
            disabled={pristine || invalid}
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
    const { isOpen, organization, title } = this.props
    return (
      <Modal isOpen={isOpen} onCallback={this.handleCallback}>
        <Modal.Close onClick={this.handleCallback} />
        <ConfirmModal>
          <Title.H2 color="brownishGray" mb={4} mt={1} textAlign="center">
            {isEmpty(organization) ? title : 'Edit Organization'}
          </Title.H2>

          <Form
            initialValues={this.getFormInitialValue()}
            render={this.renderForm}
            validate={this.validate}
            onSubmit={this.handleSubmit}
          />
        </ConfirmModal>
      </Modal>
    )
  }
}

OrganizationEditModal.defaultProps = {
  error: false,
  organization: null,
  isLoading: false,
  title: 'Add Organization',
  okTitle: 'ADD',
}

OrganizationEditModal.propTypes = {
  error: PropTypes.bool,
  headquarters: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  okTitle: PropTypes.string,
  organization: PropTypes.object,
  title: PropTypes.string,
  onCallback: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCreateOrganization: PropTypes.func.isRequired,
  onUpdateOrganization: PropTypes.func.isRequired,
}

export default OrganizationEditModal
