const REINITIALIZE_ITEM = 'REINITIALIZE_ITEM'
const SET_MODAL_OPEN_PROPS = 'SET_MODAL_OPEN_PROPS'
const SET_MODAL_CLOSE_PROPS = 'SET_MODAL_CLOSE_PROPS'
const SET_ITEM_PROPS = 'SET_ITEM_PROPS'

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
  console.log('address handle state : ', state)
  console.log('address handle action.payload : ', action.payload.firstName)
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

export const actions = {
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
}

const initialState = {
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
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
