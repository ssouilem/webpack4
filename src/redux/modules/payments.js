import _ from 'lodash'
import axios from 'axios'
// axios.defaults.withCredentials = false

const REINITIALIZE_WIZARD = 'REINITIALIZE_WIZARD'

const FETCH_PAYMENTS_SENDING = 'FETCH_PAYMENTS_SENDING'
const FETCH_PAYMENTS_SUCCESS = 'FETCH_PAYMENTS_SUCCESS'
const FETCH_PAYMENTS_FAILURE = 'FETCH_PAYMENTS_FAILURE'

const CREATE_PAYMENT_SENDING = 'CREATE_PAYMENT_SENDING'
const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS'
const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE'

const UPDATE_PAYMENT_SENDING = 'UPDATE_PAYMENT_SENDING'
const UPDATE_PAYMENT_SUCCESS = 'UPDATE_PAYMENT_SUCCESS'
const UPDATE_PAYMENT_FAILURE = 'UPDATE_PAYMENT_FAILURE'

const DELETE_PAYMENT_SENDING = 'DELETE_PAYMENT_SENDING'
const DELETE_PAYMENT_SUCCESS = 'DELETE_PAYMENT_SUCCESS'
const DELETE_PAYMENT_FAILURE = 'DELETE_PAYMENT_FAILURE'

const fetchPayments = dispatch => () =>
  dispatch({
    types: [FETCH_PAYMENTS_SENDING, FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE],
    promise: axios.get('/payment/').then((res) => {
      console.log(res.data)
      return res
    }),
  })

// const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const createPayment = dispatch => paymentProps => {
  return dispatch({
    types: [CREATE_PAYMENT_SENDING, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE],
    promise: axios.post('/payment/', {
      amount: paymentProps.amount,
      amountPending: paymentProps.amountPending,
      bank: paymentProps.bank,
      holder: paymentProps.holder,
      invoice: paymentProps.invoice,
      paymentDetails: paymentProps.paymentDetails,
    }).then((res) => {
      console.log(res.data)
      return res

    // then(async product => {
    //   await wait(7000)
    //   axios.get(`/products/stats/${product.data.messageId}`).then(stat => {
    //     console.log('Payment created on Gitlab ', stat.data.product)
    //   })
    }),
  })
}

/*
{
  "amount": 200.7,
  "amountPending": 0,
  "bank": "BIAT",
  "holder": "samir",
  "invoice": "d6e96e30-b9d7-4cc5-a4bc-0d274d06f0b0",
  "paymentDetails": [
    {
      "amount": 100.0,
      "issueDate": "2018-12-01",
      "transactionNumber": "FFFFF",
      "type": "CHEQUE"
    }
  ]
} */
const updatePayment = dispatch => paymentProps => {
  return dispatch({
    types: [UPDATE_PAYMENT_SENDING, UPDATE_PAYMENT_SUCCESS, UPDATE_PAYMENT_FAILURE],
    promise: axios.put('/payment/' + paymentProps.uid, {
      amount: paymentProps.amount,
      amountPending: paymentProps.amountPending,
      bank: paymentProps.bank,
      holder: paymentProps.holder,
      invoice: paymentProps.invoiceNumber,
      paymentDetails: paymentProps.paymentDetails,
    }).then((res) => {
      console.log(res.data)
      return res
    }),
  })
}

const deletePayment = dispatch => uid =>
  dispatch({
    types: [DELETE_PAYMENT_SENDING, DELETE_PAYMENT_SUCCESS, DELETE_PAYMENT_FAILURE],
    promise: axios.delete('/payment/' + uid).then((res) => {
      console.log(res.data)
      return uid
    }),
  })

const reinitializeProduit = dispatch => () => {
  dispatch({
    type: REINITIALIZE_WIZARD,
    payload: initialState,
  })
}

export const actions = {
  reinitializeProduit,
  fetchPayments,
  createPayment,
  updatePayment,
  deletePayment,
}

const ACTION_HANDLERS = {
  [REINITIALIZE_WIZARD]: (state, action) => action.payload,
  [FETCH_PAYMENTS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [FETCH_PAYMENTS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: action.result.data,
  }),
  [FETCH_PAYMENTS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [CREATE_PAYMENT_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [CREATE_PAYMENT_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    data: action.result.data,
    done: action.result.data.uid,
    error: undefined,
  }),
  [CREATE_PAYMENT_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [UPDATE_PAYMENT_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [UPDATE_PAYMENT_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    delete: _.remove(state.data, function (currentObject) { return currentObject.uid === action.result }),
    data: [...state.data, action.result.data],
    done: action.result.data.uid,
    error: undefined,
  }),
  [UPDATE_PAYMENT_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [DELETE_PAYMENT_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [DELETE_PAYMENT_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    delete: _.remove(state.data, function (currentObject) { return currentObject.uid === action.result }),
    // done: _.remove(state.data, { uid: action.result }),
    // done: action.result.data.uid,
    error: undefined,
  }),
  [DELETE_PAYMENT_FAILURE]: (state, action) => ({
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
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
