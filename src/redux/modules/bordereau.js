import _ from 'lodash'
import axios from 'axios'

const SET_WIZARD_PROPS = 'SET_WIZARD_PROPS'
const SET_WIZARD_DONE = 'SET_WIZARD_DONE'
const INCREMENT_STEP = 'INCREMENT_STEP'
const DECREMENT_STEP = 'DECREMENT_STEP'
const REINITIALIZE_WIZARD = 'REINITIALIZE_WIZARD'
const SET_WIZARD_VARS_PROPS = 'SET_WIZARD_VARS_PROPS'
const SET_DATE_PROPS = 'SET_DATE_PROPS'
const FETCH_SLIPS_SENDING = 'FETCH_SLIPS_SENDING'
const FETCH_SLIPS_SUCCESS = 'FETCH_SLIPS_SUCCESS'
const FETCH_SLIPS_FAILURE = 'FETCH_SLIPS_FAILURE'
const SET_CHECKED_PROPS = 'SET_CHECKED_PROPS'

const FETCH_BORDEREAUX_SENDING = 'FETCH_BORDEREAUX_SENDING'
const FETCH_BORDEREAUX_SUCCESS = 'FETCH_BORDEREAUX_SUCCESS'
const FETCH_BORDEREAUX_FAILURE = 'FETCH_BORDEREAUX_FAILURE'

const CREATE_BORDEREAU_SENDING = 'CREATE_BORDEREAU_SENDING'
const CREATE_BORDEREAU_SUCCESS = 'CREATE_BORDEREAU_SUCCESS'
const CREATE_BORDEREAU_FAILURE = 'CREATE_BORDEREAU_FAILURE'

const DELETE_BORDEREAU_SENDING = 'DELETE_BORDEREAU_SENDING'
const DELETE_BORDEREAU_SUCCESS = 'DELETE_BORDEREAU_SUCCESS'
const DELETE_BORDEREAU_FAILURE = 'DELETE_BORDEREAU_FAILURE'

const fetchBordereaux = dispatch => () =>
  dispatch({
    types: [FETCH_BORDEREAUX_SENDING, FETCH_BORDEREAUX_SUCCESS, FETCH_BORDEREAUX_FAILURE],
    promise: axios.get('/bordereau/').then((res) => {
      console.log(res.data)
      return res
    }),
  })

// const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

