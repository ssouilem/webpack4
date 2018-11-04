import React from 'react'
import _ from 'lodash'
import { Header, Segment, Grid, Image, Table, Form, List, Dropdown, Radio, Input, Sticky } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddBordereauDetail from 'COMPONENTS/Bordereau/AddBordereauDetail'
import LineBordereauDetail from 'COMPONENTS/Bordereau/LineBordereauDetail'
import SegmentAddress from 'COMPONENTS/Client/SegmentAddress'
import { actions as produitsActions } from 'ACTIONS/produits'
import { actions as clientsActions } from 'ACTIONS/clients'
import styles from './NewBordereau.less'

class NewBordereau extends React.Component {
  state = {
    totalTVA: 0,
    totalAmountHT: 0,
    totalAmountTTC: 0,
    bordereauType: 'DELIVERY',
    id: '',
    invoices: [],
    bordereauDetails: [],
    bordereauDetail: {
      id: '',
      reference: '',
      description: '',
      qte: 1,
      reduction: '',
      unit: '',
      total: 0,
    },
  }

  componentWillMount () {
    this.resetComponent()
    this.props.fetchClients()
  }

  // Sticky
  handleContextRef = contextRef => this.setState({ contextRef })
  // Search FUNC
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
  handleResultSelect = (e, { result }) => {
    this.setState({result: result})
    var bordereauDetail = this.state.bordereauDetail
    bordereauDetail.description = result.description
    bordereauDetail.reference = result.reference
    bordereauDetail.reduction = this.props.client.reduction
    bordereauDetail.unit = result.unit
    let totalHT = (parseInt(bordereauDetail.qte) * parseFloat(result.price)) * ((100 - parseInt(bordereauDetail.reduction)) / 100)
    console.log('Total : ', parseFloat(bordereauDetail.qte), parseFloat(result.price), parseInt(bordereauDetail.reduction), totalHT)
    bordereauDetail.total = totalHT.toFixed(3)
    this.setState({ value: result.reference, bordereauDetail })
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.reference)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.produits.produits, isMatch),
      })
    }, 300)
  }
  // ADD BORD DEATIL
  _addLinebordereauDetail = (event) => {
    let idLocal = 'ID_' + (new Date()).getTime()
    this.setState({'id': idLocal})
    this.state.bordereauDetail.id = idLocal
    // this.setState(prevState => ({
    //   invoices: [...prevState.invoices, invoice]
    // }))
    let totalHT = parseFloat(this.state.totalAmountHT) + parseFloat(this.state.bordereauDetail.total)
    let totalTVA = totalHT * 0.2
    let totalTTC = totalHT + totalTVA

    // Calcule somme
    this.setState({ totalAmountHT: parseFloat(totalHT), totalAmountTTC: parseFloat(totalTTC), totalTVA: parseFloat(totalTVA) })

    // reinit form
    const bordereauDetail = {
      id: '',
      reference: '',
      description: '',
      qte: 1,
      reduction: '',
      unit: '',
      total: 0,
    }
    this.setState({ bordereauDetails: [...this.state.bordereauDetails, this.state.bordereauDetail], bordereauDetail: bordereauDetail })
    document.getElementById('myform').reset()
  }

  _deleteLinebordereauDetail = (event, {name}) => {
    console.log('id', name)
    _.remove(this.state.bordereauDetails, function (currentObject) { return currentObject.id === name })

    // @TODO mettre a jour les Montants
    this.setState({ bordereauDetails: this.state.bordereauDetails })
  }
  _handleChangeInput = (event) => {
    const { name, value } = event.target
    if (this.state.id === '') {
      let initId = 'ID_' + (new Date()).getTime()
      this.state.id = initId
      this.setState({'id': initId})
    }
    console.log(' ID : ', this.state.id, value)
    var bordereauDetail = this.state.bordereauDetail
    // this.setState({[name]: value})
    switch (name) {
      case 'reference': {
        bordereauDetail.reference = value
        break
      }
      case 'description': {
        bordereauDetail.description = value
        break
      }
      case 'qte': {
        bordereauDetail.qte = value
        let total = (parseInt(bordereauDetail.qte) * this.state.result.price) * ((100 - bordereauDetail.reduction) / 100)
        bordereauDetail.total = total.toFixed(3)
        break
      }
      case 'reduction': {
        bordereauDetail.reduction = value
        let total = (parseInt(bordereauDetail.qte) * this.state.result.price) * ((100 - bordereauDetail.reduction) / 100)
        bordereauDetail.total = total.toFixed(3)
        break
      }
      case 'unit': {
        bordereauDetail.unit = value
        break
      }
      case 'total': {
        bordereauDetail.total = value
        break
      }
      default: {
        // statements;
        break
      }
    }
    this.setState({bordereauDetail})
    // // var foundBr = bordereauDetails.find(o => o.id === this.state.id)
    // var objIndex = bordereauDetails.findIndex(obj => obj.id === this.state.id)
    // console.log(JSON.stringify(bordereauDetails), objIndex)
    // if (!objIndex) {
    //   console.log('Before update: ', JSON.stringify(bordereauDetails[objIndex]))
    // this.props.setWizardVarsProps({ key: name, value })
  }
  // UPDATE BORD TYPE
  _handleCheckedChange = (e, { value }) => this.setState({ bordereauType: value })
  // SELECT CLIENT
  _handleSelectChange = (e, { name, value }) => {
    this.props.handleChangeClient({ [name]: value })
  }

