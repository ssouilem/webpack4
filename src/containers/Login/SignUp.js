import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { actions as userActions } from 'ACTIONS/user'
import { connect } from 'react-redux'
import history from '../../history'

class SignUp extends React.Component {
  state = {}
  handleSubmit = (event) => {
    event.preventDefault()
    let { email, password } = event.target
    // this.props.userHasAuthenticated(true)
    // console.log('handleSubmit', event.target.email.value, password.value)
    this.props.signIn({ login: email.value, password: password.value })
    // this.props.dispatch(push('/'))
    // history.push('/')
    // setTimeout(this.refreshToken, 1000)
  }
  componentWillReceiveProps (nextProps) {
    console.log('SignIn : componentWillReceiveProps / ', nextProps)
    if (nextProps.user.isAuthenticated) {
      console.log('Redirect / ', history)
      console.log('maxAge / ', nextProps.user.maxAge)
      // setTimeout(this.refreshToken, nextProps.user.maxAge * 1000 - 60)
      history.push('/')
    } else {
      console.log('clearTimeout ')
      clearTimeout()
    }
  }
  // refreshableFetch = (url, init) => {
  //     clearTimeout(timeout);
  //
  //     timeout = setTimeout(() => refreshableFetch(TOKEN_REFRESH_URL), TOKEN_REFRESH_INTERVAL);
  //
  //     return fetch(url, init);
  // }
  refreshToken = () => {
    console.log('refreshToken : ', this.props.isAuthenticated, this.props.user.maxAge)
    if (this.props.isAuthenticated && this.props.user.maxAge > 600) {
      console.log('console de validation')
      setTimeout(this.refreshToken, 1000)
    } else {
      // return (<Confirm
      //   open={this.state.open}
      //   cancelButton='Never mind'
      //   confirmButton="Let's do it"
      //   onCancel={this.handleCancel}
      //   onConfirm={this.handleConfirm} />)
      console.log('Go referesh token', this.props.user.referesh)
      if (!this.props.user.referesh) {
        this.props.refreshToken({})
      }
      clearTimeout()
    }
  }
  handleLogout = event => {
    this.props.signOut()
    this.userHasAuthenticated(false)
    this.props.history.push('/login')
  }

  handleSubmit2 = event => {
    event.preventDefault()

    try {
      this.props.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (e) {
      alert(e.message)
    }
  }

  render () {
    const {err} = this.props

    return (
      <div className='login-form'>
        <style>{`
       body > div,
       body > div > div,
       body > div > div > div.login-form {
         height: 100%;
       }
     `}</style>
        <Grid textAlign='center' style={ { height: '100%' } } verticalAlign='middle'>
          <Grid.Column style={ { maxWidth: 450 } }>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' /> Log-in to your account
            </Header>
            <Form size='large' onSubmit={ this.handleSubmit } error={ Boolean(err) }>
              <Segment stacked>
                <Form.Input id='email' name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                <Form.Input
                  fluid
                  name='password'
                  id='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                {err &&
                <Message header='Error' content={ err.message } error />
                }
                <Button color='teal' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  err: state.user.error,
  isAuthenticated: state.user.isAuthenticated,
  signIn: state.user.signIn,
})

const mapDispatchToProps = dispatch => ({
  signIn: userActions.signInAction(dispatch),
  userHasAuthenticated: userActions.userHasAuthenticated(dispatch),
  tryToReconnect: userActions.tryToReconnect(dispatch),
  dispatch,
})

export { SignUp }
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
