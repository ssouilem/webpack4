import React from 'react'
import _ from 'lodash'
import { Header, Segment, Grid, Image, Table, Form, List, Dropdown, Radio, Input, Sticky } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddBordereauDetail from 'COMPONENTS/Bordereau/AddBordereauDetail'
import LineBordereauDetail from 'COMPONENTS/Bordereau/LineBordereauDetail'
import SegmentAddress from 'COMPONENTS/Client/SegmentAddress'
import { actions as clientsActions } from 'ACTIONS/clients'
import { actions as productsActions } from 'ACTIONS/produits'

import styles from './NewBordereau.less'

class NewBordereau extends React.Component {
  state = {
    totalTVA: 0,
    totalAmountHT: 0,
    totalAmountTTC: 0,
    bordereauType: 'LIVRAISON',
    id: '',
    invoices: [],
    bordereauDetails: [],
  }

  componentWillMount () {
    if (!this.props.clients.sending && !this.props.clients.data) {
      this.props.fetchCustomers()
    }
    if (!this.props.products.sending && !this.props.products.data) {
      this.props.fetchProducts()
    }
  }

  // Sticky
  handleContextRef = contextRef => this.setState({ contextRef })
  // ADD BORD DEATIL
  _addLinebordereauDetail = props => {
    // add item to list
    var bordereauDetail = { ...props, id: props.productUid }
    this.setState({ bordereauDetails: [...this.state.bordereauDetails, bordereauDetail] })

    // Calcule somme
    let totalHT = parseFloat(this.state.totalAmountHT) + parseFloat(props.total)
    let totalTVA = totalHT * 0.2
    let totalTTC = totalHT + totalTVA
    this.setState({ totalAmountHT: parseFloat(totalHT), totalAmountTTC: parseFloat(totalTTC), totalTVA: parseFloat(totalTVA) })
    this.props.setBordereauDetails({ ...bordereauDetail })
  }
  // DELETE ITEM
  _deleteLinebordereauDetail = (event, {name}) => {
    console.log('id', name)
    _.remove(this.state.bordereauDetails, function (currentObject) { return currentObject.id === name })

    // @TODO mettre a jour les Montants
    this.setState({ bordereauDetails: this.state.bordereauDetails })
  }
  // UPDATE BORD TYPE
  _handleCheckedChange = (e, { value }) => {
    this.setState({ bordereauType: value })
    this.props.setBordereauProps({ type: value })
  }
  // SELECT CLIENT
  _handleChangeCustmer = (e, { name, value }) => {
    this.props.handleChangeClient({ [name]: value })
    this.props.setBordereauProps({ [name]: value })
  }

  _handleSelectChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    this.props.setBordereauProps({ [name]: value })
  }

