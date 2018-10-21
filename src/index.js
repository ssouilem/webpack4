// import App from "./App";
import React, { Component } from 'react'
import { compose, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import NavBar from './components/TabletApp'
import { BrowserRouter, Route } from 'react-router-dom'
import Watch from './components/pages/watch'
import Home from './components/home/Home'
import HomePage from 'CONTAINERS/HomePage/HomePage'
import DashBoard from './containers/DashBoard/DashBoard'
import Bordereau from './containers/Bordereau/Bordereau'
import Bordereaux from './containers/Bordereau/Bordereaux'
import Test from 'CONTAINERS/Campany/Campany'
import Campany from './containers/Invoice/Invoice'

import rootReducer from './rootReducer'
import frmessages from 'INTL/lang/fr.json'
import enmessages from 'INTL/lang/en.json'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
// import '../semantic/src/semantic.less';

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
const messages = new RegExp('^fr').test(navigator.language) ? frmessages : enmessages
addLocaleData([...en, ...fr])
let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
console.log(store.getState())

class App extends Component {
  render () {
    return (
      <BrowserRouter  >
        <NavBar>
          <Route exact path='/' component={ HomePage } />
          <Route exact path='/clients' component={ Campany } />
          <Route path='/produits' component={ Bordereau } />
          <Route path='/bordereaux' component={ Bordereaux } />
          <Route path='/factures' component={ DashBoard } />
          <Route exact path='/paiements' component={ Watch } />
        </NavBar>
      </BrowserRouter>
    )
  }
}

render(
  <IntlProvider locale={ navigator.language } messages={ messages } defaultLocale="fr-FR" >
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>
  , MOUNT_NODE)
