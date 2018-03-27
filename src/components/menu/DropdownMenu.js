import React from 'react'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import MenuArray from './Menu.json'
import styles from './DropdownMenu.css'

export default class DropdownMenu extends React.Component {
  constructor (props) {
    console.log('DropDown')
    super(props)
    this.state = { activeItem: 0 }
  }

  _handleItemClick = (e, titleProps) => {
    console.log(titleProps)
    const { name } = titleProps
    this.setState({ activeItem: name })
  }

  render () {
    const { activeItem } = this.state
    return (
      <div className={ styles.dropdownMenu } >
        { MenuArray.map((item, index) => (
          <div className='menuItem' key={ index }>
            { !item.submenus &&
              <Menu.Item
                name={ item.name }
                active={ activeItem === item.name }
                onClick={ this._handleItemClick }
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
              </Dropdown>
            }
          </div>
        )) }
      </div>
    )
  }
}
