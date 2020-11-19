import styled from 'styled-components'
import { themeGet } from 'styled-system'
import { Flex, Box } from 'rebass'

import noImage from 'Assets/no-image.png'

export const Panel = styled(Flex).attrs({
  p: 4,
  flexDirection: 'column',
  alignItems: 'center',
})`
  border: 1px solid ${themeGet('colors.brownGray')};
`

export const Photo = styled(Box)`
  width: 120px;
  height: 120px;
  background: url('${({ src }) => src || noImage}') no-repeat center;
  background-size: cover;
  background-color: ${themeGet('colors.white')};
`

export const QRCode = styled(Box)`
  width: 3.5in;
  height: 3.5in;
  background: url('${({ src }) => src || noImage}') no-repeat center;
  background-size: contain;
`
