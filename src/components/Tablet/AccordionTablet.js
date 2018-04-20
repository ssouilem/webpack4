import React from 'react'
import { Link } from 'react-router-dom'
import { Accordion, Icon } from 'semantic-ui-react'
import MenuArray from '../menu/Menu.json'

export default class AccordionTablet extends React.Component {
  constructor (props) {
    console.log('AccordionMenu')
    super(props)
  }
  state = { activeIndex: 0 }
  _handleItemClick = (e, titleProps) => {
    const { index } = titleProps
    this.setState({ activeIndex: index })
  }
  render () {
    const { activeIndex } = this.state
    return (
      <Accordion inverted className='Transition'>
        { MenuArray.map((item, index) => (
          <div className='menuItem' key={ index } >
            <Accordion.Title
              active={ activeIndex === index }
              index={ index }
              link
              className='link item'
              to={ item.route }
              onClick={ this._handleItemClick }>
              <Icon name={ item.icon } />
              <Link to={ item.route } >{ item.title }</Link>
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
