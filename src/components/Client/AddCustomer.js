import React from 'react'
import { Modal, Button, Image, Dimmer, Loader, Message } from 'semantic-ui-react'
import ItemAddress from 'COMPONENTS/Client/ItemAddress'

class AddCustomer extends React.Component {
  state = {
    companyName: '',
    siret: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    zipeCode: '',
    city: '',
    contrat: '',
    contactFirstName: '',
    gender: '',
    contactLastName: '',
    contactMail: '',
    contactMobileNumber: '',
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    locationError: false,
    errors: {},
    errorMessage: 'Please complete all required fields.',
    complete: false,
    modalOpen: false,
  }

  // controle Modal open and close button
  handleOpen = () => {
    this.setState({ modalOpen: true })
    var customer = this.props.customer
    if (customer) {
      this.setState({ companyName: customer.name,
        siret: customer.siret,
        email: customer.mail,
        phoneNumber: customer.phoneNumber,
        address1: customer.address,
        address2: customer.additionalAddress,
        zipeCode: customer.postalCode,
        city: customer.city,
        contrat: '@TODO',
        contactFirstName: customer.contact && customer.contact.firstName,
        gender: customer.contact && customer.contact.gender,
        contactLastName: customer.contact && customer.contact.lastName,
        contactMail: customer.contact && customer.contact.email,
        contactMobileNumber: customer.contact && customer.contact.phoneNumber})
    }
  }
  handleClose = () => {
    this.setState({ modalOpen: false })
    if (!this.props.update) this.props.setItemProps({done: ''})
  }

  successCallback = () => {
    this.setState({
      complete: true,
    })
  }
  validateForm = () => {
    var error = false
    var errors = {}
    if (this.state.companyName === '') {
      errors.companyNameError = true
      error = true
    } else {
      errors.companyNameError = false
    }
    if (this.state.siret === '') {
      errors.siretError = true
      error = true
    } else {
      errors.siretError = false
    }
    // if (this.state.email === '') {
    //   errors.emailError = true
    //   error = true
    // } else {
    //   errors.emailError = false
    // }
    if (this.state.phoneNumber === '') {
      errors.phoneNumberError = true
      error = true
    } else {
      errors.phoneNumberError = false
    }
    if (this.state.address1 === '') {
      errors.address1Error = true
      error = true
    } else {
      errors.address1Error = false
    }
    // if (this.state.address2 === '') {
    //   errors.address2Error = true
    //   error = true
    // } else {
    //   errors.address2Error = false
    // }
    if (this.state.zipeCode === '') {
      errors.zipeCodeError = true
      error = true
    } else {
      errors.zipeCodeError = false
    }
    if (this.state.city === '') {
      errors.cityError = true
      error = true
    } else {
      errors.cityError = false
    }
    if (this.state.contactFirstName === '') {
      errors.contactFirstNameError = true
      error = true
    } else {
      errors.contactFirstNameError = false
    }
    if (this.state.gender === '') {
      errors.genderError = true
      error = true
    } else {
      errors.genderError = false
    }
    if (this.state.contactLastName === '') {
      errors.contactLastNameError = true
      error = true
    } else {
      errors.contactLastNameError = false
    }
    // if (this.state.contactMail === '') {
    //   errors.contactMailError = true
    //   error = true
    // } else {
    //   errors.contactMailError = false
    // }
    if (this.state.contactMobileNumber === '') {
      errors.contactMobileNumberError = true
      error = true
    } else {
      errors.contactMobileNumberError = false
    }
    if (error) {
      this.setState({errors, formError: true})
    } else {
      this.setState({formError: false})
    }
    return error
  }
  _handleInputChange = (e, { name, value }) => this.setState({ [name]: value })
  _handleSubmit = () => {
    var error = this.validateForm()
    console.log('return validateForm :', error, this.state.formError)
    if (!error) this.props.submitForm({ ...this.state })
    console.log('submitForm validateForm :')
  }

  render = ({ children, customer, done, sending } = this.props) => (
    <Modal
      open={ this.state.modalOpen }
      onClose={ this.handleClose }
      trigger={ children !== undefined ? <Button
        icon='pencil'
        inverted
        onClick={ this.handleOpen }
        color='blue'
        floated='right' /> : <Button fluid icon='add' content='Ajouter un client' floated='right' onClick={ this.handleOpen } /> }
      centered={ false }
      closeIcon
      size='small'
    >
      <Modal.Header content="Modifier l'adresse de client" />
      <Modal.Content scrolling>
        { !done
          ? <div>
            { this.props.error &&
            <Message info>
              <Message.Header>{ this.props.error.message }</Message.Header>
              { this.props.error && Array.isArray(this.props.error.errors) && this.props.error.errors.map(error => (
                <p>{ error }</p>
              ))}
            </Message>
            }
            <ItemAddress
              onChange={ this._handleInputChange }
              address={ this.state }
              disabled={ false }
            />
          </div>
          : <div className='modal-complete'>
            <Image size='small' centered src={ require('STYLES/images/check-form.png') } />
            { done }
            <Message info header='Votre client est enregistré' content='Votre client a été ajouté avec succès. Vous pouvez revenir sur la liste de clients. ' />
          </div>
        }
        <Dimmer active={ sending } inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Modal.Content>
      { !done
        ? <Modal.Actions>
          <Button color='black' onClick={ this.handleClose }>Fermer</Button>
          <Button positive icon='checkmark'
            labelPosition='right' content='Ajouter'
            onClick={ this._handleSubmit } />
        </Modal.Actions>
        : <Modal.Actions><Button color='black' onClick={ this.handleClose }>Fermer</Button></Modal.Actions> }
    </Modal>
  )
}
export default AddCustomer
