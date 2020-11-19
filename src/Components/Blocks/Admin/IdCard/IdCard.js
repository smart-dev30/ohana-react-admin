import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Link } from 'rebass'
import get from 'lodash/get'

import { Text, Button } from 'Components/UI'
import { Panel, Photo, QRCode } from './styles'

const IdCard = ({ fullName, personalPhoto, qrCode, idCard }) => (
  <Flex alignItems="center" justifyContent="center">
    <Flex flexDirection="column" justifyContent="center">
      <Panel>
        <Photo src={get(personalPhoto, 'content.url')} />

        <Text color="brownishGray" mt={1}>
          {fullName}
        </Text>

        <QRCode src={get(qrCode, 'content.url')} />
      </Panel>

      {idCard && (
        <Flex justifyContent="center" mt={4}>
          <Link
            download={get(idCard, 'name')}
            href={get(idCard, 'content.url')}
            secondary
          >
            <Button secondary>Download ID Card</Button>
          </Link>
        </Flex>
      )}
    </Flex>
  </Flex>
)

IdCard.defaultProps = { idCard: null, personalPhoto: null, qrCode: null }
IdCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  idCard: PropTypes.object,
  personalPhoto: PropTypes.object,
  qrCode: PropTypes.object,
}

export default IdCard
