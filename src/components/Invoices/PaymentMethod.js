import React from 'react'
import { Button, Modal, Form, Header, Divider } from 'semantic-ui-react'
import { DatePicker } from 'antd'
import { DateFormat, BankOptions, PaiementMode } from 'COMPONENTS/Utils/Utils'
import moment from 'moment'
import styles from './Payment.less'

class PaymentMethod extends React.Component {
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

  render = ({ paymentNumber, disabled } = this.state, { payment, onChange, validateTransactionMode } = this.props) => (
    <Modal trigger={ <Button icon='dollar sign' floated='right' /> } size='small' centered={ false } closeIcon >
      <Modal.Header>Moyens de paiement</Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description className={ styles.modal }>
          <Form>
            <Form.Field>
              <Form.Dropdown label='Banque'
                required fluid search selection
                name='bank'
                onChange={ this._handlebank }
                value={ this.state.selectedBank }
                placeholder='Choisir la banque...'
                options={ BankOptions } />
            </Form.Field>
            <Form.Input disabled={ disabled } label='Titulaire du compte bancaire'
              placeholder='Titulaire du compte bancaire...'
              name='CompteName' />
            <Form.Input name='amountTotal'
              disabled={ disabled }
              label='Montant total de la transaction' placeholder='Montant...'
              defaultValue={ paymentNumber ? this.state.paymentNumber : '1' }
            />
            { this.state.paymentsMode.map(payment => (
              <div>
                <Divider hidden />
                <Header dividing as='h4'>Premier Paiement</Header>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Form.Dropdown fluid search selection required
                      name='paymentType'
                      label='Mode de paiement'
                      placeholder='Choisir les modes de paiement'
                      onChange={ this._handlePaymentType }
                      value={ payment && payment.paymentType }
                      options={ PaiementMode } />
                  </Form.Field>
                  <Form.Field disabled={ disabled }>
                    <label>
                      Montant de { payment.type } n° { payment.key } : </label>
                    <Form.Input name='montant'
                      value={ payment && payment.lastName } />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Input disabled={ disabled } label='Numéro de Chéque (optionnel)'
                    placeholder='Numéro de Chéque'
                    name='NumCheque' />
                  <Form.Field disabled={ disabled }>
                    <label>Date de la transaction n° { payment.key } : </label>
                    <DatePicker defaultValue={ moment((new Date()).toLocaleString(), DateFormat) } format={ DateFormat } />
                  </Form.Field>
                </Form.Group>
                <Button icon='add'
                  labelPosition='left' content='Paiement'
                  onClick={ validateTransactionMode } />
              </div>
            )) }
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

export default PaymentMethod
