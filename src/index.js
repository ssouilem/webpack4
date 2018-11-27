// import App from "./App";
import React, { Component } from 'react'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import createStore from './redux/createStore'
import configureAxios from './axios.init'
import NavBar from './components/TabletApp'
import { browserHistory } from 'react-router'
import { BrowserRouter, Route } from 'react-router-dom'
// import Watch from './components/pages/watch'
import HomePage from 'CONTAINERS/HomePage/HomePage'
import Invoices from './containers/Invoices/Invoices'
import Bordereaux from './containers/Bordereau/Bordereaux'
import Companies from './containers/Customers/Customers'
import Entreprise from './containers/Entreprise/Entreprise'
import Products from './containers/Products/Products'
import Payments from './containers/Payments/Payments'

// import rootReducer from './rootReducer'
import frmessages from 'INTL/lang/fr.json'
import enmessages from 'INTL/lang/en.json'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import './App.less'

// const http = require('http')
//
// const hostname = '127.0.0.1'
// const port = 3000
//
// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World\n')
// })
//
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })
// import express from 'express'
// const app = express()
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.header('Access-Control-Allow-Headers: Authorization', 'Lang')
//   next()
// })
// const port = 8081
// app.listen(port, function () {
//   console.log('Server Started at port', port)
// })

// document.domain = 'api.global.dev.local'
const initialState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(initialState, browserHistory)

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;
//
// const enhancer = composeEnhancers(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// );
const MOUNT_NODE = document.getElementById('root')
// let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const messages = new RegExp('^fr').test(navigator.language) ? frmessages : enmessages
addLocaleData([...en, ...fr])
configureAxios(store)

// console.log(store.getState())

class App extends Component {
  render () {
    return (
      <BrowserRouter >
        <NavBar>
          <Route exact path='/' component={ HomePage } />
          <Route exact path='/clients' component={ Companies } />
          <Route path='/produits' component={ Products } />
          <Route path='/bordereaux' component={ Bordereaux } />
          <Route path='/factures' component={ Invoices } />
          <Route exact path='/paiements' component={ Payments } />
          <Route exact path='/entreprise' component={ Entreprise } />
        </NavBar>
      </BrowserRouter>
    )
  }
}

render(
  <IntlProvider locale={ navigator.language } messages={ messages } defaultLocale='fr-FR' >
    <Provider store={ store }>
      <App />
    </Provider>
  </IntlProvider>
  , MOUNT_NODE)
