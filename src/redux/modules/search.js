import _ from 'lodash'
const INITIALIZE_SEARCH = 'INITIALIZE_SEARCH'
const REINITIALIZE_SEARCH = 'REINITIALIZE_SEARCH'
const SET_LOADING_PROPS = 'SET_LOADING_PROPS'
const SET_RESULTS_PROPS = 'SET_RESULTS_PROPS'
const SET_SOURCE_PROPS = 'SET_SOURCE_PROPS'
const SET_VALUE_PROPS = 'SET_VALUE_PROPS'


const initialize = dispatch => state => {
  dispatch({
    type: INITIALIZE_SEARCH,
    payload: initialState,
  })
}

const reinitialize = dispatch => state => {
  dispatch({
    type: REINITIALIZE_SEARCH,
    payload: state,
  })
}

const setSourceProps = dispatch => state => {
  dispatch({
    type: SET_SOURCE_PROPS,
    payload: state,
  })
}

const setValueProps = dispatch => state => {
  dispatch({
    type: SET_VALUE_PROPS,
    payload: state,
  })
}

const setResultsProps = dispatch => state => {
  dispatch({
    type: SET_RESULTS_PROPS,
    payload: state,
  })
}

const setLoadingProps = dispatch => state => {
  dispatch({
    type: SET_LOADING_PROPS,
    payload: state,
  })
}

const updateSearchResultProps = (state, searchValue) => {
  const re = new RegExp(_.escapeRegExp(searchValue), 'i')
  const isMatch = result => re.test(result.title)
  return  _.filter(state.source, isMatch)
}

export const actions = {
  initialize,
  reinitialize,
  setLoadingProps,
  setResultsProps,
  setSourceProps,
  setValueProps,
}

const ACTION_HANDLERS = {
  [SET_RESULTS_PROPS]: (state, action) => ({
    ...state,
    isLoading: false,
    results: updateSearchResultProps(state, action.payload.value),
  }),
  [SET_SOURCE_PROPS]: (state, action) => ({
    ...state,
    source: action.payload.source,
  }),
  [SET_LOADING_PROPS]: (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading,
  }),
  [SET_VALUE_PROPS]: (state, action) => ({
    ...state,
    value: action.payload.value || state.value,
  }),
  [INITIALIZE_SEARCH]: (state, action) => action.payload,
  [REINITIALIZE_SEARCH]: (state, action) => ({
    ...state,
    isLoading: false,
    value: '',
    results: [],
  }),
}

const initialState = {
  isLoading: false,
  results: [],
  value: '',
}

export default function searchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
