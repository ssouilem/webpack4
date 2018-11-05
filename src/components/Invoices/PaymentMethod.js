import React from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { DatePicker } from 'antd'
import moment from 'moment'
import styles from './Payment.less'

const options = [
  { key: 'ck', text: 'Chèques', value: 'Chèques' },
  { key: 'cv', text: 'Cartes ou Virement', value: 'cartes' },
  { key: 'e', text: 'Espèces', value: 'Espèces' },
]
const bankOptions = [
  { key: 'BIAT', text: 'BIAT', value: 'BIAT' },
  { key: 'ATB', text: 'ATB', value: 'ATB' },
  { key: 'AMENBANK', text: 'AMENBANK', value: 'AMENBANK' },
  { key: 'ALBARAKA', text: 'ALBARAKA', value: 'ALBARAKA' },
  { key: 'ATTIJARI', text: 'ATTIJARI', value: 'ATTIJARI' },
  { key: 'BH', text: 'BH', value: 'BH' },
  { key: 'BTE', text: 'BTE', value: 'BTE' },
  { key: 'BNA', text: 'BNA', value: 'BNA' },
  { key: 'BTS', text: 'BTS', value: 'BTS' },
  { key: 'BTL', text: 'BTL', value: 'BTL' },
  { key: 'NAIB', text: 'NAIB', value: 'NAIB' },
  { key: 'QNB', text: 'QNB', value: 'QNB' },
  { key: 'STB', text: 'STB', value: 'STB' },
  { key: 'UIB', text: 'UIB', value: 'UIB' },
  { key: 'UBCI', text: 'UBCI', value: 'UBCI' },
  { key: 'STUSID', text: ' STUSID', value: 'STUSID' },
]

const dateFormat = 'YYYY/MM/DD'
class PaymentMethod extends React.Component {
  componentWillMount () {
    this.resetComponent()
  }
  resetComponent = () => this.setState({ paymentType: 1, paymentsMode: [{ key: 1 }], disabled: true })
  _handlePaymentType = (e, { name, value }) => this.setState({ paymentType: value, paymentsMode: [{ key: 1, type: value }], disabled: false })
  _handlebank = (e, { name, value }) => this.setState({ selectedBank: value })
  _handleChange = (e, { name, value }) => {
    this.setState({ paymentsMode: [] })
    for (var index = 0; index < value; index++) {
      this.setState(prevState => ({
        paymentsMode: [...prevState.paymentsMode, { key: index, type: this.state.paymentType }],
      }))
    }
    // state.paymentsMode.push(pay)
  }

  render = ({ paymentNumber, disabled } = this.state, { payment, onChange, validateTransactionMode } = this.props) => (
    <Modal trigger={ <Button icon='dollar sign' floated='right' /> } size='small' centered={ false } closeIcon >
      <Modal.Header>Moyens de paiement</Modal.Header>
      <Modal.Content image>
        <Modal.Description className={ styles.modal }>
          <Form>
            <Form.Field>
              <Form.Select name='paymentType'
                required onChange={ this._handlePaymentType }
                options={ options }
                label='Mode de paiement' placeholder='Mode de paiement...'
                value={ payment && payment.paymentType } />
            </Form.Field>
            <Form.Field>
              <Form.Select name='bank'
                disabled={ disabled }
                required onChange={ this._handlebank }
                value={ this.state.selectedBank }
                options={ bankOptions }
                label='Banque' placeholder='Choisir la banque...' />
            </Form.Field>
            <Form.Input name='paymentNumber'
              disabled={ disabled }
              type='number'
              onChange={ this._handleChange }
              label='Nombre de paiement' placeholder='Nombre de paiement...'
              defaultValue={ paymentNumber ? this.state.paymentNumber : '1' }
            />
            { this.state.paymentsMode.map(payment => (
              <Form.Group widths='equal'>
                <Form.Field disabled={ disabled }>
                  <label>
                    Montant de { payment.type } n° { payment.key } : </label>
                  <Form.Input name='montant'
                    value={ payment && payment.lastName } />
                </Form.Field>
                { payment.type === 'Chèques' &&
                <Form.Input disabled={ disabled } label='Numéro de Chéque'
                  placeholder='Numéro de Chéque'
                  name='NumCheque' />
                }
                <Form.Field disabled={ disabled }>
                  <label>Montant de { payment.type } n° { payment.key } : </label>
                  <DatePicker defaultValue={ moment('2015/01/01', dateFormat) } format={ dateFormat } />
                </Form.Field>
              </Form.Group>

            )) }
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button positive icon='checkmark'
          labelPosition='right' content='Submit'
          onClick={ validateTransactionMode } />
      </Modal.Actions>
    </Modal>
  )
}

export default PaymentMethod
