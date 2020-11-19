import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex } from 'rebass'

export const Container = styled(Flex)`
  justify-content: space-between;
  position: relative;
`

export const ActionContainer = styled(Flex).attrs({
  py: 2,
})`
  cursor: pointer;
  align-items: center;
  color: ${themeGet('colors.font.secondary')};

  &:hover {
    color: ${themeGet('colors.secondary')};
  }

  svg {
    margin-right: 6px;
    fill: ${themeGet('colors.secondary')};
  }
`

export const Handler = styled(Flex).attrs({
  px: 3,
})`
  cursor: pointer;

  svg {
    fill: ${themeGet('colors.brownGray')};
  }

  &.opened {
    svg {
      fill: ${themeGet('colors.secondary')};
    }
  }
`

export const Actions = styled(Flex).attrs({
  px: 3,
  py: 2,
})`
  position: absolute;
  flex-direction: column;
  z-index: 10;
  right: 100%;
  transform: translateX(20px);
  top: -4px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
  background: ${themeGet('colors.white')};
`
