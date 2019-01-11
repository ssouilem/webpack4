import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import { DatePicker } from 'antd'
import { Grid, Form, Header, Input, Checkbox, Radio, TextArea } from 'semantic-ui-react'
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
            <Grid.Row width={ 13 }>
              <Header as='h3'>CLIENT ET OPTIONS</Header>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column verticalAlign='middle' width={ 8 } textAlign='left' >
                <Form.Field
                  control={ Input }
                  label='FACTURE N ° '
                  placeholder='Numéro de facture...'
                  name='invoiceNumber'
                  onChange={ this._handleInvoiceChange }
                  value={ this.props.invoices.invoiceNumber && this.state.invoiceNumber }
                />
              </Grid.Column>
              <Grid.Column verticalAlign='middle' width={ 8 } textAlign='left' >
                <Form.Select fluid search label='NOM DU CLIENT :'
                  options={ this.props.clients && this.props.clients.data && this.props.clients.data.map(client => ({
                    key: client.uid,
                    value: client.uid,
                    text: client.name,
                  })) }
                  value={ this.props.clients.selectedClient && this.props.clients.selectedClient !== '' && this.props.clients.selectedClient }
                  name='selectedClient'
                  onChange={ this._handleChangeClient }
                  placeholder='Gender' />
                  {/*
                <Dropdown
                  placeholder='Choisir un client'
                  label='NOM DU CLIENT :'
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
                */}
              </Grid.Column>
            </Grid.Row>
            {/*
            <Grid.Row>
              <Grid.Column width={ 8 } >
                <Form.Field
                  control={ TextArea }
                  rows={ 5 }
                  label='PROJECT DESCRIPTION '
                  placeholder='Description format'
                  name='description'
                  defaultValue='Description .....'
                  onBlur={ this._handleChangeInput }
                />
              </Grid.Column>
              <Grid.Column width={ 8 }>
                <Form.Field
                  control={ Input }
                  label='APPLICATION DOMAIN (URL)'
                  placeholder='example.org'
                  name='APPDOMAIN'
                  onChange={ this._handleChangeVarsInput }
                />
                <Form.Field
                  control={ Input }
                  label='APPLICATION NAME'
                  placeholder='my-app'
                  name='APP'
                  onChange={ this._handleChangeVarsInput }
                />
              </Grid.Column>
            </Grid.Row>


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
            <Grid.Row >
              <Grid.Column textAlign='left' width={ 16 }>
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
              <Grid.Column verticalAlign='middle' width={ 8 } textAlign='left' >
                <Form.Field
                  fluid
                  control={ DatePicker }
                  label="DATE D'ECHEANCE"
                  name='issueDate'
                  format={ DateFormat }
                  onChange={ this.onChangeDate }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={ 8 } textAlign='left' >
                <Form.Group grouped>
                  <p className='wizard-description'>Voulez-vous rajouter des remarques à votre facture ?</p>
                </Form.Group>
                <Form.Group inline>
                  <Form.Field
                    label='Non'
                    control={ Radio }
                    name='checkedComment'
                    value='yes'
                    onChange={ this._handleChangeCheckBox }
                    checked={ checkedComment === false }
                  />
                  <Form.Field
                    label='Oui'
                    control={ Radio }
                    name='checkedComment'
                    value='no'
                    onChange={ this._handleChangeCheckBox }
                    checked={ checkedComment === true }
                  />
                </Form.Group>
                {/*
                <Checkbox toggle label='Remarque :' name='checkedComment' onClick={ this._handleChangeCheckBox } checked={ checkedComment || false } />
                */}
              </Grid.Column>
              <Grid.Column textAlign='left' width={ 8 }>
                { checkedComment && <Form.Field
                  control={ TextArea }
                  rows={ 5 }
                  label='REMARQUES '
                  placeholder='Mes remarques ...'
                  name='comment'
                  value={ this.props.invoices && this.props.invoices.comment }
                  onBlur={ this._handleInvoiceChange }
                />
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={ 8 } textAlign='left' >
                <Form.Group grouped>
                  <p className='wizard-description'>Voulez-vous rajouter des remarques à votre facture ?</p>
                </Form.Group>
                <Form.Group inline>
                  <Form.Field
                    label='Non'
                    control={ Radio }
                    name='checkedOtherExpenses'
                    value='yes'
                    onChange={ this._handleChangeCheckBox }
                    checked={ checkedOtherExpenses === false }
                  />
                  <Form.Field
                    label='Oui'
                    control={ Radio }
                    name='checkedOtherExpenses'
                    value='no'
                    onChange={ this._handleChangeCheckBox }
                    checked={ checkedOtherExpenses === true }
                  />
                </Form.Group>
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
                <Checkbox label='Cocher cette case si voulez-vous rajouter la somme en toutes lettres dans votre facture' name='amountInWords' onClick={ this._handleChangeCheckBox } checked={ amountInWords || false } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Checkbox label='Cocher cette case si voulez-vous rajouter les conditions de paiements' name='paymentCondition' onClick={ this._handleChangeCheckBox } checked={ paymentCondition || false } />
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
