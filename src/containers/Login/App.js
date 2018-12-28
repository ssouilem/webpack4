import React, { Component } from 'react'
import { Confirm } from 'semantic-ui-react'
import { default as cookies } from '../../redux/cookieHelper'
import history from '../../history'
// import { actions as userActions } from 'ACTIONS/user'
// import { connect } from 'react-redux'

export default class App extends Component {
  state = { refresh: false }
  handleConfirm = () => {
    this.props.refreshToken()
    this.setState({ refresh: false })
  }
  handleCancel = () => {
    this.setState({ refresh: false })
    cookies.logout()
    history.push('/login')
  }

  componentWillUpdate () {
    console.log('App --------------------- ComponentWillUpdate ', history.location.pathname)
    // if (!cookies.getToken() && history.location.pathname !== '/') {
    //   console.log('Redirect / ', history)
    //   history.push('/')
    // }
  }
  componentWillReceiveProps (nextProps) {
    console.log('App.js : componentWillReceiveProps / ', nextProps)//, this.props.user.maxAge)
    // refresh Token
    console.log('App.js : maxAge / ', nextProps.user.maxAge)
    if (nextProps.user.maxAge > 0 && !nextProps.user.sending) {
      console.log('App.js : Refresh dans ', nextProps.user.maxAge * 1000 - 30000)
      setTimeout(this.refreshToken, nextProps.user.maxAge * 1000 - 30000)
    }
  }

  componentWillMount () {
    console.log('App.js --------------------- AUTH ')
    console.log(cookies.getToken())
    if (cookies.getToken() === undefined || cookies.getToken() === null) {
      console.log('App.js Redirect Login')
      history.push('/login')
      // this.props.dispatch(push('/'))
      // this.props.history.push('/login')
    } else {
      console.log('App Redirect / ', history)
      history.push('/')
    }
  }

  refreshToken = () => {
    console.log('App refreshToken : ', this.props.user.maxAge)
    this.setState({refresh: true})
    // if (!this.props.user.referesh) {
    //   this.props.refreshToken({})
    // }
    clearTimeout()
  }
  render () {
    return (
      <div className='root'>
        { this.state.refresh &&
          <Confirm
            open={ this.state.refresh }
            content='Vous allez être déconnecté dans quelques instants. Souhaitez-vous prolonger votre session ?'
            header='INFORMATION'
            cancelButton='DECONNEXION'
            confirmButton='OUI'
            onCancel={ this.handleCancel }
            onConfirm={ this.handleConfirm }
          />
        }
        { this.props.children }
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   user: state.user,
// })
//
// const mapDispatchToProps = dispatch => ({
//   refreshToken: userActions.refreshToken(dispatch),
//   dispatch,
// })
//
// export { App }
// export default connect(mapStateToProps, mapDispatchToProps)(App)
