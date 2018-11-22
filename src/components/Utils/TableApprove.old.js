import React from 'react'
import { Button, Checkbox, Icon, Table, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const TableApprove = (props) => (
  <Table basic='very' compact selectable stackable >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>{ props.title.cell_1 }</Table.HeaderCell>
        <Table.HeaderCell>{ props.title.cell_2 }</Table.HeaderCell>
        <Table.HeaderCell>{ props.title.cell_3 }</Table.HeaderCell>
        <Table.HeaderCell>{ props.title.cell_4 }</Table.HeaderCell>
        <Table.HeaderCell>{ props.title.cell_5 }</Table.HeaderCell>
        <Table.HeaderCell>{ props.title.cell_6 }</Table.HeaderCell>
        <Table.HeaderCell>{ props.title.cell_7 }</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body >
      {(props.bordereaux.data && props.bordereaux.data.length > 0 && props.bordereaux.data.map(bordereau => (
        <Table.Row key={ bordereau.id }>
          <Table.Cell collapsing>
            <Checkbox name={ bordereau.id } onChange={ props.onClick } checked={ props.state[bordereau.id] } />
          </Table.Cell>
          <Table.Cell>{ bordereau.number }</Table.Cell>
          <Table.Cell>{ bordereau.customer }</Table.Cell>
          <Table.Cell>{ bordereau.createdDate }</Table.Cell>
          <Table.Cell>{ bordereau.treatmentDate }</Table.Cell>
          <Table.Cell>{ !bordereau.invoice && bordereau.invoice }</Table.Cell>
          <Table.Cell>{ bordereau.subTotal }</Table.Cell>
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
        </Table.Row>
      ))) ||
      <Table.Row>
        <Header icon>
          <Icon name='search' />
          Nous n'avons aucun document correspondant à votre requête.
        </Header>
      </Table.Row>
      }
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='7'>
          <Button as={ Link } to='/factures' floated='right' icon labelPosition='left' primary size='small'>
            <Icon name='user' /> Nouvelle facture
          </Button>
          <Button name='all' onClick={ props.onClick } size='small'>{ props.state.allChecked ? 'Tout décocher' : 'Tout sélectionner' }</Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default TableApprove
