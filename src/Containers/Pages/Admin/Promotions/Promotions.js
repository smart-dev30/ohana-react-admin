import React from 'react'

import 'react-tabs/style/react-tabs.css'

import map from 'lodash/map'

import { Flex } from 'rebass'

import { Title, Icon } from 'Components/UI'
import { headquarterGlyph, organizationGlyph } from 'Assets/Svg'

import { Headquarters, Organizations } from './Tabs'

import { Tab, Tabs, TabList, TabPanel } from './styles'

const Promotions = () => {
  const renderPanel = props => <>{props}</>

  const tabs = [
    {
      key: 0,
      label: (
        <Flex alignItems="center" justifyContent="flex-start" width={1}>
          <Icon glyph={headquarterGlyph} mr={2} size={16} />
          ParentOrganizations
        </Flex>
      ),
      value: renderPanel(<Headquarters />),
    },
    {
      key: 1,
      label: (
        <Flex alignItems="center" justifyContent="flex-start" width={1}>
          <Icon glyph={organizationGlyph} mr={2} size={16} />
          Organizations
        </Flex>
      ),
      value: renderPanel(<Organizations />),
    },
  ]

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" my={4}>
        <Title>Promotions</Title>
      </Flex>
      <Flex justifyContent="flex-start">
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
      </Flex>
    </>
  )
}

export default Promotions