const createBordereau = dispatch => bordereauProps => {
  // console.log(JSON.stringify(bordereauProps))
  return dispatch({
    types: [CREATE_BORDEREAU_SENDING, CREATE_BORDEREAU_SUCCESS, CREATE_BORDEREAU_FAILURE],
    promise: axios.post('/bordereau/', {
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

const deleteBordereau = dispatch => uid =>
  dispatch({
    types: [DELETE_BORDEREAU_SENDING, DELETE_BORDEREAU_SUCCESS, DELETE_BORDEREAU_FAILURE],
    promise: axios.delete('/bordereau/' + uid).then((res) => {
      console.log(res.data)
      return uid
    }),
  })

const fetchSlips = dispatch => () => {
  console.log('fetchClips ')
  dispatch({
    type: FETCH_SLIPS_SUCCESS,
    payload: {
      // data: listClips,
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

const setWizardProps = dispatch => state => {
  console.log('handleChange ', state)
  dispatch({
    type: SET_WIZARD_PROPS,
    payload: state,
  })
}

const setCheckedItemProps = dispatch => state => {
  dispatch({
    type: SET_CHECKED_PROPS,
    payload: state,
  })
}

const setWizardDone = dispatch => ({ done }) => {
  dispatch({
    type: SET_WIZARD_DONE,
    payload: { done },
  })
}

const reinitializeWizard = dispatch => () => {
  dispatch({
    type: REINITIALIZE_WIZARD,
    payload: initialState,
  })
}

const setWizardVarsProps = dispatch => state => {
  dispatch({
    type: SET_WIZARD_VARS_PROPS,
    payload: state,
  })
}
const addTab = () => {
  console.log('add ---> ')
}
const setVariables = (VARS, VAR) => {
  VARS.push(VAR)
  return VARS
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

export const actions = {
  setWizardVarsProps,
  setWizardProps,
  setCheckedItemProps,
  reinitializeWizard,
  setWizardDone,
  handleChange,
  fetchSlips,
  fetchBordereaux,
  createBordereau,
  deleteBordereau,
  addTab,
  next,
  prev,
}

const ACTION_HANDLERS = {
  [FETCH_SLIPS_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
    data: action.payload.data || state.data,
  }),
  [FETCH_SLIPS_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    error: undefined,
    // data: listClips.map(data => ({ ...data })),
  }),
  [FETCH_SLIPS_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [SET_DATE_PROPS]: (state, action) => ({
    ...state,
    datedebut: action.payload.datedebut || state.datedebut,
    datefin: action.payload.datefin || state.datefin,
  }),
  [SET_CHECKED_PROPS]: (state, action) => ({
    ...state,
    data: setFieldValue(state, action, 'data'),
  }),
  [SET_WIZARD_PROPS]: (state, action) => ({
    ...state,
    selectedClient: action.payload.selectedClient || state.selectedClient,
    done: action.payload.done || state.done,
    customer: action.payload.customer || state.customer,
    createdAuthor: action.payload.createdAuthor || state.createdAuthor,
    type: action.payload.type || state.type,
    treatmentDate: action.payload.treatmentDate || state.treatmentDate,
    bordereauNumber: action.payload.bordereauNumber || state.bordereauNumber,
    language: action.payload.language || state.language,
    activateCD: action.payload.activateCD || state.activateCD,
    // bordereauDetailList: this.bordereau.bordereauDetails,
    codecategory: 'codecategory' in action.payload ? action.payload.codecategory : state.codecategory,
    unitTests: 'unitTests' in action.payload ? action.payload.unitTests : state.unitTests,
    fonctionnalTests: 'fonctionnalTests' in action.payload ? action.payload.fonctionnalTests : state.fonctionnalTests,
    useLogs: 'useLogs' in action.payload ? action.payload.useLogs : state.useLogs,
    useBackups: 'useBackups' in action.payload ? action.payload.useBackups : state.useBackups,
    // VARS: action.payload.currentStep || state.currentStep,
  }),
  [INCREMENT_STEP]: (state, action) => ({
    ...state,
    currentStep: ++state.currentStep,
  }),
  [DECREMENT_STEP]: (state, action) => ({
    ...state,
    currentStep: --state.currentStep,
  }),
  [SET_WIZARD_VARS_PROPS]: (state, action) => ({
    ...state,
    bordereauDetailList: setVariables(state.bordereauDetailList, action.payload),
    // VARS.push(action.payload.vars,
  }),
  [SET_WIZARD_DONE]: (state, action) => ({
    ...state,
    done: action.payload.done,
  }),
  [REINITIALIZE_WIZARD]: (state, action) => action.payload,
  [FETCH_BORDEREAUX_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [FETCH_BORDEREAUX_SUCCESS]: (state, action) => ({
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
  [FETCH_BORDEREAUX_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
    data: undefined,
  }),
  [CREATE_BORDEREAU_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [CREATE_BORDEREAU_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    data: [...state.data, action.result.data],
    done: action.result.data.uid,
    error: undefined,
  }),
  [CREATE_BORDEREAU_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
  [DELETE_BORDEREAU_SENDING]: (state, action) => ({
    ...state,
    sending: true,
    error: undefined,
  }),
  [DELETE_BORDEREAU_SUCCESS]: (state, action) => ({
    ...state,
    sending: false,
    delete: _.remove(state.data, function (currentObject) { return currentObject.id === action.result }),
    // done: _.remove(state.data, { uid: action.result }),
    // done: action.result.data.uid,
    error: undefined,
  }),
  [DELETE_BORDEREAU_FAILURE]: (state, action) => ({
    ...state,
    sending: false,
    error: action.error,
  }),
}

const initialState = {
  data: undefined,
  totalAmountHT: 0,
  totalAmountTTC: 0,
  totalAmountTVA: 0,
  sending: false,
  error: undefined,
  datedebut: '',
  datefin: '',
  currentStep: -1,
  done: false,
  customer: undefined,
  createdAuthor: '',
  treatmentDate: undefined,
  bordereauNumber: '',
  type: 'LIVRAISON',
  bordereauDetailList: [],
  bordereauDetails: undefined,
}

export default function bordereauReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
