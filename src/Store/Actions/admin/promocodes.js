import merge from 'lodash/merge'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

import { createAsyncAction } from 'Store/utils'

import apiCall from 'Services/Api'
import { transformToRequest } from 'Services/Entities/Promocodes'

import { getOrganizationId } from 'Store/Selectors/admin/organizations'

export const LOAD_PROMOCODES = createAsyncAction('admin/promocodes/LOAD')
export const LOAD_PROMOCODE = createAsyncAction('admin/promocodes/LOAD_ONE')

export const UPDATE_PROMOCODE = createAsyncAction('admin/promocodes/UPDATE')
export const CREATE_PROMOCODES = createAsyncAction('admin/promocodes/CREATE')

export const ACTIVATION_PROMOCODE = createAsyncAction(
  'admin/promocodes/ACTIVATION',
)
export const DEACTIVATION_PROMOCODE = createAsyncAction(
  'admin/promocodes/DEACTIVATION',
)

const promocodesIncludes = ['organization']

export const loadPromocodes = ({
  paged = true,
  number = 1,
  size = 10,
  sort,
  filters,
} = {}) => (dispatch, getState) => {
  const organizationId = getOrganizationId(getState())

  const params = {
    endpoint: `/admin/organizations/${organizationId}/promotion_codes`,
    types: LOAD_PROMOCODES,
    query: {
      include: promocodesIncludes.join(),
    },
    paged: true,
  }

  if (paged) {
    merge(params, {
      paged,
      query: pickBy(
        {
          include: promocodesIncludes.join(),
          page: {
            number,
            size,
          },
          filter: filters,
          sort,
        },
        identity,
      ),
      payload: {
        paged: {
          number,
          size,
        },
      },
    })
  }

  return apiCall(params)(dispatch, getState)
}

export const loadPromocode = promocodeId =>
  apiCall({
    endpoint: `/admin/promotion_codes/${promocodeId}`,
    types: LOAD_PROMOCODE,
    query: {
      include: promocodesIncludes.join(),
    },
  })

export const updatePromocode = values => dispatch => {
  const promocodeId = values.id
  return dispatch(
    apiCall({
      method: 'PATCH',
      endpoint: `/admin/promotion_codes/${promocodeId}`,
      types: UPDATE_PROMOCODE,
      query: {
        include: promocodesIncludes.join(),
        data: {
          type: 'promotionCodes',
          ...transformToRequest(values),
        },
      },
    }),
  )
}

export const createPromocode = values => (dispatch, getState) => {
  const organizationId = getOrganizationId(getState())

  return dispatch(
    apiCall({
      method: 'POST',
      endpoint: `/admin/organizations/${organizationId}/promotion_codes`,
      types: CREATE_PROMOCODES,
      query: {
        include: promocodesIncludes.join(),
        data: {
          type: 'promotionCodes',
          ...transformToRequest(values),
        },
      },
    }),
  )
}

export const activationPromocode = values => dispatch => {
  const promocodeId = values.id
  return dispatch(
    apiCall({
      method: 'POST',
      endpoint: `/admin/promotion_codes/${promocodeId}/activation`,
      types: ACTIVATION_PROMOCODE,
      query: {
        data: {
          type: 'promotionCodes',
          ...transformToRequest(values),
        },
      },
    }),
  )
}

export const deactivationPromocode = values => dispatch => {
  const promocodeId = values.id
  return dispatch(
    apiCall({
      method: 'POST',
      endpoint: `/admin/promotion_codes/${promocodeId}/deactivation`,
      types: DEACTIVATION_PROMOCODE,
      query: {
        data: {
          type: 'promotionCodes',
          ...transformToRequest(values),
        },
      },
    }),
  )
}
