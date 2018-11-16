import React from 'react'
import { Modal, Button, Image } from 'semantic-ui-react'
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
  _handleInputChange = (e, { name, value }) => this.setState({ [name]: value })
  _handleSubmit = () => {
    this.props.submitForm({
      name: this.state.CompanyName,
      mail: this.state.email,
      address: this.state.address1,
      additionalAddress: this.state.address2,
      zideCode: this.state.zideCode,
      city: this.state.city,
      phoneNumber: this.state.phoneNumber,
      faxNumber: this.state.phoneNumber, // @TODO Add faxNumber to form
      tvaNumber: this.state.phoneNumber, // @TODO Add tvaNumber to form
    })
  }

  render = ({ children } = this.props) => (
    <Modal
      trigger={ children !== undefined ? children : <Button fluid icon='add' content='Ajouter un client' floated='right' /> }
      centered={ false }
      closeIcon
      size='small'
    >
      <Modal.Header content="Modifier l'adresse de client" />
      <Modal.Content scrolling>
        { !this.state.complete
          ? <ItemAddress
            onChange={ this._handleInputChange }
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
            onClick={ this._handleSubmit } />
        </Modal.Actions>
        : null }
    </Modal>
  )
}
export default AddCustomer
