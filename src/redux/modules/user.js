import { default as cookies } from '../cookieHelper'
import axios from 'axios'

const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'

const GET_PROFILE_SENDING = 'GET_PROFILE_SENDING'
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE'

const GET_USER_AVATAR = 'GET_USER_AVATAR'
const UPDATE_PROFILE_SENDING = 'UPDATE_PROFILE_SENDING'
const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE'

const AUTHENTICATED_SENDING = 'AUTHENTICATED_SENDING'
const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS'
const AUTHENTICATED_FAILURE = 'AUTHENTICATED_FAILURE'

const SET_AUTHENTICATED_PROPS = 'SET_AUTHENTICATED_PROPS'

const userHasAuthenticated = dispatch => state => {
  console.log(state)
  dispatch({
    type: SET_AUTHENTICATED_PROPS,
    payload: state,

  })
}

const signInAction = dispatch => authProps => {
  dispatch({
    types: [AUTHENTICATED_SENDING, AUTHENTICATED_SUCCESS, AUTHENTICATED_FAILURE],
    promise: axios.post('/oauth/token', {
      login: authProps.login,
      password: authProps.password,
    }).then((res) => {
      console.log(res.data)
      return res
    }),
  })
}

const signIn = (dispatch) => (data, token) => {
  const action = {
    type: SIGN_IN_SUCCESS,
    payload: {
      data,
    },
  }
  cookies.saveUserId(data.email)
  cookies.saveToken(token)
  dispatch(action)
}

const getProfile = (dispatch) => () => {
  const action = {
    types: [GET_PROFILE_SENDING, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE],
    promise: axios.get('/profile').then((res) => {
      console.log(res.data)
      return res
    }),
  }
  dispatch(action)
}

const updateProfile = (dispatch) => (data) => {
  // const action = {
  //   types: [UPDATE_PROFILE_SENDING, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE],
  //   promise: axios.put(`/profile?first_name=${ data.first_name }`, data),
  // }
  dispatch({
    type: 'UPDATE_PROFILE_SUCCESS',
    payload: { data },
  })
}

const tryToReconnect = (store) => (nextState, replace) => {
  if (store.getState().user.signIn.data === undefined) {
    if (cookies.getUserId() && cookies.getToken()) {
      console.log(cookies.getToken())
      getProfile(store.dispatch)()
    } else {
      window.location.replace('oauth/token')
    }
  }
}

const ACTION_HANDLERS = {
  [SET_AUTHENTICATED_PROPS]: (state, action) => ({
    ...state,
    done: !state.isAuthenticated,
  }),
  [SIGN_IN_SUCCESS]: (state, action) => ({
    ...state, signIn: { sending: false, error: undefined, data: action.payload.data } }),
  [GET_PROFILE_SENDING]: (state, action) => ({
    ...state, signIn: { sending: true, error: undefined, data: undefined } }),
  [GET_PROFILE_FAILURE]: (state, action) => ({
    ...state, signIn: { sending: false, error: action.error, data: undefined } }),
  [GET_PROFILE_SUCCESS]: (state, action) => ({
    ...state, signIn: { error: undefined, sending: false, data: action.result.data } }),
  [GET_USER_AVATAR]: (state, action) => ({
    ...state, signIn: { ...state.signIn, data: { ...state.signIn.data, avatar: action.payload.avatar } },
  }),
  [UPDATE_PROFILE_SENDING]: (state, action) => ({
    ...state, update: { error: undefined, sending: true, succeeded: false } }),
  [UPDATE_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    profile: { data: action.payload.data, error: undefined, sending: false },
    update: { error: undefined, sending: false, succeeded: true },
  }),
  [UPDATE_PROFILE_FAILURE]: (state, action) => ({
    ...state, update: { error: action.error, sending: false, succeeded: false } }),
  [AUTHENTICATED_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [AUTHENTICATED_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    data: [...state.data, action.result.data],
    isAuthenticated: true,
  }),
  [AUTHENTICATED_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    isAuthenticated: false,
  }),
}

const initialState = {
  isAuthenticated: false,
  signIn: { data: undefined, sending: false, error: undefined },
  users: { data: undefined, sending: false, error: undefined, selectedUser: undefined, selectedRole: undefined },
}

export const actions = {
  signIn,
  signInAction,
  userHasAuthenticated,
  getProfile,
  tryToReconnect,
  updateProfile,
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
