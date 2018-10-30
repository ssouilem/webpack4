import React from 'react'
import { Tab } from 'semantic-ui-react'
import { bordereauListPanes } from 'COMPONENTS/Common/Panes'

class Bordereaux extends React.Component {
  state = { activeIndex: 1 }
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
  render () {
    const { activeIndex } = this.state

    return (
      <Tab panes={ bordereauListPanes  } activeIndex={ activeIndex }
        onTabChange={ this.handleTabChange }
        renderActiveOnly={ false } />
    )
  }
}

export default Bordereaux
