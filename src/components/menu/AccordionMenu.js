import { Link } from 'react-router'
import React from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import MenuArray from './Menu.json'

class AccordionMenu extends React.Component {
  state = { activeIndex: 0 }
  _handleItemClick = (e, titleProps) => {
    const { index, to } = titleProps
    this.setState({ activeIndex: index })
  }
  render () {
    const { activeIndex } = this.state
    return (
      <Accordion inverted className='Transition'>
        { MenuArray.map((item, index) => (
          <div className='menuItem' key={ index }>
            <Accordion.Title
              active={ activeIndex === index }
              index={ index }
              className='link item'
              to={ item.route || '' }
              onClick={ this._handleItemClick }>
              <Icon name={ item.icon } />
              { item.title }
            </Accordion.Title>
            { item.submenus &&
              <Accordion.Content
                active={ activeIndex === index }
                className='transition'>
                { item.submenus.map((subItem, subIndex) => (
                  <Link
                    key={ (item.index + '0') + subIndex }
                    className='item'
                    to={ subItem.route }>
                    { subItem.title }
                  </Link>
                ))}
              </Accordion.Content> }
          </div>
        ))}
      </Accordion>
    )
  }
}


export default AccordionMenu
