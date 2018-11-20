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
  componentWillMount () {
    this.resetComponent()
  }

  // getPaginatedItems= (items, page) => {
  //   let page = page || 1
  //   var per_page = 3
  //   var offset = (page - 1) * per_page, paginatedItems = _.rest(items, offset).slice(0, per_page);
  //   return {
  //   	page: page,
  //   	per_page: per_page,
  //   	total: items.length,
  //   	total_pages: Math.ceil(items.length / per_page),
  //   	data: paginatedItems
  //   };
  // }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '', items: this.props.items })
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
        default:
          isMatch = result => re.test(result.reference)
          break
      }
      this.setState({
        isLoading: false,
        results: _.filter(this.props.items, isMatch),
      })
    }, 300)
  }
  _handleDeleteItem = (e, { id }) => {
    console.log('Delete Id : ', id)
    this.props.deleteItem(id)
  }

render = ({isLoading, results, value} = this.state, { items } = this.props) => (
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
            { results.length >= 1 ? results.map(result => (
              (this.props.tableType === TableType.SHOW_PRODUCTS)
                ? <Table.Row key={ result.uid }>
                  <Table.Cell>{ result.reference }</Table.Cell>
                  <Table.Cell>{ result.description }</Table.Cell>
                  <Table.Cell>{ result.quality }</Table.Cell>
                  <Table.Cell>{ result.price }</Table.Cell>
                  <Table.Cell>{ result.unit }</Table.Cell>
                  <Table.Cell>
                    <AddProduct submitForm={ this.props.updateItem } >
                      <Button primary
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
                      <AddCustomer submitForm={ this.props.updateItem }>
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
            )) : items && items.length >= 1 ? items.map(item => (
              this.props.tableType === TableType.SHOW_PRODUCTS
                ? <Table.Row key={ item.uid }>
                  <Table.Cell>{ item.reference }</Table.Cell>
                  <Table.Cell>{ item.description }</Table.Cell>
                  <Table.Cell>{ item.quality }</Table.Cell>
                  <Table.Cell>{ item.price }</Table.Cell>
                  <Table.Cell>{ item.unit }</Table.Cell>
                  <Table.Cell>
                    <AddProduct submitForm={ this.props.updateItem } >
                      <Button primary
                        icon='pencil'
                        inverted
                        floated='right' />
                    </AddProduct>
                    <Button
                      id={ item.uid }
                      onClick={ this._handleDeleteItem }
                      icon='delete'
                      color='red'
                      inverted
                      floated='right' />
                  </Table.Cell>
                </Table.Row>
                : (this.props.tableType === TableType.SHOW_CUSTOMERS)
                  ? <Table.Row key={ item.uid }>
                    <Table.Cell>{ item.name }</Table.Cell>
                    <Table.Cell>{ item.siret }</Table.Cell>
                    <Table.Cell>{ item.contactName }</Table.Cell>
                    <Table.Cell>{ item.city }</Table.Cell>
                    <Table.Cell>
                      <AddCustomer submitForm={ this.props.updateItem }>
                        <Button
                          icon='pencil'
                          inverted
                          color='blue'
                          floated='right' />
                      </AddCustomer>
                      <Button
                        id={ item.uid }
                        onClick={ this._handleDeleteItem }
                        icon='delete'
                        color='red'
                        inverted
                        floated='right' />
                    </Table.Cell>
                  </Table.Row>
                  : this.props.tableType === TableType.SHOW_BORDEREAUX
                    ? <Table.Row key={ item.id }>
                      <Table.Cell collapsing>
                        <Checkbox name={ item.id } onChange={ this.props.onChecked } checked={ this.props.state[item.id] } />
                      </Table.Cell>
                      <Table.Cell>{ item.number }</Table.Cell>
                      <Table.Cell>{ item.company }</Table.Cell>
                      <Table.Cell>{ item.createdDate }</Table.Cell>
                      <Table.Cell>{ item.treatmentDate }</Table.Cell>
                      <Table.Cell>{ !item.invoice && item.invoice }</Table.Cell>
                      <Table.Cell>{ item.subTotal }</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon='delete'
                          id={ item.id }
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
                    <Table.Row key={ item.id }>
                      <Table.Cell collapsing>
                        <Checkbox name={ item.id } onChange={ this.props.onChecked } checked={ this.props.state[item.id] } />
                      </Table.Cell>
                      <Table.Cell>{ item.number }</Table.Cell>
                      <Table.Cell>{ item.company }</Table.Cell>
                      <Table.Cell>{ item.createdDate }</Table.Cell>
                      <Table.Cell>{ item.issueDate }</Table.Cell>
                      <Table.Cell>{ item.amount.toFixed(3) }</Table.Cell>
                      <Table.Cell>{ item.payDown ? item.payDown : 'En attente' }</Table.Cell>
                      <Table.Cell>
                        <Button
                          icon='edit'
                          floated='right' />
                        <PaymentMethod />
                      </Table.Cell>
                    </Table.Row>
            )) : <Table.Row>
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
          defaultActivePage={ 5 }
          ellipsisItem={ { content: <Icon name='ellipsis horizontal' />, icon: true } }
          firstItem={ { content: <Icon name='angle double left' />, icon: true } }
          lastItem={ { content: <Icon name='angle double right' />, icon: true } }
          prevItem={ { content: <Icon name='angle left' />, icon: true } }
          nextItem={ { content: <Icon name='angle right' />, icon: true } }
          totalPages={ 10 }
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)
}

export default TableInternal
