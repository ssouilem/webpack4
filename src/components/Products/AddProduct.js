import React from 'react'
import { Button, Modal, Form, Input, Dimmer, Loader, Message, Icon } from 'semantic-ui-react'
import { ProductCategory, ProductUnit } from 'COMPONENTS/Utils/Utils'

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
      category: this.state.category,
      price: this.state.price,
      tva: this.state.tva,
    })
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
            <Form>
              <Form.Group widths='equal'>
                <Form.Input required name='reference'
                  onChange={ this._handleInputChange }
                  value={ this.state.reference && this.state.reference }
                  label='RÉFÉRENCE' placeholder='reference...'
                />
                <Form.Field>
                  <Form.Dropdown label='CATÉGORIE'
                    onChange={ this._handleInputChange }
                    required fluid search selection
                    value={ this.state.category && this.state.category }
                    name='category'
                    options={ ProductCategory } />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input required name='name'
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
                    options={ ProductUnit } />
                </Form.Field>
              </Form.Group>
              <Form.TextArea required name='description'
                onChange={ this._handleInputChange }
                value={ this.state.description && this.state.description }
                label='DÉSIGNATION' placeholder='Désignation...'
              />
              <Form.Group widths='equal'>
                <Form.Input name='price'
                  value={ this.state.price && this.state.price }
                  onChange={ this._handleInputChange }
                  label='P.A HT' placeholder='Prix H.T...'
                />
                <Form.Field>
                  <label>TVA</label>
                  <Form.Input as={ Input } name='tva'
                    onChange={ this._handleInputChange }
                    value={ this.state.tva && this.state.tva }
                    label={ { basic: true, content: '%' } }
                    labelPosition='right'
                    placeholder='TVA...'
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
