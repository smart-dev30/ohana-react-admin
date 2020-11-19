import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import { Flex, Text } from 'rebass'

import map from 'lodash/map'
import find from 'lodash/find'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { OrganizationEditModal } from 'Components/Blocks/Admin/Modals/Promotions'

import { Button } from 'Components/UI'

import { FilterForm } from 'Components/Blocks/Admin'

import OrganizationTable from './OrganizationsTable'

import { Container, EmptyDataBlock } from '../styles'

const { OrganizationsFilterForm } = FilterForm

const Organizations = ({
  headquarters,
  organizations,
  paged,
  defaultSize,
  formData,
  onLoadHeadquarters,
  onLoadOrganizations,
  onCreateOrganization,
  onDeleteOrganization,
  onPageChange,
  onPageSizeChange,
  onUpdateOrganization,
  onSortedChange,
}) => {
  const [isOrganizationsLoaded, setIsOrganizationsLoaded] = useState(false)
  const [size, setSize] = useState(defaultSize)
  const [openModal, setOpenModal] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  useEffect(() => {
    const onLoading = async () => {
      if (!organizations.isLoaded) {
        const result = await onLoadOrganizations({
          paged: true,
          filters: formData,
          ...paged,
          size,
        })

        if (result) {
          setIsOrganizationsLoaded(true)
        }
      }

      await onLoadHeadquarters({
        paged: true,
        filters: formData,
        ...paged,
        size: 'all',
      })

      if (organizations.isLoaded) {
        setIsOrganizationsLoaded(true)
      }
    }
    onLoading()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  const handleCallback = () => {
    setSelectedOrganization(null)
    setOpenModal(!openModal)
  }

  const handleConfirm = () => {
    setSelectedOrganization(null)
    setOpenModal(!openModal)
  }

  const handleEditOrganization = id => {
    setSelectedOrganization(
      find(organizations.entities, item => item.id === id),
    )
    handleOpenModal()
  }

  const handlePageChange = page => {
    onPageChange('organizations', page + 1)
  }

  const handlePageSizeChanged = newSize => {
    setSize(newSize)
    onPageSizeChange('organizations', newSize)
  }

  const handleSortedChange = sort => {
    onSortedChange('organizations', sort)
  }

  const handleDeleteOrganization = async id => {
    const { ok } = await onDeleteOrganization(id)

    if (ok) {
      toast.success('Headquarter deleted')
    } else {
      toast.error('Something went wrong. Please try again')
    }
  }

  const isLoaded = isOrganizationsLoaded

  return (
    <Container>
      {openModal && (
        <OrganizationEditModal
          headquarters={map(headquarters.entities, item => ({
            value: item.id,
            label: item.name,
          }))}
          isOpen={openModal}
          organization={selectedOrganization}
          onCallback={handleCallback}
          onConfirm={handleConfirm}
          onCreateOrganization={onCreateOrganization}
          onUpdateOrganization={onUpdateOrganization}
        />
      )}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="48px"
        width={1}
      >
        <OrganizationsFilterForm mb={0} />

        <Flex justifyContent="space-between" ml={4}>
          <Button alignSelf="flex-end" ml={4} onClick={handleOpenModal}>
            Add
          </Button>
        </Flex>
      </Flex>

      {isLoaded && !isEmpty(get(organizations, 'entities')) ? (
        <>
          <Text fontSize={4} fontWeight="bold">
            {organizations.paged.totalCount} Organizations
          </Text>
          <OrganizationTable
            data={organizations.entities}
            isLoaded={isLoaded}
            paged={paged}
            size={size}
            onCreateOrganization={onCreateOrganization}
            onDeleteOrganization={handleDeleteOrganization}
            onEditOrganization={handleEditOrganization}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChanged}
            onSortedChange={handleSortedChange}
          />
        </>
      ) : (
        <EmptyDataBlock>
          No Organizations in the system yet.
          <br />
          Click {'"'}Add{'"'} to create the first one.
        </EmptyDataBlock>
      )}
    </Container>
  )
}

Organizations.propTypes = {
  defaultSize: PropTypes.number.isRequired,
  formData: PropTypes.object.isRequired,
  headquarters: PropTypes.object.isRequired,
  organizations: PropTypes.object.isRequired,
  paged: PropTypes.object.isRequired,
  onCreateOrganization: PropTypes.func.isRequired,
  onDeleteOrganization: PropTypes.func.isRequired,
  onLoadHeadquarters: PropTypes.func.isRequired,
  onLoadOrganizations: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onSortedChange: PropTypes.func.isRequired,
  onUpdateOrganization: PropTypes.func.isRequired,
}

export default Organizations
