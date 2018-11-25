import React from 'react'
import { Button, Modal, Form, Header, Divider, List, Image, Segment, Message, Label, Grid } from 'semantic-ui-react'
import { DatePicker } from 'antd'
import { DateFormat, BankOptions, ConstPaiementMode } from 'COMPONENTS/Utils/Utils'
import moment from 'moment'
import styles from './Payment.less'

class PaymentMethod extends React.Component {
  componentWillMount () {
    this.resetComponent()
  }
  resetComponent = () => this.setState({ amountTotal: this.props.amount, paymentDetails: [], disabled: false, transacDate: (new Date()).toLocaleDateString() })
  _handlePaymentType = (e, { name, value }) => this.setState({ paymentType: value, paymentsMode: [{ key: 1, type: value }], disabled: false })
  _handlebank = (e, { name, value }) => this.setState({ selectedBank: value })
  // _handleChange = (e, { name, value }) => {
  //   this.setState({ paymentsMode: [] })
  //   for (var index = 0; index < value; index++) {
  //     this.setState(prevState => ({
  //       paymentsMode: [...prevState.paymentsMode, { key: index, type: this.state.paymentType }],
  //     }))
  //   }
  // }

  // handle change form
  _handleInputChange = (e, { name, value }) => this.setState({ [name]: value })
  onChangeDate = (value, dateString) => this.setSate({transacDate: dateString})

  // ADD BORD DEATIL
  _addPaiement = () => {
    // add item to list
    var paymentDetail = { amount: this.state.amount, paymentType: this.state.paymentType, transacNumber: this.state.transacNumber, date: this.state.transacDate }
    this.setState({ paymentType: '',
      amountTotal: parseFloat(this.state.amountTotal) - parseFloat(this.state.amount),
      paymentDetails: [...this.state.paymentDetails, paymentDetail] })

    // Calcule de montant qui reste à payer
    // let totalHT = parseFloat(this.state.totalAmountHT) - parseFloat(props.total)
    // let totalTVA = totalHT * 0.2
    // let totalTTC = totalHT + totalTVA
    // this.setState({ totalAmountHT: parseFloat(totalHT), totalAmountTTC: parseFloat(totalTTC), totalTVA: parseFloat(totalTVA) })
  }

