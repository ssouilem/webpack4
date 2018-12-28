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
              <Grid.Column width={ 16 }>
                { !this.props.payments.sending && (this.props.payments && Array.isArray(this.props.payments.data) && this.props.payments.data.length >= 1) === true
                  ? <TableInternal
                    activePage={ this.state.activePage }
                    setActivePage={ this.setActivePage }
                    items={ this.props.payments.data }
                    tableType={ TableType.SHOW_PAYMENTS }
                    updateItem={ this.handleViewDetail }
                    deleteItem={ this.props.deletePayment } />
                  : <Dimmer active inverted>
                    <Image size='small' centered src={ require('STYLES/images/preload_waiting.gif') } />
                    Chargement en cours!
                  </Dimmer>}
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
