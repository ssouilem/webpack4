import React from 'react'
import { Timeline } from 'antd'
import { connect } from 'react-redux'
import BoardCards from 'COMPONENTS/BoardCards/BoardCards'
import CurrentBoardState from 'COMPONENTS/CurrentBoardState/CurrentBoardState'
import { Grid, Button, Icon, Header, Image, Table, Divider, Label } from 'semantic-ui-react'
// import { push } from 'react-router-redux'
import styles from './HomePage.less'
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const data = [
  { name: 'Bordereaux', value: getRandomInt(10, 30) },
  { name: 'Factures', value: getRandomInt(10, 30) },
  { name: 'Paiements', value: getRandomInt(10, 30) },
  { name: 'Taches', value: getRandomInt(10, 30) },
]

const currentstate = {
  data: data
}

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
      <Grid.Row className={ styles.homePageRowTop }>
        <Grid.Column>
          <BoardCards currentstate={ currentstate } />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className={ styles.homePageRow }>
        <Grid.Column>
        <CurrentBoardState
            // contextPath={ this.props.context.contextPath }
            currentstate={ currentstate }
            //fetchBoardCurrentState={ this.props.fetchBoardCurrentState }
            />
        </Grid.Column>
        <Grid.Column>
          <Header as='h4' content='Historiques' />
          <Timeline pending={ <a href='#'>See more</a>} >
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item color='green'>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item dot={ <Icon name='at' style={{ fontSize: '16px' }} /> } color='red'>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          </Timeline>
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
