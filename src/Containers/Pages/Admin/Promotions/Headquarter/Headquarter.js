import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Text } from 'rebass'
import { Form as FinalForm } from 'react-final-form'
import validate from 'validate.js'
import { toast } from 'react-toastify'

import get from 'lodash/get'

import { chevronLeftGlyph, headquarterGlyph } from 'Assets/Svg'

import { ADMIN_PATHS } from 'Constants/paths'
import { presenceFieldConstraint } from 'Constants/constraints'

import { Button, Icon } from 'Components/UI'
import { Forms } from 'Components/Blocks'
import LogoUploader from 'Components/Blocks/Admin/LogoUploader'
import Confirm from 'Components/Blocks/Admin/Modals/Confirm'

import { Form, Column, ColumnLogo, FormText } from './styles'

class Headquarter extends PureComponent {
  state = {
    isEditable: false,
    isConfirmOpen: false,
  }

  componentDidMount = () => {
    const { onLoadHeadquarter, match } = this.props
    const id = get(match, 'params.headquarterId') || 0

    onLoadHeadquarter(id)
  }

  getFormInitialValue = () => {
    const { headquarter, match } = this.props
    const id = get(match, 'params.headquarterId') || 0
    const entity = get(headquarter, 'entity')
    return {
      id: get(entity, 'id') || id,
      name: get(entity, 'name'),
      url: get(entity, 'url'),
      notes: get(entity, 'notes'),
      logo: get(entity, ['logo', 'id']),
    }
  }

  handleSubmit = async values => {
    const { onUpdateHeadquarter } = this.props

    const { ok } = await onUpdateHeadquarter(values)

    if (ok) {
      toast.success('Headquarter updated')
    } else {
      toast.error('Something went wrong. Please try again')
    }
    this.setState({
      isConfirmOpen: false,
      isEditable: false,
    })
  }

  handleClickBack = () => {
    const { history } = this.props

    history.push(ADMIN_PATHS.PROMOTIONS)
  }

  handleToggleEdit = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable,
    }))
  }

  handleCloseConfirm = () => {
    this.setState({
      isConfirmOpen: false,
    })
  }

  handleOpenConfirm = () => {
    this.setState({
      isConfirmOpen: true,
    })
  }

  validate = values => {
    return validate(values, {
      ...presenceFieldConstraint('name'),
    })
  }

  renderForm = ({ handleSubmit, invalid }) => {
    const { headquarter } = this.props
    const { isEditable, isConfirmOpen } = this.state

    const entity = get(headquarter, 'entity')

    return (
      <Fragment>
        <Confirm
          isOpen={isConfirmOpen}
          title="Confirm edit Parent Organization"
          onCallback={this.handleCloseConfirm}
          onConfirm={handleSubmit}
        />
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Flex alignItems="center">
            <Button white onClick={this.handleClickBack}>
              <Icon
                fill="dodgerBlue"
                glyph={chevronLeftGlyph}
                size={20}
                stroke="dodgerBlue"
              />
              Parent organizations
            </Button>
            <Text fontSize={[2, 3, 3, 4]} fontWeight="bold" ml={[3, 4]}>
              {get(entity, 'name')}
            </Text>
          </Flex>

          <Box>
            <Button mr={3} secondary onClick={this.handleToggleEdit}>
              {isEditable ? 'Cancel' : 'Edit'}
            </Button>
            {isEditable && (
              <Button
                disabled={invalid}
                secondary
                onClick={this.handleOpenConfirm}
              >
                Save
              </Button>
            )}
          </Box>
        </Flex>
        <Flex>
          <Form onSubmit={handleSubmit}>
            <Flex flexDirection="column">
              <Flex alignItems="center" mb={3}>
                <Column width={1 / 7}>
                  <FormText>Parent Organization:</FormText>
                </Column>
                <Column width={6 / 7}>
                  <Forms.Input
                    disabled={!isEditable}
                    label=""
                    name="name"
                    placeholder=""
                    type="url"
                  />
                </Column>
              </Flex>
              <Flex alignItems="center" mb={3}>
                <Column width={1 / 7}>
                  <FormText>URL:</FormText>
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
      </Fragment>
    )
  }

  render() {
    return (
      <Fragment>
        <FinalForm
          initialValues={this.getFormInitialValue()}
          keepDirtyOnReinitialize
          render={this.renderForm}
          validate={this.validate}
          validateOnBlur={false}
          onSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

Headquarter.propTypes = {
  headquarter: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onLoadHeadquarter: PropTypes.func.isRequired,
  onUpdateHeadquarter: PropTypes.func.isRequired,
}

export default Headquarter
