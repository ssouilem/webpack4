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

const handleChange = (e, { name, value }) => {
  this.setState({ [name]: value })
  this.props.setItemProps({ [name]: value })
}

export const actions = {
  reinitializeItem,
  setItemProps,
  handleClose,
  handleOpen,
  handleChange,
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
    firstName: action.payload.firstName || state.firstName,
    lastName: action.payload.lastName || state.lastName,
    email: action.payload.email || state.email,
    phoneNumber: action.payload.phoneNumber || state.phoneNumber,
    address1: action.payload.address1 || state.address1,
    addess2: action.payload.addess2 || state.addess2,
    zipCode: action.payload.zipCode || state.zipCode,
    city: action.payload.city || state.city,
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
