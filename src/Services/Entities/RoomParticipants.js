import pick from 'lodash/pick'

// eslint-disable-next-line import/prefer-default-export
export const transformToRequest = ({ ...attributes }) => ({
  attributes: pick(attributes, 'role'),
  relationships: {},
})
