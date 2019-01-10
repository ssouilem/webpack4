import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import { DatePicker } from 'antd'
import { Grid, Form, Dropdown, Input, Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { DateFormat } from 'COMPONENTS/Utils/Utils'

import SegmentAddress from 'COMPONENTS/Client/SegmentAddress'

class NewInvoice extends React.Component {
  state = { invoiceNumber: '' }
  handleContextRef = contextRef => this.setState({ contextRef })
  _handleInvoiceChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    this.props.setInvoicesProps({ [name]: value })
  }

  _handleChangeCheckBox = (event, { name, checked }) => {
    this.props.setInvoicesProps({ [name]: checked })
  }
  _handleChangeClient = (e, { name, value }) => {
    this.props.handleChangeClient({ [name]: value })
    var client = this.props.clients.data.find(o => o.uid === value)
    console.log('search bordereau client', client)
    var data = !this.props.bordereaux.sending && !this.props.bordereaux.data && Array.isArray(this.props.bordereaux.data) && this.props.bordereaux.data
    // search bordereau
    setTimeout(() => {
      if (value.length < 1) return null
      let re = new RegExp(_.escapeRegExp(client.name), 'i')
      let isMatch = result => re.test(result.customer.name)
      var results = _.filter(data, isMatch)
      console.log('results : ', results)
      this.setState({
        results: results,
      })
    }, 300)
  }
  _handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    this.props.setItemProps({ [name]: value })
  }
  onChangeDate = (value, dateString) => {
    console.log('issueDate', dateString)
    this.props.setInvoicesProps({issueDate: dateString})
  }

render = () => {
  const { checkedComment, checkedOtherExpenses, amountInWords, paymentCondition } = this.props.invoices
  return (
    <Form id='myform'>
      <Grid className='newBordereau' >
        <Grid.Column width={ 16 }>
          <Grid textAlign='left' >
            <Grid.Row>
              <Grid.Column verticalAlign='middle' width={ 3 } textAlign='left' >
                <label>Facture N ° : </label>
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={ 8 } textAlign='left' >
                <Input width={ 16 } fluid name='invoiceNumber' onChange={ this._handleInvoiceChange } placeholder='Numéro de facture' value={ this.props.invoices.invoiceNumber && this.state.invoiceNumber } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle' width={ 3 } textAlign='left' >
                <label>Nom du client : </label>
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={ 8 } textAlign='left'>
                <Dropdown
                  placeholder='Choisir un client'
                  name='selectedClient'
                  selectOnNavigation={ false }
                  clearable
                  fluid
                  search
                  selection
                  value={ this.props.clients.selectedClient && this.props.clients.selectedClient !== '' && this.props.clients.selectedClient }
                  options={ this.props.clients && this.props.clients.data && this.props.clients.data.map(client => ({
                    key: client.uid,
                    value: client.uid,
                    text: client.name,
                  })) }
                  onChange={ this._handleChangeClient }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
            {/*
              <Grid.Column textAlign='left'>
                <SegmentAddress
                  icon='building'
                  title='Information du societé.'
                  clients={ {
                    client: { name: 'Direct Plast', address: 'Rue Farhat Hached', city: '4060 KALAA KEBIRA ', contact: {firstName: 'Mohamed Oussama', mail: 'mymail@domaine.com'}, siret: 'TN123456789/FS' },
                  } }
                />
              </Grid.Column>
              */}
              <Grid.Column textAlign='left' width={ 8 }>
                { !!this.props.clients.selectedClient &&
                  <SegmentAddress
                    icon='sign-in'
                    title='Adresse de facturation'
                    clients={ this.props.clients }
                    onClick
                    updateAddress={ { onChange: this._handleChange,
                      complete: this.props.complete,
                      submitMeetingForm: this.submitMeetingForm } }
                  />
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle' width={ 3 } textAlign='left' >
                <label>Date d'échéance : </label>
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={ 8 } textAlign='left'>
                <DatePicker size='large'
                  placeholder="Date d'échéance"
                  name='issueDate'
                  onChange={ this.onChangeDate }
                  format={ DateFormat } />

              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle' width={ 3 } textAlign='left' >
                <Checkbox toggle label='Remarque :' name='checkedComment' onClick={ this._handleChangeCheckBox } checked={ checkedComment || false } />
              </Grid.Column>
              <Grid.Column textAlign='left' width={ 8 }>
                { checkedComment && <Form.TextArea name='comment'
                  onChange={ this._handleInvoiceChange }
                  value={ this.props.invoices && this.props.invoices.comment }
                  placeholder='Liste de remarque liés au votre facture....' />
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle' width={ 3 } textAlign='left' >
                <Checkbox toggle label='Ajouter un timbre :' name='checkedOtherExpenses' onClick={ this._handleChangeCheckBox } checked={ checkedOtherExpenses || false } />
              </Grid.Column>
              <Grid.Column textAlign='left' width={ 8 }>
                { checkedOtherExpenses && <Input width={ 16 } fluid name='otherExpenses' onChange={ this._handleInvoiceChange }
                  placeholder='Prix de timbre'
                  value={ this.props.invoices.otherExpenses && this.state.otherExpenses } />
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Checkbox toggle label='Somme en toutes lettres' name='amountInWords' onClick={ this._handleChangeCheckBox } checked={ amountInWords || false } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Checkbox toggle label='Les conditions de paiements' name='paymentCondition' onClick={ this._handleChangeCheckBox } checked={ paymentCondition || false } />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    </Form>
  )
}
}

const updateAddressPropType = PropTypes.shape({
  onChange: PropTypes.func.isRequired,
  submitMeetingForm: PropTypes.func.isRequired,
})

NewInvoice.propTypes = {
  setInvoicesProps: PropTypes.func,
  handleChangeClient: PropTypes.func,
  bordereaux: PropTypes.object,
  invoices: PropTypes.object,
  clients: PropTypes.object,
  setItemProps: PropTypes.func,
}

SegmentAddress.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  customers: PropTypes.object.isRequired,
  onClick: PropTypes.bool,
  updateAddress: updateAddressPropType,
}

export default NewInvoice
