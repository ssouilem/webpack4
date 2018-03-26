import React from 'react'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import MenuArray from './Menu.json'


class DropdownMenu extends React.Component {
  state = { activeItem: 0 }
  _handleItemClick = (e, titleProps) => {
    console.log(titleProps)
    const { name, to } = titleProps
    // this.setState({ activeItem: name })
  }
  render () {
    const { activeItem } = this.state
    return (
      <div>
        { MenuArray.map((item, index) => (
          <div className='menuItem' key={ index }>
            { !item.submenus &&
              <Menu.Item
                name={ item.name }
                link
                to={ item.route }
                active={ activeItem === item.name }
                onClick={ this._handleItemClick } >
                <Icon name={ item.icon } />
              </Menu.Item> }
            { item.submenus &&
              <Dropdown
                key={ item.name }
                name={ item.name }
                item
                icon={ item.icon }
                onClick={ this._handleItemClick }
                className='icon'>
                <Dropdown.Menu>
                  { item.submenus.map((subItem, subIndex) => (
                    <Dropdown.Item key={ (item.index + '0') + subIndex }>{ subItem.title }</Dropdown.Item>
                  )) }
                </Dropdown.Menu>
              </Dropdown> }
          </div>
        )) }
      </div>
    )
  }
}

export default DropdownMenu
