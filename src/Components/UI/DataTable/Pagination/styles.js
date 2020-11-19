import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex, Box } from 'rebass'

export const Container = styled(Flex).attrs({
  mt: 3,
})`
  justify-content: flex-end;
  font-weight: bold;
`

export const Pager = styled(Flex)`
  align-items: center;
`

export const Pages = styled(Flex)`
  user-select: none;

  .pagination-page {
    cursor: pointer;
    padding: 4px;

    &--active {
      color: ${themeGet('colors.secondary')};
    }
  }
`

export const PreviousPage = styled(Box).attrs({
  p: 1,
})`
  > div {
    user-select: none;
    cursor: pointer;
    color: ${themeGet('colors.secondary')};

    > svg {
      margin-right: 4px;
      fill: ${themeGet('colors.secondary')};
    }

    &.disabled {
      cursor: default;
      color: ${themeGet('colors.silver')} !important;

      > svg {
        fill: ${themeGet('colors.silver')};
      }
    }
  }
`

export const NextPage = styled(Box).attrs({
  p: 1,
})`
  > div {
    user-select: none;
    cursor: pointer;
    color: ${themeGet('colors.secondary')};

    > svg {
      margin-left: 4px;
      transform: rotate(180deg);
      fill: ${themeGet('colors.secondary')};
    }

    &.disabled {
      cursor: default;
      color: ${themeGet('colors.silver')} !important;

      > svg {
        fill: ${themeGet('colors.silver')};
      }
    }
  }
`
