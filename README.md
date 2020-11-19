### Baby Arrival Monitor Admin-Panel React application

<!-- [![CircleCI](https://circleci.com/gh/john-wayne-construction-lbr/lbr-frontend/tree/master.svg?style=svg&circle-token=bb5426deec777835d6e52e65e57cec6f61d5c231)](https://circleci.com/gh/john-wayne-construction-lbr/lbr-frontend/tree/master) -->

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Style Guide

- Our Style Guide is based (with tweaks) on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/)

- It's forced by `eslint` and our CI-process.

- You can run style check locally with `yarn run lint`.

- You can run automated style fixer with `yarn run lint:fix`.

### Development

We use Yarn to make our development process nice and fast. Installation instructions
are [here](https://yarnpkg.com/lang/en/docs/install/).

#### First run

```bash
yarn install
yarn start
```

#### Any subsequent runs

```bash
yarn start
```

#### Build project

```bash
yarn build
```

#### Working with api.

When doing `DELETE` method. Payload will get id of the item that is removed.
Use it to remove item from the reducer updating your UI.

All `PATCH` methods will find and override changed entity in the data reducer, hence your data will be automatically updated on all views by selectors.
Same behaviour for `GET`, if you fetch some entity which is already in the data reducer, it will be refreshed, or added if not exist.

On `POST` same behaviour as `PATCH` and `GET` if successful will persist its results in data.

In selectors you only require collection, let say `employees` and then id of employee or array or ids.
Selector will return denormalized entity/entities in return.
But you need to have fetched relationships in data too, so they will be populated.
Hence if `employee` has `profile` with id 1, you must have fetched `profile` with id 1 in data reducer to populate all of their fields in denormalized `employee`,
otherwise only ID will be available.

### Deployment through CircleCI

#### Environment variables

All variables, local/staging/production should be available through `src/Config/app.js`. All `process.env` variables should
get by `getEnv` method. Default pattern for `.env`-files is `REACT_APP_{ENV}`

<!-- ##### Staging
You should set all variables in [CircleCI](https://circleci.com/gh/john-wayne-construction-lbr/lbr-frontend/edit#env-vars). Staging pattern:
`REACT_APP_STAGING_{ENV}`.

##### Production
You should set all variables in [CircleCI](https://circleci.com/gh/john-wayne-construction-lbr/lbr-frontend/edit#env-vars). Production pattern:
`REACT_APP_PRODUCTION_{ENV}`. -->
