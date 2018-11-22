import React from 'react'
import { Grid, Segment, Breadcrumb, Sticky, Header, Dimmer, Image } from 'semantic-ui-react'
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
  state = {}

  componentWillMount () {
    if (!this.props.products.sending && !this.props.products.data) {
      this.props.fetchProducts()
    }
  }
  // Sticky
  handleContextRef = contextRef => this.setState({ contextRef })

  setActivePage = (activePage) => this.setState({ activePage: activePage })

  render = ({ contextRef } = this.state) => (
    <div ref={ this.handleContextRef }>
      <Grid>
        <Grid.Column width={ 1 } >
        </Grid.Column>
        <Grid.Column width={ 15 }>
          <Grid>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                <Breadcrumb divider='/' sections={ sections } />
              </Grid.Column>
              <Grid.Column width={ 4 } >
                <AddProduct
                  sending={ (this.props.products && Array.isArray(this.props.products.data) && this.props.products.sending) }
                  done={ (this.props.products && Array.isArray(this.props.products.data) && this.props.products.done) }
                  submitForm={ this.props.createProduct } />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={ 12 }>
                { !this.props.products.sending && (this.props.products && Array.isArray(this.props.products.data) && this.props.products.data.length >= 1) === true ?
                  <TableInternal
                    activePage={ this.state.activePage }
                    setActivePage={ this.setActivePage }
                    items={ this.props.products.data }
                    onClick={ (action) => console.log('view or edit', action) }
                    tableType={ TableType.SHOW_PRODUCTS }
                    updateItem={ this.props.createProduct }
                    deleteItem={ this.props.deleteProduct } />
                  : <Dimmer active inverted>
                    <Image size='small' centered src={ require('STYLES/images/preload_waiting.gif') } />
                    Chargement en cours!
                  </Dimmer>}
              </Grid.Column>
              <Grid.Column width={ 4 }>
                <Sticky context={ contextRef } >
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
    </div>
  )
}

Products.propTypes = {
  products: PropTypes.object,
}

const mapStateToProps = state => ({
  products: state.produits,
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: productsActions.fetchProducts(dispatch),
  createProduct: productsActions.createProduct(dispatch),
  deleteProduct: productsActions.deleteProduct(dispatch),
  dispatch,
})
export { Products }
export default connect(mapStateToProps, mapDispatchToProps)(Products)
