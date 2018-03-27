import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Image, Header, Icon } from 'semantic-ui-react'
import DropdownTablet from './Tablet/DropdownTablet'
import AccordionTablet from './Tablet/AccordionTablet'
// import { Route, Switch, BrowserRouter } from 'react-router-dom'
import styles from './app.css'

class TabletApp extends Component {
  state = { visible: false, width: 'thin' }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
    (this.state.width === 'thin') ? this.setState({ width: 'very thin' }) : this.setState({ width: 'thin' })
  }

  render () {
    const { visible, width } = this.state
    return (
      <div className={ styles.portalModalContent }>
        <Menu color='grey' className={ styles.portalSideBarButton } >
          <Menu.Item color='grey' onClick={ this.toggleVisibility } >
            <Icon name='sidebar' />
          </Menu.Item>
          <Menu.Item color='grey' header onClick={ () => {} }>
            App Name and Logo
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable >
          <Sidebar as={ Menu } animation='uncover' width={ width } visible icon='labeled' vertical inverted>
            { visible ? <DropdownTablet /> : <AccordionTablet /> }
          </Sidebar>
          {/* <Sidebar as={ Menu } animation='uncover' width={ width } visible={ !visible } icon='labeled' vertical inverted>
            { visible ? <DropdownTablet /> : <AccordionTablet /> }
          </Sidebar> */}
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content
                <br />
                {/* <Switch>
                  <Route exact path={ '/' } >test 1 </Route>
                  <Route exact path={ '/chargement' } >test  2 </Route>
                </Switch> */}
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </Header>
              <Image src='/assets/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default TabletApp
