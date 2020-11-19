import get from 'lodash/get'

const { REACT_APP_CI, REACT_APP_CI_BRANCH, REACT_APP_CI_BUILD } = process.env

if (REACT_APP_CI_BUILD) {
  const styles = [
    'width: 100%',
    'background: #060e41',
    'border-radius: 8px',
    'padding: 12px 16px',
    'color: white',
    'display: block',
    'text-align: center',
    'font-weight: bold',
  ].join(';')

  // eslint-disable-next-line no-console
  console.log(`%cBuild number: ${REACT_APP_CI_BUILD}`, styles)
}

const CRA_PREFIX = 'REACT_APP_'

const PREFIX =
  REACT_APP_CI === 'true'
    ? {
        development: `${CRA_PREFIX}DEVELOPMENT_`,
        master: `${CRA_PREFIX}STAGING_`,
        production: `${CRA_PREFIX}PRODUCTION_`,
      }[REACT_APP_CI_BRANCH] || CRA_PREFIX
    : CRA_PREFIX

export const getEnv = env => get(process.env, `${PREFIX}${env}`, '')

export default {}
