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

const UPDATE_CUSTOMER_SENDING = 'UPDATE_CUSTOMER_SENDING'
const UPDATE_CUSTOMER_SUCCESS = 'UPDATE_CUSTOMER_SUCCESS'
const UPDATE_CUSTOMER_FAILURE = 'UPDATE_CUSTOMER_FAILURE'

const CREATE_CONTACT_SENDING = 'CREATE_CONTACT_SENDING'
const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS'
const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE'

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

const createCustomer = dispatch => customerProps => {
  return dispatch({
    types: [CREATE_CUSTOMER_SENDING, CREATE_CUSTOMER_SUCCESS, CREATE_CUSTOMER_FAILURE],
    promise: axios.post('/customers/', {
      name: customerProps.name,
      mail: customerProps.mail,
      address: customerProps.address,
      additionalAddress: customerProps.additionalAddress,
      postalCode: customerProps.postalCode,
      city: customerProps.city,
      phoneNumber: customerProps.phoneNumber,
      faxNumber: customerProps.faxNumber, // @TODO Add faxNumber to form
      siret: customerProps.siret,
    }).then((res) => {
      console.log(res.data)
      return res
    }),
  })
}

const updateCustomer = dispatch => customerProps => {
  return dispatch({
    types: [UPDATE_CUSTOMER_SENDING, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE],
    promise: axios.put('/customers/' + customerProps.uid, {
      name: customerProps.name,
      mail: customerProps.mail,
      address: customerProps.address,
      additionalAddress: customerProps.additionalAddress,
      postalCode: customerProps.postalCode,
      city: customerProps.city,
      phoneNumber: customerProps.phoneNumber,
      faxNumber: customerProps.faxNumber,
      siret: customerProps.siret,
    }).then((res) => {
      console.log(res.data)
      return { ...res, newCustomer: customerProps }
    }),
  })
}

const addContact = dispatch => contactProps => {
  return dispatch({
    types: [CREATE_CONTACT_SENDING, CREATE_CONTACT_SUCCESS, CREATE_CONTACT_FAILURE],
    promise: axios.post('/contacts/', { ...contactProps }).then((res) => {
      console.log(res.data)
      return { ...res, customer: contactProps.customer }
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
  console.log(state)
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
    case 'address': {
      state.address = action.payload.address
      if (state.address === '') {
        state.errors.addressError = true
        state.error = true
      } else {
        state.errors.addressError = false
        state.error = false
      }
      return state.address
    }
    case 'additionalAddress': {
      state.additionalAddress = action.payload.additionalAddress
      if (state.additionalAddress === '') {
        state.errors.additionalAddressError = true
        state.error = true
      } else {
        state.errors.additionalAddressError = false
        state.error = false
      }
      return state.additionalAddress
    }
    case 'postalCode': {
      state.postalCode = action.payload.postalCode
      if (state.postalCode === '') {
        state.errors.postalCodeError = true
        state.error = true
      } else {
        state.errors.postalCodeError = false
        state.error = false
      }
      return state.postalCode
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

const setDone = (state) => {
  console.log('ooooops', state)
  return undefined
}
const viewLog = (state, action) => {
  console.log('state', state)
  console.log('action', action)
}

const updateContactToCustomer = (state, contact, customerUid) => {
  var datatmp = _.find(state.data, function (obj) { return obj.uid === customerUid })
  datatmp.contact = contact
  if (datatmp) {
    _.merge(datatmp, datatmp)
  } else {
    state.data.push(datatmp)
  }
  return state.data
}

const updatePropsCustomer = (state, customerUid, newCustomer) => {
  var datatmp = _.find(state.data, function (obj) { return obj.uid === customerUid })

  datatmp.name = newCustomer.name
  datatmp.mail = newCustomer.mail
  datatmp.address = newCustomer.address
  datatmp.additionalAddress = newCustomer.additionalAddress
  datatmp.postalCode = newCustomer.postalCode
  datatmp.city = newCustomer.city
  datatmp.phoneNumber = newCustomer.phoneNumber
  datatmp.faxNumber = newCustomer.faxNumber
  datatmp.siret = newCustomer.siret

  if (datatmp) {
    _.merge(datatmp, newCustomer)
  } else {
    state.data.push(datatmp)
  }
  return state.data
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
  updateCustomer,
  addContact,
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
    address: setFieldValue(state, action, 'address') || state.address,
    addess2: setFieldValue(state, action, 'additionalAddress') || state.addess2,
    postalCode: setFieldValue(state, action, 'postalCode') || state.postalCode,
    city: setFieldValue(state, action, 'city') || state.city,
    done: setDone(state),
  }
  ),
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
    log: viewLog(state, action),
    error: action.error.response.data,
    status: action.error.response.status,
  }),
  [UPDATE_CUSTOMER_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [UPDATE_CUSTOMER_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    log: viewLog(state, action),
    // delete: _.remove(state.data, function (currentObject) { return currentObject.uid === action.result }),
    // data: [...state.data, action.result.data],
    data: updatePropsCustomer(state, action.result.data.uid, action.result.newCustomer),
    done: action.result.data.uid,
    error: undefined,
  }),
  [UPDATE_CUSTOMER_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [CREATE_CONTACT_SENDING]: (state, action) => ({
    ...state,
    contactSending: true,
    contactError: undefined,
  }),
  [CREATE_CONTACT_SUCCESS]: (state, action) => ({
    ...state,
    contactSending: false,
    contactData: action.result.data,
    log: viewLog(state, action),
    data: updateContactToCustomer(state, action.result.data, action.result.customer),
    lastCustomer: state.data.find(o => o.uid === action.result.customer),
    contactDone: action.result.data.uid,
    contactError: undefined,
  }),
  [CREATE_CONTACT_FAILURE]: (state, action) => ({
    ...state,
    contactSending: false,
    contactError: action.error,
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
  done: undefined,
  sending: false,
  error: undefined,
  status: undefined,
  contactSending: false,
  contactData: undefined,
  contactDone: undefined,
  contactError: undefined,
  name: '',
  description: '',
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  phoneNumber: '',
  address: '',
  addess2: '',
  postalCode: '',
  city: '',
  errors: {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    locationError: false,
    phoneNumber: false,
    formError: false,
    addressError: false,
    addess2Error: false,
    postalCodeError: false,
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
