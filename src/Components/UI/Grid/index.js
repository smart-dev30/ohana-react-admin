import styled from 'styled-components'
import { flexDirection } from 'styled-system'
import { Flex } from 'rebass'

const Grid = styled(Flex).attrs({
  mx: [-1, -2, -3],
})`
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;

  ${flexDirection};
`

Grid.displayName = 'Grid'

Grid.Block = styled(Flex).attrs({
  mx: [1, 2, 3],
})``

Grid.Block.displayName = 'Grid.Block'

export default Grid
