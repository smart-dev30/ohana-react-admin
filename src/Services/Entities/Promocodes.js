import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

export const transformToRequest = props => {
  const { ...attributes } = props
  return {
    attributes: pickBy(
      {
        ...attributes,
      },
      identity,
    ),
  }
}

export default {}
