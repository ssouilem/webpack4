import _ from 'lodash'
import React from 'react'
import {Header, Grid, Table, Button, Search, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const CompaniesList = ({ onClick, handleResultSelect, handleSearchChange, fetchClients, clients, isLoading, value, results }) => (
    <Grid textAlign='center' >
      <Grid.Row>
        <Grid.Column width={ 8 } textAlign='left'>
          <Header as='h5'>LISTE DES CLIENTS</Header>
        </Grid.Column>
        <Grid.Column width={ 8 } textAlign='right' >
          <Search
            loading={ isLoading }
            onResultSelect={ handleResultSelect }
            onSearchChange={ _.debounce(handleSearchChange, 500, { leading: true }) }
            results={ results }
            value={ value }
          />
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
              <Table.Row key={ client.id }>
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
  handleResultSelect: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  fetchClients: PropTypes.func.isRequired,
  clients: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CompaniesList
