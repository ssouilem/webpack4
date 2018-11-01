import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Header, Grid, Table, List, Segment, Icon, Button, Breadcrumb, Search, Select } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import CompaniesList from 'COMPONENTS/Companies/CompaniesList'
import { actions as clientsActions } from 'ACTIONS/clients'

// import { push } from 'react-router-redux'
import styles from './Companies.less'

const ROLES = [
  { key: 50, value: 50, text: 'Owner' },
  { key: 40, value: 40, text: 'Scrum Master' },
  { key: 30, value: 30, text: 'Developper' },
  { key: 10, value: 10, text: 'Guest' },
]

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'registration', content: 'Registration', link: true },
  { key: 'info', content: 'Personal Information', active: true },
]


class Campanies extends React.Component {
  componentWillMount() {
    this.props.fetchClients()
  }
  render = () => (
    <Grid celled >
      <Grid.Column width={ 1 } >
      </Grid.Column>
      <Grid.Column width={ 15 }>
        <Grid celled >
          <Grid.Row>
            <Grid.Column width={ 12 }>
              <Breadcrumb divider='/' sections={ sections } />
              <Select
                selectOnBlur={ false }
                options= { ROLES }/>
            </Grid.Column>
            <Grid.Column width={ 4 } >
              <Button fluid primary>Ajouter un client</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={ 12 }>

            <CompaniesList
              onClick={ this.props.onClick }
              fetchClients={ this.props.fetchClients }
              clients={ this.props.clients.map(client => ({
                key: client.id,
                title: client.name,
                name: client.name,
                description: client.name,
                contactName: client.contactName,
                siret: client.siret,
                city: client.city,
              })) } />

            </Grid.Column>
            <Grid.Column width={ 4 }>
              <Grid celled >
                <Segment.Group>
                  <Segment>MON COMPTE</Segment>
                  <Segment>Parametres de facturation</Segment>
                  <Segment>Parametres de compte</Segment>
                  <Segment>Monnais de paiement</Segment>
                </Segment.Group>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  )
}

Campanies.propTypes = {}

const mapStateToProps = state => ({
  clients: state.clients.data,
  isLoading: state.isLoading,
  value: state.value,
  results: state.results,
})

const mapDispatchToProps = dispatch => ({
  onClick: () => { console.log('onClick ++++ ') },
  fetchClients: clientsActions.fetchClients(dispatch),
  dispatch,
})

export { Campanies }
export default connect(mapStateToProps, mapDispatchToProps)(Campanies)
