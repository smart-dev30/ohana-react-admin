import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Form } from 'react-final-form'
import { Flex } from 'rebass'

import noop from 'lodash/noop'

import { getFilterForm } from 'Store/Selectors/ui'

import { Forms } from 'Components/Blocks'

import { WR_SELECT_OPTIONS } from 'Constants/types'

import FormStateToRedux from './FormStateToRedux'
import { FormWrapp, SubTitle, FieldWrap } from './styles'

const type = 'waitingRooms'

const WaitingRoomsFilterForm = ({ form }) => (
  <Form initialValues={form.values} onSubmit={noop}>
    {({ handleSubmit }) => (
      <FormWrapp onSubmit={handleSubmit}>
        <FormStateToRedux type={type} />

        <SubTitle>Search</SubTitle>
        <Flex justifyContent="flex-start" width={1}>
          <FieldWrap mr={3}>
            <Forms.Input label="WR Name" name="fullname" placeholder="" />
          </FieldWrap>

          <FieldWrap mr={3}>
            <Forms.Input
              label="WR Owner Name"
              name="ownerName"
              placeholder=""
            />
          </FieldWrap>

          <FieldWrap mr={3}>
            <Forms.DayPicker label="Date Created" name="createdAt" />
          </FieldWrap>

          <FieldWrap>
            <Forms.Select
              isClearable
              label="WR Type"
              name="kind"
              options={WR_SELECT_OPTIONS}
              placeholder="Select WR type"
            />
          </FieldWrap>
        </Flex>
      </FormWrapp>
    )}
  </Form>
)

WaitingRoomsFilterForm.propTypes = { form: PropTypes.object.isRequired }

export default connect(
  createStructuredSelector({
    form: (state, props) => getFilterForm(type)(state, props),
  }),
)(WaitingRoomsFilterForm)
