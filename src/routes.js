import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
// import Watch from './components/pages/watch'
import HomePage from 'CONTAINERS/HomePage/HomePage'
import Invoices from './containers/Invoices/Invoices'
import Bordereaux from './containers/Bordereau/Bordereaux'
import Companies from './containers/Customers/Customers'
import Entreprise from './containers/Entreprise/Entreprise'
import Products from './containers/Products/Products'
import Payments from './containers/Payments/Payments'
import SignUp from './containers/Login/SignUp'
// import ProfilePage from 'CONTAINERS/ProfilePage/ProfilePage'
// import App from 'CONTAINERS/App/App'
// import SignInPage from 'CONTAINERS/Authentication/SignInPage'

export default store => (
  <Route path='/' component={ HomePage }>
    <IndexRoute component={ HomePage } />
    { /* <Route path='connexion' component={ SignInPage } /> */ }
    {/* <Route path='myAccount' component={ MyAccount } onEnter={ userActions.tryToReconnect(store) } /> */}
    { /* <Route path='profile' component={ ProfilePage } /> */ }
    <Route exact path='/' component={ HomePage } />
    <Route exact path='/clients' component={ Companies } />
    <Route path='/produits' component={ Products } />
    <Route path='/bordereaux' component={ Bordereaux } />
    <Route path='/factures' component={ Invoices } />
    <Route exact path='/paiements' component={ Payments } />
    <Route exact path='/entreprise' component={ Entreprise } />
    <Route exact path='/login' component={ SignUp } />
    <Redirect from='*' to='/404' />
  </Route>
)
