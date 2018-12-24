import React from 'react'
import { connect } from 'react-redux'
import NavBar from './components/TabletApp'
import { Route, Redirect, Router } from 'react-router'
import AuthenticatedRoute from 'CONTAINERS/Root/AuthenticatedRoute'
import HomePage from './containers/HomePage/HomePage'
import Invoices from './containers/Invoices/Invoices'
import Bordereaux from './containers/Bordereau/Bordereaux'
import Companies from './containers/Customers/Customers'
import Entreprise from './containers/Entreprise/Entreprise'
import Products from './containers/Products/Products'
import Payments from './containers/Payments/Payments'
import SignUp from './containers/Login/SignUp'
import AuthStore from './containers/Login/App'
import { actions as userActions } from 'ACTIONS/user'

// function requireAuth (nextState, replaceState) {
//   console.log('--------------------- AUTH ')
//   console.log(cookies.getToken())
//
//   if (cookies.getToken === null) {
//     replaceState({ nextPathname: nextState.location.pathname }, '/login')
//   }
// }

class App extends React.Component {
  render () {
    const { history } = this.props
    return (
      <Router history={ history } >
        <AuthStore refreshToken={ this.props.refreshToken } user={ this.props.user }>
          <Route exact path='/login' component={ SignUp } />
          <NavBar>
            <Route exact path='/' component={ HomePage } />
            <Route path='/clients' component={ Companies } />
            <Route path='/produits' component={ Products } />
            <Route path='/bordereaux' component={ Bordereaux } />
            <Route path='/factures' component={ Invoices } />
            <Route path='/paiements' component={ Payments } />
            <Route path='/entreprise' component={ Entreprise } />
          </NavBar>
        </AuthStore>
        {
          /*
                <NavBar>
              <Route exact path='/' component={ HomePage } onEnter={ requireAuth } />
              <Route path='/login' component={ SignUp } />
              <Route exact path='/clients' component={ Companies } />
              <Route path='/produits' component={ Products } />
              <Route path='/bordereaux' component={ Bordereaux } />
              <Route path='/factures' component={ Invoices } />
              <Route exact path='/paiements' component={ Payments } />
              <Route exact path='/entreprise' component={ Entreprise } />
            </NavBar>
            */

        }
      </Router>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.user.isAuthenticated,
})
const mapDispatchToProps = dispatch => ({
  refreshToken: userActions.refreshToken(dispatch),
  dispatch,
})
export { App }
export default connect(mapStateToProps, mapDispatchToProps)(App)
