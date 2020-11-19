import styled from 'styled-components'
import { themeGet } from 'styled-system'

import { Flex, Box } from 'rebass'

import { Forms } from 'Components/Blocks'

export const ConfirmModal = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 900px;
  max-width: 1280px;
  justify-content: space-between;

  height: 100%;
`

export const FormBlock = styled(Box).attrs({ as: 'form' })`
  width: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  flex: 1;
`

export const ErrorBlock = styled(Box).attrs({
  mb: 2,
})`
  min-height: 20px;
  text-align: center;
  color: ${themeGet('colors.danger')};
`

export const ButtonAdd = styled(Flex)`
  cursor: pointer;
  svg {
    fill: ${themeGet(`colors.secondary`)};
    :hover {
      fill: ${themeGet(`colors.primary`)};
    }
    :active {
      fill: ${themeGet(`colors.silver`)};
    }
  }
`

export const FormInput = styled(Forms.Input)`
  width: 100%;
`

export const PromocodesBlock = styled(Flex)`
  min-height: 240px;
  max-height: 480px;
  overflow: auto;
  width: 100%;
  justify-content: flex-start;
  flex-direction: column;
`
