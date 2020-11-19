import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Form } from 'react-final-form'
import { Flex } from 'rebass'

import noop from 'lodash/noop'

import { getFilterForm } from 'Store/Selectors/ui'

import { Forms } from 'Components/Blocks'

import { PHONE_MASK } from 'Constants/masks'
import FormStateToRedux from './FormStateToRedux'
import { FormWrapp, SubTitle, FieldWrap } from './styles'

const type = 'users'

const UsersFilterForm = ({ form }) => (
  <Form initialValues={form.values} onSubmit={noop}>
    {({ handleSubmit }) => (
      <FormWrapp onSubmit={handleSubmit}>
        <FormStateToRedux type={type} />

        <SubTitle>Search</SubTitle>
        <Flex justifyContent="space-between" width={1}>
          <FieldWrap>
            <Forms.Input
              label="Name"
              name="fullname"
              placeholder="Anakin Skywalker"
            />
          </FieldWrap>
          <FieldWrap>
            <Forms.Input
              label="Email"
              name="email"
              placeholder="anakin_skywalker@tatooine.mail"
            />
          </FieldWrap>
          <FieldWrap>
            <Forms.Input
              label="Phone"
              mask={PHONE_MASK}
              name="phone"
              placeholder="1 (934) 345-4323"
            />
          </FieldWrap>
          <FieldWrap>
            <Forms.DayPicker label="Last Login" name="lastLogin" />
          </FieldWrap>
        </Flex>
      </FormWrapp>
    )}
  </Form>
)

UsersFilterForm.propTypes = { form: PropTypes.object.isRequired }

export default connect(
  createStructuredSelector({
    form: (state, props) => getFilterForm(type)(state, props),
  }),
)(UsersFilterForm)
