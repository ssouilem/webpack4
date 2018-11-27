import React from 'react'
import { connect } from 'react-redux'
import { Header, Grid, Segment, Breadcrumb, Sticky, Dimmer, Image } from 'semantic-ui-react'
// import { FormattedMessage } from 'react-intl'
import TableInternal from 'COMPONENTS/Common/TableInternal'
import AddCustomer from 'COMPONENTS/Client/AddCustomer'
import { actions as customersActions } from 'ACTIONS/clients'
import { TableType } from 'COMPONENTS/Utils/Utils'
// import { push } from 'react-router-redux'
import styles from './Companies.less'

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'registration', content: 'Clients', link: true },
]

class Campanies extends React.Component {
  state = {}
  componentWillMount () {
    if (!this.props.clients.sending && !this.props.clients.data) {
      this.props.fetchCustomers()
    }
  }

  setActivePage = (activePage) => this.setState({ activePage: activePage })
  // Sticky
  handleContextRef = contextRef => this.setState({ contextRef })

  _handleSubmit = propsState => {
    // creation customer
    this.props.createCustomer({
      name: propsState.companyName,
      mail: propsState.email,
      address: propsState.address1,
      additionalAddress: propsState.address2,
      postalCode: propsState.zideCode,
      city: propsState.city,
      phoneNumber: propsState.phoneNumber,
      faxNumber: propsState.phoneNumber, // @TODO Add faxNumber to form
      siret: propsState.siret,
    })
    console.log("creation customer")
    // add contact
    setTimeout(() => {
      console.log("add contact")
      this.props.addContact({
        customer: this.props.clients.done,
        email: propsState.contactMail,
        gender: propsState.gender,
        firstName: propsState.contactFirstName,
        lastName: propsState.contactLastName,
        phoneNumber: propsState.contactMobileNumber,
      })
    }, 360)
  }

  render = ({ contextRef } = this.state) => (
    <div ref={ this.handleContextRef }>
      <Grid >
        <Grid.Column width={ 1 } >
        </Grid.Column>
        <Grid.Column width={ 15 }>
          <Grid >
            <Grid.Row>
              <Grid.Column width={ 12 }>
                <Breadcrumb divider=' > ' sections={ sections } />
              </Grid.Column>
              <Grid.Column width={ 4 } >
                <AddCustomer
                  sending={ (this.props.clients && Array.isArray(this.props.clients.data) && this.props.clients.sending) }
                  done={ (this.props.clients && Array.isArray(this.props.clients.data) && this.props.clients.done) }
                  setItemProps={ this.props.setItemProps }
                  submitForm={ this._handleSubmit } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                { !this.props.clients.sending && (this.props.clients && Array.isArray(this.props.clients.data) && this.props.clients.data.length >= 1) === true
                  ? <TableInternal
                    items={ this.props.clients.data && this.props.clients.data }
                    activePage={ this.state.activePage }
                    setActivePage={ this.setActivePage }
                    onClick={ (action) => console.log('view or edit', action) }
                    tableType={ TableType.SHOW_CUSTOMERS }
                    updateItem={ this.props.createCustomer }
                    deleteItem={ this.props.deleteCustomer } />
                  : <Dimmer active inverted>
                    <Image size='small' centered src={ require('STYLES/images/preload_waiting.gif') } />
                    Chargement en cours!
                  </Dimmer>}
              </Grid.Column>
              <Grid.Column width={ 4 }>
                <Sticky context={ contextRef } >
                  <Grid as={ Segment } placeholder>
                    <Header as='h5' icon='cog' content='Paramètres' />
                    <Segment.Group>
                      <Segment>MON COMPTE</Segment>
                      <Segment>> Parametres de facturation</Segment>
                      <Segment>Parametres de compte</Segment>
                      <Segment>Monnais de paiement</Segment>
                    </Segment.Group>
                  </Grid>
                </Sticky>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    </div>
  )
}

Campanies.propTypes = {}

const mapStateToProps = state => ({
  clients: state.clients,
  isLoading: state.isLoading,
  value: state.value,
  results: state.results,
})

const mapDispatchToProps = dispatch => ({
  onClick: () => { console.log('onClick ++++ ') },
  fetchCustomers: customersActions.fetchCustomers(dispatch),
  createCustomer: customersActions.createCustomer(dispatch),
  addContact: customersActions.addContact(dispatch),
  deleteCustomer: customersActions.deleteCustomer(dispatch),
  setItemProps: customersActions.setItemProps(dispatch),
  dispatch,
})

export { Campanies }
export default connect(mapStateToProps, mapDispatchToProps)(Campanies)
