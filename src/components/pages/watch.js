import React, {Component} from 'react'
import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
const LiveWrapper = styled.div`

`
export default class Watch extends Component{
  render(){
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
