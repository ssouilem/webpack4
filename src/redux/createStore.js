import axios from 'axios'
import { applyMiddleware, compose, createStore } from 'redux'
import createMiddleware from './clientMiddleware'
// import createSagaMiddleware from 'redux-saga'

// import { multiClientMiddleware } from 'redux-axios-middleware'

// import clients from './clients'
// import watchMany from './sagas'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../rootReducer'

// conf axios
const getAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL: baseURL,
    responseType: 'json',
    withCredentials: false,
    crossdomain: true,
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  })
  client.interceptors.request.use((config) => {
    return config
  })

  client.interceptors.response.use((response) => {
    if (response.status === 401) {
      return Promise.reject(response)
    }
    return response
  })
}

// const clients = {
//   default: {
//     client: getAxiosClient('http://localhost:8080'),
//   },
//   googleMaps: {
//     client: axios.create({
//       baseURL: 'https://maps.googleapis.com/maps/api',
//       responseType: 'json',
//     }),
//   },
// }
export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  //  const sagaMiddleware = createSagaMiddleware()
  const middleware = [
    thunk,
    createMiddleware(),
    // sagaMiddleware,
    routerMiddleware(history),
    // multiClientMiddleware(clients),
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  // if (__DEBUG__) {
  //   const devToolsExtension = window.devToolsExtension
  //   if (typeof devToolsExtension === 'function') {
  //     enhancers.push(devToolsExtension())
  //   }
  // }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers))
  store.asyncReducers = {}
  //  sagaMiddleware.run(watchMany)

  if (module.hot) {
    module.hot.accept('../rootReducer', () => {
      const reducers = require('../rootReducer').default
      store.replaceReducer(reducers)
    })
  }

  return store
}
