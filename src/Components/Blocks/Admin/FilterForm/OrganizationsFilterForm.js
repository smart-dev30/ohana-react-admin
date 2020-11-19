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

const type = 'organizations'

const OrganizationsFilterForm = ({ form }) => (
  <Form initialValues={form.values} onSubmit={noop}>
    {({ handleSubmit }) => (
      <FormWrapp onSubmit={handleSubmit}>
        <FormStateToRedux type={type} />
        <Flex width={1}>
          <FieldWrap mr={4}>
            <Forms.Input
              name="headquarterName"
              placeholder="Search by Parent Organization Name"
            />
          </FieldWrap>
          <FieldWrap>
            <Forms.Input
              name="organizationName"
              placeholder="Search by Organization Name"
            />
          </FieldWrap>
        </Flex>
      </FormWrapp>
    )}
  </Form>
)

OrganizationsFilterForm.propTypes = { form: PropTypes.object.isRequired }

export default connect(
  createStructuredSelector({
    form: (state, props) => getFilterForm(type)(state, props),
  }),
)(OrganizationsFilterForm)
