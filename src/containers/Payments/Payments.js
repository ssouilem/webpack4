import React from 'react'
import { Grid, Segment, Breadcrumb, Sticky, Header, Dimmer, Image, Table, Button } from 'semantic-ui-react'
import { actions as paymentsActions } from 'ACTIONS/payments'
import TableInternal from 'COMPONENTS/Common/TableInternal'
import AddPayment from 'COMPONENTS/Payments/AddPayment'
import { TableType } from 'COMPONENTS/Utils/Utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'payments', content: 'Payments', active: true },
]
class Payments extends React.Component {
  state = { viewDetail: false }

  componentWillMount () {
    if (!this.props.payments.sending && !this.props.payments.data) {
      console.log('fetchPayments')
      this.props.fetchPayments()
    }
  }
  // Sticky
  handleContextRef = contextRef => this.setState({ contextRef })
  handleViewDetail = (e, {name}) => {
    // this.setState({ viewDetail: !this.state.viewDetail })
    this.setState({ [name]: !this.state[name] })
  }
  setActivePage = (activePage) => this.setState({ activePage: activePage })

  render = ({ contextRef } = this.state) => (
    <div ref={ this.handleContextRef }>
      <Grid>
        <Grid.Column width={ 1 } >
        </Grid.Column>
        <Grid.Column width={ 15 }>
          <Grid>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                <Breadcrumb divider='/' sections={ sections } />
              </Grid.Column>
              <Grid.Column width={ 4 } >
              {/*
                <AddPayment
                  sending={ (this.props.payments && Array.isArray(this.props.payments.data) && this.props.payments.sending) }
                  done={ (this.props.payments && Array.isArray(this.props.payments.data) && this.props.payments.done) }
                  submitForm={ this.props.createPayment } />
                  */ }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                { !this.props.payments.sending && (this.props.payments && Array.isArray(this.props.payments.data) && this.props.payments.data.length >= 1) === true
                  ? <Table >
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>PAIEMENT ID</Table.HeaderCell>
                        <Table.HeaderCell>DATE DE CREATION</Table.HeaderCell>
                        <Table.HeaderCell>MONTANT</Table.HeaderCell>
                        <Table.HeaderCell>PAIEMENT EN ATTENTE</Table.HeaderCell>
                        <Table.HeaderCell>CLIENT</Table.HeaderCell>
                        <Table.HeaderCell>FACTURE</Table.HeaderCell>
                        <Table.HeaderCell>MONTANT TOTAL</Table.HeaderCell>
                        <Table.HeaderCell>ACTION</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    {(this.props.payments.data && this.props.payments.data.length > 0 && this.props.payments.data.map(payment => (
                      <Table.Body>
                        <Table.Row key={ payment.uid } name={ payment.uid } >
                          <Table.Cell>{ payment.id }</Table.Cell>
                          <Table.Cell>{ payment.createdDate ? payment.createdDate : 'oops' }</Table.Cell>
                          <Table.Cell>{ payment.amount }</Table.Cell>
                          <Table.Cell>{ payment.amountPending }</Table.Cell>
                          <Table.Cell>{ payment.holder && payment.holder }</Table.Cell>
                          <Table.Cell>{ payment.invoice && payment.invoice.number }</Table.Cell>
                          <Table.Cell>{ payment.amount }</Table.Cell>
                          <Table.Cell>
                            <Button
                              onClick={ this.handleViewDetail }
                              name={ payment.uid }
                              icon='sign out'
                              content='View Detail'
                              floated='right' />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row key={ `view_${payment.uid}` } >
                          <Table.Cell colSpan='8' hidden={ !this.state[payment.uid] } >
                            { Array.isArray(payment.paymentDetails) && payment.paymentDetails.map(paymentDetail => (
                              <div>{ paymentDetail.type }</div>
                            )) }
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    ))) ||
                      <Table.Row key='6'>
                        <Table.Cell colSpan='6' >
                          <Header icon>
                            Nous n'avons pas de paiements correspondant à votre requête.
                          </Header>
                        </Table.Cell>
                      </Table.Row>
                    }

                    { /*
                    <Table.Footer>
                      {(this.props.payments.data && this.props.payments.data.length > 0 && this.props.payments.data.map(payment => (
                        <Table.Row key={ payment.uid } name={ payment.uid } >
                          <Table.Cell colSpan='8' >
                            <Table >
                              <Table.Body >
                                <Table.Row key={ payment.uid } name={ payment.uid } >
                                  <Table.Cell>{ payment.id }</Table.Cell>
                                  <Table.Cell>{ payment.createdDate ? payment.createdDate : 'oops' }</Table.Cell>
                                  <Table.Cell>{ payment.amount }</Table.Cell>
                                  <Table.Cell>{ payment.amountPending }</Table.Cell>
                                  <Table.Cell>{ payment.holder && payment.holder }</Table.Cell>
                                  <Table.Cell>{ payment.invoice && payment.invoice.number }</Table.Cell>
                                  <Table.Cell>{ payment.amount }</Table.Cell>
                                  <Table.Cell>
                                    <Button primary
                                      onClick={ this.handleViewDetail }
                                      name={ payment.uid }
                                      icon='sign out'
                                      content='View Detail'
                                      floated='right' />
                                  </Table.Cell>
                                </Table.Row>
                              </Table.Body>
                              <Table.Footer>
                                <Table.Cell colSpan='8' hidden={ !this.state[payment.uid] } >
                                  { Array.isArray(payment.paymentDetails) && payment.paymentDetails.map(paymentDetail => (
                                    <div>{ paymentDetail.type }</div>
                                  )) }
                                </Table.Cell>
                              </Table.Footer>
                            </Table >
                          </Table.Cell>
                        </Table.Row>
                      ))) ||
                      <Table.Row key='6'>
                        <Table.Cell colSpan='6' >
                          <Header icon>
                            Nous n'avons aucun paiement correspondant à votre requête.
                          </Header>
                        </Table.Cell>
                      </Table.Row>
                      }
                    </Table.Footer>
                    */ }
                  </Table>

                  /*

                  <TableInternal
                    activePage={ this.state.activePage }
                    setActivePage={ this.setActivePage }
                    items={ this.props.payments.data }
                    onClick={ (action) => console.log('view or edit', action) }
                    tableType={ TableType.SHOW_PAYMENTS }
                    updateItem={ this.props.createPayment }
                    deleteItem={ this.props.deletePayment } />*/
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

Payments.propTypes = {
  payments: PropTypes.object,
}

const mapStateToProps = state => ({
  payments: state.payments,
})

const mapDispatchToProps = dispatch => ({
  fetchPayments: paymentsActions.fetchPayments(dispatch),
  createPayment: paymentsActions.createPayment(dispatch),
  updatePayment: paymentsActions.updatePayment(dispatch),
  deletePayment: paymentsActions.deletePayment(dispatch),
  dispatch,
})
export { Payments }
export default connect(mapStateToProps, mapDispatchToProps)(Payments)
