import React from 'react'
import { Button, Modal, Form, Input, Dimmer, Loader, Message, Icon } from 'semantic-ui-react'
import { ProductQuality, ProductUnit } from 'COMPONENTS/Utils/Utils'

class AddProduct extends React.Component {
  state = { tva: 20, modalOpen: false }

  // controle Modal open and close button
  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  // handle change form
  _handleInputChange = (e, { name, value }) => this.setState({ [name]: value })

  // submit form && call API
  _handleSubmit = () => {
    this.setState({ submit: { reference: this.state.reference, unit: this.state.unit }, sending: true })
    this.props.submitForm({
      name: this.state.name,
      reference: this.state.reference,
      description: this.state.description,
      unit: this.state.unit,
      quality: this.state.quality,
      price: this.state.price,
      tva: this.state.tva,
    })
  }

  _handleChange = (e, { name, value }) => {
    this.setState({ paymentsMode: [] })
    for (var index = 0; index < value; index++) {
      this.setState(prevState => ({
        paymentsMode: [...prevState.paymentsMode, { key: index, type: this.state.paymentType }],
      }))
    }
  }
  render = ({ paymentNumber, disabled } = this.state, { children, payment, onChange, validateTransactionMode } = this.props) => (
    <Modal
      open={ this.state.modalOpen }
      onClose={ this.handleClose }
      size='small'
      trigger={ children !== undefined ? children : <Button fluid icon='add' content='Ajouter un produit' floated='right' onClick={ this.handleOpen } /> } centered={ false } closeIcon >
      <Modal.Header>Ajouter un nouveau article</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <div>
            <Form>
              <Form.Input required name='reference'
                onChange={ this._handleInputChange }
                label='RÉFÉRENCE' placeholder='reference...'
              />
              <Form.Group widths='equal'>
                <Form.Input required name='name'
                  onChange={ this._handleInputChange }
                  label='NOM' placeholder='nom...'
                />
                <Form.Field>
                  <Form.Dropdown label='UNITÉ'
                    onChange={ this._handleInputChange }
                    required fluid search selection
                    name='unit'
                    options={ ProductUnit } />
                </Form.Field>
              </Form.Group>
              <Form.TextArea required name='description'
                onChange={ this._handleInputChange }
                label='DÉSIGNATION' placeholder='Désignation...'
              />
              <Form.Group widths='equal'>
                <Form.Input name='price'
                  onChange={ this._handleInputChange }
                  label='P.A HT' placeholder='Prix H.T...'
                />
                <Form.Field>
                  <label>TVA</label>
                  <Form.Input as={ Input } name='tva'
                    onChange={ this._handleInputChange }
                    label={ { basic: true, content: '%' } }
                    labelPosition='right'
                    placeholder='TVA...'
                    defaultValue={ this.state.tva }
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Dropdown label='QUALITTÉ'
                    onChange={ this._handleInputChange }
                    required fluid search selection
                    name='quality'
                    options={ ProductQuality } />
                </Form.Field>
              </Form.Group>
            </Form>
            { this.props.product && this.props.product.done &&
            <Message attached='bottom' warning>
              <Icon name='warning circle' />
              Attention, votre produit a bien été ajouté à la liste de produits sous la reference "{ this.props.product && this.props.product.done }", voulez vous rajouter d'autres ?
            </Message>
            }
            <Dimmer active={ this.props.product && this.props.product.sending } inverted>
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
