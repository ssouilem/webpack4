import React from 'react'
import { Modal, Button, Image, Dimmer, Loader, Message } from 'semantic-ui-react'
import ItemAddress from 'COMPONENTS/Client/ItemAddress'

class AddCustomer extends React.Component {
  state = {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    locationError: false,
    errorMessage: 'Please complete all required fields.',
    complete: false,
    modalOpen: false,
  }

  // controle Modal open and close button
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

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
      postalCode: this.state.zideCode,
      city: this.state.city,
      phoneNumber: this.state.phoneNumber,
      faxNumber: this.state.phoneNumber, // @TODO Add faxNumber to form
      tvaNumber: this.state.phoneNumber, // @TODO Add tvaNumber to form
    })
  }

  render = ({ children, customer } = this.props) => (
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
        { !(this.props.customer && this.props.customer.done)
          ? <ItemAddress
            address={ customer }
            onChange={ this._handleInputChange }
            disabled={ false }
          />
          : <div className='modal-complete'>
            <Image size='small' centered src={ require('STYLES/images/check-form.png') } />
            <Message info header='Votre client est enregistré' content='Votre client a été ajouté avec succès. Vous pouvez revenir sur la liste de clients.' />
          </div>
        }
        <Dimmer active={ this.props.customer && this.props.customer.sending } inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Modal.Content>
      { !(this.props.customer && this.props.customer.done)
        ? <Modal.Actions>
          <Button color='black' onClick={ this.handleClose }>Fermer</Button>
          <Button positive icon='checkmark'
            labelPosition='right' content='Submit'
            onClick={ this._handleSubmit } />
        </Modal.Actions>
        : <Modal.Actions><Button color='black' onClick={ this.handleClose }>Fermer</Button></Modal.Actions> }
    </Modal>
  )
}
export default AddCustomer
