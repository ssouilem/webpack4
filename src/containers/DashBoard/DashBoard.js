import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions as portalActions } from 'ACTIONS/portal'
import BoardCards from 'COMPONENTS/BoardCards/BoardCards'
import BoardChart from 'COMPONENTS/BoardChart/BoardChart'
import CurrentBoardState from 'COMPONENTS/CurrentBoardState/CurrentBoardState'
import { Grid, Segment, Header, Button } from 'semantic-ui-react'
import styles from './DashBoard.less'

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const data = [
  { name: 'To do', value: getRandomInt(10, 30) },
  { name: 'In progress', value: getRandomInt(10, 30) },
  { name: 'Done', value: getRandomInt(10, 30) },
  { name: 'Closed', value: getRandomInt(10, 30) },
]

const currentstate = {
  data : data
}

class DashBoard extends Component {
  state={ activeinit: true }
  _handleSidebarButton = () => {
      const { sidebarIsCollapsed } = this.props
      this.props.changeSidebarState({ sidebarIsCollapsed: !sidebarIsCollapsed })
    }

  _fetchBoard (period) {
    if (period==='month') {
      this.setState({ activeinit: true })
    } else {
      this.setState({ activeinit: false })
    }
    if (this.props.context.contextPath) {
      this.props.fetchProjectBoardChart(this.props.context.contextPath, period)
    }
  }

  render () {
    const { activeinit } = this.props

    return (
      <div className={ styles.dashboard }>
        <Grid>
          <Grid.Row centered>
            <Segment.Group horizontal>
              <Segment>
                <Header
                  style={ { marginTop: '7px' } }
                  textAlign='center'
                  as='h3'
                  content="Mon tableau de suivi" />
              </Segment>
              <Segment>
                <Button.Group>
                  <Button onClick={ this._fetchBoard.bind(this, 'week') }>Last week</Button>
                  <Button active={ this.state.activeinit }
                    onClick={ this._fetchBoard.bind(this, 'month') }>Last Month</Button>
                  <Button onClick={ this._fetchBoard.bind(this, 'year') }>Last Year</Button>
                </Button.Group>
              </Segment>
            </Segment.Group>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column>
              <BoardCards currentstate={ currentstate } />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column >
            <CurrentBoardState
                // contextPath={ this.props.context.contextPath }
                currentstate={ currentstate }
                //fetchBoardCurrentState={ this.props.fetchBoardCurrentState }
                />
            </Grid.Column>
            <Grid.Column >
            <BoardChart
              // contextPath={ this.props.context.contextPath }
              // contextType={ this.props.context.contextType }
              // chartData={ this.props.dashboard.chartData }
              // fetchProjectBoardChart={ this.props.fetchProjectBoardChart }
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
//
DashBoard.propTypes = {
  sidebarIsCollapsed: PropTypes.bool,
  activeinit: PropTypes.number,
  form: PropTypes.object,
  changeSidebarState: PropTypes.func,
}
//
const mapStateToProps = state => ({
  sidebarIsCollapsed: state.portal.sidebarIsCollapsed,
  displayIsMobile: state.portal.displayIsMobile,
  state,
})
//
const mapDispatchToProps = dispatch => ({
  dispatch,
  changeSidebarState: portalActions.changeSidebarState(dispatch),
})

export { DashBoard }
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
