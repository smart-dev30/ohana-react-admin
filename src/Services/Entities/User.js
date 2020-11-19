import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

// eslint-disable-next-line import/prefer-default-export
export const transformToRequest = ({ personalPhoto, ...attributes }) => ({
  attributes: pickBy(
    {
      ...attributes,
    },
    identity,
  ),
  relationships: {
    ...(personalPhoto
      ? {
          avatar: {
            data: {
              type: 'images',
              id: personalPhoto,
            },
          },
        }
      : {}),
  },
})
