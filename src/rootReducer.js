import { combineReducers } from 'redux'
// import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import portal from './redux/modules/portal'
import bordereau from './redux/modules/bordereauActions'
import produits from './redux/modules/produits'
import clients from './redux/modules/clients'
import address from './redux/modules/address'

export const SIGN_OUT = 'SIGN_OUT'

const appReducer = combineReducers({
  portal,
  bordereau,
  produits,
  clients,
  address,
  form,
})

const rootReducer = (state, action) => (appReducer(action.type === SIGN_OUT ? undefined : state, action))

export default rootReducer
