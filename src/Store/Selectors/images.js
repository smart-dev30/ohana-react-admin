import { denormalize } from 'rapidux'
import { createSelector } from 'reselect'

import { getData } from './data'

export const getImage = imageId =>
  createSelector(
    getData,
    data => (imageId ? denormalize(data, 'images', imageId) : null),
  )

export const getLogo = logoId =>
  createSelector(
    getData,
    data => (logoId ? denormalize(data, 'banners', logoId) : null),
  )

export default {}
