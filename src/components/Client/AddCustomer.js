import React from 'react'
import { Modal, Button, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import ItemAddress from 'COMPONENTS/Client/ItemAddress'

class AddCustomer extends React.Component {
  state = {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    locationError: false,
    errorMessage: 'Please complete all required fields.',
    complete: false,
  }
  successCallback = () => {
    this.setState({
      complete: true,
    })
  }
  submitMeetingForm = () => {
    let error = false
    if (this.state.studentFirstName === '') {
      this.setState({firstNameError: true})
      error = true
    } else {
      this.setState({firstNameError: false})
      error = false
    }
    if (this.state.studentLastName === '') {
      this.setState({lastNameError: true})
      error = true
    } else {
      this.setState({lastNameError: false})
      error = false
    }
    if (this.state.email === '') {
      this.setState({emailError: true})
      error = true
    } else {
      this.setState({emailError: false})
      error = false
    }
    if (this.state.location === '') {
      this.setState({locationError: true})
      error = true
    } else {
      this.setState({locationError: false})
      error = false
    }
    if (error) {
      this.setState({formError: true})
    } else {
      this.setState({formError: false})
    }
  }

  render = ({ onChange, children } = this.props) => (
    <Modal
      trigger={ children !== undefined ? children : <Button basic iconPosition='left' fluid icon='pencil alternate' content='Modifier' floated='right' /> }
      centered={ false }
      size='small'
    >
      <Modal.Header content="Modifier l'adresse de client" />
      <Modal.Content scrolling>
        { !this.state.complete
          ? <ItemAddress
            onChange={ onChange }
            disabled={ false }
          />
          : <div className='modal-complete'>
            <Image src='/images/check.png' />
            <p>Thanks for scheduling a meeting,  We've received your information and we'll be in touch shortly.</p>
          </div>
        }
      </Modal.Content>
      { !this.state.complete
        ? <Modal.Actions>
          <Button color='red'>Close</Button>
          <Button positive icon='checkmark'
            labelPosition='right' content='Submit'
            onClick={ this.successCallback } />
        </Modal.Actions>
        : null }
    </Modal>
  )
}
export default AddCustomer
