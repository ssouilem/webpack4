import React from 'react'
import { Grid, Segment, Button, Breadcrumb } from 'semantic-ui-react'
import { actions as productsActions } from 'ACTIONS/produits'
import TableInternal from 'COMPONENTS/Common/TableInternal'
import { TableType } from 'COMPONENTS/Utils/Utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const sections = [
  { key: 'home', content: 'Home', link: true },
  { key: 'info', content: 'Produits', active: true },
]
class Products extends React.Component {
  render = () => (
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
              <TableInternal
                items={ this.props.products }
                onClick={ (action) => console.log('view or edit', action) }
                tableType={ TableType.SHOW_PRODUCTS } />
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
