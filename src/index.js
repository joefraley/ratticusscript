import React from 'react'
import ReactDOM from 'react-dom'
import ReactServer from 'react-dom/server'
import { Router, createMemoryHistory } from 'react-router'
import Helmet from 'react-helmet'

import { createMarkup } from './utilities.js'
import { App } from './components/app.js'
import Routes from './components/routes.js'

if (typeof document !== 'undefined') {
  // Do fancy client-side javascript, like set up a service-worker for off-line caching
  if (typeof navigator !== 'undefined') {
    require('offline-plugin/runtime').install()
  }
}

export default (locals, callback) => {
  const history = createMemoryHistory(locals.path)
  const Template = require('./template.js').default

  const reactApp = createMarkup(
    ReactServer.renderToStaticMarkup(
      <Router history={ history }>{ Routes }</Router>
    ))
  let head = Helmet.rewind()

  const HTML = ReactServer.renderToStaticMarkup(<Template head={ head } reactApp={ reactApp } locals={ locals }/>)

  callback(null, `<!DOCTYPE html>${ HTML }`)
}
