import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Form } from 'react-final-form'
import { Flex } from 'rebass'

import noop from 'lodash/noop'

import { getFilterForm } from 'Store/Selectors/ui'

import { Forms } from 'Components/Blocks'

import FormStateToRedux from './FormStateToRedux'
import { FormWrapp, FieldWrap } from './styles'

const type = 'headquarters'

const HeadquartersFilterForm = ({ form }) => (
  <Form initialValues={form.values} onSubmit={noop}>
    {({ handleSubmit }) => (
      <FormWrapp onSubmit={handleSubmit}>
        <FormStateToRedux type={type} />
        <Flex justifyContent="space-between" width={1}>
          <FieldWrap>
            <Forms.Input
              name="headquarterName"
              placeholder="Search by parent organization"
            />
          </FieldWrap>
        </Flex>
      </FormWrapp>
    )}
  </Form>
)

HeadquartersFilterForm.propTypes = { form: PropTypes.object.isRequired }

export default connect(
  createStructuredSelector({
    form: (state, props) => getFilterForm(type)(state, props),
  }),
)(HeadquartersFilterForm)
