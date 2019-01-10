import React from 'react'
import _ from 'lodash'
import { Header, Segment, Grid, Table, Form, List, Checkbox, Icon } from 'semantic-ui-react'

class InvoiceContents extends React.Component {
  state = { invoiceNumber: '' }
  componentWillMount () {
    console.log('<< InvoiceContents >> ')
  }

  // componentDidMount () {
  //   console.log('ShowInvoice >> ', this.props.selectedClient)
  //   this.props.pdfPreviewInvoice()
  // }

  _handleChangeCkecked = (event, {name, checked, amount}) => {
    // console.log('_handleChangeCkecked ', document, name)
    // console.log('form ', document.getElementById('myform').elements)
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
      console.log(checked, !this.state[name])
      this.setState({ [name]: !this.state[name] })
      var returnAmount = this.props.setCheckedInvoice({ id: name, value: checked, amount })
      this.setState({...returnAmount})
    }
  }

render = ({ totalAmountHT, totalAmountTVA, totalAmountTTC } = this.props ) => {
  const items = (Array.isArray(this.state.results) && this.state.results.length >= 0) ? this.state.results : this.props.bordereaux.data
  return (
    <Form id='myform'>
      <Grid className='newBordereau' ref={ this.handleContextRef } >
        <Grid.Column width={ 16 }>
          <Grid textAlign='center' >
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
                      <Table.HeaderCell><Checkbox disabled name='all' onClick={ this._handleChangeCkecked } /></Table.HeaderCell>
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
                    {(Array.isArray(items) && items.length >= 1 && items.map(bordereau => (
                      <Table.Row key={ bordereau.uid } name={ bordereau.uid } >
                        <Table.Cell colSpan='8' >
                          <Table >
                            <Table.Body>
                              <Table.Row key={ bordereau.uid } name={ bordereau.uid }>
                                <Table.Cell collapsing>
                                  <Checkbox name={ bordereau.uid } amount={ bordereau.subTotal } onChange={ this._handleChangeCkecked } checked={ bordereau.checked ? bordereau.checked : this.state[bordereau.uid] } />
                                </Table.Cell>
                                <Table.Cell>{ bordereau.number }</Table.Cell>
                                <Table.Cell>{ bordereau.customer && bordereau.customer.name }</Table.Cell>
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
                    <Table.Row key='8'>
                      <Table.Cell colSpan='8' textAlign='center' >
                        <Header icon>
                          <Icon name='search' />
                          Nous n'avons aucun bordereau correspondant à votre client.
                        </Header>
                      </Table.Cell>
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
                      { this.props.bordereaux ? this.props.bordereaux.totalAmountHT.toFixed(3) : 0 }
                    </List.Content>
                    <List.Content><Header as='h5'>Montant HT</Header></List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated='right'>
                      { this.props.bordereaux ? this.props.bordereaux.totalAmountTVA.toFixed(3) : 0 }
                    </List.Content>
                    <List.Content><Header as='h5'>TVA 20%</Header></List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content floated='right'>
                      { this.props.bordereaux ? this.props.bordereaux.totalAmountTTC.toFixed(3) : 0 }
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
      </Grid>
    </Form>
  )
}
}
export default InvoiceContents
