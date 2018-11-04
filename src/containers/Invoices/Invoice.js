import React from 'react'
import { Header, Segment, Grid, Image, Table, Form, List, Dropdown, Input, Checkbox, Icon, Sticky } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as clientsActions } from 'ACTIONS/clients'
import { actions as bordereauActions } from 'ACTIONS/bordereauActions'
import SegmentAddress from 'COMPONENTS/Client/SegmentAddress'

class Invoice extends React.Component {
  state = { invoiceNumber: '' }
  componentWillMount () {
    this.props.fetchClients()
    if (this.props.bordereau && (!this.props.bordereau.data ||
      (this.props.bordereau.data && this.props.bordereau.data.length < 1))) {
      this.props.fetchSlips()
    }
  }
  handleContextRef = contextRef => this.setState({ contextRef })
  _handleInvoiceChange = (e, { name, value }) => this.setState({ [name]: value })
  _handleChangeClient = (e, { name, value }) => this.props.handleChangeClient({ [name]: value })
  _handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    this.props.setItemProps({ [name]: value })
  }
  _handleOver = (e, { name }) => console.log(' mousse ', e)
  _handleChangeCkecked = (event, {name, checked}) => {
    console.log('_handleChangeCkecked ', document, name)
    console.log('form ', document.getElementById('myform').elements)
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
      this.setState({ [name]: !this.state[name] })
      this.props.setCheckedItemProps({ id: name, value: !this.state[name] })
    }
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
                placeholder='Choisir un client'
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
                onChange={ this._handleChangeClient }
              />
            </Grid.Column>
            <Grid.Column width={ 8 } textAlign='left' >
            </Grid.Column>
          </Grid.Row>
          <Grid.Row >
            <Grid.Column width={ 3 } >
              <Image size='small' src={ require('STYLES/images/logo3.png') } spaced='left' />
            </Grid.Column>
            <Grid.Column verticalAlign='middle' textAlign='right' width={ 13 }>
              <Input inline label='Facture N ° : ' name='bordereauNumber'
                onChange={ this._handleInvoiceChange } fluid placeholder='Numero de bordereau'
                value={ this.state.invoiceNumber && this.state.invoiceNumber } />
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
                    <Table.HeaderCell><Checkbox name='all' onClick={ this._handleChangeCkecked } /></Table.HeaderCell>
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
                  {(this.props.bordereau && this.props.bordereau.data && this.props.bordereau.data.length > 0 && this.props.bordereau.data.map(bordereau => (
                    <Table.Row key={ bordereau.id } name={ bordereau.id } >
                      <Table.Cell colSpan='8' >
                        <Table >
                          <Table.Body>
                            <Table.Row key={ 'field' + bordereau.id } name={ 'field' + bordereau.id }>
                              <Table.Cell collapsing>
                                <Checkbox name={ bordereau.id } onChange={ this._handleChangeCkecked } checked={ bordereau.checked ? bordereau.checked : this.state[bordereau.id] } />
                              </Table.Cell>
                              <Table.Cell>{ bordereau.number }</Table.Cell>
                              <Table.Cell>{ bordereau.company }</Table.Cell>
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
                  <Table.Row colSpan='8'>
                    <Header icon>
                      <Icon name='search' />
                      Nous n'avons aucun document correspondant à votre requête.
                    </Header>
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
                    { this.props.bordereau && this.props.bordereau.totalAmountHT ? this.props.bordereau.totalAmountHT.toFixed(3) : 0 }
                  </List.Content>
                  <List.Content><Header as='h5'>Montant HT</Header></List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated='right'>
                    { this.props.bordereau && this.props.bordereau.totalAmountTVA ? this.props.bordereau.totalAmountTVA.toFixed(3) : 0 }
                  </List.Content>
                  <List.Content><Header as='h5'>TVA 20%</Header></List.Content>
                </List.Item>
                <List.Item>
                  <List.Content floated='right'>
                    { this.props.bordereau && this.props.bordereau.totalAmountTTC ? this.props.bordereau.totalAmountTTC.toFixed(3) : 0 }
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
const mapStateToProps = state => ({
  clients: state.clients,
  selectedClient: state.clients.selectedClient,
  slips: state.bordereau.data,
  modalOpen: state.modalOpen,
  complete: state.complete,
  bordereau: state.bordereau,
})

const mapDispatchToProps = dispatch => ({
  fetchClients: clientsActions.fetchClients(dispatch),
  fetchSlips: bordereauActions.fetchSlips(dispatch),
  setCheckedItemProps: bordereauActions.setCheckedItemProps(dispatch),
  handleChangeClient: clientsActions.handleChangeClient(dispatch),
  setItemProps: clientsActions.setItemProps(dispatch),
  handleClose: clientsActions.handleClose(dispatch),
  reinitializeItem: clientsActions.reinitializeItem(dispatch),
  dispatch,
})
export { Invoice }
export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
