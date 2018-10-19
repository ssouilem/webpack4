import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import portal from './redux/modules/portal'

export const SIGN_OUT = 'SIGN_OUT'

const appReducer = combineReducers({
  portal,
  form,
})

const rootReducer = (state, action) => (appReducer(action.type === SIGN_OUT ? undefined : state, action))

export default rootReducer
