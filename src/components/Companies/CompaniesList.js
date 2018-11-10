import React from 'react'
import { Grid, Table, Button, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import AddCustomer from 'COMPONENTS/Client/AddCustomer'

const CompaniesList = ({ onClick, fetchClients, clients }) => (
  <Grid.Column textAlign='center'>
    <Table >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nom de client</Table.HeaderCell>
          <Table.HeaderCell>Numéro de TVA</Table.HeaderCell>
          <Table.HeaderCell>Interlocuteur</Table.HeaderCell>
          <Table.HeaderCell>Ville</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { fetchClients.length >= 1 ? fetchClients.map(client => (
          <Table.Row key={ client.key }>
            <Table.HeaderCell>{ client.name }</Table.HeaderCell>
            <Table.HeaderCell>{ client.siret }</Table.HeaderCell>
            <Table.HeaderCell>{ client.contactName }</Table.HeaderCell>
            <Table.HeaderCell>{ client.city }</Table.HeaderCell>
            <Table.HeaderCell>
              <AddCustomer>
                <Button
                  icon='pencil'
                  inverted
                  color='blue'
                  floated='right' />
              </AddCustomer>
              <Button
                onClick={ onClick }
                icon='delete'
                color='red'
                inverted
                floated='right' />
            </Table.HeaderCell>
          </Table.Row>
        )) : clients ? clients.map(client => (
          <Table.Row key={ client.key }>
            <Table.Cell>{ client.name }</Table.Cell>
            <Table.Cell>{ client.siret }</Table.Cell>
            <Table.Cell>{ client.contactName }</Table.Cell>
            <Table.Cell>{ client.city }</Table.Cell>
            <Table.Cell>
              <AddCustomer>
                <Button
                  icon='pencil'
                  inverted
                  color='blue'
                  floated='right' />
              </AddCustomer>
              <Button
                onClick={ onClick }
                icon='delete'
                color='red'
                inverted
                floated='right' />
            </Table.Cell>
          </Table.Row>
        )) : <Table.Row>
          <Table.HeaderCell colSpan='5'>
            <Grid textAlign='center'>
              <Grid.Row>
                <Icon size='big' name='pdf file outline' />
              </Grid.Row>
              <Grid.Row>
                  Pas des clients dans la liste.
              </Grid.Row>
              <Grid.Row>
                <Button primary>Ajouter un client</Button>
              </Grid.Row>
            </Grid>
          </Table.HeaderCell>
        </Table.Row>
        }
      </Table.Body>
    </Table>
  </Grid.Column>
)

CompaniesList.propTypes = {
  fetchClients: PropTypes.array,
  clients: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

export default CompaniesList
