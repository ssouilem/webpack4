import React from 'react'
import { Tab } from 'semantic-ui-react'
import { panes } from 'COMPONENTS/Common/Panes'

class Invoices extends React.Component {
  state = { activeIndex: 1 }
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
  render () {
    const { activeIndex } = this.state

    return (
      <Tab panes={ panes } activeIndex={ activeIndex }
        onTabChange={ this.handleTabChange }
        renderActiveOnly={ false } />
    )
  }
}

export default Invoices
