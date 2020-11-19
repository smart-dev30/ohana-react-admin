import styled from 'styled-components'

import { themeGet } from 'styled-system'

import { Title as BaseTitle } from 'Components/UI'

export const SubTitle = styled(BaseTitle.H4).attrs({
  my: 4,
})`
  position: relative;
  overflow: hidden;
  width: 100%;

  :after {
    content: '';
    position: absolute;
    border-bottom: 1px solid ${themeGet('colors.veryLightGray')};
    width: 100%;
    bottom: 50%;
    margin-left: 16px;
  }
`

export const bla = ''
