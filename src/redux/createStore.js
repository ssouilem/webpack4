import axios from 'axios'
import { applyMiddleware, compose, createStore } from 'redux'
// import createMiddleware from 'MIDDLEWARE/clientMiddleware'
// import createSagaMiddleware from 'redux-saga'
import axiosMiddleware from 'redux-axios-middleware'
// import clients from './clients'
// import watchMany from './sagas'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootReducer from '../rootReducer'

const client = axios.create({
  // baseURL: 'http://',
  responseType: 'json',
})
export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  //  const sagaMiddleware = createSagaMiddleware()
  const middleware = [
    thunk,
    // createMiddleware(),
    // sagaMiddleware,
    routerMiddleware(history),
    axiosMiddleware(client),
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
