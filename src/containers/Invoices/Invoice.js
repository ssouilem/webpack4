import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import { DatePicker } from 'antd'
import { Header, Segment, Grid, Table, Form, List, Dropdown, Input, Checkbox, Icon, Sticky } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { DateFormat } from 'COMPONENTS/Utils/Utils'

import SegmentAddress from 'COMPONENTS/Client/SegmentAddress'

class Invoice extends React.Component {
  state = { invoiceNumber: '' }
  handleContextRef = contextRef => this.setState({ contextRef })
  _handleInvoiceChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    this.props.setInvoicesProps({ [name]: value })
  }
  _handleChangeClient = (e, { name, value }) => {
    this.props.handleChangeClient({ [name]: value })
    var client = this.props.clients.data.find(o => o.uid === value)
    console.log('search bordereau client', client)
    // search bordereau
    setTimeout(() => {
      if (value.length < 1) return null
      let re = new RegExp(_.escapeRegExp(client.name), 'i')
      let isMatch = result => re.test(result.customer.name)
      var results = _.filter(this.props.bordereaux.data, isMatch)
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
  _handleOver = (e, { name }) => console.log(' mousse ', e)
  _handleChangeCkecked = (event, {name, checked, amount}) => {
    // console.log('_handleChangeCkecked ', document, name)
    // console.log('form ', document.getElementById('myform').elements)
    const node = document.getElementById('myform').elements
    if (name === 'all') {
      for (let i = 0; i < node.length; i++) {
        console.log('node ', node[i].nodeName, node[i].type)
        if (node[i].nodeName === 'INPUT' && node[i].type === 'checkbox') {
          let nameBox = node[i].name
          this.setState({ [nameBox]: !this.state.allChecked })
        }
      }
      this.setState({ allChecked: !this.state.allChecked })
    } else {
      console.log(checked, !this.state[name])
      this.setState({ [name]: !this.state[name] })
      var returnAmount = this.props.setCheckedInvoice({ id: name, value: checked, amount })
      this.setState({...returnAmount})
    }
  }

render = () => {
  const items = (Array.isArray(this.state.results) && this.state.results.length >= 0) ? this.state.results : this.props.bordereaux.data
  return (
    <Form id='myform'>
      <Grid className='newBordereau' ref={ this.handleContextRef } >
        <Grid.Column width={ 14 }>
          <Grid textAlign='center' >
            <Grid.Row>
              <Grid.Column width={ 8 } textAlign='left'>
                <Header as='h5'>Nom de la societe</Header>
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
              <Grid.Column width={ 8 } textAlign='left' >
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
              <Grid.Column verticalAlign='middle' textAlign='right' width={ 8 }>
                <Input inline label='Facture N ° : ' name='invoiceNumber'
                  onChange={ this._handleInvoiceChange } fluid placeholder='Numéro de facture'
                  value={ this.state.invoiceNumber && this.state.invoiceNumber } />
              </Grid.Column>
              <Grid.Column width={ 8 } textAlign='right' verticalAlign='middle'>
                <Input label='Date : ' icon>
                  <DatePicker size='large'
                    placeholder="Date d'échéance"
                    name='transacDate'
                    onChange={ this.onChangeDate }
                    format={ DateFormat } />
                </Input>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 2 }>
              <Grid.Column textAlign='left'>
                <SegmentAddress
                  icon='building'
                  title='Information du societé.'
                  clients={ {
                    client: { name: 'Direct Plast', address: 'Rue Farhat Hached', city: '4060 KALAA KEBIRA ', contact: {firstName: 'Mohamed Oussama', mail: 'mymail@domaine.com'}, siret: 'TN123456789/FS' },
                  } }
                />
              </Grid.Column>
              <Grid.Column textAlign='left'>
                <SegmentAddress
                  icon='sign-in'
                  title='Information du client.'
                  clients={ this.props.clients }
                  onClick
                  updateAddress={ { onChange: this._handleChange,
                    complete: this.props.complete,
                    submitMeetingForm: this.submitMeetingForm } }
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Segment vertical><strong>Remarque : </strong>Liste de remarque liés au bordereau.</Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Table >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell><Checkbox disabled name='all' onClick={ this._handleChangeCkecked } /></Table.HeaderCell>
                      <Table.HeaderCell>BORDEREAU ID</Table.HeaderCell>
                      <Table.HeaderCell>CLIENT</Table.HeaderCell>
                      <Table.HeaderCell>DATE</Table.HeaderCell>
                      <Table.HeaderCell>ÉCHÉANCE</Table.HeaderCell>
                      <Table.HeaderCell>REMISE</Table.HeaderCell>
                      <Table.HeaderCell>STATUT</Table.HeaderCell>
                      <Table.HeaderCell>TOTAL</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                  </Table.Body>
                  <Table.Footer>
                    {(Array.isArray(items) && items.length >= 1 && items.map(bordereau => (
                      <Table.Row key={ bordereau.uid } name={ bordereau.uid } >
                        <Table.Cell colSpan='8' >
                          <Table >
                            <Table.Body>
                              <Table.Row key={ bordereau.uid } name={ bordereau.uid }>
                                <Table.Cell collapsing>
                                  <Checkbox name={ bordereau.uid } amount={ bordereau.subTotal } onChange={ this._handleChangeCkecked } checked={ bordereau.checked ? bordereau.checked : this.state[bordereau.uid] } />
                                </Table.Cell>
                                <Table.Cell>{ bordereau.number }</Table.Cell>
                                <Table.Cell>{ bordereau.customer && bordereau.customer.name }</Table.Cell>
                                <Table.Cell>{ bordereau.createdDate }</Table.Cell>
                                <Table.Cell>{ bordereau.treatmentDate }</Table.Cell>
                                <Table.Cell>{ !bordereau.invoice && bordereau.invoice }</Table.Cell>
                                <Table.Cell>{ bordereau.statut ? bordereau.statut : 'En attente' }</Table.Cell>
                                <Table.Cell>{ bordereau.subTotal }</Table.Cell>
                              </Table.Row>
                            </Table.Body>
                            <Table.Footer>
                              <Table.Cell colSpan='8' hidden={ !bordereau.checked } >
                                Bordereau Details
                              </Table.Cell>
                            </Table.Footer>
                          </Table >
                        </Table.Cell>
                      </Table.Row>
                    ))) ||
                    <Table.Row key='8'>
                      <Table.Cell colSpan='8' textAlign='center' >
                        <Header icon>
                          <Icon name='search' />
                          Nous n'avons aucun bordereau correspondant à votre client.
                        </Header>
                      </Table.Cell>
                    </Table.Row>
                    }
                  </Table.Footer>
                </Table>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 3 } >
              <Grid.Column floated='right' width={ 6 } >
                <List divided verticalAlign='middle'>
                  <List.Item>
                    <List.Content floated='right'>
                      { this.state.totalAmountHT ? this.state.totalAmountHT.toFixed(3) : 0 }
                    </List.Content>
                    <List.Content><Header as='h5'>Montant HT</Header></List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated='right'>
                      { this.state.totalAmountTVA ? this.state.totalAmountTVA.toFixed(3) : 0 }
                    </List.Content>
                    <List.Content><Header as='h5'>TVA 20%</Header></List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated='right'>
                      { this.state.totalAmountTTC ? this.state.totalAmountTTC.toFixed(3) : 0 }
                    </List.Content>
                    <List.Content><Header as='h5'>Montant TTC</Header></List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Segment vertical><strong>Condition de paiement : </strong></Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Segment vertical>Direct Plast - N° SIREN : 000 0000 000 - N° TVA Intracommunautaire : TN26832754931
                  Rue Farhat Hached 4060 KALAA KEBIRA
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={ 2 }>
          <Sticky context={ this.state.contextRef }>
            <Grid celled >
              <Segment.Group>
                <Segment>MON COMPTE</Segment>
                <Segment>Parametres de facturation</Segment>
                <Segment>Parametres de compte</Segment>
                <Segment>Monnais de paiement</Segment>
              </Segment.Group>
            </Grid>
          </Sticky>
        </Grid.Column>
      </Grid>
    </Form>
  )
}
}

const updateAddressPropType = PropTypes.shape({
  onChange: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  submitMeetingForm: PropTypes.func.isRequired,
})

SegmentAddress.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  customers: PropTypes.object.isRequired,
  onClick: PropTypes.bool,
  updateAddress: updateAddressPropType,
}

export default Invoice
