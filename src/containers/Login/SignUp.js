import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import { actions as userActions } from 'ACTIONS/user'
import { connect } from 'react-redux'

class SignUp extends React.Component {
    handleSubmit = (e, {formData}) => {
      this.props.signUp(formData)
      if (this.props.isAuthenticated) {
        // Redirect to the home page if the user is authenticated
        this.props.router.push('/')
      }
    }

    handleLogout = async event => {
      await this.props.signOut()
      this.userHasAuthenticated(false)
      this.props.history.push('/login')
    }

    handleSubmit2 = async event => {
      event.preventDefault()

      try {
        await this.props.signIn(this.state.email, this.state.password)
        this.props.userHasAuthenticated(true)
        this.props.history.push('/')
      } catch (e) {
        alert(e.message)
      }
    }

    render () {
      const {err} = this.props

      return (
        <Form onSubmit={ this.handleSubmit } error={ Boolean(err) }>
          <Form.Input label='Email' name='email' type='text' />
          <Form.Input label='Password' name='password' type='password' />
          <Form.Input label='Confirm Password' name='confirmPassword' type='password' />

          {err &&
          <Message header='Error' content={ err.message } error />
          }

          <Button size='huge' type='submit' primary>Sign Up</Button>
        </Form>
      )
    }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: this.state.user.isAuthenticated,
  signIn: state.user.signIn,
})

const mapDispatchToProps = dispatch => ({
  signIn: userActions.signIn(dispatch),
  tryToReconnect: userActions.tryToReconnect(dispatch),
  dispatch,
})

export { SignUp }
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
