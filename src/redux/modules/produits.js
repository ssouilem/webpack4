const REINITIALIZE_WIZARD = 'REINITIALIZE_WIZARD'
const SET_DATE_PROPS = 'SET_DATE_PROPS'
const FETCH_SLIPS_SUCCESS = 'FETCH_SLIPS_SUCCESS'

export const listUnit = {
  METRE: 'METRE',
  KILO: 'KILO',
  ROULEAU: 'ROULEAU',
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
  fetchProduits,
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
}

const initialState = {
  data: undefined,
  error: undefined,
  datedebut: '',
  datefin: '',
  name: '',
  slug: undefined,
  description: '',
  level: 'private',
  service: 'none',
  dataBases: 'none',
  provider: 'BLUEMIX',
  produits: produits,
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
