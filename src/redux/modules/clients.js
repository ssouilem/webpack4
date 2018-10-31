const REINITIALIZE_CLIENTS = 'REINITIALIZE_CLIENTS'
const FETCH_CLIENTS_SUCCESS = 'FETCH_CLIENTS_SUCCESS'
const SELECTED_CLIENTS_PROPS = 'SELECTED_CLIENTS_PROPS'

const clients = [
  {
    'id': 'ID_33',
    'contactName': 'Societe 1',
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
    'name': 'quincaillerie Two',
    'text': 'quincaillerie Two',
    'value': 'quincaillerie Two',
    'price': 0.700,
    'city': 'SOUSSE',
    'reference': 'r12',
    'unit': 'METRE',
  },
]

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
}

const ACTION_HANDLERS = {
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
  error: undefined,
  name: '',
  description: '',
  service: 'none',
  dataBases: 'none',
  provider: 'BLUEMIX',
  clients: clients,
  selectedClient: '',
  client: {},
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
