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

const type = 'promotionCodes'

const statusOptions = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Deactivated',
    value: 'deactivated',
  },
]

const PromoCodesFilterForm = ({ form, ...rest }) => (
  <Form decorators={[]} initialValues={form.values} onSubmit={noop}>
    {({ handleSubmit }) => (
      <FormWrapp onSubmit={handleSubmit}>
        <FormStateToRedux type={type} />
        <Flex width={1}>
          <FieldWrap mr={4}>
            <Forms.Input
              name="promotionCodesName"
              placeholder="Search by Promo Code"
              {...rest}
            />
          </FieldWrap>
          <FieldWrap>
            <Forms.Select
              isClearable
              isSearchable={false}
              name="promotionCodesState"
              options={statusOptions}
              placeholder="Filter by Status"
            />
          </FieldWrap>
        </Flex>
      </FormWrapp>
    )}
  </Form>
)

PromoCodesFilterForm.propTypes = { form: PropTypes.object.isRequired }

export default connect(
  createStructuredSelector({
    form: (state, props) => getFilterForm(type)(state, props),
  }),
)(PromoCodesFilterForm)
