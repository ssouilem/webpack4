import React from 'react'
import { Button, Modal, Form, Input, Dimmer, Loader, Message, Icon } from 'semantic-ui-react'
import { ProductCategory, ProductUnit } from 'COMPONENTS/Utils/Utils'

class AddProduct extends React.Component {
  state = {
    tva: 20,
    modalOpen: false,
    name: '',
    reference: '',
    description: '',
    unit: '',
    category: '',
    price: '',
  }

  // handle change form
  _handleInputChange = (e, { name, value }) => this.setState({ [name]: value })
  // validate product
  validateForm = () => {
    var error = false
    var errors = {}
    if (this.state.reference === '') {
      errors.referenceError = true
      error = true
    } else {
      errors.referenceError = false
    }
    if (this.state.description === '') {
      errors.descriptionError = true
      error = true
    } else {
      errors.descriptionError = false
    }
    if (this.state.unit === '') {
      errors.unitError = true
      error = true
    } else {
      errors.unitError = false
    }
    if (this.state.category === '') {
      errors.categoryError = true
      error = true
    } else {
      errors.categoryError = false
    }
    if (this.state.price === '') {
      errors.priceError = true
      error = true
    } else {
      errors.priceError = false
    }
    if (this.state.tva === '') {
      errors.tvaError = true
      error = true
    } else {
      errors.tvaError = false
    }

    if (error) {
      this.setState({errors, formError: true})
    } else {
      this.setState({formError: false})
    }
    return error
  }
  // submit form && call API
  _handleSubmit = () => {
    // this.setState({ submit: { reference: this.state.reference, unit: this.state.unit }, sending: true })
    var error = this.validateForm()
    console.log('return validateForm :', error, this.state.formError)
    if (!error) {
      // update
      if (this.props.update) {
        this.props.submitForm({
          uid: this.state.uid,
          name: this.state.name,
          reference: this.state.reference,
          description: this.state.description,
          unit: this.state.unit,
          category: this.state.category,
          price: this.state.price,
          tva: this.state.tva,
        })
        // insert new element
      } else {
        this.props.submitForm({
          name: this.state.name,
          reference: this.state.reference,
          description: this.state.description,
          unit: this.state.unit,
          category: this.state.category,
          price: this.state.price,
          tva: this.state.tva,
        })
      }
    }
  }

  // controle Modal open and close button
  handleOpen = () => {
    this.setState({ modalOpen: true })
    var productProps = this.props.product
    if (productProps) {
      this.setState({
        uid: productProps.uid,
        reference: productProps.reference,
        name: productProps.name,
        description: productProps.description,
        unit: productProps.unit,
        category: productProps.category,
        price: productProps.price,
        tva: productProps.tva,
      })
    }
  }
  handleClose = () => {
    this.setState({ modalOpen: false })
    if (!this.props.update) this.props.setItemProps({done: ''})
  }

  render = ({ disabled } = this.state, { done, sending, children, onChange } = this.props) => (
    <Modal
      open={ this.state.modalOpen }
      onClose={ this.handleClose }
      size='small'
      trigger={ children !== undefined ? <Button primary
        onClick={ this.handleOpen }
        icon='pencil'
        inverted
        floated='right' /> : <Button fluid icon='add' content='Ajouter un produit' floated='right' onClick={ this.handleOpen } /> } centered={ false } closeIcon >
      <Modal.Header>Ajouter un nouveau article</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <div>
            { this.props.error &&
            <Message error>
              <Message.Header>{ this.props.error.message }</Message.Header>
              <Message.List>
                { this.props.error && Array.isArray(this.props.error.errors) && this.props.error.errors.map(error => (
                  <Message.Item>{ error && error.code }</Message.Item>
                ))}
              </Message.List>
            </Message>
            }
            <Form error={ this.state.formError }>
              <Form.Group widths='equal'>
                <Form.Input required name='reference'
                  onChange={ this._handleInputChange }
                  value={ this.state.reference && this.state.reference }
                  label='RÉFÉRENCE' placeholder='reference...'
                  error={ this.state.errors && this.state.errors.referenceError }
                />
                <Form.Field>
                  <Form.Dropdown label='CATÉGORIE'
                    onChange={ this._handleInputChange }
                    required fluid search selection
                    value={ this.state.category && this.state.category }
                    name='category'
                    error={ this.state.errors && this.state.errors.categoryError }
                    options={ ProductCategory } />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input name='name'
                  onChange={ this._handleInputChange }
                  value={ this.state.name && this.state.name }
                  label='NOM' placeholder='nom...'
                />
                <Form.Field>
                  <Form.Dropdown label='UNITÉ'
                    onChange={ this._handleInputChange }
                    value={ this.state.unit && this.state.unit }
                    required fluid search selection
                    name='unit'
                    error={ this.state.errors && this.state.errors.unitError }
                    options={ ProductUnit } />
                </Form.Field>
              </Form.Group>
              <Form.TextArea required name='description'
                onChange={ this._handleInputChange }
                value={ this.state.description && this.state.description }
                label='DÉSIGNATION' placeholder='Désignation...'
                error={ this.state.errors && this.state.errors.descriptionError }
              />
              <Form.Group widths='equal'>
                <Form.Input name='price'
                  value={ this.state.price && this.state.price }
                  onChange={ this._handleInputChange }
                  label='P.A HT' placeholder='Prix H.T...'
                  error={ this.state.errors && this.state.errors.priceError }
                />
                <Form.Field>
                  <label>TVA</label>
                  <Form.Input required as={ Input } name='tva'
                    onChange={ this._handleInputChange }
                    value={ this.state.tva && this.state.tva }
                    label={ { basic: true, content: '%' } }
                    labelPosition='right'
                    placeholder='TVA...'
                    error={ this.state.errors && this.state.errors.tvaError }
                    defaultValue={ this.state.tva }
                  />
                </Form.Field>
              </Form.Group>
            </Form>
            { done &&
            <Message attached='bottom' warning>
              <Icon name='warning circle' />
              Attention, votre produit a bien été ajouté à la liste de produits sous la reference " { done } ", voulez vous rajouter d'autres ?
            </Message>
            }
            <Dimmer active={ sending } inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={ this.handleClose }>
            Fermer
        </Button>
        <Button positive icon='checkmark'
          labelPosition='right' content='Ajouter'
          onClick={ this._handleSubmit } />
      </Modal.Actions>
    </Modal>
  )
}

export default AddProduct
