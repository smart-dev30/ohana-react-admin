import styled, { css } from 'styled-components'
import { size } from 'styled-system'
import { Box } from 'rebass'

import noImage from 'Assets/no-image.png'

export const Wrapper = styled(Box)`
  overflow: hidden;
  border-radius: 50%;
  object-fit: contain;
  width: 180px;
  height: 180px;

  ${props =>
    props.size &&
    css`
      width: ${props.size}px;
      height: ${props.size}px;
    `}
    
  ${props =>
    props.borderColor &&
    css`
      border: 1px solid ${props.borderColor};
    `}

  ${size};
`

export const ImageHolder = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props =>
    `url(${props.src || noImage}) no-repeat center center`};
  background-size: cover;
`
