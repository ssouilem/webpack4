import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar, Segment, Menu, Image, Button, Dropdown } from 'semantic-ui-react'
import DropdownTablet from './Tablet/DropdownTablet'
import AccordionTablet from './Tablet/AccordionTablet'
import { default as cookies } from 'ACTIONS/../cookieHelper'
import history from 'SRC/history'

// import { Route, Switch } from 'react-router-dom'
// import Watch from './pages/watch'
// import Home from './pages/home'

const trigger = (
  <span>
    <Image avatar src={ require('STYLES/images/admin.jpg') } />admin
  </span>
)
const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', value: 'signout', text: 'Sign Out', icon: 'sign out' },
]
class TabletApp extends Component {
  state = { visible: false, width: 'thin' }
  _handleMyAccount = (event, {name, value}) => {
    console.log('TabletApp -> name', value)
    if (value === 'signout') cookies.logout(); window.location.reload()
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  paramsVisibility = () => {
    this.setState({ paramsVisibility: !this.state.paramsVisibility })
  }
  handleItemClick = name => this.setState({ activeItem: name })


  render () {
    const { visible, activeItem, paramsVisibility } = this.state
    const { children } = this.props
    console.log('children', JSON.stringify(history))
    return (
      history.location.pathname !== '/login' && <div className='portal'>
        <Sidebar.Pushable>
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
          {
            /* Menu liste
          <Sidebar
            as={ Menu }
            animation='overlay'
            direction='right'
            vertical
            visible={ paramsVisibility }
          >
            <Button
              className='portalSideBarButton'
              onClick={ this.paramsVisibility }
              icon='close' />
            <Menu.Item>
              <Input placeholder='Search...' />
            </Menu.Item>
            <Menu.Item>
              Home
              <Menu.Menu>
                <Menu.Item
                  name='search'
                  active={ activeItem === 'search' }
                  onClick={ this.handleItemClick }
                >
                  Search
                </Menu.Item>
                <Menu.Item name='add' active={ activeItem === 'add' } onClick={ this.handleItemClick }>
                  Add
                </Menu.Item>
                <Menu.Item name='about' active={ activeItem === 'about' } onClick={ this.handleItemClick }>
                  Remove
                </Menu.Item>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item name='browse' active={ activeItem === 'browse' } onClick={ this.handleItemClick }>
              <Icon name='grid layout' />
              Browse
            </Menu.Item>
            <Menu.Item
              name='messages'
              active={ activeItem === 'messages' }
              onClick={ this.handleItemClick }
            >
              Messages
            </Menu.Item>
            <Dropdown item text='More'>
              <Dropdown.Menu>
                <Dropdown.Item icon='edit' text='Edit Profile' />
                <Dropdown.Item icon='globe' text='Choose Language' />
                <Dropdown.Item icon='settings' text='Account Settings' />
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              <Menu.Header>Products</Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  name='enterprise'
                  active={ activeItem === 'enterprise' }
                  onClick={ this.handleItemClick }
                />
                <Menu.Item
                  as={ Link }
                  to='/entreprise'
                  name='consumer'
                  active={ activeItem === 'consumer' }
                  onClick={ this.handleItemClick }
                />
              </Menu.Menu>
            </Menu.Item>
          </Sidebar>
          */
        }
          {/* <Sidebar as={ Menu } animation='uncover' width={ width } visible={ !visible } icon='labeled' vertical inverted>
            { visible ? <DropdownTablet /> : <AccordionTablet /> }
          </Sidebar> */}
          <div className={ visible ? 'portalContentExpanded' : 'portalContent' }>
            <Sidebar.Pusher >
              <Menu inverted className='SideBar' attached='top' >
                <Menu.Item header onClick={ () => {} }>
                  <Image size='small' className='headerLogo' src={ require('../styles/images/logo3.png') } spaced='left' />
                </Menu.Item>
                <Menu.Item key='sidebar' name='sidebar' position='right' >
                  <Dropdown
                    className='myaccount'
                    trigger={ trigger }
                    options={ options }
                    onChange={ this._handleMyAccount }
                    pointing='top left'/>

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
