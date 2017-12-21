# Actions

All action creators and reducers are grouped into related *domains*, that make it
easier to reason about and debug state. The root state will be a mutable JS object
(`{}`), and all of the direct decendants will be domains of either primitave types
or Immutable.js types (Map, List, etc).

Each file in the `app/actions/` folder should have three main exports:
* Types
  * This should be a mutable JS object of constant-style keys with string values
    `{ MY_CONSTANT_TYPE: 'domain.action' }`
* reducer
  * This is a standard Redux reducer, that can `switch` based on the `Types` defined above it
* Action Creators
  * The action creators will be named export functions that return a mutable JS object
  * The returned object should be a [Flux Standard Action](https://github.com/acdlite/flux-standard-action))
