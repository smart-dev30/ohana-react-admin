import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass'
import get from 'lodash/get'
import has from 'lodash/has'
import { DateTime } from 'luxon'

import { Loader, Text, MenuButton } from 'Components/UI'
import { getProfileFullName } from 'Services/Utils'
import { actionDeactivateGlyph, actionEditGlyph } from 'Assets/Svg/Table'
import { Container, MenuWrapper, Photo, Content } from './styles'

const MainInfo = ({ data, onClickActivate, onClickDeactivate }) => {
  if (!data.isLoaded) return <Loader />

  return (
    <Container>
      <MenuWrapper mt={3}>
        <MenuButton
          actions={[
            {
              key: 'edit',
              glyph: actionEditGlyph,
              label: 'Edit',
              onSelect: () => null,
            },
            {
              key: 'activateDeactivate',
              glyph: actionDeactivateGlyph,
              entity: null,
              label:
                get(data, 'entity.state') === 'active'
                  ? 'Deactivate'
                  : 'Activate',
              onSelect:
                get(data, 'entity.state') === 'active'
                  ? onClickDeactivate
                  : onClickActivate,
            },
          ]}
        />
      </MenuWrapper>

      <Box width={[1, 1, 1 / 2, 1 / 3]}>
        <Photo
          src={get(data, 'entity.profile.personalPhoto.content.medium.url')}
        />
      </Box>

      <Content ml={3} width={[1, 1, 1 / 2, 2 / 3]}>
        <Flex>
          <Text mr={1}>Full name:</Text>

          <Text fontWeight="bold">
            {getProfileFullName(
              get(data, 'entity.profile.firstName'),
              get(data, 'entity.profile.lastName'),
            )}
          </Text>
        </Flex>

        <Flex>
          <Text mr={1}>Email:</Text>

          <Text
            as="a"
            fontWeight="bold"
            href={`mailto:${get(data, 'entity.profile.email')}`}
          >
            {get(data, 'entity.profile.email')}
          </Text>
        </Flex>

        {has(data, 'entity.laborKind') && (
          <Flex>
            <Text mr={1}>Type:</Text>

            <Text fontWeight="bold">{get(data, 'entity.laborKind')}</Text>
          </Flex>
        )}

        <Flex>
          <Text mr={1}>Phone number:</Text>

          <Text fontWeight="bold">
            {get(data, 'entity.profile.verifiedPrimaryPhoneNumber.phoneNumber')}
          </Text>
        </Flex>

        {has(data, 'entity.laborKind') && (
          <Flex>
            <Text mr={1}>Type:</Text>

            <Text fontWeight="bold" />
          </Flex>
        )}

        <Flex>
          <Text mr={1}>Date submitted:</Text>

          <Text fontWeight="bold">
            {DateTime.fromISO(get(data, 'entity.createdAt')).toFormat('D')}
          </Text>
        </Flex>

        <Flex>
          <Text mr={1}>Status:</Text>

          <Text fontWeight="bold">{get(data, 'entity.state')}</Text>
        </Flex>
      </Content>
    </Container>
  )
}

MainInfo.propTypes = {
  data: PropTypes.object.isRequired,
  onClickActivate: PropTypes.func.isRequired,
  onClickDeactivate: PropTypes.func.isRequired,
}

export default MainInfo
