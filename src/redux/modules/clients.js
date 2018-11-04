const REINITIALIZE_CLIENTS = 'REINITIALIZE_CLIENTS'
const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS'
const SELECTED_CLIENTS_PROPS = 'SELECTED_CLIENTS_PROPS'

const REINITIALIZE_ITEM = 'REINITIALIZE_ITEM'
const SET_MODAL_OPEN_PROPS = 'SET_MODAL_OPEN_PROPS'
const SET_MODAL_CLOSE_PROPS = 'SET_MODAL_CLOSE_PROPS'
const SET_ITEM_PROPS = 'SET_ITEM_PROPS'

const clients = [
  {
    'id': 'ID_33',
    'contactName': 'Societe 1',
    'reduction': 20,
    'siret': 'TN12211222213',
    'name': 'Comptoire sahloul',
    'value': '1',
    'text': 'Comptoire sahloul',
    'price': 0.700,
    'city': 'FIRST_CHOICE',
    'reference': 'R13',
    'unit': 'METRE',
  },
  {
    'id': 'ID_12',
    'contactName': 'EURO',
    'reduction': 20,
    'siret': 'TN12211222213',
    'name': 'Direct Plast',
    'text': 'Direct Plast',
    'value': '2',
    'price': 0.710,
    'city': 'FIRST',
    'reference': 'R12',
    'unit': 'METRE',
  },
  {
    'id': 'ID_3',
    'contactName': 'EURO',
    'reduction': 30,
    'siret': 'TN12211222213',
    'name': 'quincaillerie One',
    'text': 'quincaillerie One',
    'price': 0.720,
    'quality': 'FIRST_CHOICE',
    'reference': 'R11',
    'unit': 'METRE',
  },
  {
    'id': 'ID_34',
    'contactName': 'EURO',
    'siret': 'TN12211222213',
    'reduction': 10,
    'name': 'quincaillerie Two',
    'text': 'quincaillerie Two',
    'value': 'quincaillerie Two',
    'price': 0.700,
    'city': 'SOUSSE',
    'reference': 'r12',
    'unit': 'METRE',
  },
]

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
  // this.props.setItemProps({ [name]: value })
}
const fetchClients = dispatch => () => {
  console.log('fectchClient ')
  dispatch({
    type: FETCH_CLIENTS_SUCCESS,
    payload: {
      data: clients,
    },
  })
}

const setSelectedClient = (state, search) => {
  console.log(search)
  var foundClient = state.data.find(o => o.id === search.selectedClient)
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
  fetchClients,
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
    data: clients.map(data => ({ ...data })),
  }),
  [REINITIALIZE_CLIENTS]: (state, action) => action.payload,
  [SELECTED_CLIENTS_PROPS]: (state, action) => ({
    ...state,
    selectedClient: action.payload.selectedClient || state.selectedClient,
    client: setSelectedClient(state, action.payload),
  }),
}

const initialState = {
  data: [],
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
  error: false,
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
  clients: clients,
  selectedClient: '',
  client: {},
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
