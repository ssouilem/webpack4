import React, {Component} from 'react'
// import {AppWrapper, PageTitle} from '../styles/css/theme'
// import styled from 'styled-components'
import Watch from './pages/watch'
import Home from './pages/home'
import MenuArray from './menu/menu.json'
import {Route, Switch, BrowserRouter } from 'react-router-dom'
import {
  Button,
  Dropdown,
  Segment,
  Menu,
  Icon,
  Sidebar,
} from 'semantic-ui-react'
// import PortalSideBar from './menu/PortalSideBar'

// export const PageContent = styled.div`
//   padding: 20px 0;
// `
// export const PageFooter = styled.p`
//   color:red;
// `

import styles from '../styles/all.css'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 0, menuVisible: false };
  }

  _handleItemClick = (e, titleProps) => {
    console.log(titleProps)
    const { name, to } = titleProps
    this.setState({ activeItem: name })
  }


  render() {
    const { activeItem } = this.state
    return (
      <BrowserRouter>
        {/* <div>
            <PortalSideBar dispatch={ true } sidebarIsCollapsed={ true } displayIsMobile={ false } />
        </div> */}
        <div>
          <Menu attached='top' color='grey' className={ styles.portalHeader } >
            <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
              <Icon name="sidebar" />Menu
            </Menu.Item>
            <Menu.Item header onClick={()=>{}}>
              App Name and Logo
            </Menu.Item>
          </Menu>
          {/* <Sidebar.Pushable as={Segment} > */}
            <Sidebar as={Menu} visible={this.state.menuVisible} icon="labeled" vertical inline inverted>
              {/* <Menu.Item><Icon name="home" /><Link to={'/'}>Home</Link></Menu.Item>
              <Menu.Item><Icon name="block layout" /><Link to={'/watch'}>Dashboard</Link></Menu.Item>
              <Menu.Item><Icon name="smile" />Friends</Menu.Item>
              <Menu.Item><Icon name="calendar" />History</Menu.Item> */}
              { MenuArray.map((item, index) => (
                <div className='menuItem' key={ index }>
                  { !item.submenus &&
                    <Menu.Item
                      name={ item.name }
                      active={ activeItem === item.name }
                      onClick={ this._handleItemClick.bind(this) }
                      link
                      to={ item.route } >
                      <Icon name={ item.icon } />
                    </Menu.Item> }
                    { item.submenus &&
                      <Dropdown
                        key={ item.name }
                        name={ item.name }
                        item
                        icon={ item.icon }
                        className='icon'>
                        <Dropdown.Menu>
                          { item.submenus.map((subItem, subIndex) => (
                            <Dropdown.Item key={ (item.index + '0') + subIndex }>{ subItem.title }</Dropdown.Item>
                          )) }
                        </Dropdown.Menu>
                      </Dropdown> }
                  </div>
              ))}
            </Sidebar>
          {/* </Sidebar.Pushable> */}
          <Segment>
            Contenu
          </Segment>

          {/* <Sidebar.Pushable as={Segment} >
            <Sidebar
              as={ Menu }
              // width={ true ? 'very thin' : 'thin' }
              icon
              visible
              vertical
              direction='left'
              // color='red'
              inverted >
              { MenuArray.map((item, index) => (
                <div className='menuItem' key={ index }>
                  { !item.submenus &&
                    <Menu.Item
                      name={ item.name }
                      link
                      to={ item.route }
                      active={ activeItem === item.name } >

                      <Icon name={ item.icon } />
                    </Menu.Item> }
                  </div>
                )) }
          </Sidebar>
          <Segment attached='bottom'>
              test
          </Segment>

        </Sidebar.Pushable> */}




        {/*
          <Sidebar.Pushable as={Segment} >
            <Sidebar as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inline inverted>
              <Menu.Item><Icon name="home" /><Link to={'/'}>Home</Link></Menu.Item>
              <Menu.Item><Icon name="block layout" /><Link to={'/watch'}>Dashboard</Link></Menu.Item>
              <Menu.Item><Icon name="smile" />Friends</Menu.Item>
              <Menu.Item><Icon name="calendar" />History</Menu.Item>
            </Sidebar>
              <Sidebar.Pusher>
                  <Segment>
                    <Header as="h3">Application Content</Header>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/watch' component={Watch} />
                    </Switch>
                    <p>jkhkjhkjh
                    jkjkjkjnlknlkll
                  jjkbknknll
                jjjkjhkljl
              jnkhkhknlkkl
            ;bnbkknknlll
          </p>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                  </Segment>
             </Sidebar.Pusher>
          </Sidebar.Pushable> */}
        </div>
      </BrowserRouter>

    // <AppWrapper>
    //   <PageTitle>Title</PageTitle>
    //   <PageContent>
    //     <Switch>
    //       <Route exact path={'/'} component={Home}/>
    //       <Route exact path={'/watch'} component={Watch}/>
    //     </Switch>
    //     </PageContent>
    //   <PageFooter>footer</PageFooter>
    // </AppWrapper>
    )
  }
}
