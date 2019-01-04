import React from 'react'
import _ from 'lodash'
import { Header, Grid, Table, Icon, Search, Button, Checkbox, Pagination, Confirm } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { TableType } from 'COMPONENTS/Utils/Utils'
import PaymentMethod from 'COMPONENTS/Invoices/PaymentMethod'
import ShowInvoice from 'COMPONENTS/Invoices/ShowInvoice'
import AddProduct from 'COMPONENTS/Products/AddProduct'
import AddCustomer from 'COMPONENTS/Client/AddCustomer'
import styles from './TableInternal.less'

const DEFAULT_PAGE_SIZE = 8
const DEFAULT_ACTIVE_PAGE = 1

class TableInternal extends React.Component {
  state = { pageSize: DEFAULT_PAGE_SIZE, activePage: DEFAULT_ACTIVE_PAGE, results: [] }

  componentWillMount () {
    this.resetComponent()
  }

  resetComponent = () => {
    this.setState({ isLoading: false,
      results: [],
      data: [],
      value: '',
      items: this.props.items})
    this.getPaginatedItems(this.props.activePage || DEFAULT_ACTIVE_PAGE, DEFAULT_PAGE_SIZE)
  }

  handlePaginationChange = (e, { activePage }) => {
    console.log(e, activePage)
    this.getPaginatedItems(activePage, DEFAULT_PAGE_SIZE)
    this.setState({ activePage })
  }
  getPaginatedItems = (page, pageSize) => {
    const items = (Array.isArray(this.state.results) && this.state.results.length >= 1) ? this.state.results : this.props.items
    let pg = page || this.state.activePage
    let pgSize = pageSize || this.state.pageSize
    let offset = (pg - 1) * pgSize
    let pagedItems = _.drop(items, offset).slice(0, pgSize)
    this.setState({activePage: pg,
      pageSize: pgSize,
      total: items && items.length,
      total_pages: Math.ceil(items && items.length / pgSize),
      data: pagedItems})
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.description })
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      let re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      let isMatch = ''
      switch (this.props.tableType) {
        case TableType.SHOW_INVOICES :
          console.log('Search invoices')
          isMatch = result => re.test(result.customer)
          break
        case TableType.SHOW_CUSTOMERS :
          console.log('Search customer')
          isMatch = result => re.test(result.name)
          break
        case TableType.SHOW_PAYMENTS :
          isMatch = result => re.test(result.invoice.number)
          break
        default:
          isMatch = result => re.test(result.reference)
          break
      }
      var results = _.filter(this.props.items, isMatch)
      let offset = (this.state.activePage - 1) * DEFAULT_PAGE_SIZE
      this.setState({
        isLoading: false,
        results: results,
        total_pages: Math.ceil(results && results.length / this.state.pageSize),
        data: _.drop(results, offset).slice(0, DEFAULT_PAGE_SIZE),
      })
    }, 300)
  }

  _showPopDelete = (e, { id }) => this.setState({ open: true, deleteUid: id })
  _handleCancel = () => this.setState({ open: false, deleteUid: undefined })
  _handleConfirmDeleteItem = () => {
    console.log('Delete Id : ', this.state.deleteUid)
    this.setState({ open: false })
    this.props.deleteItem(this.state.deleteUid)
    this.props.setActivePage(this.state.activePage)
    if (this.state.activePage >= 1) {
      console.log('activePage : ', this.state.activePage)
      this.getPaginatedItems(this.state.activePage, DEFAULT_PAGE_SIZE)
    }
    this.setState({ deleteUid: undefined })
  }
// Paiement
handleViewDetail = (e, {name}) => this.setState({ [name]: !this.state[name] })
componentWillReceiveProps (nextProps) {
  console.log('TableInternal.js : updateItems / ', nextProps)//, this.props.user.maxAge)

  if (Array.isArray(nextProps.items) && nextProps.items.length >= 1) {
    this.setState({data: nextProps.items})
  }
}

