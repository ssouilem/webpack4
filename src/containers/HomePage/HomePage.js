import React from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Icon, Header, Image, Table, Divider, Label } from 'semantic-ui-react'
// import { push } from 'react-router-redux'
import styles from './HomePage.less'

class HomePage extends React.Component {
  // _handleButtonClick = to => {
  //   this.props.dispatch(push(to))
  // }
  componentWillMount = () => {}
  render = () => (
    <Grid columns='equal' container className={ styles.homePage }>
      <Grid.Row className={ styles.homePageRowTop }>
        <Grid.Column textAlign='center'>
          <Header size='huge' content='Listes des actions encours' />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={ styles.homePageRow }>
        <Grid.Column>
          <Label as='a' color='teal' image >
            Les Bordereaux
            <Label.Detail>> en attente</Label.Detail>
          </Label>
          <Divider />
          <Table color='red' key='red'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Food</Table.HeaderCell>
                <Table.HeaderCell>Calories</Table.HeaderCell>
                <Table.HeaderCell>Protein</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Apples</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Orange</Table.Cell>
                <Table.Cell>310</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={ styles.homePageRow }>
        <Grid.Column>
          <Label as='a' color='blue' image >
            Les paiements
            <Label.Detail>> en attente</Label.Detail>
          </Label>
          <Divider />
          <Table color='blue' key='blue'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Food</Table.HeaderCell>
                <Table.HeaderCell>Calories</Table.HeaderCell>
                <Table.HeaderCell>Protein</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Apples</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Orange</Table.Cell>
                <Table.Cell>310</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={ styles.homePageRow }>
        <Grid.Column>
          <Label as='a' color='olive' image >
            Les paiements
            <Label.Detail>> en attente</Label.Detail>
          </Label>
          <Divider />
          <Table color='olive' key='olive'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Food</Table.HeaderCell>
                <Table.HeaderCell>Calories</Table.HeaderCell>
                <Table.HeaderCell>Protein</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Apples</Table.Cell>
                <Table.Cell>200</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Orange</Table.Cell>
                <Table.Cell>310</Table.Cell>
                <Table.Cell>0g</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
      .
      <Grid.Row centered className={ styles.homePageRow }>
        <Grid.Column textAlign='center'>
          <Button
            circular
            className={ styles.bigIcons }
            // onClick={ this._handleButtonClick.bind(this, 'projects') }
            color='yellow'
          >
            <Icon.Group size='big'>
              <Icon
                as={ Image }
                size='big'
                src={ require('IMAGES/projet.png') }
                className={ styles.smallIcon }
                name='users'
              />
            </Icon.Group>
          </Button>
          <p>Let''s start a new Project</p>
          <p className={ styles.LabelOrange }>
            <Image src={ require('IMAGES/pointer.png') } centered />
            Start here
          </p>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button
            circular
            className={ styles.bigIcons }
            color='orange'
            // onClick={ this._handleButtonClick.bind(this, 'members') }
            inverted
          >
            <Icon.Group size='big'>
              <Icon
                as={ Image }
                size='big'
                src={ require('IMAGES/membres.png') }
                className={ styles.smallIcon }
                name='users'
              />
            </Icon.Group>
          </Button>
          <p>onBoard your team</p>
        </Grid.Column>
        <Grid.Column textAlign='center'>
          <Button
            circular
            className={ styles.bigIcons }
            // onClick={ this._handleButtonClick.bind(this, 'reporting') }
            color='blue'
            inverted
          >
            <Icon.Group size='big'>
              <Icon
                as={ Image }
                size='big'
                src={ require('IMAGES/reporting.png') }
                className={ styles.smallIcon }
                name='users'
              />
            </Icon.Group>
          </Button>
          <p>Beyond reporting</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

HomePage.propTypes = {}

const mapStateToProps = ({ search }) => ({ search })

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export { HomePage }
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
