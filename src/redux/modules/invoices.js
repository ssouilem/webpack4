import _ from 'lodash'
const REINITIALIZE_INVOICES = 'REINITIALIZE_INVOICES'
const SET_DATE_PROPS = 'SET_DATE_PROPS'
const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS'
const SET_INVOICES_CHECKED_PROPS = 'SET_INVOICES_CHECKED_PROPS'

const invoices = [
  {
    'id': '12',
    'number': 'FAC1254897',
    'issueDate': '2018-10-05',
    'createdDate': '2018-10-05',
    'company': 'rs',
    'amount': 145.700,
    'payments': [],
    'bordereaux ': [],
    'payDown': false,
  },
  {
    'id': '13',
    'number': 'FAC1254898',
    'issueDate': '2018-10-04',
    'createdDate': '2018-10-05',
    'company': 'rs',
    'amount': 140.700,
    'payments': [],
    'bordereaux ': [],
    'payDown': false,
  },
  {
    'id': '14',
    'number': 'FAC1254899',
    'issueDate': '2018-11-08',
    'createdDate': '2018-10-05',
    'company': 'Societe 1',
    'amount': 141.700,
    'payments': [],
    'bordereaux ': [],
    'payDown': false,
  },
  {
    'id': '15',
    'number': 'FAC1254891',
    'issueDate': '2018-12-05',
    'createdDate': '2018-10-09',
    'company': 'Comptoir',
    'amount': 140.700,
    'payments': [],
    'bordereaux ': [],
    'payDown': false,
  }]

const fetchInvoices = dispatch => () => {
  console.log('fetchInvoices ')
  dispatch({
    type: FETCH_INVOICES_SUCCESS,
    payload: {
      data: invoices,
    },
  })
}

const handleChange = dispatch => state => {
  console.log('handleChange ', state)
  dispatch({
    type: SET_DATE_PROPS,
    payload: state,
  })
}

const setCheckedItemProps = dispatch => state => {
  dispatch({
    type: SET_INVOICES_CHECKED_PROPS,
    payload: state,
  })
}

const reinitializeInvoices = dispatch => () => {
  dispatch({
    type: REINITIALIZE_INVOICES,
    payload: initialState,
  })
}

export const actions = {
  reinitializeInvoices,
  setCheckedItemProps,
  handleChange,
  fetchInvoices,
}

const setFieldValue = (state, action, field) => {
  console.log(state.data.length, action.payload)
  var datatmp = _.find(state.data, function (obj) { return obj.id === action.payload.id })
  console.log('avant ', state.data.length, datatmp)
  datatmp.checked = action.payload.value
  if (datatmp) {
    _.merge(datatmp, datatmp)
  } else {
    state.data.push(datatmp)
  }
  // calcule totalAmountHT
  if (datatmp.checked) {
    state.totalAmountHT = parseFloat(state.totalAmountHT) + parseFloat(datatmp.subTotal)
  } else {
    state.totalAmountHT = parseFloat(state.totalAmountHT) - parseFloat(datatmp.subTotal)
  }
  state.totalAmountTVA = state.totalAmountHT * 0.2
  state.totalAmountTTC = state.totalAmountHT + state.totalAmountTVA
  return state.data
}

const ACTION_HANDLERS = {
  [FETCH_INVOICES_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: invoices.map(data => ({ ...data })),
  }),
  [REINITIALIZE_INVOICES]: (state, action) => action.payload,
  [SET_INVOICES_CHECKED_PROPS]: (state, action) => ({
    ...state,
    data: setFieldValue(state, action, 'data'),
  }),
}

const initialState = {
  data: [],
  error: undefined,
  totalAmountHT: 0,
  totalAmountTTC: 0,
  totalAmountTVA: 0,
  datedebut: '',
  datefin: '',
  invoices: invoices,
}

export default function invoicesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
