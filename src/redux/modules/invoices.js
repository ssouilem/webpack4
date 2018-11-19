import _ from 'lodash'
import axios from 'axios'

const REINITIALIZE_INVOICES = 'REINITIALIZE_INVOICES'
const SET_DATE_PROPS = 'SET_DATE_PROPS'
const SET_INVOICES_CHECKED_PROPS = 'SET_INVOICES_CHECKED_PROPS'

const FETCH_INVOICES_SENDING = 'FETCH_INVOICES_SENDING'
const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS'
const FETCH_INVOICES_FAILURE = 'FETCH_INVOICES_FAILURE'

const CREATE_INVOICE_SENDING = 'CREATE_INVOICE_SENDING'
const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS'
const CREATE_INVOICE_FAILURE = 'CREATE_INVOICE_FAILURE'

const DELETE_INVOICE_SENDING = 'DELETE_INVOICE_SENDING'
const DELETE_INVOICE_SUCCESS = 'DELETE_INVOICE_SUCCESS'
const DELETE_INVOICE_FAILURE = 'DELETE_INVOICE_FAILURE'

const fetchInvoices = dispatch => () =>
  dispatch({
    types: [FETCH_INVOICES_SENDING, FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILURE],
    promise: axios.get('/invoices/').then((res) => {
      console.log(res.data)
      return res
    }),
  })

// const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const createInvoice = dispatch => bordereauProps => {
  // console.log(JSON.stringify(bordereauProps))
  return dispatch({
    types: [CREATE_INVOICE_SENDING, CREATE_INVOICE_SUCCESS, CREATE_INVOICE_FAILURE],
    promise: axios.post('/invoices/', {
      customer: bordereauProps.customer,
      createdAuthor: bordereauProps.description,
      number: bordereauProps.number,
      treatmentDate: bordereauProps.treatmentDate,
      type: bordereauProps.type,
      bordereauDetailList: bordereauProps.bordereauDetailList.map(bordereaudetail => ({
        description: bordereaudetail.description,
        percentage: bordereaudetail.reduction,
        productUid: bordereaudetail.productUid,
        qte: bordereaudetail.qte,
        reference: bordereaudetail.reference,
        unit: bordereaudetail.unit,
      })),
    }).then((res) => {
      console.log(res.data)
      return res

    // then(async bordereau => {
    //   await wait(7000)
    //   axios.get(`/bordereaux/stats/${bordereau.data.messageId}`).then(stat => {
    //     console.log('Bordereau created on Gitlab ', stat.data.bordereau)
    //   })
    }),
  })
}

const deleteInvoice = dispatch => uid =>
  dispatch({
    types: [DELETE_INVOICE_SENDING, DELETE_INVOICE_SUCCESS, DELETE_INVOICE_FAILURE],
    promise: axios.delete('/invoices/' + uid).then((res) => {
      console.log(res.data)
      return uid
    }),
  })

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
  }]

// const fetchInvoices = dispatch => () => {
//   console.log('fetchInvoices ')
//   dispatch({
//     type: FETCH_INVOICES_SUCCESS,
//     payload: {
//       data: invoices,
//     },
//   })
// }

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
  createInvoice,
  deleteInvoice,
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
  // [FETCH_INVOICES_SUCCESS]: (state, action) => ({
  //   ...state,
  //   sending: false,
  //   error: undefined,
  //   data: invoices.map(data => ({ ...data })),
  // }),
  [REINITIALIZE_INVOICES]: (state, action) => action.payload,
  [SET_INVOICES_CHECKED_PROPS]: (state, action) => ({
    ...state,
    data: setFieldValue(state, action, 'data'),
  }),
  [FETCH_INVOICES_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [FETCH_INVOICES_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: action.result.data.map(bordereau => ({
      id: bordereau.uid,
      customer: bordereau.customer,
      createdAuthor: bordereau.createdAuthor ? bordereau.createdAuthor : 'Empty',
      number: bordereau.number,
      treatmentDate: bordereau.treatmentDate,
      createdDate: bordereau.createdDate ? bordereau.createdDate : bordereau.treatmentDate,
      invoice: bordereau.invoice ? bordereau.invoice.number : 'En attente',
      subTotal: bordereau.subTotal ? bordereau.subTotal : 'BUG',
      bordereauDetails: bordereau.bordereauDetails ? bordereau.bordereauDetails : 'BUG',
    })),
  }),
  [FETCH_INVOICES_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [CREATE_INVOICE_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [CREATE_INVOICE_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    data: [...state.data, action.result.data],
    done: action.result.data.uid,
    error: undefined,
  }),
  [CREATE_INVOICE_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [DELETE_INVOICE_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [DELETE_INVOICE_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    delete: _.remove(state.data, function (currentObject) { return currentObject.id === action.result }),
    // done: _.remove(state.data, { uid: action.result }),
    // done: action.result.data.uid,
    error: undefined,
  }),
  [DELETE_INVOICE_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
}

const initialState = {
  data: [],
  sending: false,
  error: undefined,
  totalAmountHT: 0,
  totalAmountTTC: 0,
  totalAmountTVA: 0,
  invoiceNumber: '',
  datedebut: '',
  datefin: '',
  invoices: invoices,
}

export default function invoicesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
