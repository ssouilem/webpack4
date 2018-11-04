import React from 'react'
import _ from 'lodash'
import { Header, Grid, Table, Icon, Search, Button, Checkbox } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { TableType } from 'COMPONENTS/Utils/Utils'
import styles from './TableInternal.less'

class TableInternal extends React.Component {
  componentWillMount () {
    this.resetComponent()
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '', items: this.props.items })
  handleResultSelect = (e, { result }) => this.setState({ value: result.description })
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.reference)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.items, isMatch),
      })
    }, 300)
  }
render = ({isLoading, results, value} = this.state, { items } = this.props) => (
  <Grid textAlign='center' className={ styles.table }>
    <Grid.Row>
      <Grid.Column width={ 8 } textAlign='left'>
        <Header as='h5'>PRODUITS ET SERVICES</Header>
      </Grid.Column>
      <Grid.Column width={ 8 } textAlign='right' >
        <Search
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
            : this.props.tableType === TableType.SHOW_BORDEREAUX &&
            <Table.Header>
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
          }
          <Table.Body>
            { results.length >= 1 ? results.map(result => (
              (this.props.tableType === TableType.SHOW_PRODUCTS) ? <Table.Row id={ result.id }>
                <Table.Cell>{ result.reference }</Table.Cell>
                <Table.Cell>{ result.description }</Table.Cell>
                <Table.Cell>{ result.quality }</Table.Cell>
                <Table.Cell>{ result.price }</Table.Cell>
                <Table.Cell>{ result.unit }</Table.Cell>
                <Table.Cell>Actions</Table.Cell>
              </Table.Row>
                : (this.props.tableType === TableType.SHOW_BORDEREAUX) ? <Table.Row key={ result.id }>
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
                      // color='red'
                      floated='right' />
                    <Button primary
                      icon='sign out'
                      content='Update'
                      // color='red'
                      floated='right' />
                  </Table.Cell>
                </Table.Row> : ''
            )) : items && items.length >= 1 ? items.map(item => (
              this.props.tableType === TableType.SHOW_PRODUCTS ? <Table.Row id={ item.id }>
                <Table.Cell>{ item.reference }</Table.Cell>
                <Table.Cell>{ item.description }</Table.Cell>
                <Table.Cell>{ item.quality }</Table.Cell>
                <Table.Cell>{ item.price }</Table.Cell>
                <Table.Cell>{ item.unit }</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={ this.props.onClick }
                    icon='edit'
                    color='olive'
                    floated='right' />
                  <Button
                    onClick={ this.props.onClick({action: 'Edit'}) }
                    icon='low vision'
                    color='green'
                    floated='right' />
                </Table.Cell>
              </Table.Row>
                : this.props.tableType === TableType.SHOW_BORDEREAUX ? <Table.Row key={ item.id }>
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
                      // color='red'
                      floated='right' />
                    <Button primary
                      icon='sign out'
                      content='Update'
                      // color='red'
                      floated='right' />
                  </Table.Cell>
                </Table.Row> : ''
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
  </Grid>
)
}

export default TableInternal