_handleChange = (e, { name, value }) => this.props.setItemProps({ [name]: value })

submitMeetingForm = () => {
  let error = false
  let errors = this.state.errors

  if (this.state.firstName === '') {
    errors.firstNameError = true
    error = true
  } else {
    errors.firstNameError = false
    error = false
  }
  if (this.state.LastName === '') {
    errors.lastNameError = true
    error = true
  } else {
    errors.lastNameError = false
    error = false
  }
  if (this.state.email === '') {
    errors.emailError = true
    error = true
  } else {
    errors.emailError = false
    error = false
  }
  if (this.state.location === '') {
    errors.locationError = true
    error = true
  } else {
    errors.locationError = false
    error = false
  }
  if (this.state.phoneNumber === '') {
    errors.phoneNumberError = true
    error = true
  } else {
    errors.phoneNumberError = false
    error = false
  }
  if (this.state.address1 === '') {
    errors.address1Error = true
    error = true
  } else {
    errors.address1Error = false
    error = false
  }
  if (this.state.address2 === '') {
    errors.address2Error = true
    error = true
  } else {
    errors.address2Error = false
    error = false
  }
  if (this.state.zipCode === '') {
    errors.zipCodeError = true
    error = true
  } else {
    errors.zipCodeError = false
    error = false
  }
  if (this.state.city === '') {
    errors.cityError = true
    error = true
  } else {
    errors.cityError = false
    error = false
  }

  if (error) {
    errors.formError = true
    return
  } else {
    errors.formError = false
  }
  this.setState({ errors })
}

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
                  value={ this.props.selectedClient }
                  options={ this.props.clients && this.props.clients.data.map(client => ({
                    key: client.id,
                    value: client.id,
                    text: client.text,
                  })) }
                  onChange={ this._handleSelectChange }
                />
              </Grid.Column>
              <Grid.Column width={ 8 } textAlign='left' >
                <Header as='h5'>Type de bordereau</Header>
                <Form.Field>
                  <Radio toggle
                    label='Bordereau de livraison'
                    name='radioGroup'
                    value='DELIVERY'
                    checked={ this.state.bordereauType === 'DELIVERY' }
                    onChange={ this._handleCheckedChange }
                  />
                </Form.Field>
                <Form.Field>
                  <Radio toggle
                    label='Bordereau de retour'
                    name='radioGroup'
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
                    handleOpen: this.props.handleOpen,
                    modalOpen: this.props.modalOpen,
                    handleClose: this.props.handleClose,
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
                      active={ this.props.selectedClient === '' }
                      produits={ this.props.produits }
                      bordereauDetailForm={ this.state.bordereauDetail }
                      id={ this.state.id } onClick={ this._addLinebordereauDetail }
                      isLoading={ this.state.isLoading }
                      handleResultSelect={ this.handleResultSelect }
                      handleSearchChange={ this.handleSearchChange }
                      results={ this.state.results }
                      value={ this.state.value }
                      onChange={ this._handleChangeInput } />
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
            <Grid celled >
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
  handleOpen: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
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
  produits: PropTypes.object,
  setItemProps: PropTypes.func,
}

const mapStateToProps = state => ({
  produits: state.produits,
  clients: state.clients,
  client: state.clients.client,
  selectedClient: state.clients.selectedClient,
  modalOpen: state.modalOpen,
  complete: state.complete,
})

const mapDispatchToProps = dispatch => ({
  fetchProduits: produitsActions.fetchProduits(dispatch),
  setItemProps: clientsActions.setItemProps(dispatch),
  handleClose: clientsActions.handleClose(dispatch),
  handleOpen: clientsActions.handleOpen(dispatch),
  fetchClients: clientsActions.fetchClients(dispatch),
  reinitializeItem: clientsActions.reinitializeItem(dispatch),
  handleChangeClient: clientsActions.handleChangeClient(dispatch),
  dispatch,
})

export { NewBordereau }
export default connect(mapStateToProps, mapDispatchToProps)(NewBordereau)
