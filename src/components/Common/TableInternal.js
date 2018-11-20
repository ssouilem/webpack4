import React from 'react'
import _ from 'lodash'
import { Header, Grid, Table, Icon, Search, Button, Checkbox, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { TableType } from 'COMPONENTS/Utils/Utils'
import PaymentMethod from 'COMPONENTS/Invoices/PaymentMethod'
import AddProduct from 'COMPONENTS/Products/AddProduct'
import AddCustomer from 'COMPONENTS/Client/AddCustomer'
import styles from './TableInternal.less'

class TableInternal extends React.Component {
  state = { pageSize: 5, page: 1, activePage: 1, results: [] }

  componentWillMount () {
    this.resetComponent()
  }

  handlePaginationChange = (e, { activePage }) => {
    console.log(e, activePage)
    this.getPaginatedItems(activePage, 5)
    this.setState({ activePage })
  }
  getPaginatedItems = (page, pageSize) => {
    const items = (Array.isArray(this.state.results) && this.state.results.length >= 1) ? this.state.results : this.props.items
    let pg = page || this.state.page
    let pgSize = pageSize || this.state.pageSize
    let offset = (pg - 1) * pgSize
    let pagedItems = _.drop(items, offset).slice(0, pgSize)
    this.setState({page: pg,
      pageSize: pgSize,
      total: items && items.length,
      total_pages: Math.ceil(items && items.length / pgSize),
      data: pagedItems})
  }

  resetComponent = () => this.setState({ isLoading: false,
    results: [],
    data: [],
    value: '',
    items: this.props.items,
    total_pages: Math.ceil(this.props.items && this.props.items.length / this.state.pageSize)})

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
          isMatch = result => re.test(result.company)
          break
        case TableType.SHOW_CUSTOMERS :
          console.log('Search customer')
          isMatch = result => re.test(result.name)
          break
        default:
          isMatch = result => re.test(result.reference)
          break
      }
      var results = _.filter(this.props.items, isMatch)
      this.setState({
        isLoading: false,
        results: results,
        total_pages: Math.ceil(results && results.length / this.state.pageSize),
      })
    }, 300)
  }
  _handleDeleteItem = (e, { id }) => {
    console.log('Delete Id : ', id)
    this.props.deleteItem(id)
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
                  : this.props.tableType === TableType.SHOW_INVOICES &&
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell>FACTURE N°</Table.HeaderCell>
                      <Table.HeaderCell>CLIENT</Table.HeaderCell>
                      <Table.HeaderCell>DATE DE CREATION</Table.HeaderCell>
                      <Table.HeaderCell>ÉCHÉANCE</Table.HeaderCell>
                      <Table.HeaderCell>MONTANT</Table.HeaderCell>
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
                    <Table.Cell>{ result.quality }</Table.Cell>
                    <Table.Cell>{ result.price }</Table.Cell>
                    <Table.Cell>{ result.unit }</Table.Cell>
                    <Table.Cell>
                      <AddProduct product={ result } submitForm={ this.props.updateItem } >
                        <Button primary
                          onClick={ this.handleOpen }
                          icon='pencil'
                          inverted
                          floated='right' />
                      </AddProduct>
                      <Button
                        id={ result.uid }
                        onClick={ this._handleDeleteItem }
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
                      <Table.Cell>{ result.contactName }</Table.Cell>
                      <Table.Cell>{ result.city }</Table.Cell>
                      <Table.Cell>
                        <AddCustomer customer={ result } submitForm={ this.props.updateItem }>
                          <Button
                            icon='pencil'
                            inverted
                            color='blue'
                            floated='right' />
                        </AddCustomer>
                        <Button
                          id={ result.uid }
                          onClick={ this._handleDeleteItem }
                          icon='delete'
                          color='red'
                          inverted
                          floated='right' />
                      </Table.Cell>
                    </Table.Row>
                    : (this.props.tableType === TableType.SHOW_BORDEREAUX)
                      ? <Table.Row key={ result.id }>
                        <Table.Cell collapsing>
                          <Checkbox name={ result.id } onChange={ this.props.onChecked } checked={ this.props.state[result.id] } />
                        </Table.Cell>
                        <Table.Cell>{ result.number }</Table.Cell>
                        <Table.Cell>{ result.company }</Table.Cell>
                        <Table.Cell>{ result.createdDate }</Table.Cell>
                        <Table.Cell>{ result.treatmentDate }</Table.Cell>
                        <Table.Cell>{ !result.invoice && result.invoice }</Table.Cell>
                        <Table.Cell>{ result.subTotal }</Table.Cell>
                        <Table.Cell>
                          <Button
                            icon='delete'
                            id={ result.id }
                            onClick={ this._handleDeleteItem }
                            // color='red'
                            floated='right' />

                          <Button primary
                            icon='sign out'
                            content='Update'
                            // color='red'
                            floated='right' />
                        </Table.Cell>
                      </Table.Row>
                      : this.props.tableType === TableType.SHOW_INVOICES &&
                        <Table.Row key={ result.id }>
                          <Table.Cell collapsing>
                            <Checkbox name={ result.id } onChange={ this.props.onChecked } checked={ this.props.state[result.id] } />
                          </Table.Cell>
                          <Table.Cell>{ result.number }</Table.Cell>
                          <Table.Cell>{ result.company }</Table.Cell>
                          <Table.Cell>{ result.createdDate }</Table.Cell>
                          <Table.Cell>{ result.issueDate }</Table.Cell>
                          <Table.Cell>{ result.amount }</Table.Cell>
                          <Table.Cell>{ result.payDown ? result.payDown : 'En attente'}</Table.Cell>
                          <Table.Cell>
                            <Button
                              icon='edit'
                              floated='right' />
                            <PaymentMethod />
                          </Table.Cell>
                        </Table.Row>
              )) :
                <Table.Row>
                  <Table.HeaderCell colSpan='7'>
                    <Grid textAlign='center'>
                      <Grid.Row>
                        <Icon size='big' name='pdf file outline' />
                      </Grid.Row>
                      <Grid.Row>
                          Pas d'elements, la liste est vide.
                      </Grid.Row>
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
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Pagination
            defaultActivePage={ this.state.page || 1 }
            ellipsisItem={ { content: <Icon name='ellipsis horizontal' />, icon: true } }
            onPageChange={ this.handlePaginationChange }
            prevItem={ { content: <Icon name='angle left' />, icon: true } }
            nextItem={ { content: <Icon name='angle right' />, icon: true } }
            totalPages={ this.state.total_pages || (Math.ceil(items && items.length / 5)) }
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
}

export default TableInternal