  render = ({ paymentNumber, disabled } = this.state, { payment, onChange, validateTransactionMode } = this.props) => (
    <Modal trigger={ <Button icon='dollar sign' floated='right' /> } size='small' centered={ false } closeIcon >
      <Modal.Header>
        <Grid columns={ 2 }>
          <Grid.Row>
            <Grid.Column>
             Moyens de paiement
            </Grid.Column>
            <Grid.Column>
              <Label as='a' basic color='blue'>
                Montant reste à payer : { this.state.amountTotal } €
              </Label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description className={ styles.modal }>
          <Form>
            <Form.Group>
              <Form.Field width={ 6 }>
                <Form.Dropdown label='Banque client'
                  required fluid search selection
                  name='bank'
                  onChange={ this._handlebank }
                  value={ this.state.selectedBank }
                  placeholder='Banque...'
                  options={ BankOptions } />
              </Form.Field>
              <Form.Input width={ 10 } disabled={ disabled } label='Titulaire du compte bancaire'
                placeholder='Titulaire du compte bancaire...'
                onChange={ this._handleInputChange }
                name='compteName' />
            </Form.Group>
            <div>
              <Divider hidden />
              <Header dividing as='h4'>Paiement</Header>
              <Form.Field width={ 10 }>
                <label>Choisir un mode de paiement : </label>
                <Label name='paymentType' value={ ConstPaiementMode.CHECK } as='a' onClick={ this._handlePaymentType } image>
                  <img src={ require('STYLES/images/check.png') } />
                  Par chèque
                </Label>
                <Label name='paymentType' value={ ConstPaiementMode.CASH } as='a' onClick={ this._handlePaymentType } image>
                  <img src={ require('STYLES/images/cash.png') } />
                  En especes
                </Label>
                <Label name='paymentType' value={ ConstPaiementMode.BANK_CARD } as='a' onClick={ this._handlePaymentType } image>
                  <img src={ require('STYLES/images/bank_card.jpg') } />
                  Par virement
                </Label>
              </Form.Field>
              { this.state.paymentType === ConstPaiementMode.CHECK
                ? <Form.Group>
                  <Form.Field width={ 5 } disabled={ disabled }>
                    <label>
                      Montant de cheque : </label>
                    <Form.Input onChange={ this._handleInputChange } name='amount' />
                  </Form.Field>
                  <Form.Input width={ 5 }disabled={ disabled } label='Numéro de Chéque'
                    placeholder='Numéro de Chéque'
                    onChange={ this._handleInputChange }
                    name='transacNumber' />
                  <Form.Field width={ 5 } disabled={ disabled }>
                    <label>Date de la transaction : </label>
                    <DatePicker
                      name='transacDate'
                      onOk={ this.onOk }
                      onChange={ this.onChangeDate }
                      defaultValue={ moment(this.state.transacDate, DateFormat) } format={ DateFormat } />
                  </Form.Field>
                  <Form.Field width={ 1 } disabled={ disabled }>
                    <label>&nbsp;</label>
                    <Button icon='add'
                      floated='right'
                      onClick={ this._addPaiement } />
                  </Form.Field>
                </Form.Group>
                : this.state.paymentType === ConstPaiementMode.CASH
                  ? <Form.Group>
                    <Form.Field width={ 5 } disabled={ disabled }>
                      <label>Montant : </label>
                      <Form.Input onChange={ this._handleInputChange } name='amount' />
                    </Form.Field>
                    <Form.Field width={ 5 } disabled={ disabled }>
                      <label>Date transaction : </label>
                      <DatePicker
                        name='transacDate'
                        onOk={ this.onOk }
                        onChange={ this.onChangeDate }
                        defaultValue={ moment(this.state.transacDate, DateFormat) } format={ DateFormat } />
                    </Form.Field>
                    <Form.Field width={ 1 } disabled={ disabled }>
                      <label>&nbsp;</label>
                      <Button icon='add'
                        floated='right'
                        onClick={ this._addPaiement } />
                    </Form.Field>
                  </Form.Group>
                  : this.state.paymentType === ConstPaiementMode.BANK_CARD &&
                  <Form.Group>
                    <Form.Field width={ 5 } disabled={ disabled }>
                      <label>
                        Montant de virement : </label>
                      <Form.Input onChange={ this._handleInputChange } name='amount' />
                    </Form.Field>
                    <Form.Input width={ 5 } disabled={ disabled } label='Numéro de transaction :'
                      placeholder='Numéro de transaction'
                      onChange={ this._handleInputChange }
                      name='transacNumber' />
                    <Form.Field width={ 5 } disabled={ disabled }>
                      <label>Date : </label>
                      <DatePicker
                        name='transacDate'
                        onOk={ this.onOk }
                        onChange={ this.onChangeDate }
                        defaultValue={ moment(this.state.transacDate, DateFormat) } format={ DateFormat } />
                    </Form.Field>
                    <Form.Field width={ 1 } disabled={ disabled }>
                      <label>&nbsp;</label>
                      <Button icon='add'
                        floated='right'
                        onClick={ this._addPaiement } />
                    </Form.Field>
                  </Form.Group>
              }
            </div>
            <Header dividing as='h4'>List de Paiements</Header>
            <Segment.Group key='id' size='tiny'>
              { (this.state.paymentDetails && Array.isArray(this.state.paymentDetails) && this.state.paymentDetails.length >= 1) === true
                ? this.state.paymentDetails.map(payment => (
                  payment.paymentType === ConstPaiementMode.CHECK
                    ? <Segment>
                      <List key='id' horizontal>
                        <List.Item>
                          <Image avatar src={ require('STYLES/images/check.png') } />
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Montant</List.Header>
                            { payment.amount && payment.amount }
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Numéro</List.Header>
                            { payment.transacNumber ? payment.transacNumber : 'sans numéro'}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <List.Header>Date de transaction</List.Header>
                            { payment.date && payment.date }
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                    : payment.paymentType === ConstPaiementMode.CASH ?
                      <Segment>
                        <List key='id' horizontal>
                          <List.Item>
                            <Image avatar src={ require('STYLES/images/cash.png') } />
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>Montant</List.Header>
                              { payment.amount && payment.amount }
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>Numéro</List.Header>
                              (x)
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>Date de transaction</List.Header>
                              { payment.date && payment.date }
                            </List.Content>
                          </List.Item>
                        </List>
                      </Segment>
                      : <Segment>
                        <List key='id' horizontal>
                          <List.Item>
                            <Image avatar src={ require('STYLES/images/bank_card.jpg') } />
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>Montant</List.Header>
                              { payment.amount && payment.amount }
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>Numéro</List.Header>
                              { payment.transacNumber ? payment.transacNumber : 'sans numéro'}
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>Date de transaction</List.Header>
                              { payment.date && payment.date }
                            </List.Content>
                          </List.Item>
                        </List>
                      </Segment>
                )) : <Message info>
                  <Message.Header>En attente de paiement(s)</Message.Header>
                  <p>Voulez-vous rajouter un paiement ?</p>
                </Message>
              }
            </Segment.Group>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button positive icon='checkmark'
          labelPosition='right' content='Envoyer'
          onClick={ this._handleChange } />
      </Modal.Actions>
    </Modal>
  )
}

export default PaymentMethod
