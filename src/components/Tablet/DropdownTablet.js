import React from 'react'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import MenuArray from '../menu/Menu.json'

export default class DropdownTablet extends React.Component {
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
      <div >
        { MenuArray.map((item, index) => (
          <div className='menuItem' key={ index }>
            { !item.submenus &&
              <Menu.Item
                as={ Link }
                name={ item.name }
                to={ item.route }
                active={ activeItem === item.name } >
                {/* onClick={ this._handleItemClick } > */}
                <Link to={ item.route } replace />
                <Icon name={ item.icon } size='small' />
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
