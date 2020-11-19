import map from 'lodash/map'

export const PLANS = {
  UNLIMITED: '1',
  LIMITED: '2',
}

export const PLANS_SELECT_OPTIONS = map(PLANS, (plan, index) => {
  return {
    label: index,
    value: plan,
  }
})
