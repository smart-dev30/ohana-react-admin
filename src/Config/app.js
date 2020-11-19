import { getEnv } from 'Services/Envs'

export const APP_ENV = getEnv('ENV')

const apiHttps = getEnv('API_HTTPS') === 'true' ? 'https' : 'http'

export const IS_PRODUCTION = APP_ENV === 'production'

export const API = {
  URL: `${apiHttps}://${getEnv('API_URL')}/v1`,
}

export const COOKIE = {
  SHARED_DOMAIN: `.${getEnv('COOKIE_DOMAIN')}`,
  PREFIX: 'bam',
  PERSIST_KEY: `bam-persist${!IS_PRODUCTION ? `-${APP_ENV}` : ''}`,
}

export const APPEARANCE = {
  THEME: 'main',
}

export const SENTRY_DSN = getEnv('SENTRY_DSN')

export const S3_URL = getEnv('S3_URL')

export default {
  APP_ENV,
  IS_PRODUCTION,
}
