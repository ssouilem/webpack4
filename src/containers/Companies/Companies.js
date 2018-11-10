import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Header, Grid, Segment, Breadcrumb, Search, Sticky } from 'semantic-ui-react'
// import { FormattedMessage } from 'react-intl'
import CompaniesList from 'COMPONENTS/Companies/CompaniesList'
import AddCustomer from 'COMPONENTS/Client/AddCustomer'
import { actions as clientsActions } from 'ACTIONS/clients'
// import { push } from 'react-router-redux'
import styles from './Companies.less'

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'registration', content: 'Clients', link: true },
]

class Campanies extends React.Component {
  componentWillMount () {
    this.props.fetchClients()
    this.resetComponent()
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
  handleResultSelect = (e, { result }) => this.setState({ value: result.name })
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.name)
      this.setState({
        isLoading: false,
        results: _.filter(this.props.clients, isMatch),
      })
    }, 300)
  }
  // Sticky
  handleContextRef = contextRef => this.setState({ contextRef })

  render = () => (
    <Grid >
      <Grid.Column width={ 1 } >
      </Grid.Column>
      <Grid.Column width={ 15 }>
        <Grid ref={ this.handleContextRef } >
          <Grid.Row>
            <Grid.Column width={ 12 }>
              <Breadcrumb divider=' > ' sections={ sections } />
            </Grid.Column>
            <Grid.Column width={ 4 } >
              <AddCustomer />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={ 12 }>
              <Grid textAlign='center' >
                <Grid.Row>
                  <Grid.Column width={ 8 } textAlign='left'>
                    <Header as='h5'>LISTE DES CLIENTS</Header>
                  </Grid.Column>
                  <Grid.Column width={ 8 } textAlign='right' >
                    <Search
                      name='searchProduct'
                      loading={ this.state.isLoading }
                      onResultSelect={ this.handleResultSelect }
                      onSearchChange={ _.debounce(this.handleSearchChange, 500, { leading: true }) }
                      results={ this.state.results }
                      value={ this.state.value }
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <CompaniesList
                    onClick={ this.props.onClick }
                    fetchClients={ this.state.results }
                    clients={ this.props.clients.map(client => ({
                      key: client.id,
                      title: client.name,
                      name: client.name,
                      description: client.name,
                      contactName: client.contactName,
                      siret: client.siret,
                      city: client.city,
                    })) } />
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={ 4 }>
              <Sticky context={ this.state.contextRef } >
                <Grid as={ Segment } placeholder>
                  <Header as='h5' icon='cog' content='Paramètres' />
                  <Segment.Group>
                    <Segment>MON COMPTE</Segment>
                    <Segment>> Parametres de facturation</Segment>
                    <Segment>Parametres de compte</Segment>
                    <Segment>Monnais de paiement</Segment>
                  </Segment.Group>
                </Grid>
              </Sticky>
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
