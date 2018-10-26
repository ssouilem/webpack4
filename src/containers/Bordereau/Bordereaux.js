import React from 'react'
import { Tab } from 'semantic-ui-react'
import Panes from 'COMPONENTS/Bordereau/Panes'

class TabBLItem extends React.Component {
  state = { activeIndex: 1 }
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
  render () {
    const { activeIndex } = this.state

    return (
      <Tab panes={ Panes } activeIndex={ activeIndex }
        onTabChange={ this.handleTabChange }
        renderActiveOnly={ false } />
    )
  }
}

export default TabBLItem
