import styled, { css } from 'styled-components'
import { Flex, Box, Text as TextBase } from 'rebass'

import { themeGet } from 'styled-system'

import { Title as BaseTitle } from 'Components/UI'

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
  min-width: 120px;
  max-width: 240px;
`
export const ColumnLogo = styled(Flex)`
  flex-shrink: 0;
  flex-direction: column;
  min-width: 160px;
  max-width: 828px;
`

export const FieldWrap = styled(Box).attrs({
  mb: 3,
})``

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
})``

export const EmptyDataBlock = styled(Flex).attrs({
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
})`
  text-align: center;
`
