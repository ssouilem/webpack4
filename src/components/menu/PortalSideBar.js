import React from 'react'
// import AccordionMenu from './AccordionMenu'
// import DropdownMenu from './DropdownMenu'
import { Sidebar, Menu, Button } from 'semantic-ui-react'

export default class PortalSideBar extends React.Component {
  // _handleSidebarButton = () => {
  //   const { sidebarIsCollapsed } = this.props
  //   // this.setProps({ sidebarIsCollapsed: !sidebarIsCollapsed })
  // }
  render () {
    const { sidebarIsCollapsed, displayIsMobile, dispatch } = this.props
    return (
      <div>
        <Sidebar
          as={ Menu }
          width={ sidebarIsCollapsed ? 'very thin' : 'thin' }
          icon
          visible
          vertical
          direction='left'
          color='red'
          inverted >
          <Button
            // disabled={ displayIsMobile }
            // onClick={ this._handleSidebarButton }
            icon='content' />
          {/* { sidebarIsCollapsed ? <DropdownMenu dispatch={ dispatch } /> : <AccordionMenu dispatch={ dispatch } />} */}
        </Sidebar>
      </div> )
  }
}
