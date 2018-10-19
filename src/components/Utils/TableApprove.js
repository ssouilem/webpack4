import React from 'react'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

const TableApprove = (props) => (
  <Table basic='very' compact selectable  >
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
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox  />
        </Table.Cell>
        <Table.Cell>John Lilki</Table.Cell>
        <Table.Cell>September 14, 2013</Table.Cell>
        <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
        <Table.Cell>No</Table.Cell>
        <Table.Cell>No</Table.Cell>
        <Table.Cell>No</Table.Cell>
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
      <Table.Row>
        <Table.Cell collapsing>
          <Checkbox  />
        </Table.Cell>
        <Table.Cell>Jamie Harington</Table.Cell>
        <Table.Cell>January 11, 2014</Table.Cell>
        <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
        <Table.Cell>Yes</Table.Cell>
        <Table.Cell>No</Table.Cell>
        <Table.Cell>No</Table.Cell>
        <Table.Cell>No</Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='7'>
          <Button floated='right' icon labelPosition='left' primary size='small'>
            <Icon name='user' /> Nouvelle facture
          </Button>
          <Button size='small'>Approve</Button>
          <Button disabled size='small'>
            Approve All
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default TableApprove
