import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

export const transformToRequest = props => {
  const { logo, ...attributes } = props
  return {
    attributes: pickBy(
      {
        ...attributes,
      },
      identity,
    ),
    relationships: {
      ...(logo
        ? {
            logo: {
              data: {
                type: 'banners',
                id: logo,
              },
            },
          }
        : {}),
    },
  }
}

export default {}
