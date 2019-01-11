import React from 'react'
import _ from 'lodash'
import { Steps } from 'antd'
import { Header, Segment, Dimmer, Divider, Button, Loader } from 'semantic-ui-react'
import NewInvoice from './Step/NewInvoice'
import ShowInvoice from './Step/ShowInvoice'
import InvoiceContents from './Step/InvoiceContents'
import styles from './Invoice.less'

class Invoice extends React.Component {
  state={ bordereaux: [] }
  viewLog = () => {
    console.log('Chargement de la page :', this.props.currentStep)
    return true
  }
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

    this.props.setCheckedItemProps({ uid: invoiceProps.id, value: invoiceProps.value })
    // this.props.setCheckedItemProps(invoiceProps) // Avons-nous besoins de sauvegarder la liste à un niveau superieur ?
    return { totalAmountHT, totalAmountTVA, totalAmountTTC }
  }

  _createPreviewFile = () => {
    console.log('_createPreviewFile >> ', this.props.selectedClient)
    if (!this.props.invoices.preview.sending && !this.props.invoices.preview.data) {
      this.props.pdfPreviewInvoice({
        customer: this.props.clients.selectedClient,
        number: this.props.invoices.invoiceNumber,
        createdAuthor: 'TODO', // @TODO charger la valeur d'auth
        issueDate: this.props.invoices.issueDate, // ajouter un champ de saisie de date
        amount: this.props.bordereaux.totalAmountHT,
        bordereaux: this.state.bordereaux,
        otherExpenses: this.props.invoices.otherExpenses,
        remarks: this.props.invoices.comment,
        sumInLetter: this.props.invoices.amountInWords,
        // playPaymentCondition: this.props.invoices.playPaymentCondition,
      })
      this.props.setStateProps({ bordereaux: this.state.bordereaux })
    }
  }

render = () => {
  const { currentStep } = this.props
  const Step = Steps.Step
  const steps = [
    {
      title: 'Noulelle Facture',
      component: (<NewInvoice
        setItemProps={ this.props.setItemProps }
        setInvoicesProps={ this.props.setInvoicesProps }
        handleChangeClient={ this.props.handleChangeClient }
        bordereaux={ this.props.bordereaux }
        invoices={ this.props.invoices }
        clients={ this.props.clients } />
      ),
    },
    {
      title: 'Produits livrés',
      component: (<InvoiceContents
        setCheckedInvoice={ this._AddBordereauToInvoice }
        bordereaux={ this.props.bordereaux }
        // pdfPreviewInvoice={ this._createPreviewFile }
        clients={ this.props.clients } />),
    },
    {
      title: 'Visualisation Facture',
      component: (
        <ShowInvoice
          bordereaux={ this.state.bordereaux && this.state.bordereaux }
          pdfPreviewInvoice={ this._createPreviewFile }
          invoices={ this.props.invoices }
          selectedClient={ this.props.clients.selectedClient }
        />
      ),
    },
  ]
  return (
    <div className='projectsPage' >
      <Dimmer active={ !!this.props.done && currentStep !== -1 } inverted>
        <Header as='h2' icon>
          <p className='projectSuccess'>YOUR PROJECT HAS BEEN SUCCESSFULLY CREATED.</p>
          <Divider hidden />
          <Header.Subheader>
            <Button color='teal' size='large' onClick={ this._handleNavigateToProject }>
              Access to the project
            </Button>
          </Header.Subheader>
        </Header>
      </Dimmer>
      {!this.props.done &&
        this.props.sending && (
        <Dimmer active inverted>
          <Loader size='large'>GENERATING PROJECT! Please wait...</Loader>
        </Dimmer>
      )}
      {!this.props.done &&
        currentStep !== -1 && (
        <Segment attached='top'>
          <Steps progressDot current={ currentStep }>
            {steps.map(item => <Step key={ item.title } title={ item.title } description='' />)}
          </Steps>
        </Segment>
      )}
      <Segment attached={ currentStep !== -1 }>
        {!this.props.done && currentStep !== -1 && !console.log('Chargement de la page :', this.props.currentStep) && steps[currentStep].component}
        { JSON.stringify(this.props.invoices.preview) }
      </Segment>

    </div>
  )
}
}

export default Invoice
