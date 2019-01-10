import _ from 'lodash'
import axios from 'axios'

const INCREMENT_STEP = 'INCREMENT_STEP'
const DECREMENT_STEP = 'DECREMENT_STEP'
const REINITIALIZE_INVOICES = 'REINITIALIZE_INVOICES'
const SET_DATE_PROPS = 'SET_DATE_PROPS'
const SET_INVOICES_CHECKED_PROPS = 'SET_INVOICES_CHECKED_PROPS'
const SET_INVOICES_PROPS = 'SET_INVOICES_PROPS'

const FETCH_INVOICES_SENDING = 'FETCH_INVOICES_SENDING'
const FETCH_INVOICES_SUCCESS = 'FETCH_INVOICES_SUCCESS'
const FETCH_INVOICES_FAILURE = 'FETCH_INVOICES_FAILURE'

const CREATE_INVOICE_SENDING = 'CREATE_INVOICE_SENDING'
const CREATE_INVOICE_SUCCESS = 'CREATE_INVOICE_SUCCESS'
const CREATE_INVOICE_FAILURE = 'CREATE_INVOICE_FAILURE'

const DELETE_INVOICE_SENDING = 'DELETE_INVOICE_SENDING'
const DELETE_INVOICE_SUCCESS = 'DELETE_INVOICE_SUCCESS'
const DELETE_INVOICE_FAILURE = 'DELETE_INVOICE_FAILURE'

const GENERATE_INVOICE_SENDING = 'GENERATE_INVOICE_SENDING'
const GENERATE_INVOICE_SUCCESS = 'GENERATE_INVOICE_SUCCESS'
const GENERATE_INVOICE_FAILURE = 'GENERATE_INVOICE_FAILURE'

const GENERATE_PDFPREVIEW_SENDING = 'GENERATE_PDFPREVIEW_SENDING'
const GENERATE_PDFPREVIEW_SUCCESS = 'GENERATE_PDFPREVIEW_SUCCESS'
const GENERATE_PDFPREVIEW_FAILURE = 'GENERATE_PDFPREVIEW_FAILURE'

const fetchInvoices = dispatch => () =>
  dispatch({
    types: [FETCH_INVOICES_SENDING, FETCH_INVOICES_SUCCESS, FETCH_INVOICES_FAILURE],
    promise: axios.get('/invoices/').then((res) => {
      console.log(res.data)
      return res
    }),
  })

const generatePdfInvoice = dispatch => invoiceProps =>
  dispatch({
    types: [GENERATE_INVOICE_SENDING, GENERATE_INVOICE_SUCCESS, GENERATE_INVOICE_FAILURE],
    promise: axios.get('/invoice/' + invoiceProps.uid + '/pdfreport').then((res) => {
      // console.log(res.data)
      return res
    }),
  })

const pdfPreviewInvoice = dispatch => invoiceProps =>
  dispatch({
    types: [GENERATE_PDFPREVIEW_SENDING, GENERATE_PDFPREVIEW_SUCCESS, GENERATE_PDFPREVIEW_FAILURE],
    promise: axios.post('/invoice/preview', {
      ...invoiceProps,
    }).then((res) => {
      // console.log(res.data)
      return res
    }),
  })

// const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const createInvoice = dispatch => bordereauProps => {
  // console.log(JSON.stringify(bordereauProps))
  return dispatch({
    types: [CREATE_INVOICE_SENDING, CREATE_INVOICE_SUCCESS, CREATE_INVOICE_FAILURE],
    promise: axios.post('/invoices/', {
      ...bordereauProps,
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

const setInvoicesProps = dispatch => state => {
  console.log('handleChange ', state)
  dispatch({
    type: SET_INVOICES_PROPS,
    payload: state,
  })
}

const reinitializeInvoices = dispatch => () => {
  dispatch({
    type: REINITIALIZE_INVOICES,
    payload: initialState,
  })
}

const next = dispatch => () => {
  console.log('NEXT FUNCTION IN WIZARD REDUCER ')
  return dispatch({
    type: INCREMENT_STEP,
  })
}
const prev = dispatch => () => {
  dispatch({
    type: DECREMENT_STEP,
  })
}

export const actions = {
  reinitializeInvoices,
  setInvoicesProps,
  setCheckedItemProps,
  handleChange,
  fetchInvoices,
  createInvoice,
  generatePdfInvoice,
  pdfPreviewInvoice,
  deleteInvoice,
  next,
  prev,
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
    data: action.result.data,
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
  [GENERATE_INVOICE_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [GENERATE_INVOICE_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    generatePDF: true,
  }),
  [GENERATE_INVOICE_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [GENERATE_PDFPREVIEW_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [GENERATE_PDFPREVIEW_SUCCESS]: (state, action) => ({
    ...state,
    preview: { sending: false, error: undefined, data: action.result.data },
  }),
  [GENERATE_PDFPREVIEW_FAILURE]: (state, action) => ({
    ...state,
    preview: { sending: false, error: action.error, data: undefined },
  }),
  [DELETE_INVOICE_SENDING]: (state, action) => ({
    ...state,
    preview: { sending: true, error: undefined, data: undefined },
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
  [INCREMENT_STEP]: (state, action) => ({
    ...state,
    currentStep: ++state.currentStep,
  }),
  [DECREMENT_STEP]: (state, action) => ({
    ...state,
    currentStep: --state.currentStep,
  }),
  [SET_INVOICES_PROPS]: (state, action) => ({
    ...state,
    selectedClient: action.payload.selectedClient || state.selectedClient,
    customer: action.payload.customer || state.customer,
    createdAuthor: action.payload.createdAuthor || state.createdAuthor,
    issueDate: action.payload.issueDate || state.issueDate,
    invoiceNumber: action.payload.invoiceNumber || state.invoiceNumber,
    totalAmountHT: action.payload.totalAmountHT || state.totalAmountHT,
    totalAmountTVA: action.payload.totalAmountTVA || state.totalAmountTVA,
    totalAmountTTC: action.payload.totalAmountTTC || state.totalAmountTTC,
    checkedComment: 'checkedComment' in action.payload ? action.payload.checkedComment : state.checkedComment,
    checkedOtherExpenses: 'checkedOtherExpenses' in action.payload ? action.payload.checkedOtherExpenses : state.checkedOtherExpenses,
    comment: action.payload.comment || state.comment,
    otherExpenses: action.payload.otherExpenses || state.otherExpenses,
    amountInWords: 'amountInWords' in action.payload ? action.payload.amountInWords : state.amountInWords,
    paymentCondition: 'paymentCondition' in action.payload ? action.payload.paymentCondition : state.paymentCondition,
  }),
}

const initialState = {
  currentStep: 0,
  preview: { data: undefined, sending: false, error: undefined },
  checkedComment: false,
  checkedOtherExpenses: false,
  otherExpenses: 0,
  amountInWords: false,
  paymentCondition: false,
  done: false,
  data: undefined,
  sending: false,
  generatePDF: false,
  error: undefined,
  totalAmountHT: 0,
  totalAmountTTC: 0,
  totalAmountTVA: 0,
  invoiceNumber: '',
  datedebut: '',
  datefin: '',
}

export default function invoicesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
