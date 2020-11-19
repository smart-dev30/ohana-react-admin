import styled, { css } from 'styled-components'
import { Flex, Box } from 'rebass'

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
`

export const FieldWrap = styled(Box).attrs({
  mb: 3,
})``

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
