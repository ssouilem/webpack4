import React from 'react'
import { Tab, Menu, Header, Icon, Segment, Button } from 'semantic-ui-react'
import InvoicesList from 'CONTAINERS/Invoices/InvoicesList'
import Invoice from 'CONTAINERS/Invoices/Invoice'
import { BreadcrumbUtils } from 'COMPONENTS/Utils/Utils'
import { connect } from 'react-redux'
import { actions as invoicesActions } from 'ACTIONS/invoices'
import { actions as bordereauActions } from 'ACTIONS/bordereau'
import { actions as clientsActions } from 'ACTIONS/clients'

class Invoices extends React.Component {
  state = { activeIndex: 1, bordereaux: [] }
  componentWillMount () {
    if (!this.props.invoices.sending && !this.props.invoices.data) {
      this.props.fetchInvoices()
    }
    if (!this.props.bordereau.sending && !this.props.bordereau.data) {
      this.props.fetchBordereaux()
    }
    if (!this.props.clients.sending && !this.props.clients.data) {
      this.props.fetchCustomers()
    }
  }

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
  _AddBordereauToInvoice = (invoiceProps) => {
    console.log('props : ', invoiceProps)
    // add item to list
    let bordereau = { bordereauUid: invoiceProps.id }
    this.setState({ bordereaux: [...this.state.bordereaux, bordereau] })
    this.props.setCheckedItemProps(invoiceProps)
  }
  _handleSubmit = () => {
    this.props.createInvoice({
      customer: this.props.clients.selectedClient,
      number: this.props.invoices.invoiceNumber,
      createdAuthor: 'TODO', // @TODO charger la valeur d'auth
      issueDate: '2018-10-05', // ajouter un champ de saisie de date
      amount: this.props.bordereau.totalAmountHT,
      bordereaux: this.state.bordereaux,
    })
  }
  render () {
    const { activeIndex } = this.state

    return (
      <Tab
        activeIndex={ activeIndex }
        onTabChange={ this.handleTabChange }
        renderActiveOnly={ false }
        panes={
          [
            {
              menuItem: (
                <Menu.Item key='invoices'>
                  <Header as='h4'>
                    <Icon name='clipboard outline' />
                    <Header.Content>Tous les factures</Header.Content>
                  </Header>
                </Menu.Item>
              ),
              pane: (
                <Tab.Pane>
                  <div>
                    <Segment vertical>
                      <BreadcrumbUtils parent='Factures' child='Liste de factures' />
                    </Segment>
                    <Segment vertical>
                      <InvoicesList
                        invoices={ this.props.invoices }
                        handleChangeDate={ this.props.handleChangeDate }
                        setCheckedItemProps={ this.props.setCheckedItemProps } />
                    </Segment>
                  </div>
                </Tab.Pane>
              ),
            },
            {
              menuItem: (
                <Menu.Item key='new invoices'>
                  <Header as='h4'>
                    <Icon name='edit outline' />
                    <Header.Content>Créez une facture</Header.Content>
                  </Header>
                </Menu.Item>
              ),
              pane: (
                <Tab.Pane>
                  <div>
                    <BreadcrumbUtils parent='Factures' child='Nouvelle facture' />
                    <Segment vertical>
                      <Invoice setItemProps={ this.props.setItemProps }
                        setInvoicesProps={ this.props.setInvoicesProps }
                        handleChangeClient={ this.props.handleChangeClient }
                        setCheckedInvoice={ this._AddBordereauToInvoice }
                        bordereaux={ this.props.bordereau }
                        clients={ this.props.clients } />
                    </Segment>
                    <Segment textAlign='right' >
                      <Button disabled color='twitter'>
                        <Icon name='save outline' /> Enregistrer le brouillon
                      </Button>
                      <Button color='twitter' onClick={ this._handleSubmit }>
                        <Icon name='save' /> Enregistrer
                      </Button>
                      <Button color='google plus'>
                        <Icon name='cancel' /> Annuler
                      </Button>
                    </Segment>
                  </div>
                </Tab.Pane>),
            },
          ]
        } />
    )
  }
}

const mapStateToProps = state => ({
  invoices: state.invoices,
  clients: state.clients,
  bordereau: state.bordereau,
  datedebut: state.datedebut,
  datefin: state.datefin,
  selectedClient: state.clients.selectedClient,
})

const mapDispatchToProps = dispatch => ({
  createInvoice: invoicesActions.createInvoice(dispatch),
  fetchInvoices: invoicesActions.fetchInvoices(dispatch),
  handleChangeDate: invoicesActions.handleChange(dispatch),
  setInvoicesProps: invoicesActions.setInvoicesProps(dispatch),
  setCheckedItemProps: bordereauActions.setCheckedItemProps(dispatch),
  fetchBordereaux: bordereauActions.fetchBordereaux(dispatch),
  handleChangeClient: clientsActions.handleChangeClient(dispatch),
  setItemProps: clientsActions.setItemProps(dispatch),
  fetchCustomers: clientsActions.fetchCustomers(dispatch),
  // setWizardProps: invoicesActions.setWizardProps(dispatch),
  // setWizardVarsProps: invoicesActions.setWizardVarsProps(dispatch),
  dispatch,
})

export { Invoices }
export default connect(mapStateToProps, mapDispatchToProps)(Invoices)
