import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

// eslint-disable-next-line import/prefer-default-export
export const transformToRequest = ({ background, ...attributes }) => ({
  attributes: pickBy(
    {
      ...attributes,
    },
    identity,
  ),
  relationships: {
    ...(background
      ? {
          avatar: {
            data: {
              type: 'images',
              id: background,
            },
          },
        }
      : {}),
  },
})
