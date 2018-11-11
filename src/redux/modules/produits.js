import axios from 'axios'
axios.defaults.withCredentials = true
const REINITIALIZE_WIZARD = 'REINITIALIZE_WIZARD'
const SET_DATE_PROPS = 'SET_DATE_PROPS'
const FETCH_SLIPS_SUCCESS = 'FETCH_SLIPS_SUCCESS'

const FETCH_PRODUCTS_SENDING = 'FETCH_PRODUCTS_SENDING'
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

const CREATE_PRODUCT_SENDING = 'CREATE_PRODUCT_SENDING'
const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS'
const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE'

export const listUnit = {
  METRE: 'METRE',
  KILO: 'KILO',
  ROULEAU: 'ROULEAU',
}

const fetchProducts = dispatch => () =>
  dispatch({
    type: [FETCH_PRODUCTS_SENDING, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE],
    promise: axios.get('http://api.plos.org/search?q=title:DNA'),
  })

const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const createProduct = dispatch => productProps => {
  return dispatch({
    types: [CREATE_PRODUCT_SENDING, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE],
    promise: axios
      .post('http://localhost:8080/products/', {
        name: productProps.name,
        description: productProps.description,
        groupId: productProps.groupId,
        quality: productProps.quality,
        logs: productProps.logs,
        artifacts: productProps.artifacts,
        templateId: productProps.templateId,
        vars: productProps.vars,
      })
      .then(async product => {
        await wait(7000)
        axios.get(`/products/stats/${product.data.messageId}`).then(stat => {
          console.log('Product created on Gitlab ', stat.data.product)
        })
      }),
  })
}

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
})

const produits = [
  {
    'id': 'ID_9',
    'change': 'EURO',
    'description': 'tube 13',
    'name': 'rs',
    'price': 0.700,
    'quality': 'FIRST_CHOICE',
    'reference': 'R13',
    'unit': 'METRE',
  },
  {
    'id': 'ID_12',
    'change': 'EURO',
    'description': 'tube 12',
    'name': 'rs',
    'price': 0.710,
    'quality': 'FIRST_CHOICE',
    'reference': 'R12',
    'unit': 'METRE',
  },
  {
    'id': 'ID_3',
    'change': 'EURO',
    'description': 'tube 11',
    'name': 'rs',
    'price': 0.720,
    'quality': 'FIRST_CHOICE',
    'reference': 'R11',
    'unit': 'METRE',
  },
  {
    'id': 'ID_34',
    'change': 'EURO',
    'description': 'tube',
    'name': 'rs',
    'price': 0.700,
    'quality': 'FIRST_CHOICE',
    'reference': 'r12',
    'unit': 'METRE',
  }]

const fetchProduits = dispatch => () => {
  console.log('fetchClips ')
  dispatch({
    type: FETCH_SLIPS_SUCCESS,
    payload: {
      data: produits,
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

const reinitializeProduit = dispatch => () => {
  dispatch({
    type: REINITIALIZE_WIZARD,
    payload: initialState,
  })
}

const addTab = () => {
  console.log('add ---> ')
}

export const actions = {
  reinitializeProduit,
  handleChange,
  fetchProducts,
  fetchProduits,
  createProduct,
  addTab,
}

const ACTION_HANDLERS = {
  [FETCH_SLIPS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    data: produits.map(data => ({ ...data })),
  }),
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
    data: action.response,
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
    done: action.result.data.uid,
    error: undefined,
  }),
  [CREATE_PRODUCT_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
}

const initialState = {
  data: undefined,
  sending: false,
  error: undefined,
  datedebut: '',
  datefin: '',
  name: '',
  produits: produits,
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
