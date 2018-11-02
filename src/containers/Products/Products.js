import React from 'react'
import _ from 'lodash'
import { Header, Grid, Table, Segment, Icon, Button, Breadcrumb, Search } from 'semantic-ui-react'
import { actions as productsActions } from 'ACTIONS/produits'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'info', content: 'Produits', active: true },
]

class Products extends React.Component {
  componentWillMount () {
    this.resetComponent()
  }
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
  handleResultSelect = (e, { result }) => this.setState({ value: result.description })
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.reference)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.products, isMatch),
      })
    }, 300)
  }

  render () {
    const { isLoading, value, results } = this.state

    return (
      <Grid >
        <Grid.Column width={ 1 } >
        </Grid.Column>
        <Grid.Column width={ 15 }>
          <Grid >
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
                <Grid textAlign='center' >
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
                      <Table >
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Reference</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Qualité</Table.HeaderCell>
                            <Table.HeaderCell>Prix</Table.HeaderCell>
                            <Table.HeaderCell>Unit</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          { results.length >= 1 ? results.map(product => (
                            <Table.Row id={ product.id }>
                              <Table.Cell>{ product.reference }</Table.Cell>
                              <Table.Cell>{ product.description }</Table.Cell>
                              <Table.Cell>{ product.quality }</Table.Cell>
                              <Table.Cell>{ product.price }</Table.Cell>
                              <Table.Cell>{ product.unit }</Table.Cell>
                              <Table.Cell>Actions</Table.Cell>
                            </Table.Row>
                          )) : this.props.products ? this.props.products.map(product => (
                            <Table.Row id={ product.id }>
                              <Table.Cell>{ product.reference }</Table.Cell>
                              <Table.Cell>{ product.description }</Table.Cell>
                              <Table.Cell>{ product.quality }</Table.Cell>
                              <Table.Cell>{ product.price }</Table.Cell>
                              <Table.Cell>{ product.unit }</Table.Cell>
                              <Table.Cell>Actions</Table.Cell>
                            </Table.Row>
                          )) : <Table.Row>
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

Products.propTypes = {
  products: PropTypes.object,
}

const mapStateToProps = state => ({
  products: state.produits.produits,
})

const mapDispatchToProps = dispatch => ({
  fetchProduits: productsActions.fetchProduits(dispatch),
  dispatch,
})
export { Products }
export default connect(mapStateToProps, mapDispatchToProps)(Products)
