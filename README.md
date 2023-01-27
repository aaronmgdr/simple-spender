# simple sender

A little app that uses wagmi and rainbowkit to show balance and send celo as an erc20 token


## usage

1. `yarn`
2. `yarn dev`


## understanding the code

"*" these folders contain the code most relevant code

```
 * abi // json representation of smart contracts
 * components // react components
 pages // next js specific: each file in here becomes a page on our app
 public // static files
 react-helpers // react functions
 styles // css
 .eslintrc // linting
 next.config.js // next.js related

```


## Tools and Packages involved


### Typescript

Javascript with type annotations.

### React

UI Library for keeping app state and dom synced

### Next.JS

React base Framework for building web apps

### Ethers.js

Javascript and Typescript library for connecting to evm blockchains

### wagmi

A collection of react hook functions that make it easier to deal with the complexity at the intersection of UI and Blockchain

Uses ethers.js


### rainbowkit

UI Components for connecting a wallet to a dapp.

Uses wagmi and ethers.js