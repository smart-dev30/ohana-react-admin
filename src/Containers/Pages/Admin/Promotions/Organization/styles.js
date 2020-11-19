import styled, { css } from 'styled-components'
import { Flex, Box, Text as TextBase } from 'rebass'

import { themeGet } from 'styled-system'

import { Title as BaseTitle } from 'Components/UI'

import {
  Tab as TabBase,
  Tabs as TabsBase,
  TabList as TabListBase,
  TabPanel as TabPanelBase,
} from 'react-tabs'

export const Form = styled(Box).attrs({
  as: 'form',
})`
  width: 100%;
`

export const Columns = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
`

export const Column = styled(Flex)`
  flex-shrink: 0;
  flex-direction: column;
`

export const FieldWrap = styled(Box)``

export const Row = styled(Flex)``

export const Wrapper = styled(Box).attrs({
  as: 'div',
})`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const SubTitle = styled(BaseTitle.H4).attrs({
  my: 4,
})`
  position: relative;
  overflow: hidden;

  :after {
    content: '';
    position: absolute;
    border-bottom: 1px solid ${themeGet('colors.veryLightGray')};
    width: 100%;
    bottom: 50%;
    margin-left: 16px;
  }
`

export const FieldWithData = styled(Flex)`
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${props =>
    props.alignLeft &&
    css`
      justify-content: flex-start;
    `}

  span {
    color: #666666;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    display: inline-block;
    text-align: center;
    margin-bottom: 20px;

    ${props =>
      props.alignLeft &&
      css`
        text-align: left;
      `}
  }
`

export const FormText = styled(TextBase).attrs({
  fontSize: [1, 2, 2, 3],
  fontWeight: 'bold',
  lineHeight: '42px',
  mb: 3,
})``

export const Tabs = styled(TabsBase)`
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  min-height: 80vh;
  align-items: center;
  .react-tabs__tab-panel--selected {
    display: flex;
  }
`

export const TabList = styled(TabListBase)`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  padding: 0;
  font-size: 16px;
  z-index: 1;
  margin-bottom: 32px;
  background-color: ${themeGet(`colors.white`)};
  color: ${themeGet(`colors.secondary`)};
  border: 1px solid ${themeGet(`colors.secondary`)};
  border-radius: 4px;

  .react-tabs__tab--selected {
    outline: 0;
    background-color: ${themeGet(`colors.secondary`)};
    color: ${themeGet(`colors.white`)};
  }
`

export const TabPanel = styled(TabPanelBase)`
  display: none;
  width: 100%;
  color: ${themeGet(`colors.font.primary`)};
  font-size: 16px;
`

export const Tab = styled(TabBase)`
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  list-style: none;
  padding: 12px 6px;
  cursor: pointer;
  user-select: none;
  margin: 0;
  div {
    justify-content: center;
  }
`
