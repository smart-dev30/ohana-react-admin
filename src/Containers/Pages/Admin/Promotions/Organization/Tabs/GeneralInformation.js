import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form as FinalForm } from 'react-final-form'

import { toast } from 'react-toastify'

import { Flex, Box } from 'rebass'

import get from 'lodash/get'
import omit from 'lodash/omit'

import validate from 'validate.js'
import { presenceFieldConstraint } from 'Constants/constraints'

import { headquarterGlyph } from 'Assets/Svg'

import { Button } from 'Components/UI'

import { Forms } from 'Components/Blocks'
import LogoUploader from 'Components/Blocks/Admin/LogoUploader'
import Confirm from 'Components/Blocks/Admin/Modals/Confirm'

import { Form, Column, ColumnLogo, FormText } from './styles'

const GeneralInformaion = ({ organization, match, onUpdateOrganization }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const getFormInitialValue = () => {
    const id = get(match, 'params.organizationId') || 0
    const entity = get(organization, 'entity')
    return {
      id: get(entity, 'id') || id,
      headquarter: get(entity, ['headquarter']),
      logo: get(entity, 'logo.id'),
      name: get(entity, 'name'),
      url: get(entity, 'url'),
      notes: get(entity, 'notes'),
      visitingInstructionsUrl: get(entity, 'visitingInstructionsUrl'),
    }
  }

  const onHandleSubmit = async values => {
    const { ok } = await onUpdateOrganization(omit(values, 'id'))

    if (ok) {
      toast.success('Organization updated')
    } else {
      toast.error('Something went wrong. Please try again')
    }
    setIsConfirmOpen(false)
    setIsEditable(false)
  }

  const handleToggleEdit = () => {
    setIsEditable(!isEditable)
  }

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false)
  }

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true)
  }

  const validateForm = values => {
    return validate(values, {
      ...presenceFieldConstraint('name'),
    })
  }

  const renderForm = values => {
    const { handleSubmit, invalid } = values
    return (
      <>
        <Confirm
          isOpen={isConfirmOpen}
          title="Confirm edit Organization"
          onCallback={handleCloseConfirm}
          onConfirm={handleSubmit}
        />
        <Flex justifyContent="space-between" width={1}>
          <Flex flex={1}>
            <Form>
              <Flex flexDirection="column">
                <Flex alignItems="center" mb={3}>
                  <Column width={1 / 7}>
                    <FormText>Parent Organization:</FormText>
                  </Column>
                  <Column width={6 / 7}>
                    <Forms.Input
                      disabled
                      label=""
                      name="headquarter.name"
                      placeholder=""
                      type="text"
                    />
                  </Column>
                </Flex>
                <Flex alignItems="center" mb={3}>
                  <Column width={1 / 7}>
                    <FormText>Hospital Name:</FormText>
                  </Column>
                  <Column width={6 / 7}>
                    <Forms.Input
                      disabled={!isEditable}
                      label=""
                      name="name"
                      placeholder=""
                      type="text"
                    />
                  </Column>
                </Flex>
                <Flex alignItems="center" mb={3}>
                  <Column width={1 / 7}>
                    <FormText>URL: </FormText>
                  </Column>
                  <Column width={6 / 7}>
                    <Forms.Input
                      disabled={!isEditable}
                      label=""
                      name="url"
                      placeholder=""
                    />
                  </Column>
                </Flex>
                <Flex alignItems="center" mb={3}>
                  <Column width={1 / 7}>
                    <FormText>Visiting Instructions URL:</FormText>
                  </Column>
                  <Column width={6 / 7}>
                    <Forms.Input
                      disabled={!isEditable}
                      label=""
                      name="visitingInstructionsUrl"
                      placeholder=""
                      type="text"
                    />
                  </Column>
                </Flex>
                <Flex alignItems="center" mb={3}>
                  <Column width={1 / 7}>
                    <FormText>Logo:</FormText>
                  </Column>
                  <ColumnLogo width={6 / 7}>
                    <LogoUploader
                      editable={!isEditable}
                      glyph={headquarterGlyph}
                      name="logo"
                      title=""
                      width={1}
                    />
                  </ColumnLogo>
                </Flex>
                <Flex alignItems="center" mb={3}>
                  <Column width={1 / 7}>
                    <FormText>Notes:</FormText>
                  </Column>
                  <Column width={6 / 7}>
                    <Forms.Input
                      disabled={!isEditable}
                      label=""
                      name="notes"
                      placeholder=""
                    />
                  </Column>
                </Flex>
              </Flex>
            </Form>
          </Flex>
          <Box>
            <Button mr={3} secondary onClick={handleToggleEdit}>
              {isEditable ? 'Cancel' : 'Edit'}
            </Button>
            {isEditable && (
              <Button disabled={invalid} secondary onClick={handleOpenConfirm}>
                Save
              </Button>
            )}
          </Box>
        </Flex>
      </>
    )
  }

  return (
    <>
      <FinalForm
        initialValues={getFormInitialValue()}
        keepDirtyOnReinitialize
        render={renderForm}
        validate={validateForm}
        validateOnBlur={false}
        onSubmit={onHandleSubmit}
      />
    </>
  )
}

GeneralInformaion.defaultProps = {}

GeneralInformaion.propTypes = {
  match: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  onUpdateOrganization: PropTypes.func.isRequired,
}

export default GeneralInformaion
