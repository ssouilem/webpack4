import React, {Component} from 'react'
import MyCarousel from '../carousel/MyCarousel'
import { Grid, Card, Icon, Image } from 'semantic-ui-react'

export default class Home extends Component {
  // componentWillMount () {
  //   console.log('test')
  // }

  render () {
    return (
      <div>
        <Grid columns={ 2 } centered divided>
          <Grid.Row stretched>
            <MyCarousel />
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <Card>
                <Image src='https://scontent.cdninstagram.com/vp/51d734a16be2609e36ed21a923f32549/5B995724/t51.2885-15/s640x640/sh0.08/e35/13385851_954384044675150_1252219938_n.jpg' />
                <Card.Content textAlign='center'>
                  <Card.Header>
                    Matthew
                  </Card.Header>
                  <Card.Meta>
                    <span className='date'>
                      Joined in 2015
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Grid>
                    <Grid.Column width={ 4 }>
                      <Image src='https://react.semantic-ui.com//assets/images/avatar/large/matthew.png' size='tiny' />
                    </Grid.Column>
                    <Grid.Column width={ 6 }>Hello World!</Grid.Column>
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