_handleChange = (e, { name, value }) => this.props.setItemProps({ [name]: value })

  render = () => (
    <Form id='myform'>
      <Grid className='newBordereau' ref={ this.handleContextRef } >
        <Grid.Column width={ 14 }>
          <Grid textAlign='center' >
            <Grid.Row>
              <Grid.Column width={ 8 } textAlign='left'>
                <Header as='h5'>Nom de la societe</Header>
                <Dropdown
                  placeholder='Choisir le nom de la societe'
                  name='selectedClient'
                  selectOnNavigation={ false }
                  clearable
                  fluid
                  search
                  selection
                  value={ this.props.selectedClient && this.props.selectedClient !== '' && this.props.selectedClient }
                  options={ this.props.clients && this.props.clients.data && this.props.clients.data.map(client => ({
                    key: client.uid,
                    value: client.uid,
                    text: client.name,
                  })) }
                  onChange={ this._handleChangeCustmer }
                />
              </Grid.Column>
              <Grid.Column width={ 8 } textAlign='left' >
                <Header as='h5'>Type de bordereau</Header>
                <Form.Field>
                  <Radio toggle
                    label='Bordereau de livraison'
                    name='type'
                    value='LIVRAISON'
                    checked={ this.state.bordereauType === 'LIVRAISON' }
                    onChange={ this._handleCheckedChange }
                  />
                </Form.Field>
                <Form.Field>
                  <Radio toggle
                    label='Bordereau de retour'
                    name='type'
                    value='RETURN'
                    checked={ this.state.bordereauType === 'RETURN' }
                    onChange={ this._handleCheckedChange }
                  />
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row >
              <Grid.Column width={ 3 } >
                <Image size='small' src={ require('STYLES/images/logo3.png') } spaced='left' />
              </Grid.Column>
              <Grid.Column verticalAlign='middle' textAlign='right' width={ 13 }>
                <Input inline label='Facture N ° : ' name='bordereauNumber' onChange={ this._handleSelectChange } fluid placeholder='Numero de bordereau' value={ this.state.bordereauNumber && this.state.bordereauNumber } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ 2 }>
              <Grid.Column textAlign='left'>
                <SegmentAddress
                  icon='building'
                  title='Information du societé.'
                  clients={ {
                    client: { name: 'Direct Plast',
                      address: 'Rue Farhat Hached',
                      city: '4060 KALAA KEBIRA ',
                      contact: {firstName: 'Mohamed Oussama', mail: 'mymail@domaine.com'},
                      siret: 'TN123456789/FS' },
                  } }
                />
              </Grid.Column>
              <Grid.Column textAlign='left' >
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
                      <Table.HeaderCell>Reference</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                      <Table.HeaderCell>Qte</Table.HeaderCell>
                      <Table.HeaderCell>Reduction</Table.HeaderCell>
                      <Table.HeaderCell>Unit</Table.HeaderCell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body >
                    <AddBordereauDetail
                      id={ this.state.id }
                      active={ this.props.selectedClient === '' }
                      bordereauDetailForm={ this.state.bordereauDetail }
                      onClick={ this._addLinebordereauDetail }
                      products={ this.props.products.data }
                    />
                  </Table.Body>
                  <Table.Footer>
                    {this.state.bordereauDetails.map(bordereauDetail => (
                      <LineBordereauDetail
                        line={ bordereauDetail }
                        onClick={ this._deleteLinebordereauDetail } />
                    ))}
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
                      { this.state.totalTVA ? this.state.totalTVA.toFixed(3) : 0 }
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
            <Grid as={ Segment } placeholder>
              <Header as='h5' icon='cog' content='Paramètres' />
              <List relaxed>
                <List.Item>
                  <List.Content>
                    <List.Header>Societe : </List.Header>
                    <List.Description>{ this.props.selectedClient && this.props.selectedClient }</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Type : </List.Header>
                    <List.Description>{ this.state.bordereauType && this.state.bordereauType }</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Numéro : </List.Header>
                    <List.Description>{ this.state.bordereauNumber && this.state.bordereauNumber }</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid>
          </Sticky>
        </Grid.Column>
      </Grid>
    </Form>
  )
}

const updateAddressPropType = PropTypes.shape({
  onChange: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  submitMeetingForm: PropTypes.func.isRequired,
})

SegmentAddress.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clients: PropTypes.object.isRequired,
  onClick: PropTypes.bool,
  updateAddress: updateAddressPropType,
}

NewBordereau.propTypes = {
  products: PropTypes.object,
  setItemProps: PropTypes.func,
}

const mapStateToProps = state => ({
  products: state.produits,
  clients: state.clients,
  client: state.clients.client,
  selectedClient: state.clients.selectedClient,
  complete: state.complete,
})

const mapDispatchToProps = dispatch => ({
  fetchCustomers: clientsActions.fetchCustomers(dispatch),
  createCustomer: clientsActions.createCustomer(dispatch),
  deleteCustomer: clientsActions.deleteCustomer(dispatch),
  setItemProps: clientsActions.setItemProps(dispatch),
  handleChangeClient: clientsActions.handleChangeClient(dispatch),
  fetchProducts: productsActions.fetchProducts(dispatch),
  dispatch,
})

export { NewBordereau }
export default connect(mapStateToProps, mapDispatchToProps)(NewBordereau)
