import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Segment, Menu, Image, Button, Dropdown, Icon } from 'semantic-ui-react'
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
                <Menu.Item header onClick={ () => {} }>
                  <Image size='small' className='headerLogo' src={ require('../styles/images/logo3.png') } spaced='left' />
                </Menu.Item>
                <Menu.Item key='sidebar' name='sidebar' onClick={ this.toggleVisibility } position='right' >
                  <Dropdown className='myaccount' item
                    icon={
                      <Icon.Group size='large'>
                        <Icon color='red' name='sign-out alternate' />
                        <Icon corner color='blue' name='cog' />
                      </Icon.Group> }>
                    <Dropdown.Menu>
                      <Dropdown.Header>MON COMPTE</Dropdown.Header>
                      <Dropdown.Item disabled >Compte utilisateur</Dropdown.Item>
                      <Dropdown.Item disabled >Paramètres de facturation</Dropdown.Item>
                      <Dropdown.Item as={ Link } to='/entreprise' >
                        Coordonnées de l'entreprise
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
