# pouch-websocket-sync-example

Example "Todo-MVC" application of using [`pouch-websocket-sync`](https://github.com/pgte/pouch-websocket-sync#readme) together with React and Redux, keeping local database in sync with remote.

[demo video](http://www.youtube.com/watch?v=8jOF23dfvl4)

This repo updates [the original](https://github.com/pgte/pouch-websocket-sync-example) from @pgte
to work with newer dependencies including webpack 2, babel 6, PouchDB 6 and react 15.

## Pre-requisites

You must have [Node.js](https://nodejs.org/en/) installed.

This repo uses [yarn](https://yarnpkg.com/) to manage dependencies.
Using `npm` may work, but it may install newer, incompatible packages.
The versions of packages known to work are recorded in `yarn.lock`.

## Download

Clone this repo:

```
$ git clone git@github.com:ericgundrum/pouch-websocket-sync-example.git
$ cd pouch-websocket-sync-example
```

## Install dependencies:

```
$ yarn install
```

## Start

Start web server:

```
$ node server
```

Start websocket server:

```
$ node websocket-server
```

Open [http://localhost:3000](http://localhost:3000) in your browsers.

## License

ISC or MIT
