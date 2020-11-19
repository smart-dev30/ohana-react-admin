import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { Flex } from 'rebass'

import { PromocodesFilterForm } from 'Components/Blocks/Admin/FilterForm'
import { PromoCodeAddModal } from 'Components/Blocks/Admin/Modals/Promotions'

import { Button, Text } from 'Components/UI'

import CodesTable from './CodesTable'

import { EmptyDataBlock } from './styles'

const CodesInformaion = ({
  defaultSize,
  organization,
  promotionCodes,
  paged,
  formData,
  onLoadPromocodes,
  onPageChange,
  onPageSizeChange,
  onActivatePromocode,
  onDeactivatePromocode,
  onSortedChange,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [size, setSize] = useState(defaultSize)

  useEffect(() => {
    const onLoading = async () => {
      const result = await onLoadPromocodes({
        paged: true,
        filters: formData,
        ...paged,
        size,
      })

      if (result) {
        setIsLoaded(true)
      }
    }
    onLoading()
  }, [])

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCallback = () => {
    setIsOpenModal(false)
  }
  const handleConfirm = () => {
    setIsOpenModal(false)
  }

  const handlePageChange = page => {
    onPageChange('promotionCodes', page + 1)
  }

  const handlePageSizeChanged = newSize => {
    setSize(newSize)
    onPageSizeChange('promotionCodes', newSize)
  }

  const handleSortedChange = sort => {
    onSortedChange('promotionCodes', sort)
  }

  return (
    <>
      {isOpenModal && (
        <PromoCodeAddModal
          isOpen={isOpenModal}
          organization={organization}
          onCallback={handleCallback}
          onConfirm={handleConfirm}
          onCreatePromoCodes={() => {}}
        />
      )}
      <Flex flexDirection="column" width={1}>
        <Flex justifyContent="space-between" width={1}>
          <PromocodesFilterForm />
          <Button secondary onClick={handleOpenModal}>
            Add
          </Button>
        </Flex>
        <Flex flex={1} flexDirection="column" mt={4} width={1}>
          {isLoaded && !isEmpty(get(promotionCodes, 'entities')) ? (
            <>
              <Text fontSize={4} fontWeight="bold">
                {promotionCodes.paged.totalCount} Promotion Codes
              </Text>
              <CodesTable
                data={promotionCodes.entities}
                isLoaded={isLoaded}
                paged={paged}
                size={size}
                onActivatePromocode={onActivatePromocode}
                onDeactivatePromocode={onDeactivatePromocode}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChanged}
                onSortedChange={handleSortedChange}
              />
            </>
          ) : (
            <EmptyDataBlock>
              No Promotion Codes in the system yet.
              <br /> Click {'"'}Add{'"'} to create the first one.
            </EmptyDataBlock>
          )}
        </Flex>
      </Flex>
    </>
  )
}

CodesInformaion.defaultProps = {}

CodesInformaion.propTypes = {
  defaultSize: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  paged: PropTypes.object.isRequired,
  promotionCodes: PropTypes.object.isRequired,
  onActivatePromocode: PropTypes.func.isRequired,
  onDeactivatePromocode: PropTypes.func.isRequired,
  onLoadPromocodes: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onSortedChange: PropTypes.func.isRequired,
}

export default CodesInformaion
