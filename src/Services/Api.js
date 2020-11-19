import qs from 'qs'
import Request from 'superagent'
import normalize from 'json-api-normalizer'
import { captureException } from '@sentry/browser'
import { DateTime } from 'luxon'

import camelCase from 'lodash/camelCase'
import mapKeys from 'lodash/mapKeys'
import map from 'lodash/map'
import get from 'lodash/get'
import has from 'lodash/has'
import merge from 'lodash/merge'
import isEmpty from 'lodash/isEmpty'

import { getAccess, getRefresh } from 'Store/Selectors/persist'
import { getAuthorizationHeader } from 'Store/Selectors/viewer'

import { API } from 'Config/app'

const sendMethod = HTTPMethod =>
  HTTPMethod === 'post' ||
  HTTPMethod === 'put' ||
  HTTPMethod === 'patch' ||
  HTTPMethod === 'delete'
    ? 'send'
    : 'query'

const sendArguments = (HTTPMethod, query) =>
  HTTPMethod === 'post' ||
  HTTPMethod === 'put' ||
  HTTPMethod === 'patch' ||
  HTTPMethod === 'delete'
    ? JSON.stringify(query)
    : qs.stringify(query, { arrayFormat: 'brackets' })

const defaultOptions = {
  url: API.URL,
  endpoint: '',
  method: 'GET',
  query: {},
  headers: {},
  file: null,
  fileFieldName: 'content',
  fileParams: null,
  needsNormalization: true,
  withoutAuthorization: false,
  types: null,
  paged: false,
}

const absoluteUrl = new RegExp('^(?:[a-z]+:)?//', 'i')

export default options => async (dispatch, getState) => {
  const {
    url,
    endpoint,
    method,
    query,
    headers,
    file,
    fileFieldName,
    fileParams,
    payload,
    needsNormalization,
    withoutAuthorization,
    types,
    paged,
  } = merge({}, defaultOptions, options)

  const authHeader = getAuthorizationHeader(getState())

  const HTTPMethod = method.toLowerCase()

  const fullUrl = absoluteUrl.test(endpoint) ? endpoint : `${url}${endpoint}`

  const request = Request[HTTPMethod](fullUrl)

  if (file) {
    request.attach(fileFieldName, file)
    request.query(fileParams)
    if (!isEmpty(query)) request.field(query)
  } else {
    request[sendMethod(HTTPMethod)](sendArguments(HTTPMethod, query))
  }

  if (authHeader && !withoutAuthorization) {
    headers.authorization = authHeader

    const access = getAccess(getState())
    const refresh = getRefresh(getState())

    const accessExpiresAt = DateTime.fromISO(access.accessExpiresAt)

    const refreshThreshold = DateTime.local().plus({
      minutes: 5,
    })

    if (refresh && refreshThreshold > accessExpiresAt) {
      const { body } = await Request.post(`${url}/user/tokens/refresh`).set(
        'X-Refresh-Token',
        `Beared ${refresh.refresh}`,
      )

      await dispatch({
        type: 'REFRESH_TOKEN',
        payload: body,
      })

      headers.authorization = `Bearer ${body.access}`
    }
  }

  if (has(types, 'REQUEST')) {
    dispatch({
      type: types.REQUEST,
      payload,
      request,
    })
  }

  return new Promise(resolve => {
    request
      .set({
        ...(!file && { 'Content-Type': 'application/vnd.api+json' }),
        ...headers,
      })
      .on('progress', event => {
        if (event.direction === 'upload') {
          if (has(types, 'PROGRESS') && has(event, 'percent')) {
            dispatch({
              type: types.PROGRESS,
              percent: event.percent,
              payload,
            })
          }
        }
      })
      .end((error, data) => {
        captureException(error)

        if (isEmpty(data) || data.body === null) {
          merge(data, { body: { data: [] } })
        }

        const queryParams = sendArguments(HTTPMethod, query)

        const meta = {
          endpoint: queryParams ? `${endpoint}?${queryParams}` : `${endpoint}`,
        }

        if (error) {
          const failureData = {
            ok: false,
            meta,
            payload,
            error,
            data,
          }

          if (has(types, 'FAILURE')) {
            dispatch({ type: types.FAILURE, ...failureData })
          }

          resolve(failureData)
        } else {
          const body = get(data, 'body')

          const normalized = needsNormalization
            ? normalize(body, {
                endpoint,
                camelizeKeys: true,
              })
            : body

          const successData = {
            ok: true,
            meta,
            isRaw: !needsNormalization,
            payload: { ...payload, data: normalized },
          }

          if (paged) {
            let params = get(normalized, `meta.${endpoint}.meta`)

            params = mapKeys(params, (value, key) => camelCase(key))

            const records = map(get(normalized, `meta.${endpoint}.data`), 'id')

            successData.paged = {
              ...params,
              records,
            }
          }

          if (has(types, 'SUCCESS')) {
            dispatch({ type: types.SUCCESS, ...successData })
          }

          resolve(successData)
        }
      })
  })
}
