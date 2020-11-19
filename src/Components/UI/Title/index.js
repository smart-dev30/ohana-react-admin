import styled from 'styled-components'
import { Heading } from 'rebass'

const Title = styled(Heading).attrs({
  as: 'h1',
  fontSize: 5,
})``
Title.displayName = 'Title'

Title.H2 = styled(Title).attrs({
  as: 'h2',
  fontSize: 4,
})``
Title.H2.displayName = 'Title.H2'

Title.H3 = styled(Title).attrs({
  as: 'h3',
  fontSize: 3,
})``
Title.H3.displayName = 'Title.H3'

Title.H4 = styled(Title).attrs({
  as: 'h4',
  fontSize: 2,
})``
Title.H4.displayName = 'Title.H4'

export default Title
