import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import Watch from './components/pages/watch'
import Home from './components/home/Home'
import HomePage from 'CONTAINERS/HomePage/HomePage'
import DashBoard from './containers/DashBoard/DashBoard'
import Bordereau from './containers/Bordereau/Bordereau'
import Campany from './containers/Campany/Campany'
// import NotFoundPage from 'components/NotFound/NotFoundPage'
// import SignInPage from 'CONTAINERS/Authentication/SignInPage'

export default store => (
  <Route path='/' component={ App }>
    <IndexRoute component={ HomePage } />
    // <Route path='connexion' component={ SignInPage } />
    <Route exact path='/' component={ HomePage } />
    <Route exact path='/contacts' component={ Watch } />
    <Route path='/produits' component={ Bordereau } />
    <Route path='/dashboard' component={ DashBoard } />
    <Route path='/partenaires' component={ Campany } />
    <Route path='report'>
      <Route path='financial' component={ Watch } />
      <Route path='operational' component={ Watch } />
    </Route>
    // <Route path='404' component={ NotFoundPage } />
    <Redirect from='*' to='/404' />
  </Route>
)
