import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from 'rebass'

import get from 'lodash/get'
import map from 'lodash/map'

import { chevronLeftGlyph } from 'Assets/Svg'

import { ADMIN_PATHS } from 'Constants/paths'

import { Button, Icon } from 'Components/UI'

import { GeneralInformation, CodesInformation } from './Tabs'

import { Tab, Tabs, TabList, TabPanel } from './styles'

const tabs = [
  {
    key: 0,
    label: (
      <Flex alignItems="center" justifyContent="flex-start" width={1}>
        General Information
      </Flex>
    ),
    value: <GeneralInformation />,
  },
  {
    key: 1,
    label: (
      <Flex alignItems="center" justifyContent="flex-start" width={1}>
        Codes Information
      </Flex>
    ),
    value: <CodesInformation />,
  },
]

class Organization extends PureComponent {
  componentDidMount = () => {
    const { onLoadOrganization, match } = this.props
    const id = get(match, 'params.organizationId') || 0

    onLoadOrganization(id)
  }

  handleClickBack = () => {
    const { history } = this.props

    history.push(ADMIN_PATHS.PROMOTIONS)
  }

  render() {
    const { organization } = this.props

    const entity = get(organization, 'entity')

    return (
      <>
        <Flex alignItems="center" justifyContent="space-between" my={4}>
          <Flex alignItems="center">
            <Button white onClick={this.handleClickBack}>
              <Icon
                fill="dodgerBlue"
                glyph={chevronLeftGlyph}
                size={20}
                stroke="dodgerBlue"
              />
              Organizations
            </Button>
            <Text fontSize={[2, 3, 3, 4]} fontWeight="bold" ml={[3, 4]}>
              {get(entity, 'name')}
            </Text>
          </Flex>
        </Flex>
        <Tabs>
          <TabList>
            {map(tabs, item => (
              <Tab key={item.key}>{item.label}</Tab>
            ))}
          </TabList>
          {map(tabs, item => (
            <TabPanel key={item.key}>{item.value}</TabPanel>
          ))}
        </Tabs>
      </>
    )
  }
}

Organization.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  onLoadOrganization: PropTypes.func.isRequired,
}

export default Organization
