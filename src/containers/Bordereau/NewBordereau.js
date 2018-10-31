import React from 'react'
import _ from 'lodash'
import { Header, Segment, Grid, Image, Table, Form, List, Dropdown, Radio, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AddBordereauDetail from 'COMPONENTS/Bordereau/AddBordereauDetail'
import LineBordereauDetail from 'COMPONENTS/Bordereau/LineBordereauDetail'
import SegmentAddress from 'COMPONENTS/Client/SegmentAddress'
import { actions as produitsActions } from 'ACTIONS/produits'
import styles from './NewBordereau.less'

class NewBordereau extends React.Component {
  state = {
    bordereauType: 'DELIVERY',
    id: '',
    invoices: [],
    bordereauDetails: [],
    bordereauDetail: {
      reference: '',
      description: '',
      qte: 1,
      reduction: '',
      unit: '',
      total: '',
    },
    // Model
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    phoneNumber: '',
    address1: '',
    addess2: '',
    zipCode: '',
    city: '',
    errors: {
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      locationError: false,
      phoneNumber: false,
      formError: false,
      address1Error: false,
      addess2Error: false,
      zipCodeError: false,
      cityError: false,
      errorMessage: 'Please complete all required fields.',
    },
    complete: false,
    modalOpen: false,
  }
  clientsOptions = [
    { key: 'af', value: 'SOUILEM', flag: 'af', text: 'SOUILEM' },
    { key: 'cs', value: 'Comptoir Sahloul', text: 'Comptoir Sahloul' },
  ]
  client = {
    name: 'TEST',
    address: 'rue farhat hached',
    city: 'SOUSSE',
    contact: {firstName: 'Mohamed TODO'},
    siret: 'Numero fiscal',
    mail: 'mymail@domaine.com',
  }

  componentWillMount () {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    var bordereauDetail = this.state.bordereauDetail
    bordereauDetail.description = result.description
    bordereauDetail.reference = result.reference
    bordereauDetail.reduction = '20%'
    bordereauDetail.unit = result.unit
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
  addLineInvoice = (event) => {
    let idLocal = 'ID_' + (new Date()).getTime()
    this.setState({'id': idLocal})
    // this.setState(prevState => ({
    //   invoices: [...prevState.invoices, invoice]
    // }))
    this.setState({ bordereauDetails: [...this.state.bordereauDetails, this.state.bordereauDetail], bordereauDetail: {} })
    document.getElementById('myform').reset()
  }

  _handleChangeInput = (event) => {
    console.log('Variables : _handleChangeInput ', this)
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
        break
      }
      case 'reduction': {
        bordereauDetail.reduction = value
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
  _handleCheckedChange = (e, { value }) => this.setState({ bordereauType: value })
  _handleSelectChange = (e, { name, value }) => this.setState({ [name]: value })
  _updateAddress = () => console.log('lancement de pop')

// Model FUNCTION
_handleClose = () => this.setState({ modalOpen: false })
_handleOpen = () => this.setState({ modalOpen: true })
_handleChange = (e, { name, value }) => this.setState({ [name]: value })

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
      <Grid className='newBordereau' >
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
                  options={ this.clientsOptions }
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
                  client={ { name: 'Direct Plast', address: 'Rue Farhat Hached', city: '4060 KALAA KEBIRA ', contact: {firstName: 'Mohamed Oussama'}, siret: 'TN123456789/FS', mail: 'mymail@domaine.com' } }
                />
              </Grid.Column>
              <Grid.Column textAlign='left'>
                <SegmentAddress
                  icon='sign-in'
                  title='Information du client.'
                  client={ this.client }
                  onClick
                  updateAddress={ { onChange: this._handleChange,
                    handleOpen: this._handleOpen,
                    modalOpen: this.state.modalOpen,
                    handleClose: this._handleClose,
                    complete: this.state.complete,
                    submitMeetingForm: this.submitMeetingForm,
                    errors: this.state.errors } }
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
                  <Table.Body>
                    <AddBordereauDetail
                      produits={ this.props.produits }
                      bordereauDetailForm={ this.state.bordereauDetail }
                      id={ this.state.id } onClick={ this.addLineInvoice }
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
                        onClick={ this.addLineInvoice } />
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
                      5,550
                    </List.Content>
                    <List.Content><Header as='h5'>Montant HT</Header></List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated='right'>
                      5,550
                    </List.Content>
                    <List.Content><Header as='h5'>TVA 20%</Header></List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated='right'>
                      5,550
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
          <Grid celled >
            <List relaxed>
              <List.Item>
                <List.Content>
                  <List.Header>Societe : </List.Header>
                  <List.Description>{ this.state.selectedClient && this.state.selectedClient }</List.Description>
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
  errors: PropTypes.object.isRequired,
})

SegmentAddress.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
  onClick: PropTypes.bool,
  updateAddress: updateAddressPropType,
}

NewBordereau.propTypes = {
  produits: PropTypes.object,
}

const mapStateToProps = state => ({
  produits: state.produits,
})

const mapDispatchToProps = dispatch => ({
  fetchProduits: produitsActions.fetchProduits(dispatch),
  dispatch,
})
export { NewBordereau }
export default connect(mapStateToProps, mapDispatchToProps)(NewBordereau)
