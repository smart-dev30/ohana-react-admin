import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass'
import { Form as FinalForm } from 'react-final-form'
import validate from 'validate.js'
import { toast } from 'react-toastify'

import get from 'lodash/get'
import map from 'lodash/map'
import filter from 'lodash/filter'

import { chevronLeftGlyph, onboardingDocPhoto } from 'Assets/Svg'

import { ADMIN_PATHS } from 'Constants/paths'
import { presenceFieldConstraint, emailConstraint } from 'Constants/constraints'
import { PLANS_SELECT_OPTIONS } from 'Constants/plans'

import { Button, Icon, NavLink, Text } from 'Components/UI'
import { Forms } from 'Components/Blocks'
import AvatarUploader from 'Components/Blocks/Admin/AvatarUploader'
import Confirm from 'Components/Blocks/Admin/Modals/Confirm'

import {
  Form,
  FieldWrap,
  Wrapper,
  Column,
  SubTitle,
  Row,
  FieldWithData,
} from './styles'

class WaitingRoom extends PureComponent {
  state = {
    isEditable: false,
    isConfirmOpen: false,
  }

  componentDidMount() {
    const { onLoadWaitingRoom, match } = this.props
    const id = get(match, 'params.roomId') || 0
    onLoadWaitingRoom(id)
  }

  getFormInitialValue = () => {
    const { waitingRoom, match } = this.props
    const id = get(match, 'params.roomId') || 0
    const preData = get(waitingRoom, 'entity', {}) || {}
    return {
      id: get(preData, 'id') || id,
      name: get(preData, 'name'),
      email: get(preData, 'createdBy.profile.email'),
      plan: get(preData, ''),
      background: get(preData, 'avatar.id'),
      expectedDate: get(preData, 'expectedDate'),
    }
  }

  handleSubmit = async values => {
    const { onUpdateWaitingRoom } = this.props

    this.handleCloseConfirm()
    const { ok } = await onUpdateWaitingRoom(values)

    if (ok) {
      toast.success('Waiting room updated')
    } else {
      toast.error('Something went wrong. Please try again')
    }
  }

  handleClickBack = () => {
    const { history } = this.props

    history.push(ADMIN_PATHS.WAITING_ROOMS)
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
      ...emailConstraint,
      ...presenceFieldConstraint('background'),
    })
  }

  renderForm = ({ handleSubmit, invalid }) => {
    const { isEditable, isConfirmOpen } = this.state
    const { waitingRoom } = this.props
    const preData = get(waitingRoom, 'entity', {}) || {}
    const id = get(preData, 'id') || 0
    const gender = get(preData, 'gender')
    const expectedDate = get(preData, 'expectedDate')
    const roomsParCount = get(preData, 'roomsParticipantsCount')
    const helpersList = filter(
      get(preData, 'roomsParticipants'),
      item => item.role === 'helper',
    )
    const helpersName = map(helpersList, item =>
      get(item, 'user.profile.firstName'),
    )
    return (
      <Fragment>
        <Confirm
          isOpen={isConfirmOpen}
          title="Confirm edit waiting room"
          onCallback={this.handleCloseConfirm}
          onConfirm={handleSubmit}
        />
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Button white onClick={this.handleClickBack}>
            <Icon
              fill="dodgerBlue"
              glyph={chevronLeftGlyph}
              size={20}
              stroke="dodgerBlue"
            />
            Waiting Rooms
          </Button>

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
            <SubTitle>Waiting Room Details</SubTitle>
            <Wrapper>
              <Column width={1 / 2}>
                <FieldWrap>
                  <Forms.Input
                    disabled={!isEditable}
                    label="Waiting Room Name"
                    name="name"
                    placeholder=""
                  />
                </FieldWrap>
                <FieldWrap>
                  <Forms.Input
                    disabled={!isEditable}
                    label="Owner Name (email)"
                    name="email"
                    placeholder=""
                  />
                </FieldWrap>

                <Wrapper>
                  <Row width={1}>
                    <FieldWrap justifyContent="flex-start" width={1 / 2}>
                      <FieldWithData alignLeft mr={3}>
                        <h3>
                          <b>Plan</b>
                        </h3>
                        <Forms.Select
                          isDisabled={!isEditable}
                          name="plan"
                          options={PLANS_SELECT_OPTIONS}
                          placeholder="Select your plan"
                          width={200}
                        />
                      </FieldWithData>
                    </FieldWrap>
                    <FieldWrap
                      alignContent="center"
                      alignItems="center"
                      flexWrap="wrap"
                      justifyContent="flex-start"
                      width={1 / 2}
                    >
                      <FieldWithData alignLeft>
                        <h3>
                          <b>Helpers</b>
                        </h3>
                        <div>{helpersName.join(', ')}</div>
                      </FieldWithData>
                    </FieldWrap>
                    <FieldWrap justifyContent="flex-start" width={1 / 10}>
                      <FieldWithData alignLeft>
                        <h3>
                          <b>Guests</b>
                        </h3>
                        <div>
                          <NavLink to={`/admin/waiting-room/${id}/guests`}>
                            <Text ellipsis>{roomsParCount} Guests</Text>
                          </NavLink>
                        </div>
                      </FieldWithData>
                    </FieldWrap>
                  </Row>
                </Wrapper>
              </Column>
              <Column ml={5}>
                <FieldWrap>
                  <AvatarUploader
                    editable={!isEditable}
                    glyph={onboardingDocPhoto}
                    name="background"
                    title="Background"
                  />
                </FieldWrap>
              </Column>
            </Wrapper>

            <SubTitle>Waiting Room Profile Info</SubTitle>
            <Wrapper>
              <Row width={1}>
                <FieldWrap justifyContent="flex-start" width={1 / 5}>
                  <FieldWithData alignLeft>
                    <h3>
                      <b>Gender</b>
                    </h3>
                    <div>{gender}</div>
                  </FieldWithData>
                </FieldWrap>
                <FieldWrap justifyContent="flex-start" width={1 / 5}>
                  <FieldWithData alignLeft>
                    <h3>
                      <b>Ex.due date</b>
                    </h3>
                    <Forms.DayPicker
                      disabled={!isEditable}
                      name="expectedDate"
                      value={expectedDate}
                    />
                  </FieldWithData>
                </FieldWrap>
              </Row>
            </Wrapper>
          </Form>
        </Flex>
      </Fragment>
    )
  }

  render() {
    return (
      <FinalForm
        initialValues={this.getFormInitialValue()}
        keepDirtyOnReinitialize
        render={this.renderForm}
        validate={this.validate}
        validateOnBlur={false}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

WaitingRoom.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  waitingRoom: PropTypes.object.isRequired,
  onLoadWaitingRoom: PropTypes.func.isRequired,
  onUpdateWaitingRoom: PropTypes.func.isRequired,
}

export default WaitingRoom
