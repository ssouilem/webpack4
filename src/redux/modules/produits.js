import _ from 'lodash'
import axios from 'axios'
// axios.defaults.withCredentials = false

const REINITIALIZE_WIZARD = 'REINITIALIZE_WIZARD'
const SET_DATE_PROPS = 'SET_DATE_PROPS'
const SET_ITEM_PROPS = 'SET_ITEM_PROPS'

const FETCH_PRODUCTS_SENDING = 'FETCH_PRODUCTS_SENDING'
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

const CREATE_PRODUCT_SENDING = 'CREATE_PRODUCT_SENDING'
const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE'

const UPDATE_PRODUCT_SENDING = 'UPDATE_PRODUCT_SENDING'
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS'
const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE'

const DELETE_PRODUCT_SENDING = 'DELETE_PRODUCT_SENDING'
const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE'

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

const fetchProducts = dispatch => () =>
  dispatch({
    types: [FETCH_PRODUCTS_SENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE],
    promise: axios.get('/products/').then((res) => {
      console.log(res.data)
      return res
    }),
  })

// const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const createProduct = dispatch => productProps => {
  return dispatch({
    types: [CREATE_PRODUCT_SENDING, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE],
    promise: axios.post('/products/', {
      reference: productProps.reference,
      name: productProps.name,
      description: productProps.description,
      unit: productProps.unit,
      category: productProps.category,
      price: productProps.price,
      tva: productProps.tva,
    }).then((res) => {
      console.log(res.data)
      return res

    // then(async product => {
    //   await wait(7000)
    //   axios.get(`/products/stats/${product.data.messageId}`).then(stat => {
    //     console.log('Product created on Gitlab ', stat.data.product)
    //   })
    }),
  })
}

const updateProduct = dispatch => productProps => {
  return dispatch({
    types: [UPDATE_PRODUCT_SENDING, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE],
    promise: axios.put('/products/' + productProps.uid, {
      reference: productProps.reference,
      name: productProps.name,
      description: productProps.description,
      unit: productProps.unit,
      category: productProps.category,
      price: productProps.price,
      tva: productProps.tva,
    }).then((res) => {
      console.log(res.data)
      return { ...res, newProduct: productProps }
    }),
  })
}

const setItemProps = dispatch => state => {
  console.log(state)
  dispatch({
    type: SET_ITEM_PROPS,
    payload: state,

  })
}

const setDone = (state) => {
  console.log('ooooops', state)
  return undefined
}
const viewLog = (state, action) => {
  console.log('state', state)
  console.log('action', action)
}

const updatePropsProduct = (state, productUid, newProduct) => {
  var datatmp = _.find(state.data, function (obj) { return obj.uid === productUid })
  datatmp.reference = newProduct.reference
  datatmp.name = newProduct.name
  datatmp.description = newProduct.description
  datatmp.unit = newProduct.unit
  datatmp.category = newProduct.category
  datatmp.price = newProduct.price
  datatmp.tva = newProduct.tva

  if (datatmp) {
    _.merge(datatmp, newProduct)
  } else {
    state.data.push(datatmp)
  }
  return state.data
}

const deleteProduct = dispatch => uid =>
  dispatch({
    types: [DELETE_PRODUCT_SENDING, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE],
    promise: axios.delete('/products/' + uid).then((res) => {
      console.log(res.data)
      return uid
    }),
  })

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
})

const handleChange = dispatch => state => {
  console.log('handleChange ', state)
  dispatch({
    type: SET_DATE_PROPS,
    payload: state,
  })
}

const reinitializeProduit = dispatch => () => {
  dispatch({
    type: REINITIALIZE_WIZARD,
    payload: initialState,
  })
}

export const actions = {
  reinitializeProduit,
  handleChange,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  setItemProps,
}

const ACTION_HANDLERS = {
  [REINITIALIZE_WIZARD]: (state, action) => action.payload,
  [FETCH_PRODUCTS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [FETCH_PRODUCTS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: action.result.data,
  }),
  [FETCH_PRODUCTS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [CREATE_PRODUCT_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [CREATE_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    data: [...state.data, action.result.data],
    done: action.result.data.uid,
    error: undefined,
  }),
  [CREATE_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    log: viewLog(state, action),
    error: action.error.response.data,
    status: action.error.response.status,
  }),
  [UPDATE_PRODUCT_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [UPDATE_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    log: viewLog(state, action),
    // delete: _.remove(state.data, function (currentObject) { return currentObject.uid === action.result }),
    // data: [...state.data, action.result.data],
    data: updatePropsProduct(state, action.result.data.uid, action.result.newProduct),
    done: action.result.data.uid,
    error: undefined,
  }),
  [UPDATE_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [DELETE_PRODUCT_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [DELETE_PRODUCT_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    delete: _.remove(state.data, function (currentObject) { return currentObject.uid === action.result }),
    // done: _.remove(state.data, { uid: action.result }),
    // done: action.result.data.uid,
    error: undefined,
  }),
  [DELETE_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [SET_ITEM_PROPS]: (state, action) => ({
    ...state,
    done: setDone(state),
  }),
}

const initialState = {
  data: undefined,
  sending: false,
  error: undefined,
  status: undefined,
  datedebut: '',
  datefin: '',
  name: '',
  produits: [],
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
