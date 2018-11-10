import React from 'react'
import { Button, Modal, Form, Input } from 'semantic-ui-react'
import { BankOptions } from 'COMPONENTS/Utils/Utils'

class AddProduct extends React.Component {
  componentWillMount () {
    this.resetComponent()
  }
  resetComponent = () => this.setState({ paymentType: 1, paymentsMode: [{ key: 1 }], disabled: false })
  _handlePaymentType = (e, { name, value }) => this.setState({ paymentType: value, paymentsMode: [{ key: 1, type: value }], disabled: false })
  _handlebank = (e, { name, value }) => this.setState({ selectedBank: value })
  _handleChange = (e, { name, value }) => {
    this.setState({ paymentsMode: [] })
    for (var index = 0; index < value; index++) {
      this.setState(prevState => ({
        paymentsMode: [...prevState.paymentsMode, { key: index, type: this.state.paymentType }],
      }))
    }
  }
  render = ({ paymentNumber, disabled } = this.state, { children, payment, onChange, validateTransactionMode } = this.props) => (
    <Modal size='small' trigger={ children !== undefined ? children : <Button fluid icon='add' iconPosition='left' content='Ajouter un produit' floated='right' /> } centered={ false } closeIcon >
      <Modal.Header>Ajouter un nouveau article</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input required name='reference'
                label='RÉFÉRENCE' placeholder='reference...'
              />
              <Form.Field>
                <Form.Dropdown label='UNITÉ'
                  required fluid search selection
                  name='unit'
                  options={ BankOptions } />
              </Form.Field>
            </Form.Group>
            <Form.TextArea required name='name'
              label='DÉSIGNATION' placeholder='Désignation...'
            />
            <Form.Group widths='equal'>
              <Form.Input name='price'
                label='P.A HT' placeholder='Prix H.T...'
              />
              <Form.Field>
                <label>TVA</label>
                <Form.Input as={ Input } name='tva'
                  label={ { basic: true, content: '%' } }
                  labelPosition='right'
                  placeholder='TVA...'
                  defaultValue='20'
                />
              </Form.Field>
              <Form.Field>
                <Form.Dropdown label='QUALITTÉ'
                  required fluid search selection
                  name='unit'
                  options={ BankOptions } />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button positive icon='checkmark'
          labelPosition='right' content='Submit'
          onClick={ this._handleChange } />
      </Modal.Actions>
    </Modal>
  )
}

export default AddProduct
