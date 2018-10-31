import React from 'react'
import { Header, Segment, Grid, Image, Table, Form, List, Dropdown, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as addressActions } from 'ACTIONS/address'
import { actions as clientsActions } from 'ACTIONS/clients'
import { actions as bordereauActions } from 'ACTIONS/bordereauActions'
import LineBordereauDetail from 'COMPONENTS/Bordereau/LineBordereauDetail'
import SegmentAddress from 'COMPONENTS/Client/SegmentAddress'

class Invoice extends React.Component {
  state = { invoiceNumber: '' }
  componentWillMount () {
    this.props.fetchClients()
    this.props.reinitializeItem()
    this.props.fetchSlips()
  }
  _handleInvoiceChange = (e, { name, value }) => this.setState({ [name]: value })
  _handleChangeClient = (e, { name, value }) => this.props.handleChangeClient({ [name]: value })
  _handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    this.props.setItemProps({ [name]: value })
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
                placeholder='Choisir un client'
                name='selectedClient'
                selectOnNavigation={ false }
                clearable
                fluid
                search
                selection
                value={ this.props.selectedClient }
                options={ this.props.clients.map(client => ({
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
                client={ { name: 'Direct Plast', address: 'Rue Farhat Hached', city: '4060 KALAA KEBIRA ', contact: {firstName: 'Mohamed Oussama'}, siret: 'TN123456789/FS', mail: 'mymail@domaine.com' } }
              />
            </Grid.Column>
            <Grid.Column textAlign='left'>
              <SegmentAddress
                icon='sign-in'
                title='Information du client.'
                client={ this.props.client }
                onClick
                updateAddress={ { onChange: this._handleChange,
                  handleOpen: this.props.handleOpen,
                  modalOpen: this.props.modalOpen,
                  handleClose: this.props.handleClose,
                  complete: this.props.complete,
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

                </Table.Body>
                <Table.Footer>
                  {this.props.slips.map(bordereauDetail => (
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
          <Segment.Group>
            <Segment>MON COMPTE</Segment>
            <Segment>Parametres de facturation</Segment>
            <Segment>Parametres de compte</Segment>
            <Segment>Monnais de paiement</Segment>
          </Segment.Group>
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
const mapStateToProps = state => ({
  clients: state.clients.data,
  client: state.clients.client,
  selectedClient: state.clients.selectedClient,
  slips: state.bordereau.data,
  modalOpen: state.modalOpen,
  complete: state.complete,
})

const mapDispatchToProps = dispatch => ({
  handleClose: addressActions.handleClose(dispatch),
  handleOpen: addressActions.handleOpen(dispatch),
  fetchClients: clientsActions.fetchClients(dispatch),
  fetchSlips: bordereauActions.fetchSlips(dispatch),
  reinitializeItem: addressActions.reinitializeItem(dispatch),
  handleChangeClient: clientsActions.handleChangeClient(dispatch),
  dispatch,
})
export { Invoice }
export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
