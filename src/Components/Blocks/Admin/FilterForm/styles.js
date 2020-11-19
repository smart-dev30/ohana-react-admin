import styled from 'styled-components'
import { Box } from 'rebass'

import { themeGet } from 'styled-system'

import { Title as BaseTitle } from 'Components/UI'

export const Container = styled(Box)``

export const FormWrapp = styled(Box).attrs({
  as: 'form',
})`
  width: 100%;
`
export const Column = styled(Box)``

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

export const Wrapper = styled(Box).attrs({
  as: 'section',
})`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export const FieldWrap = styled(Box)`
  width: 100%;
  max-width: 312px;
`
