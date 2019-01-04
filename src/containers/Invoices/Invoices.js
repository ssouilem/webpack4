import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Tab, Menu, Header, Icon, Segment, Button } from 'semantic-ui-react'
import InvoicesList from 'CONTAINERS/Invoices/InvoicesList'
import Invoice from 'CONTAINERS/Invoices/Invoice'
import { BreadcrumbUtils } from 'COMPONENTS/Utils/Utils'
import { connect } from 'react-redux'
import { actions as invoicesActions } from 'ACTIONS/invoices'
import { actions as bordereauActions } from 'ACTIONS/bordereau'
import { actions as clientsActions } from 'ACTIONS/clients'
import { actions as paymentsActions } from 'ACTIONS/payments'

class Invoices extends React.Component {
  state = { activeIndex: 0, bordereaux: [], totalAmountHT: 0 }
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
    let totalAmountHT = 0
    let totalAmountTVA = 0
    let totalAmountTTC = 0

    if (invoiceProps.value === false) {
      totalAmountHT = parseFloat(this.state.totalAmountHT) - parseFloat(invoiceProps.amount)
      _.remove(this.state.bordereaux, function (currentObject) { return currentObject.bordereauUid === invoiceProps.id })
    } else {
      // add item to list
      totalAmountHT = parseFloat(this.state.totalAmountHT) + parseFloat(invoiceProps.amount)
      let bordereau = { bordereauUid: invoiceProps.id }
      this.setState({ bordereaux: [...this.state.bordereaux, bordereau] })
    }
    // calucule montant HT
    totalAmountTVA = totalAmountHT * 0.2
    totalAmountTTC = totalAmountHT + totalAmountTVA
    this.setState({totalAmountHT, totalAmountTVA, totalAmountTTC})
    return { totalAmountHT, totalAmountTVA, totalAmountTTC }
    // this.props.setCheckedItemProps(invoiceProps) // Avons-nous besoins de sauvegarder lalista à un niveau superieure ?
  }
  _handleSubmit = () => {
    this.props.createInvoice({
      customer: this.props.clients.selectedClient,
      number: this.props.invoices.invoiceNumber,
      createdAuthor: 'TODO', // @TODO charger la valeur d'auth
      issueDate: moment().format('YYYY-MM-DD'), // ajouter un champ de saisie de date
      amount: this.state.totalAmountHT,
      bordereaux: this.state.bordereaux,
    })
  }
  _handleAddPayment = payment => {
    this.props.createPayment({ ...payment })
    this.props.setInvoicesProps({ amountPending: payment.amountPending })
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
                        createPayment={ this._handleAddPayment }
                        generatePdfInvoice={ this.props.generatePdfInvoice }
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
  generatePdfInvoice: invoicesActions.generatePdfInvoice(dispatch),
  fetchInvoices: invoicesActions.fetchInvoices(dispatch),
  handleChangeDate: invoicesActions.handleChange(dispatch),
  setInvoicesProps: invoicesActions.setInvoicesProps(dispatch),
  setCheckedItemProps: bordereauActions.setCheckedItemProps(dispatch),
  fetchBordereaux: bordereauActions.fetchBordereaux(dispatch),
  handleChangeClient: clientsActions.handleChangeClient(dispatch),
  setItemProps: clientsActions.setItemProps(dispatch),
  fetchCustomers: clientsActions.fetchCustomers(dispatch),
  createPayment: paymentsActions.createPayment(dispatch),
  // setWizardProps: invoicesActions.setWizardProps(dispatch),
  // setWizardVarsProps: invoicesActions.setWizardVarsProps(dispatch),
  dispatch,
})

export { Invoices }
export default connect(mapStateToProps, mapDispatchToProps)(Invoices)
