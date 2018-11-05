import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Header, Form, Button, Segment, Responsive, Icon, Accordion } from 'semantic-ui-react'
import TableInternal from 'COMPONENTS/Common/TableInternal'
import { TableType } from 'COMPONENTS/Utils/Utils'
import { actions as invoicesActions } from 'ACTIONS/invoices'
import {
  DateInput,
} from 'semantic-ui-calendar-react'

class InvoicesList extends React.Component {
  state = {
    checkedItems: {},
    'datedebut': (new Date()).toLocaleString(),
    'datefin': (new Date()).toLocaleString(),
    activeIndex: false,
  }
  componentWillMount () {
    if (this.props.invoices && (!this.props.invoices.data ||
      (this.props.invoices.data && this.props.invoices.data.length < 1))) {
      this.props.fetchInvoices()
    }
  }
  // les probleme il est au niveau de constructor pour init la liste
  handleChangeDate = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      console.log('add Bordereau', name, value)
      this.setState({ [name]: value })
    }
    this.props.handleChangeDate({ [name]: value })
  }
  onChecked = (event, {name, checked}) => {
    const node = document.getElementById('invoices').elements
    if (name === 'all') {
      for (let i = 0; i < node.length; i++) {
        if (node[i].nodeName === 'INPUT' && node[i].type === 'checkbox') {
          let nameBox = node[i].name
          this.setState({ [nameBox]: !this.state.allChecked })
        }
      }
      this.setState({ allChecked: !this.state.allChecked })
    } else {
      this.setState({ [name]: !this.state[name] })
      this.props.setCheckedItemProps({ id: name, value: !this.state[name] })
    }
  }
  handleActiveSearch = () => {
    this.setState({ activeIndex: !this.state.activeIndex })
  }
  render () {
    const { activeIndex } = this.state
    return (
      <Form id='invoices' as={ this.state.form }>
        <Grid columns={ 2 } >
          <Accordion fluid>
            <Accordion.Title active={ activeIndex } onClick={ this.handleActiveSearch }>
              <Icon name='dropdown' />
              Recherche avancéé
            </Accordion.Title>
            <Accordion.Content active={ activeIndex }>
              <Grid columns={ 2 }>

                <Grid.Column width={ 16 }>
                  <Header dividing as='h4'>
                    <Icon name='search' />
                    <Header.Content>Rechercher</Header.Content>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Segment.Group>
                    <Responsive as={ Segment }>
                      Rechercher par client
                    </Responsive>
                    <Responsive as={ Segment } >
                      <Form.Input fluid label='Client' placeholder='reference client' type='text' />
                      <Form.Input fluid label='Bordereau' placeholder='ID' type='text' />
                    </Responsive>
                  </Segment.Group>
                </Grid.Column>
                <Grid.Column>
                  <Segment.Group>
                    <Responsive as={ Segment }>
                      Rechercher par date
                    </Responsive>
                    <Responsive as={ Segment } >
                      <Form.Field>
                        <label as='h5'>A partir de </label>
                        <DateInput
                          name='datedebut'
                          placeholder='Date de debut'
                          value={ this.state.datedebut }
                          iconPosition='left'
                          onChange={ this.handleChangeDate } />
                      </Form.Field>

                      <Form.Field>
                        <label>Jusqu'au</label>
                        <DateInput
                          name='datefin'
                          placeholder='Date de fin'
                          value={ this.state.datefin }
                          iconPosition='left'
                          onChange={ this.handleChangeDate } />
                      </Form.Field>
                    </Responsive>
                  </Segment.Group>
                </Grid.Column>
                <Grid.Column width={ 16 }>
                  <Button floated='right' color='blue'>Rechercher</Button>
                </Grid.Column>

              </Grid>
            </Accordion.Content>
          </Accordion>

          <Grid.Column width={ 16 }>
            <TableInternal
              items={ this.props.invoices.data }
              onChecked={ this.onChecked }
              state={ this.state }
              onClick={ (action) => console.log('view or edit', action) }
              tableType={ TableType.SHOW_INVOICES } />
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

InvoicesList.propTypes = {
  handleChangeDate: PropTypes.func,
  fetchInvoices: PropTypes.func,
}

const mapStateToProps = state => ({
  datedebut: state.datedebut,
  datefin: state.datefin,
  invoices: state.invoices,
})

const mapDispatchToProps = dispatch => ({
  handleChangeDate: invoicesActions.handleChange(dispatch),
  fetchInvoices: invoicesActions.fetchInvoices(dispatch),
  setCheckedItemProps: invoicesActions.setCheckedItemProps(dispatch),
  dispatch,
})

export { InvoicesList }
export default connect(mapStateToProps, mapDispatchToProps)(InvoicesList)
