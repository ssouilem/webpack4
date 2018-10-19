import '../styles/all.css'
import './app.css'
import React, { Component } from 'react'
import { Sidebar, Segment, Menu, Image, Button } from 'semantic-ui-react'
import DropdownTablet from './Tablet/DropdownTablet'
import AccordionTablet from './Tablet/AccordionTablet'
// import { Route, Switch } from 'react-router-dom'
// import Watch from './pages/watch'
// import Home from './pages/home'

class TabletApp extends Component {
  state = { visible: false, width: 'thin' }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render () {
    const { visible } = this.state
    const { children } = this.props
    return (
      <div className='portal'>
        <Sidebar.Pushable >
          <Sidebar
            //animation='push'
            as={ Menu }
            color='grey'
            width={ !visible ? 'very thin' : 'thin' }
            visible
            icon='labeled'
            vertical
            inverted >
            <Button
              color='grey'
              className='portalSideBarButton'
              onClick={ this.toggleVisibility }
              icon='content' />
            { !visible ? <DropdownTablet /> : <AccordionTablet /> }
          </Sidebar>
          {/* <Sidebar as={ Menu } animation='uncover' width={ width } visible={ !visible } icon='labeled' vertical inverted>
            { visible ? <DropdownTablet /> : <AccordionTablet /> }
          </Sidebar> */}
          <div className={ visible ? 'portalContentExpanded' : 'portalContent' }>
            <Sidebar.Pusher >
              <Menu inverted className='SideBar' attached='top' >
                {/* <Menu.Item key='sidebar' name='sidebar' color='red' onClick={ this.toggleVisibility } >
                  <Icon name='sidebar' />
                </Menu.Item> */}
                <Menu.Item header onClick={ () => {} }>
                  <Image size='small' className='headerLogo' src={ require('../styles/images/logo3.png') } spaced='left' />
                </Menu.Item>
              </Menu>
              <Segment basic >
                { children }
              </Segment>
            </Sidebar.Pusher>
          </div>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default TabletApp
