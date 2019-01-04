import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Form, Button, Segment, Responsive, Icon, Accordion, Dimmer, Image } from 'semantic-ui-react'
import TableInternal from 'COMPONENTS/Common/TableInternal'
import { TableType } from 'COMPONENTS/Utils/Utils'
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
  // les probleme il est au niveau de constructor pour init la liste
  handleChangeDate = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      console.log('add Bordereau', name, value)
      this.setState({ [name]: value })
    }
    this.props.handleChangeDate({ [name]: value })
  }
  handleActiveSearch = () => this.setState({ activeIndex: !this.state.activeIndex })
  setActivePage = (activePage) => this.setState({ activePage: activePage })

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
            { this.props.invoices && this.props.invoices.sending
              ? <Dimmer active inverted>
                <Image size='small' centered src={ require('STYLES/images/preload_waiting.gif') } />
                Chargement en cours!
              </Dimmer>
              : (this.props.invoices && Array.isArray(this.props.invoices.data) && this.props.invoices.data.length === 0) === true
                ? <Grid textAlign='center'>
                  <Grid.Row>
                    <Icon size='big' name='pdf file outline' />
                  </Grid.Row>
                  <Grid.Row>Pas d'elements, la liste est vide.</Grid.Row>
                </Grid>
                : <TableInternal
                  items={ this.props.invoices.data }
                  activePage={ this.state.activePage }
                  setActivePage={ this.setActivePage }
                  tableType={ TableType.SHOW_INVOICES }
                  updateItem={ this.props.createPayment }
                  generatePdfInvoice={ this.props.generatePdfInvoice }
                  state={ this.state } />
            }
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

InvoicesList.propTypes = {
  handleChangeDate: PropTypes.func,
  createPayment: PropTypes.func,
}

export default InvoicesList
