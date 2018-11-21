import _ from 'lodash'
import axios from 'axios'

const REINITIALIZE_CLIENTS = 'REINITIALIZE_CLIENTS'
const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS'
const SELECTED_CLIENTS_PROPS = 'SELECTED_CLIENTS_PROPS'

const REINITIALIZE_ITEM = 'REINITIALIZE_ITEM'
const SET_MODAL_OPEN_PROPS = 'SET_MODAL_OPEN_PROPS'
const SET_MODAL_CLOSE_PROPS = 'SET_MODAL_CLOSE_PROPS'
const SET_ITEM_PROPS = 'SET_ITEM_PROPS'

const FETCH_CUSTOMERS_SENDING = 'FETCH_CUSTOMERS_SENDING'
const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS'
const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE'

const CREATE_CUSTOMER_SENDING = 'CREATE_CUSTOMER_SENDING'
const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS'
const CREATE_CUSTOMER_FAILURE = 'CREATE_CUSTOMER_FAILURE'

const DELETE_CUSTOMER_SENDING = 'DELETE_CUSTOMER_SENDING'
const DELETE_CUSTOMER_SUCCESS = 'DELETE_CUSTOMER_SUCCESS'
const DELETE_CUSTOMER_FAILURE = 'DELETE_CUSTOMER_FAILURE'

// const instance = axios.create({
//   baseURL: 'http://localhost:8080',
//   responseType: 'json',
//   withCredentials: false,
//   crossdomain: true,
//   mode: 'cors',
//   headers: {
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/json',
//   },
// })

const fetchCustomers = dispatch => () =>
  dispatch({
    types: [FETCH_CUSTOMERS_SENDING, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE],
    promise: axios.get('/customers/').then((res) => {
      console.log(res.data)
      return res
    }),
  })

const createCustomer = dispatch => productProps => {
  return dispatch({
    types: [CREATE_CUSTOMER_SENDING, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_FAILURE],
    promise: axios.post('/customers/', {
      name: productProps.name,
      mail: productProps.mail,
      address: productProps.address,
      additionalAddress: productProps.additionalAddress,
      postalCode: productProps.postalCode,
      city: productProps.city,
      phoneNumber: productProps.phoneNumber,
      faxNumber: productProps.faxNumber, // @TODO Add faxNumber to form
      tvaNumber: productProps.tvaNumber,
    }).then((res) => {
      console.log(res.data)
      return res
    }),
  })
}

const deleteCustomer = dispatch => uid =>
  dispatch({
    types: [DELETE_CUSTOMER_SENDING, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE],
    promise: axios.delete('/customers/' + uid).then((res) => {
      console.log(res.data)
      return uid
    }),
  })

const reinitializeItem = dispatch => () => {
  dispatch({
    type: REINITIALIZE_ITEM,
    payload: initialState,
  })
}

const setItemProps = dispatch => state => {
  dispatch({
    type: SET_ITEM_PROPS,
    payload: state,
  })
}

const handleClose = dispatch => () => {
  dispatch({
    type: SET_MODAL_CLOSE_PROPS,
  })
}

const handleOpen = dispatch => () => {
  dispatch({
    type: SET_MODAL_OPEN_PROPS,
  })
}

const setFieldValue = (state, action, field) => {
  switch (field) {
    case 'firstName': {
      state.firstName = action.payload.firstName
      if (state.firstName === '') {
        state.errors.firstNameError = true
        state.error = true
      } else {
        state.errors.firstNameError = false
        state.error = false
      }
      return state.firstName
    }
    case 'lastName': {
      state.lastName = action.payload.lastName
      if (state.lastName === '') {
        state.errors.lastNameError = true
        state.error = true
      } else {
        state.errors.lastNameError = false
        state.error = false
      }
      return state.lastName
    }
    case 'email': {
      state.email = action.payload.email
      if (state.email === '') {
        state.errors.emailError = true
        state.error = true
      } else {
        state.errors.emailError = false
        state.error = false
      }
      return state.email
    }
    case 'phoneNumber': {
      state.phoneNumber = action.payload.phoneNumber
      if (state.phoneNumber === '') {
        state.errors.phoneNumberError = true
        state.error = true
      } else {
        state.errors.phoneNumberError = false
        state.error = false
      }
      return state.phoneNumber
    }
    case 'address1': {
      state.address1 = action.payload.address1
      if (state.address1 === '') {
        state.errors.address1Error = true
        state.error = true
      } else {
        state.errors.address1Error = false
        state.error = false
      }
      return state.address1
    }
    case 'address2': {
      state.address2 = action.payload.address2
      if (state.address2 === '') {
        state.errors.address2Error = true
        state.error = true
      } else {
        state.errors.address2Error = false
        state.error = false
      }
      return state.address2
    }
    case 'zipeCode': {
      state.zipeCode = action.payload.zipeCode
      if (state.zipeCode === '') {
        state.errors.zipeCodeError = true
        state.error = true
      } else {
        state.errors.zipeCodeError = false
        state.error = false
      }
      return state.zipeCode
    }
    case 'city': {
      state.city = action.payload.city
      if (state.city === '') {
        state.errors.cityError = true
        state.error = true
      } else {
        state.errors.cityError = false
        state.error = false
      }
      return state.city
    }
    default: {
      // statements;
      break
    }
  }
}

