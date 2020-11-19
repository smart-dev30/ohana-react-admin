import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass'
import { Form as FinalForm } from 'react-final-form'
import validate from 'validate.js'
import { toast } from 'react-toastify'

import get from 'lodash/get'
import map from 'lodash/map'

import {
  chevronLeftGlyph,
  onboardingDocPhoto,
  checkMarkGlyph,
  errorMarkGlyph,
} from 'Assets/Svg'

import { ADMIN_PATHS } from 'Constants/paths'
import { presenceFieldConstraint } from 'Constants/constraints'

import { Button, Icon } from 'Components/UI'
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

class User extends PureComponent {
  state = {
    isEditable: false,
    isConfirmOpen: false,
  }

  componentDidMount = () => {
    const { onLoadUser, match } = this.props
    const id = get(match, 'params.roomId') || 0

    onLoadUser(id)
  }

  getFormInitialValue = () => {
    const { user, match } = this.props
    const id = get(match, 'params.roomId') || 0
    const preData = get(user, 'entity')
    const createdAt = get(preData, 'createdAt')
    const loginAt = get(preData, 'lastLoggedInAt')
    return {
      id: get(preData, 'id') || id,
      firstName: get(preData, 'profile.firstName'),
      lastName: get(preData, 'profile.lastName'),
      email: get(preData, 'profile.email'),
      plan: get(preData, 'status'),
      phone: get(
        preData,
        'profile.verifiedPrimaryPhoneNumber.internationalFormat',
      ),
      personalPhoto: get(preData, 'profile.avatar.id'),
      login_at: loginAt
        ? new Date(get(preData, 'lastLoggedInAt')).toLocaleString()
        : null,
      created_at: new Date(createdAt).toLocaleString(),
    }
  }

  handleSubmit = async values => {
    const { onUpdateUser } = this.props

    const { ok } = await onUpdateUser(values)

    if (ok) {
      toast.success('User updated')
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

    history.push(ADMIN_PATHS.USERS)
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
      ...presenceFieldConstraint('lastName'),
      ...presenceFieldConstraint('firstName'),
      // ...presenceFieldConstraint('personalPhoto'),
    })
  }

  renderForm = ({ handleSubmit, invalid }) => {
    const { user } = this.props
    const { isEditable, isConfirmOpen } = this.state
    const waitingRooms = get(user, 'entity.createdWaitingRooms')
    const verifiedEmail = get(user, 'entity.emailCredential.state') === 'active'
    const verifiedPhone =
      get(user, 'entity.profile.verifiedPrimaryPhoneNumber.state') ===
      'verified'
    const inWRCount = (get(user, 'entity.roomsParticipating') || []).length
    return (
      <Fragment>
        <Confirm
          isOpen={isConfirmOpen}
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
            Users
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
            <SubTitle>Main User Details</SubTitle>
            <Wrapper>
              <Column width={1 / 5}>
                <FieldWrap>
                  <Forms.Input
                    disabled={!isEditable}
                    label="First Name"
                    name="firstName"
                    placeholder=""
                  />
                </FieldWrap>
                <FieldWrap>
                  <Forms.Input
                    disabled={!isEditable}
                    label="Last Name"
                    name="lastName"
                    placeholder=""
                  />
                </FieldWrap>
              </Column>
              <Column ml={5}>
                <FieldWrap>
                  <AvatarUploader
                    editable={!isEditable}
                    glyph={onboardingDocPhoto}
                    name="personalPhoto"
                    title="Photo"
                  />
                </FieldWrap>
              </Column>
            </Wrapper>
            <SubTitle>User Contact Details</SubTitle>
            <Wrapper>
              <Row width={1}>
                <FieldWrap width={1 / 5}>
                  <Forms.Input
                    disabled
                    label="Email"
                    name="email"
                    placeholder=""
                  />
                </FieldWrap>
                <FieldWrap width={1 / 12}>
                  <FieldWithData>
                    <span>{verifiedEmail ? 'Verified' : 'Pending'}</span>
                    <Icon
                      fill="white"
                      glyph={verifiedEmail ? checkMarkGlyph : errorMarkGlyph}
                      size={16}
                    />
                  </FieldWithData>
                </FieldWrap>
                <FieldWrap>
                  <Forms.Input
                    disabled
                    label="When Created"
                    name="created_at"
                    placeholder=""
                  />
                </FieldWrap>
              </Row>
              <Row width={1}>
                <FieldWrap width={1 / 5}>
                  <Forms.Input
                    disabled
                    label="Phone"
                    name="phone"
                    placeholder=""
                  />
                </FieldWrap>
                <FieldWrap width={1 / 12}>
                  <FieldWithData>
                    <span>{verifiedPhone ? 'Verified' : 'Pending'}</span>
                    <Icon
                      fill="white"
                      glyph={verifiedPhone ? checkMarkGlyph : errorMarkGlyph}
                      size={16}
                    />
                  </FieldWithData>
                </FieldWrap>
                <FieldWrap>
                  <Forms.Input
                    disabled
                    label="Last login"
                    name="login_at"
                    placeholder=""
                  />
                </FieldWrap>
              </Row>
            </Wrapper>

            <SubTitle>Waiting Rooms Details</SubTitle>
            <Wrapper>
              <Row width={1}>
                <FieldWrap justifyContent="flex-start" width={1 / 5}>
                  <FieldWithData alignLeft>
                    <span>
                      <b>Waiting rooms</b>
                    </span>
                  </FieldWithData>
                </FieldWrap>
                <FieldWrap justifyContent="flex-start" width={1 / 5}>
                  <FieldWithData alignLeft>
                    <span>
                      <b>Guests</b>
                    </span>
                  </FieldWithData>
                </FieldWrap>
                <FieldWrap justifyContent="flex-start" width={1 / 5}>
                  <FieldWithData alignLeft>
                    <span>
                      <b>Guest in {inWRCount} WRs</b>
                    </span>
                  </FieldWithData>
                </FieldWrap>
              </Row>
              {map(waitingRooms, wr => (
                <Row key={wr.id} width={1}>
                  <FieldWrap justifyContent="flex-start" width={1 / 5}>
                    <FieldWithData alignLeft>
                      <div>{wr.name}</div>
                    </FieldWithData>
                  </FieldWrap>
                  <FieldWrap justifyContent="flex-start" width={1 / 5}>
                    <FieldWithData alignLeft>
                      <div>{wr.roomsParticipantsCount}</div>
                    </FieldWithData>
                  </FieldWrap>
                </Row>
              ))}
            </Wrapper>
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

User.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLoadUser: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
}

export default User
