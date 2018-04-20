import React, {Component} from 'react'
import { Button, Icon } from 'semantic-ui-react'

export default class Watch extends Component {
  render () {
    return (
      <div>
        <h2>this watch</h2>
        <Button primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </div>
    )
  }
}
