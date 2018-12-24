import React, { Component } from 'react'
// import { Redirect } from 'react-router-dom'
import { Route, Redirect } from 'react-router'

class AuthenticatedRoute extends Component {
  render () {
    const {isAutenticated, ...route} = this.props

    if (isAutenticated) {
      return <Route { ...route } />
    } else {
      return <Redirect to={ {pathname: '/login', state: {from: this.props.location}} } />
    }
  }
}

export default AuthenticatedRoute
