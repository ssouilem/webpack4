import _ from 'lodash'
import React from 'react'
import {Header, Grid, Table, Button, Icon } from 'semantic-ui-react'
import SearchSimple from 'CONTAINERS/Search/SearchSimple'
import PropTypes from 'prop-types'

const CompaniesList = ({ onClick, fetchClients, clients }) => (
  <Grid textAlign='center' >
    <Grid.Row>
      <Grid.Column width={ 8 } textAlign='left'>
        <Header as='h5'>LISTE DES CLIENTS</Header>
      </Grid.Column>
      <Grid.Column width={ 8 } textAlign='right' >
        <SearchSimple source={ clients.map(client => ({
          key: client.id,
          title: client.title,
          description: client.description,
        })) } />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
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
          { clients ? clients.map(client => (
            <Table.Row key={ client.key }>
              <Table.HeaderCell>{ client.name }</Table.HeaderCell>
              <Table.HeaderCell>{ client.siret }</Table.HeaderCell>
              <Table.HeaderCell>{ client.contactName }</Table.HeaderCell>
              <Table.HeaderCell>{ client.city }</Table.HeaderCell>
              <Table.HeaderCell>
              <Button
                onClick={ onClick }
                icon='edit'
                color='olive'
                floated='right' />

              <Button
                  onClick={ onClick }
                  icon='low vision'
                  color='green'
                  floated='right' />
                </Table.HeaderCell>
            </Table.Row>
            )) :
              <Table.Row>
                <Table.HeaderCell colSpan='7'>
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
    </Grid.Row>
  </Grid>
)

CompaniesList.propTypes = {
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

export default CompaniesList
