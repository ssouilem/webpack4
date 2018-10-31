import React from 'react'
import _ from 'lodash'
import { Header, Grid, Table, List, Segment, Icon, Button, Breadcrumb, Search } from 'semantic-ui-react'

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'registration', content: 'Registration', link: true },
  { key: 'info', content: 'Personal Information', active: true },
]

const source = [{
  title: 'test',
  description: 'test',
  price: 'test'
}]

class Products extends React.Component {

  componentWillMount () {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render () {
    const { isLoading, value, results } = this.state

    return (
      <Grid celled >
        <Grid.Column width={ 1 } >
        </Grid.Column>
        <Grid.Column width={ 15 }>
          <Grid celled >
            <Grid.Row>
              <Grid.Column width={ 12 }>
                <Breadcrumb divider='/' sections={ sections } />
              </Grid.Column>
              <Grid.Column width={ 4 } >
                <Button fluid primary>Créer un produit</Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                <Grid celled textAlign='center' >
                  <Grid.Row>
                    <Grid.Column width={ 8 } textAlign='left'>
                      <Header as='h5'>PRODUITS ET SERVICES</Header>
                    </Grid.Column>
                    <Grid.Column width={ 8 } textAlign='right' >
                      <Search
                        loading={ isLoading }
                        onResultSelect={ this.handleResultSelect }
                        onSearchChange={ _.debounce(this.handleSearchChange, 500, { leading: true }) }
                        results={results}
                        value={value}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column textAlign='center'>
                      <Table >
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Reference</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Qte</Table.HeaderCell>
                            <Table.HeaderCell>Reduction</Table.HeaderCell>
                            <Table.HeaderCell>Unit</Table.HeaderCell>
                            <Table.HeaderCell>Total</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>

                          {this.state && this.state.bordereauDetails ? this.state.bordereauDetails.map(bordereauDetail => (
                            <label> tests </label>
                          )) :
                            <Table.Row>
                              <Table.HeaderCell colSpan='7'>
                                <Grid textAlign='center'>
                                  <Grid.Row>
                                    <Icon size='big' name='pdf file outline' />
                                  </Grid.Row>
                                  <Grid.Row>
                                      Pas de produits dans la liste.
                                  </Grid.Row>
                                  <Grid.Row>
                                    <Button primary>Créer un produit</Button>
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
              </Grid.Column>
              <Grid.Column width={ 4 }>
                <Grid celled >
                  <Segment.Group>
                    <Segment>MON COMPTE</Segment>
                    <Segment>> Parametres de facturation</Segment>
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
}

export default Products
