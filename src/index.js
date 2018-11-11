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
import Watch from './components/pages/watch'
import HomePage from 'CONTAINERS/HomePage/HomePage'
import Invoices from './containers/Invoices/Invoices'
import Bordereaux from './containers/Bordereau/Bordereaux'
import Companies from './containers/Companies/Companies'
import Entreprise from './containers/Entreprise/Entreprise'
import Products from './containers/Products/Products'

// import rootReducer from './rootReducer'
import frmessages from 'INTL/lang/fr.json'
import enmessages from 'INTL/lang/en.json'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import './App.less'

document.domain = 'localhost'
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
          <Route exact path='/paiements' component={ Watch } />
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
