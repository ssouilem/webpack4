import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { Tab, Menu, Header, Icon, Segment, Button, Grid } from 'semantic-ui-react'
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

  setStateProps = valueProps => this.setState({ valueProps })
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
      issueDate: this.props.invoices.issueDate, // ajouter un champ de saisie de date
      amount: this.props.bordereaux.totalAmountHT,
      bordereaux: this.state.bordereaux,
      otherExpenses: this.props.invoices.otherExpenses,
      remarks: this.props.invoices.comment,
      sumInLetter: this.props.invoices.amountInWords,
    })
  }
  _handleAddPayment = payment => {
    this.props.createPayment({ ...payment })
    this.props.setInvoicesProps({ amountPending: payment.amountPending })
  }

  render () {
    const { activeIndex } = this.state
    const { currentStep } = this.props
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
                    <Grid divided>
                      <Grid.Row width={ 16 }>
                        <Invoice currentStep={ this.props.currentStep }
                          next={ this.props.next }
                          prev={ this.props.prev }
                          generatePdfInvoice={ this.props.generatePdfInvoice }
                          pdfPreviewInvoice={ this.props.pdfPreviewInvoice }
                          setItemProps={ this.props.setItemProps }
                          setCheckedItemProps={ this.props.setCheckedItemProps }
                          setInvoicesProps={ this.props.setInvoicesProps }
                          handleChangeClient={ this.props.handleChangeClient }
                          setCheckedInvoice={ this._AddBordereauToInvoice }
                          bordereaux={ this.props.bordereau }
                          invoices={ this.props.invoices }
                          done={ this.props.done }
                          setStateProps={ this.setStateProps }
                          clients={ this.props.clients } />
                      </Grid.Row>
                      <Grid.Row width={ 16 }textAlign='center'>
                        {!this.props.done &&
                          currentStep > 0 && (
                          <Grid.Column width={ 8 }textAlign='left'>
                            <Button
                              className='step-button-left'
                              content='Previous'
                              color='blue'
                              size='small'
                              icon='chevron left'
                              labelPosition='left'
                              floated='left'
                              onClick={ () => this.props.prev() }
                            />
                          </Grid.Column>
                        )}
                        {!this.props.done &&
                          currentStep < 2 && (
                          <Grid.Column width={ currentStep === 0 ? 16 : 8 } textAlign='right' >
                            <Button
                              className='step-button-right'
                              content='Next'
                              color='blue'
                              icon='chevron right'
                              size='small'
                              labelPosition='right'
                              onClick={ () => this.props.next() }
                            />
                          </Grid.Column>
                        )}
                        {!this.props.done &&
                          currentStep === 3 - 1 && (
                          <Grid.Column width={ 8 } textAlign='right'>
                            <Button
                              content='Enregistrer'
                              icon='save'
                              className='step-button-right'
                              color='teal'
                              size='small'
                              floated='right'
                              onClick={ this._handleSubmit }
                            />
                          </Grid.Column>
                        )}
                      </Grid.Row>
                    </Grid>
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
  done: state.invoices.done,
  selectedClient: state.clients.selectedClient,
  currentStep: state.invoices.currentStep,
})

const mapDispatchToProps = dispatch => ({
  createInvoice: invoicesActions.createInvoice(dispatch),
  generatePdfInvoice: invoicesActions.generatePdfInvoice(dispatch),
  pdfPreviewInvoice: invoicesActions.pdfPreviewInvoice(dispatch),
  fetchInvoices: invoicesActions.fetchInvoices(dispatch),
  handleChangeDate: invoicesActions.handleChange(dispatch),
  setInvoicesProps: invoicesActions.setInvoicesProps(dispatch),
  setCheckedItemProps: bordereauActions.setCheckedItemProps(dispatch),
  fetchBordereaux: bordereauActions.fetchBordereaux(dispatch),
  handleChangeClient: clientsActions.handleChangeClient(dispatch),
  setItemProps: clientsActions.setItemProps(dispatch),
  fetchCustomers: clientsActions.fetchCustomers(dispatch),
  createPayment: paymentsActions.createPayment(dispatch),
  next: invoicesActions.next(dispatch),
  prev: invoicesActions.prev(dispatch),
  // setWizardProps: invoicesActions.setWizardProps(dispatch),
  // setWizardVarsProps: invoicesActions.setWizardVarsProps(dispatch),
  dispatch,
})

export { Invoices }
export default connect(mapStateToProps, mapDispatchToProps)(Invoices)
