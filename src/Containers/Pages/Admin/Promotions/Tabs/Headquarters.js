import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import { Flex, Text } from 'rebass'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import find from 'lodash/find'

import { HeadquarterEditModal } from 'Components/Blocks/Admin/Modals/Promotions'

import { Button } from 'Components/UI'

import { FilterForm } from 'Components/Blocks/Admin'

import HeadquartersTable from './HeadquartersTable'

import { Container, EmptyDataBlock } from '../styles'

const { HeadquartersFilterForm } = FilterForm

const Headquarters = ({
  defaultSize,
  headquarters,
  paged,
  formData,
  onCreateHeadquarter,
  onLoadHeadquarters,
  onPageChange,
  onPageSizeChange,
  onSortedChange,
  onUpdateHeadquarter,
  onDeleteHeadquarter,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [size, setSize] = useState(defaultSize)
  const [openModal, setOpenModal] = useState(false)
  const [selectedHeadquarter, setSelectedHeadquarter] = useState(null)

  useEffect(() => {
    const onLoading = async () => {
      if (!headquarters.isLoaded) {
        const result = await onLoadHeadquarters({
          paged: true,
          filters: formData,
          ...paged,
          size,
        })

        if (result) {
          setIsLoaded(true)
        }
      } else {
        setIsLoaded(true)
      }
    }
    onLoading()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCallback = () => {
    setSelectedHeadquarter(null)
    setOpenModal(false)
  }

  const handleConfirm = () => {
    setSelectedHeadquarter(null)
    setOpenModal(false)
  }

  const handleEditHeadquarter = id => {
    setSelectedHeadquarter(find(headquarters.entities, item => item.id === id))
    handleOpenModal()
  }

  const handlePageChange = page => {
    onPageChange('headquarters', page + 1)
  }

  const handleSortedChange = sort => {
    onSortedChange('headquarters', sort)
  }

  const handlePageSizeChanged = newSize => {
    setSize(newSize)
    onPageSizeChange('headquarters', newSize)
  }

  const handleDeleteHeadquarter = async id => {
    const { ok } = await onDeleteHeadquarter(id)

    if (ok) {
      toast.success('Headquarter deleted')
    } else {
      toast.error('Something went wrong. Please try again')
    }
  }

  return (
    <Container>
      {openModal && (
        <HeadquarterEditModal
          headquarter={selectedHeadquarter}
          isOpen={openModal}
          onCallback={handleCallback}
          onConfirm={handleConfirm}
          onCreateHeadquarter={onCreateHeadquarter}
          onUpdateHeadquarter={onUpdateHeadquarter}
        />
      )}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="48px"
        width={1}
      >
        <HeadquartersFilterForm />
        <Button onClick={handleOpenModal}>Add</Button>
      </Flex>

      {isLoaded && !isEmpty(get(headquarters, 'entities')) ? (
        <>
          <Text fontSize={4} fontWeight="bold">
            {headquarters.paged.totalCount} Parent Organizations
          </Text>
          <HeadquartersTable
            data={headquarters.entities}
            isLoaded={isLoaded}
            paged={paged}
            size={size}
            onDeleteHeadquarter={handleDeleteHeadquarter}
            onEditHeadquarter={handleEditHeadquarter}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChanged}
            onSortedChange={handleSortedChange}
          />
        </>
      ) : (
        <EmptyDataBlock>
          Welcome to Parent Organizations page.
          <br /> The Parent Organization represents high-level entity that
          includes Organizations.Single Orgatization does not require a Parent
          Organizations.
          <br />
          <br />
          There are no Parent Organizations in the system yet. Click {'"'}Add
          {'"'} to create the first one.
        </EmptyDataBlock>
      )}
    </Container>
  )
}

Headquarters.propTypes = {
  defaultSize: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  headquarters: PropTypes.object.isRequired,
  paged: PropTypes.object.isRequired,
  onCreateHeadquarter: PropTypes.func.isRequired,
  onDeleteHeadquarter: PropTypes.func.isRequired,
  onLoadHeadquarters: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onSortedChange: PropTypes.func.isRequired,
  onUpdateHeadquarter: PropTypes.func.isRequired,
}

export default Headquarters
