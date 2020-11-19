import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'
import get from 'lodash/get'

export const transformToRequest = ({ logo, headquarter, ...attributes }) => {
  const headquarterId = get(headquarter, 'id') || get(headquarter, 'value')

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
      ...(headquarter
        ? {
            headquarter: {
              data: {
                type: 'headquarters',
                id: headquarterId,
              },
            },
          }
        : {}),
    },
  }
}

export default {}
