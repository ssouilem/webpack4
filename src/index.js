// import App from "./App";
import React from 'react'
import ReactDOM from 'react-dom'
// import App from './components/app'
import App from './components/TabletApp'
// import { Router } from 'react-router-dom'
// import { history } from './history'
// import './styles/all.css'

import { BrowserRouter } from 'react-router-dom'

// ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
