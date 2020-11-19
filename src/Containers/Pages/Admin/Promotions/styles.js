import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex } from 'rebass'

import {
  Tab as TabBase,
  Tabs as TabsBase,
  TabList as TabListBase,
  TabPanel as TabPanelBase,
} from 'react-tabs'

export const Container = styled(Flex).attrs({
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  p: 5,
})``

export const Tabs = styled(TabsBase)`
  display: flex;
  color: white;
  width: 100%;
  min-height: 80vh;

  .react-tabs__tab-panel--selected {
    display: flex;
  }
`

export const TabList = styled(TabListBase)`
  display: flex;
  flex-direction: column;
  width: 196px;
  margin: 0;
  margin-top: 24px;
  padding: 0;
  font-size: 16px;
  z-index: 1;

  .react-tabs__tab--selected {
    border: 1px solid ${themeGet(`colors.primary`)};
    border-right: 1px solid ${themeGet(`colors.white`)};
    border-radius: 4px 0 0 4px;
    outline: 0;
  }
`

export const TabPanel = styled(TabPanelBase)`
  display: none;
  width: 100%;
  margin-left: -1px;
  border: 1px solid ${themeGet(`colors.primary`)};
  color: ${themeGet(`colors.font.primary`)};
  border-radius: 4px;
  font-size: 16px;
`

export const Tab = styled(TabBase)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  list-style: none;
  padding: 12px 6px;
  cursor: pointer;
  color: ${themeGet(`colors.font.primary`)};
  user-select: none;
  margin: 2px 0 2px 0;
  border-radius: 4px 0 0 4px;
  border: 1px solid ${themeGet(`colors.primary`)};
  border-right: 1px solid ${themeGet(`colors.primary`)};
  background-color: ${themeGet(`colors.veryLightGray`)};
`

export const EmptyDataBlock = styled(Flex).attrs({
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
})`
  text-align: center;
`
