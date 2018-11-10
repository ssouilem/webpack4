import React from 'react'
import { Grid, Segment, Breadcrumb, Sticky, Header } from 'semantic-ui-react'
import { actions as productsActions } from 'ACTIONS/produits'
import TableInternal from 'COMPONENTS/Common/TableInternal'
import AddProduct from 'COMPONENTS/Products/AddProduct'
import { TableType } from 'COMPONENTS/Utils/Utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'info', content: 'Produits', active: true },
]
class Products extends React.Component {
  state = { contextRef: false }

  componentWillMount () {
    if (!this.props.products.sending && !this.props.products.data) {
      this.props.fetchProducts()
    }
  }
  // Sticky
  handleContextRef = contextRef => this.setState({ contextRef })

  render = () => (
    <Grid ref={ this.handleContextRef }>
      <Grid.Column width={ 1 } >
      </Grid.Column>
      <Grid.Column width={ 15 }>
        <Grid>
          <Grid.Row>
            <Grid.Column width={ 12 }>
              <Breadcrumb divider='/' sections={ sections } />
            </Grid.Column>
            <Grid.Column width={ 4 } >
              <AddProduct />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={ 12 }>
              <TableInternal
                items={ this.props.products.produits }
                onClick={ (action) => console.log('view or edit', action) }
                tableType={ TableType.SHOW_PRODUCTS } />
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

Products.propTypes = {
  products: PropTypes.object,
}

const mapStateToProps = state => ({
  products: state.produits,
})

const mapDispatchToProps = dispatch => ({
  fetchProduits: productsActions.fetchProduits(dispatch),
  fetchProducts: productsActions.fetchProducts(dispatch),
  dispatch,
})
export { Products }
export default connect(mapStateToProps, mapDispatchToProps)(Products)
