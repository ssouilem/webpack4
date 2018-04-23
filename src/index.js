// import App from "./App";
import React, { Component } from 'react'
import { render } from 'react-dom'
import NavBar from './components/TabletApp'
import { BrowserRouter, Route } from 'react-router-dom'
import Watch from './components/pages/watch'
import Home from './components/home/Home'

class App extends Component {
  render () {
    return (
      <BrowserRouter >
        <NavBar>
          <Route exact path='/' component={ Home } />
          <Route exact path='/contacts' component={ Watch } />
          <Route path='/produits' component={ Home } />
        </NavBar>
      </BrowserRouter>
    )
  }
}

render(<App />, document.getElementById('root'))
