// import App from "./App";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'
import {Router} from 'react-router-dom'
import {history} from './history'
import 'semantic-ui-css/semantic.min.css';
import style from "./app.css";
import { BrowserRouter } from 'react-router-dom'

// ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
