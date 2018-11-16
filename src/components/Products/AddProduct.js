import React from 'react'
import { Button, Modal, Form, Input } from 'semantic-ui-react'
import { ProductQuality, ProductUnit } from 'COMPONENTS/Utils/Utils'

class AddProduct extends React.Component {
  state = { tva: 20 }
  _handleInputChange = (e, { name, value }) => this.setState({ [name]: value })
  _handleSubmit = () => {
    this.setState({ submit: { reference: this.state.reference, unit: this.state.unit } })
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
    <Modal size='small' trigger={ children !== undefined ? children : <Button fluid icon='add' content='Ajouter un produit' floated='right' /> } centered={ false } closeIcon >
      <Modal.Header>Ajouter un nouveau article</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
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
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button positive icon='checkmark'
          labelPosition='right' content='Submit'
          onClick={ this._handleSubmit } />
      </Modal.Actions>
    </Modal>
  )
}

export default AddProduct