render = () => {
  const {isLoading, results, value, data} = this.state
  const { items } = this.props
  const itemTable = (Array.isArray(data) && data.length >= 1) ? data : (Array.isArray(results) && results.length >= 1) ? results : items
  return (
    <Grid textAlign='center' className={ styles.table }>
      <Grid.Row>
        <Grid.Column width={ 8 } textAlign='left'>
          <Header as='h5'>PRODUITS ET SERVICES</Header>
        </Grid.Column>
        <Grid.Column width={ 8 } textAlign='right' >
          <Search
            open={ false }
            name='searchProduct'
            loading={ isLoading }
            onResultSelect={ this.handleResultSelect }
            onSearchChange={ _.debounce(this.handleSearchChange, 500, { leading: true }) }
            results={ results }
            value={ value }
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Confirm
            open={ this.state.open }
            content='Voulez-vous vraiment supprimer cet element ?'
            onCancel={ this._handleCancel }
            onConfirm={ this._handleConfirmDeleteItem }
          />
          <Table compact selectable stackable >
            { this.props.tableType === TableType.SHOW_PRODUCTS ? <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Reference</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Qualité</Table.HeaderCell>
                <Table.HeaderCell>Prix</Table.HeaderCell>
                <Table.HeaderCell>Unit</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
              : this.props.tableType === TableType.SHOW_CUSTOMERS ? <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nom de client</Table.HeaderCell>
                  <Table.HeaderCell>Numéro de TVA</Table.HeaderCell>
                  <Table.HeaderCell>Interlocuteur</Table.HeaderCell>
                  <Table.HeaderCell>Ville</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
                : this.props.tableType === TableType.SHOW_BORDEREAUX ? <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>BORDEREAU ID</Table.HeaderCell>
                    <Table.HeaderCell>CLIENT</Table.HeaderCell>
                    <Table.HeaderCell>DATE</Table.HeaderCell>
                    <Table.HeaderCell>ÉCHÉANCE</Table.HeaderCell>
                    <Table.HeaderCell>REMISE</Table.HeaderCell>
                    <Table.HeaderCell>TOTAL</Table.HeaderCell>
                    <Table.HeaderCell>ACTIONS</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                  : this.props.tableType === TableType.SHOW_PAYMENTS ? <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={ 1 }>ID</Table.HeaderCell>
                      <Table.HeaderCell width={ 2 }>DATE </Table.HeaderCell>
                      <Table.HeaderCell width={ 2 }>MONTANT P</Table.HeaderCell>
                      <Table.HeaderCell width={ 2 }>EN ATTENTE</Table.HeaderCell>
                      <Table.HeaderCell width={ 3 }>CLIENT</Table.HeaderCell>
                      <Table.HeaderCell width={ 2 }>FACTURE</Table.HeaderCell>
                      <Table.HeaderCell width={ 2 }>MONTANT FAC</Table.HeaderCell>
                      <Table.HeaderCell width={ 2 }></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                    : this.props.tableType === TableType.SHOW_INVOICES &&
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>FACTURE N°</Table.HeaderCell>
                        <Table.HeaderCell>CLIENT</Table.HeaderCell>
                        <Table.HeaderCell>DATE DE CREATION</Table.HeaderCell>
                        <Table.HeaderCell>ÉCHÉANCE</Table.HeaderCell>
                        <Table.HeaderCell>MONTANT</Table.HeaderCell>
                        <Table.HeaderCell>EN ATTENTE</Table.HeaderCell>
                        <Table.HeaderCell>STATUT</Table.HeaderCell>
                        <Table.HeaderCell>ACTIONS</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header> }
            <Table.Body>
              { Array.isArray(itemTable) && itemTable.length >= 1 ? itemTable.map(result => (
                (this.props.tableType === TableType.SHOW_PRODUCTS)
                  ? <Table.Row key={ result.uid }>
                    <Table.Cell>{ result.reference }</Table.Cell>
                    <Table.Cell>{ result.description }</Table.Cell>
                    <Table.Cell>{ result.category }</Table.Cell>
                    <Table.Cell>{ result.price }</Table.Cell>
                    <Table.Cell>{ result.unit }</Table.Cell>
                    <Table.Cell>
                      <AddProduct update error={ this.props.error } product={ result } submitForm={ this.props.updateItem } >
                        <Button primary
                          onClick={ this.handleOpen }
                          icon='pencil'
                          inverted
                          floated='right' />
                      </AddProduct>
                      <Button
                        id={ result.uid }
                        onClick={ this._showPopDelete }
                        icon='delete'
                        color='red'
                        inverted
                        floated='right' />
                    </Table.Cell>
                  </Table.Row>
                  : (this.props.tableType === TableType.SHOW_CUSTOMERS)
                    ? <Table.Row key={ result.uid }>
                      <Table.Cell>{ result.name }</Table.Cell>
                      <Table.Cell>{ result.siret }</Table.Cell>
                      <Table.Cell>{ result.phoneNumber }</Table.Cell>
                      <Table.Cell>{ result.city }</Table.Cell>
                      <Table.Cell>
                        <AddCustomer update error={ this.props.error } customer={ result } submitForm={ this.props.updateItem }>
                          <Button
                            icon='pencil'
                            inverted
                            color='blue'
                            floated='right' />
                        </AddCustomer>
                        <Button
                          id={ result.uid }
                          onClick={ this._showPopDelete }
                          icon='delete'
                          color='red'
                          inverted
                          floated='right' />
                      </Table.Cell>
                    </Table.Row>
                    : (this.props.tableType === TableType.SHOW_BORDEREAUX)
                      ? <Table.Row key={ result.uid }>
                        <Table.Cell collapsing>
                          <Checkbox name={ result.uid } onChange={ this.props.onChecked } checked={ this.props.state[result.id] } />
                        </Table.Cell>
                        <Table.Cell>{ result.number && result.number }</Table.Cell>
                        <Table.Cell>{ result.customer.name }</Table.Cell>
                        <Table.Cell>{ result.createdDate }</Table.Cell>
                        <Table.Cell>{ result.treatmentDate }</Table.Cell>
                        <Table.Cell>{ !result.invoice && result.invoice }</Table.Cell>
                        <Table.Cell>{ result.subTotal }</Table.Cell>
                        <Table.Cell>
                          <Button
                            icon='delete'
                            id={ result.id }
                            onClick={ this._showPopDelete }
                            floated='right' />
                          <Button primary
                            icon='sign out'
                            content='Update'
                            floated='right' />
                        </Table.Cell>
                      </Table.Row>
                      : (this.props.tableType === TableType.SHOW_PAYMENTS)
                        ? <Table.Row key={ `Row_${result.uid}` } className='RowTable' >
                          <Table.Cell colSpan='8' >
                            <Table className='TRTable'>
                              <Table.Body >
                                <Table.Row textAlign='center' key={ result.uid } name={ result.uid } >
                                  <Table.Cell width={ 1 }>{ result.id }</Table.Cell>
                                  <Table.Cell width={ 2 }>{ result.createdDate ? result.createdDate : 'oops' }</Table.Cell>
                                  <Table.Cell width={ 2 }>{ result.amount }</Table.Cell>
                                  <Table.Cell width={ 2 }>{ result.amountPending }</Table.Cell>
                                  <Table.Cell width={ 3 }>{ result.holder && result.holder }</Table.Cell>
                                  <Table.Cell width={ 2 }>{ result.invoice && result.invoice.number }</Table.Cell>
                                  <Table.Cell width={ 2 }>{ result.amount }</Table.Cell>
                                  <Table.Cell width={ 2 }>
                                    <Button
                                      onClick={ this.handleViewDetail }
                                      name={ result.uid }
                                      icon='eye'
                                      content='Detail'
                                      floated='right' />
                                  </Table.Cell>
                                </Table.Row>
                                <Table.Row key={ `view_${result.uid}` } >
                                  <Table.Cell colSpan='8' hidden={ !this.state[result.uid] } >
                                    { Array.isArray(result.paymentDetails) && result.paymentDetails.map(paymentDetail => (
                                      <div>{ paymentDetail.type }</div>
                                    )) }
                                  </Table.Cell>
                                </Table.Row>
                              </Table.Body >
                            </Table >
                          </Table.Cell>
                        </Table.Row>
                        : this.props.tableType === TableType.SHOW_INVOICES &&
                        <Table.Row key={ result.uid }>
                          <Table.Cell collapsing></Table.Cell>
                          <Table.Cell>{ result.number }</Table.Cell>
                          <Table.Cell>{ result.customer && result.customer.name }</Table.Cell>
                          <Table.Cell>{ result.createdDate }</Table.Cell>
                          <Table.Cell>{ result.issueDate }</Table.Cell>
                          <Table.Cell>{ result.amount }</Table.Cell>
                          <Table.Cell>{ result.amountPending }</Table.Cell>
                          <Table.Cell>{ result.payDown ? result.payDown : 'En attente'}</Table.Cell>
                          <Table.Cell>
                            <ShowInvoice invoiceUid={ result.uid } generatePdfInvoice={ this.props.generatePdfInvoice } />
                            <Button
                              icon='edit'
                              floated='right' />
                            <PaymentMethod invoiceUid={ result.uid } updateItem={ this.props.updateItem } amount={ result.amountPending } />
                          </Table.Cell>
                        </Table.Row>
              )) : <Table.Row>
                <Table.HeaderCell colSpan='7'>
                  <Grid textAlign='center'>
                    <Grid.Row>
                      <Icon size='big' name='pdf file outline' />
                    </Grid.Row>
                    <Grid.Row>Pas d'elements, la liste est vide.</Grid.Row>
                  </Grid>
                </Table.HeaderCell>
              </Table.Row>
              }
            </Table.Body>
            { this.props.tableType === TableType.SHOW_BORDEREAUX &&
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='7'>
                  <Button as={ Link } to='/factures' floated='right' icon labelPosition='left' primary size='small'>
                    <Icon name='user' /> Nouvelle facture
                  </Button>
                  <Button name='all' onClick={ this.props.onChecked } size='small'>{ this.props.state.allChecked ? 'Tout décocher' : 'Tout sélectionner' }</Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
            }
          </Table>
        </Grid.Column>
      </Grid.Row>
      {((Array.isArray(itemTable) && itemTable.length >= DEFAULT_PAGE_SIZE) || this.state.activePage > 1) === true &&
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Pagination
            defaultActivePage={ this.state.activePage || DEFAULT_ACTIVE_PAGE }
            ellipsisItem={ { content: <Icon name='ellipsis horizontal' />, icon: true } }
            onPageChange={ this.handlePaginationChange }
            prevItem={ { content: <Icon name='angle left' />, icon: true } }
            nextItem={ { content: <Icon name='angle right' />, icon: true } }
            totalPages={ this.state.total_pages || (Math.ceil(items && items.length / DEFAULT_PAGE_SIZE)) }
          />
        </Grid.Column>
      </Grid.Row>
      }
    </Grid>
  )
}
}

export default TableInternal
