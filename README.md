# React challenge

## Installation

```shell script
git clone git@github.com:bellotanne/react_challenge.git
cd react_challenge
yarn install
```

If the last operation prints you error about cypress and "node" engine incompatibility, use `yarn install --ignore-engines`.


## Run the app

```
yarn start
```

This command starts [json-server](https://github.com/typicode/json-server) on port 3001 and react app on port 3000.

Then go to http://localhost:3000.

## Run tests


Launch test server (port 4000), json server (port 4001, based on independent db file `test-db.json`), and cypress app:
```
yarn run cy:open
```
