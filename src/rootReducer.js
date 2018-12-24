import { combineReducers } from 'redux'
// import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import portal from './redux/modules/portal'
import bordereau from './redux/modules/bordereau'
import produits from './redux/modules/produits'
import clients from './redux/modules/clients'
import search from './redux/modules/search'
import invoices from './redux/modules/invoices'
import payments from './redux/modules/payments'
import user from './redux/modules/user'

export const SIGN_OUT = 'SIGN_OUT'

const appReducer = combineReducers({
  portal,
  bordereau,
  invoices,
  produits,
  payments,
  clients,
  user,
  search,
  form,
  routing: routerReducer,
})

const rootReducer = (state, action) => (appReducer(action.type === SIGN_OUT ? undefined : state, action))

export default rootReducer
