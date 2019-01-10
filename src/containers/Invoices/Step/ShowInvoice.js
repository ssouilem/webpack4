import React from 'react'
import { Grid, Segment, List, Header, Dimmer, Image } from 'semantic-ui-react'
class ShowInvoice extends React.Component {
  state = { uid: undefined }

  componentWillMount () {
    console.log('ShowInvoice >> ', this.props.selectedClient)
    this.props.pdfPreviewInvoice()
  }
  // constructor (props) {
  //   super(props)
  //   console.log('ShowInvoice >> ', this.props.selectedClient)
  //   if (!this.props.invoices.preview.sending && !this.props.invoices.preview.data) {
  //     console.log('API pdfPreviewInvoice >> ')
  //     this.props.pdfPreviewInvoice({
  //       customer: this.props.selectedClient,
  //       number: this.props.invoices.invoiceNumber,
  //       createdAuthor: 'TODO', // @TODO charger la valeur d'auth
  //       issueDate: this.props.invoices.issueDate, // ajouter un champ de saisie de date
  //       amount: this.props.invoices.totalAmountHT,
  //       bordereaux: this.props.bordereaux,
  //     })
  //     console.log('APRES API pdfPreviewInvoice >> ')
  //   }
  // }

render = () => (
  <div>
    { (this.props.invoices.preview && !this.props.invoices.preview.sending && this.props.invoices.preview.data && !!this.props.invoices.preview.data.filename) === true
      ? <Grid className='newBordereau' >
        <Grid.Column width={ 12 }>
          <div id='pdf'>
            <object id='pdf_content' width='100%' height='900px' type='application/pdf' trusted='yes' application='yes' title='Assembly' data={ `http://localhost:8080/invoice/getpdf/${this.props.invoices.preview.data.filename}?#zoom=75&scrollbar=1&toolbar=1&navpanes=1` }>
              <p>It appears you don't have a PDF plugin for this browser.
                No problem though...
                You can <a href={ `http://localhost:8080/invoice/getpdf/${this.props.invoices.preview.data.filename}` } >click here to download the PDF</a>.
              </p>
            </object>
          </div>
        </Grid.Column>
        <Grid.Column width={ 4 }>
          <Grid as={ Segment } placeholder>
            <Header as='h5' icon='cog' content='Facture' />
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
        </Grid.Column>
      </Grid>
      : <Dimmer active inverted>
        <Image size='small' centered src={ require('STYLES/images/preload_waiting.gif') } />
        Chargement en cours!
        { JSON.stringify(this.props.invoices.preview) }
        { (this.props.invoices.preview && !this.props.invoices.preview.sending && !!this.props.invoices.preview.data && !!this.props.invoices.preview.data.filename) }
      </Dimmer> }
  </div>
)
}
export default ShowInvoice
