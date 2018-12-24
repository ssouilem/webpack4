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

const REFRESH_AUTHENTICATED_SENDING = 'REFRESH_AUTHENTICATED_SENDING'
const REFRESH_AUTHENTICATED_SUCCESS = 'REFRESH_AUTHENTICATED_SUCCESS'
const REFRESH_AUTHENTICATED_FAILURE = 'REFRESH_AUTHENTICATED_FAILURE'

const SET_AUTHENTICATED_PROPS = 'SET_AUTHENTICATED_PROPS'

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS' // for all requests
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*' // for all requests
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8081/'
axios.defaults.headers.common['Access-Control-Expose-Headers'] = 'Access-Control-*'
axios.defaults.crossdomain = true

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  withCredentials: true,
  crossdomain: true,
  mode: 'cors',
  // headers: {
  //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //   'Access-Control-Expose-Headers': 'Access-Control-*',
  //   'Access-Control-Allow-Headers': '*',
  //   'Access-Control-Allow-Origin': 'http://localhost:8081/',
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // },
})
const userHasAuthenticated = dispatch => state => {
  console.log(state)
  dispatch({
    type: SET_AUTHENTICATED_PROPS,
    payload: state,

  })
}

const signInAction = dispatch => authProps => {
  var username = 'spring-security-oauth2-read-write-client'
  var password = 'spring-security-oauth2-read-write-client-password1234'
  var credentials = btoa(username + ':' + password)
  var basicAuth = 'Basic ' + credentials

  var bodyFormData = new FormData()
  bodyFormData.set('username', authProps.login)
  bodyFormData.set('password', authProps.password)
  bodyFormData.set('grant_type', 'password')
  console.log('login', authProps.login)
  console.log('login', authProps.password)
  // bodyFormData.append('------WebKitFormBoundary7MA4YWxkTrZu0gW--')
  // bodyFormData.append(JSON.stringify(data))

  return dispatch({
    types: [AUTHENTICATED_SENDING, AUTHENTICATED_SUCCESS, AUTHENTICATED_FAILURE],
    promise: instance({
      url: '/oauth/token',
      method: 'POST',
      data: bodyFormData,
      headers: {
        'Authorization': `${basicAuth}`,
        'content-type': 'multipart/form-data',
      },
    }).then((res) => {
      res.data && console.log(res.data)
      // cookies.saveOrganizationId(res.data.organization)
      // cookies.saveToken(res.data)
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

const refreshToken = (dispatch) => () => {
  var username = 'spring-security-oauth2-read-write-client'
  var password = 'spring-security-oauth2-read-write-client-password1234'
  var credentials = btoa(username + ':' + password)
  var basicAuth = 'Basic ' + credentials

  var bodyFormData = new FormData()
  // bodyFormData.set('username', 'admin')
  bodyFormData.set('refresh_token', cookies.getRefreshToken())
  bodyFormData.set('grant_type', 'refresh_token')
  return dispatch({
    types: [REFRESH_AUTHENTICATED_SENDING, REFRESH_AUTHENTICATED_SUCCESS, REFRESH_AUTHENTICATED_FAILURE],
    promise: instance({
      url: '/oauth/token',
      method: 'POST',
      data: bodyFormData,
      headers: {
        'Authorization': `${basicAuth}`,
        'content-type': 'multipart/form-data',
      },
    }).then((res) => {
      res.data && console.log(res.data)
      // cookies.saveOrganizationId(res.data.organization)
      // cookies.saveToken(res.data)
      return res
    }),
  })
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

const setToken = (token) => {
  // const header = `Authorization: Bearer ${token}`
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  console.log('getToken ' + cookies.getToken())
  console.log('getOrganizationId : ' + cookies.getOrganizationId())
  return token
}

const ACTION_HANDLERS = {
  [SET_AUTHENTICATED_PROPS]: (state, action) => ({
    ...state,
    isAuthenticated: !state.isAuthenticated,
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
  [UPDATE_PROFILE_FAILURE]: (state, action) => ({
    ...state, update: { error: action.error, sending: false, succeeded: false } }),
  [UPDATE_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    profile: { data: action.payload.data, error: undefined, sending: false },
    update: { error: undefined, sending: false, succeeded: true },
  }),
  [AUTHENTICATED_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [AUTHENTICATED_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    isAuthenticated: false,
  }),
  [AUTHENTICATED_SUCCESS]: (state, action) => ({
    ...state,
    signIn: { sending: false, error: undefined, data: action.result.data },
    sending: false,
    error: undefined,
    // token: setToken(action.result.data.access_token),

    // data: [...state.data, action.result.data],
    isAuthenticated: true,
    maxAge: action.result.data.expires_in,
    organization: cookies.saveOrganizationId(action.result.data.organization),
    cookies: cookies.saveToken(action.result.data, action.result.data.expires_in),
  }),
  [REFRESH_AUTHENTICATED_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [REFRESH_AUTHENTICATED_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    isAuthenticated: false,
  }),
  [REFRESH_AUTHENTICATED_SUCCESS]: (state, action) => ({
    ...state,
    signIn: { sending: false, error: undefined, data: action.result.data },
    sending: false,
    // token: setToken(action.result.data.access_token),

    // data: [...state.data, action.result.data],
    isAuthenticated: true,
    maxAge: action.result.data.expires_in,
    // organization: cookies.saveOrganizationId(action.result.data.organization),
    cookies: cookies.saveToken(action.result.data, action.result.data.expires_in),
  }),
}

const initialState = {
  isAuthenticated: false,
  organization: false,
  maxAge: undefined,
  error: undefined,
  token: '',
  cookies: false,
  signIn: { data: undefined, sending: false, error: undefined },
  users: { data: undefined, sending: false, error: undefined, selectedUser: undefined, selectedRole: undefined },
}

export const actions = {
  signIn,
  signInAction,
  refreshToken,
  userHasAuthenticated,
  getProfile,
  tryToReconnect,
  updateProfile,
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