const setSelectedClient = (state, search) => {
  console.log(search)
  var foundClient = state.data.find(o => o.uid === search.selectedClient)
  return foundClient
}

const handleChangeClient = dispatch => state => {
  console.log(state)
  dispatch({
    type: SELECTED_CLIENTS_PROPS,
    payload: state,
  })
}

const reinitializeClients = dispatch => () => {
  dispatch({
    type: REINITIALIZE_CLIENTS,
    payload: initialState,
  })
}

export const actions = {
  handleChangeClient,
  reinitializeClients,
  fetchCustomers,
  createCustomer,
  deleteCustomer,
  reinitializeItem,
  setItemProps,
  handleClose,
  handleOpen,
}

const ACTION_HANDLERS = {
  [SET_MODAL_OPEN_PROPS]: (state, action) => ({
    ...state,
    modalOpen: true,
  }),
  [SET_MODAL_CLOSE_PROPS]: (state, action) => ({
    ...state,
    modalOpen: false,
  }),
  [SET_ITEM_PROPS]: (state, action) => ({
    ...state,
    firstName: setFieldValue(state, action, 'firstName') || state.firstName,
    lastName: setFieldValue(state, action, 'lastName') || state.lastName,
    email: setFieldValue(state, action, 'email') || state.email,
    phoneNumber: setFieldValue(state, action, 'phoneNumber') || state.phoneNumber,
    address1: setFieldValue(state, action, 'address1') || state.address1,
    addess2: setFieldValue(state, action, 'address2') || state.addess2,
    zipCode: setFieldValue(state, action, 'zipeCode') || state.zipCode,
    city: setFieldValue(state, action, 'city') || state.city,
  }),
  [REINITIALIZE_ITEM]: (state, action) => action.payload,
  [FETCH_CLIENTS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: state.data.map(data => ({ ...data })),
  }),
  [REINITIALIZE_CLIENTS]: (state, action) => action.payload,
  [SELECTED_CLIENTS_PROPS]: (state, action) => ({
    ...state,
    selectedClient: action.payload.selectedClient || state.selectedClient,
    client: setSelectedClient(state, action.payload),
  }),
  [FETCH_CUSTOMERS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [FETCH_CUSTOMERS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: action.result.data,
  }),
  [FETCH_CUSTOMERS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [CREATE_CUSTOMER_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [CREATE_CUSTOMER_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    data: [...state.data, action.result.data],
    done: action.result.data.uid,
    error: undefined,
  }),
  [CREATE_CUSTOMER_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [DELETE_CUSTOMER_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [DELETE_CUSTOMER_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    delete: _.remove(state.data, function (currentObject) { return currentObject.uid === action.result }),
    error: undefined,
  }),
  [DELETE_CUSTOMER_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
}

const initialState = {
  data: undefined,
  sending: false,
  error: undefined,
  name: '',
  description: '',
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  phoneNumber: '',
  address1: '',
  addess2: '',
  zipCode: '',
  city: '',
  errors: {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    locationError: false,
    phoneNumber: false,
    formError: false,
    address1Error: false,
    addess2Error: false,
    zipCodeError: false,
    cityError: false,
    errorMessage: 'Please complete all required fields.',
  },
  complete: false,
  modalOpen: false,
  selectedClient: '',
  client: {},
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
