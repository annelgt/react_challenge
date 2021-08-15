# React challenge

## Installation

```shell script
git clone git@github.com:bellotanne/react_challenge.git
```

In terminal, launch this command (it starts [json-server](https://github.com/typicode/json-server) on port 3001 and react app on port 3000):

```
yarn start
```

Then go to http://localhost:3000.

## Run tests


Launch test server (port 4000), json server (port 4001, based on independent db file `test-db.json`), and cypress app:
```
yarn run cy:open
```
