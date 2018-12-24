// import App from "./App";
import axios from 'axios'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import createStore from './redux/createStore'
import configureAxios from './axios.init'
import { browserHistory, Route, Router } from 'react-router'
import history from './history'
import { ConnectedRouter } from 'connected-react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { default as cookies } from './redux/cookieHelper'

// import rootReducer from './rootReducer'
import frmessages from 'INTL/lang/fr.json'
import enmessages from 'INTL/lang/en.json'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import './App.less'

// document.domain = 'api.global.dev.local'
const initialState = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(initialState, browserHistory)
// const history = syncHistoryWithStore(browserHistory, store)
// const history = createHistory()

history.listen((location, action) => {
  console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
  console.log(`The last navigation action was ${action}`)
  const token = cookies.getToken()
  if (token != null) {
    // console.log('Axios.init : init Token', token)
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    // axios.config.headers.Authorization = `Bearer ${token}`
  }
})

const messages = new RegExp('^fr').test(navigator.language) ? frmessages : enmessages
addLocaleData([...en, ...fr])
configureAxios(store)

render(
  <IntlProvider locale={ navigator.language } messages={ messages } defaultLocale='fr-FR' >
    <Provider store={ store }>
      <App history={ history } />
    </Provider>
  </IntlProvider>
  , document.getElementById('root'))
