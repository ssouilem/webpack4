import React, {Component} from 'react'
// import MyCarousel from '../carousel/MyCarousel'
import BoostrapCarousel from '../carousel/BoostrapCarousel'
import { Grid, Card, Icon, Image, Item } from 'semantic-ui-react'

export default class Home extends Component {
  // componentWillMount () {
  //   console.log('test')
  // }

  render () {
    return (
      <div>
        <Grid columns={ 4 } centered divided>
          <Grid.Row className='row-top' stretched>
            <BoostrapCarousel />
          </Grid.Row>
          <Grid.Row>
            <Item.Group>
              <Item>
                <Item.Image size='large' src='https://www.maileva.com/vos-besoins/entreprise/maileva-respect-reglementation.jpg' />
                <Item.Content>
                  <Item.Header as='a'>Respecter la réglementation les yeux fermés</Item.Header>
                  <Item.Description><p>La réglementation évolue constamment et rester en conformité nécessite un investissement très important.<br />
Nous adaptons en permanence nos solutions afin d’être conforme à la réglementation : dématérialisation des bulletins de salaire - loi El Khomri, dématérialisation des factures - loi Macron, signature électronique – règlement eIDAS…
                  </p>
                  </Item.Description>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Row>
          <Grid.Row className='row-middle' >
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
