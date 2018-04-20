// import App from "./App";
import React, { Component } from 'react'
import { render } from 'react-dom'
import NavBar from './components/TabletApp'
import { BrowserRouter, Route } from 'react-router-dom'
import Watch from './components/pages/watch'
import { Home } from './components/pages/home'

class App extends Component {
  render () {
    return (
      <BrowserRouter >
        <NavBar>
          <Route exact path='/' component={ Home } />
          <Route path='/produits' component={ Watch } />
        </NavBar>
      </BrowserRouter>
    )
  }
}

render(<App />, document.getElementById('root'))
