import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { toast } from 'react-toastify'
import validate from 'validate.js'

import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import map from 'lodash/map'
import get from 'lodash/get'
import every from 'lodash/every'

import { Box, Flex } from 'rebass'

import {
  presenceFieldConstraint,
  fieldLengthConstraint,
  presenceFieldNumberConstraint,
} from 'Constants/constraints'

import { Title, Button, Modal, Icon } from 'Components/UI'

import { loadingGlyph, plusGlyph, minusGlyph } from 'Assets/Svg'

import { Forms } from 'Components/Blocks'

import {
  ConfirmModal,
  FormBlock,
  ErrorBlock,
  ButtonAdd,
  FormInput,
  PromocodesBlock,
} from './styles'

class PromoCodeAddModal extends PureComponent {
  getFormInitialValue = () => {
    return { promotionCodes: [{ code: '' }] }
  }

  handleSubmit = async values => {
    const { onConfirm, onCreatePromoCodes } = this.props

    Promise.all(
      map(
        get(values, 'promotionCodes'),
        item => new Promise(resolve => resolve(onCreatePromoCodes(item))),
      ),
    ).then(response => {
      if (every(response, item => item.ok)) {
        toast.success('Promo Codes created')
        onConfirm()
      } else {
        toast.error('Some promocodes will not created. Check for uniq names')
      }
    })
  }

  handleCallback = () => {
    const { onCallback } = this.props
    onCallback()
  }

  validate = values => {
    return map(values, item => {
      const res = validate(item, {
        ...fieldLengthConstraint('code', 100),
        ...presenceFieldConstraint('expirationDate'),
        ...presenceFieldNumberConstraint('daysCount', 1, 3),
        ...presenceFieldNumberConstraint('maxUseTimesCount', 1, 8),
      })
      return res
    })
  }

  renderForm = ({ handleSubmit, form, invalid }) => {
    const { cancelTitle, okTitle, isLoading, error } = this.props

    const { push } = form.mutators
    return (
      <FormBlock onSubmit={handleSubmit}>
        <PromocodesBlock onScroll={this.handleScroll}>
          <FieldArray name="promotionCodes" validate={this.validate} width={1}>
            {({ fields }) => {
              return fields.map((name, index) => {
                return (
                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    key={name}
                    my={2}
                  >
                    <Box width={2 / 7}>
                      <FormInput
                        centered={1}
                        icon={null}
                        name={`${name}.code`}
                        placeholder="Promo Code name"
                        required
                        type="text"
                      />
                    </Box>
                    <Box width={2 / 7}>
                      <Forms.DateInput
                        centered={1}
                        name={`${name}.expirationDate`}
                        placeholder="Expiration Date"
                      />
                    </Box>
                    <Box width={156}>
                      <FormInput
                        centered={1}
                        icon={null}
                        name={`${name}.daysCount`}
                        placeholder="days No."
                        type="number"
                      />
                    </Box>
                    <Box width={156}>
                      <FormInput
                        centered={1}
                        icon={null}
                        name={`${name}.maxUseTimesCount`}
                        placeholder="max use times"
                        type="number"
                      />
                    </Box>
                    <Box>
                      {fields.length - 1 === index ? (
                        <ButtonAdd
                          type="button"
                          onClick={() => push('promotionCodes', undefined)}
                        >
                          <Icon glyph={plusGlyph} size={24} />
                        </ButtonAdd>
                      ) : (
                        <ButtonAdd
                          type="button"
                          onClick={() => fields.remove(index)}
                        >
                          <Icon glyph={minusGlyph} size={24} />
                        </ButtonAdd>
                      )}
                    </Box>
                  </Flex>
                )
              })
            }}
          </FieldArray>
        </PromocodesBlock>
        <Flex
          flexDirection="row"
          justifyContent="flex-end"
          mb={3}
          mt={5}
          width={1}
        >
          <Flex>
            <Button
              mr={2}
              secondary
              type="submit"
              width={1}
              onClick={this.handleCallback}
            >
              {cancelTitle}
            </Button>

            <Button
              disabled={invalid}
              secondary
              type="submit"
              width={1}
              onClick={handleSubmit}
            >
              {isLoading && <Icon glyph={loadingGlyph} size={28} />}
              {okTitle}
            </Button>
          </Flex>
        </Flex>
        <ErrorBlock>{error}</ErrorBlock>
      </FormBlock>
    )
  }

  render() {
    const { isOpen, title } = this.props
    return (
      <Modal isOpen={isOpen} isOverflowVisible onCallback={this.handleCallback}>
        <Modal.Close onClick={this.handleCallback} />
        <ConfirmModal>
          <Flex
            alignItems="center"
            justifyContent="center"
            mb={4}
            mt={2}
            width={1}
          >
            <Title.H2 color="brownishGray" textAlign="center">
              {title}
            </Title.H2>
          </Flex>
          <Form
            initialValues={this.getFormInitialValue()}
            keepDirtyOnReinitialize
            mutators={{
              ...arrayMutators,
            }}
            render={this.renderForm}
            validateOnBlur={false}
            onSubmit={this.handleSubmit}
          />
        </ConfirmModal>
      </Modal>
    )
  }
}

PromoCodeAddModal.defaultProps = {
  error: false,
  isLoading: false,
  title: 'Add Promotion Codes',
  okTitle: 'ADD',
  cancelTitle: 'CANCEL',
}

PromoCodeAddModal.propTypes = {
  cancelTitle: PropTypes.string,
  error: PropTypes.bool,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  okTitle: PropTypes.string,
  title: PropTypes.string,
  onCallback: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCreatePromoCodes: PropTypes.func.isRequired,
}

export default PromoCodeAddModal
