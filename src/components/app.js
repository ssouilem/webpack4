import React from 'react'
// import { Link } from 'react-router'
// import {AppWrapper, PageTitle} from '../styles/css/theme'
// import styled from 'styled-components'
// import Watch from './pages/watch'
// import Home from './pages/home'
// import MenuArray from './menu/menu.json'
// import {Route, Switch, BrowserRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  Button,
  // Dropdown,
  Segment,
  Menu,
  Icon,
  Sidebar,
  // Accordion,
} from 'semantic-ui-react'
import DropdownMenu from './menu/DropdownMenu'
import styles from './app.css'

// export const PageContent = styled.div`
//   padding: 20px 0;
// `
// export const PageFooter = styled.p`
//   color:red;
// `

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { activeItem: 0, menuVisible: true, sidebarIsCollapsed: false }
  }

  _handleSidebarButton = () => {
    this.setState({ sidebarIsCollapsed: !this.state.sidebarIsCollapsed })
    // this.setState({ menuVisible: !this.state.menuVisible })
  }

  render () {
    // const { activeItem } = this.state
    const { sidebarIsCollapsed } = this.state
    return (
      <BrowserRouter>
        {/* <div>
            <PortalSideBar dispatch={ true } sidebarIsCollapsed={ true } displayIsMobile={ false } />
        </div> */}
        <div className={ styles.portalModalContent } >
          <Sidebar as={ Menu }
            width={ sidebarIsCollapsed ? 'very thin' : 'thin' }
            visible={ this.state.menuVisible }
            icon='labeled'
            vertical
            color='grey'
            inline
            inverted>
            <Button
              className={ styles.portalSideBarButton }
              // disabled={ displayIsMobile }
              onClick={ this._handleSidebarButton }
              color='grey'
              icon='content' />
            {/* <Menu.Item><Icon name="home" /><Link to={'/'}>Home</Link></Menu.Item>
            <Menu.Item><Icon name="block layout" /><Link to={'/watch'}>Dashboard</Link></Menu.Item>
            <Menu.Item><Icon name="smile" />Friends</Menu.Item>
            <Menu.Item><Icon name="calendar" />History</Menu.Item> */}

            { sidebarIsCollapsed ? <DropdownMenu /> : <DropdownMenu /> }
          </Sidebar>
          <Menu color='grey' className={ styles.portalHeader } >
            <Menu.Item onClick={ () => this.setState({ menuVisible: !this.state.menuVisible }) } >
              <Icon name='sidebar' />Menu
            </Menu.Item>
            <Menu.Item header onClick={ () => {} }>
              App Name and Logo
            </Menu.Item>
          </Menu>
          {/* <Sidebar.Pushable as={Segment} > */}
          {/* </Sidebar.Pushable> */}
          <Segment
            attached='bottom'
            className={ styles.portalContentSegment } >
            Contenu +++
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

        </Sidebar.Pushable>
----
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
