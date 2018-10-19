import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Grid, Image, Header, Segment, Form, Button } from 'semantic-ui-react'

// import { push } from 'react-router-redux'
import styles from './Bordereau.less'

class Bordereau extends React.Component {
  state = {
      avatar: undefined,
      files: [],
      UserByOpen: false,
    }
  // _handleButtonClick = to => {
  //   this.props.dispatch(push(to))
  // }
  handleChange = (e, { value }) => this.setState({ value })
  componentWillMount = () => {}
  render = () => (
    <div>
      <Grid divided container>
        <Grid.Row >
          <Grid.Column textAlign='center'>
            <Header size='huge' inverted content='Devoted to boost perfection' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Header as='h2'>Avatar</Header>
              <Grid.Row divided columns={ 3 }>
                <Grid.Column stretched className={ styles.avatar_profile }>
                  <Image circular />
                </Grid.Column>
                 <Grid.Column>
                  <Form.Group grouped>

                    <Form.Field control='input'
                      type='radio'
                      name='avatarRadioGroup'
                      checked={ this.state.value === 'myavatar' }
                      onChange={ this.handleChange }
                      label='test' />

                    <Form.Field control='input'
                      type='radio'
                      name='avatarRadioGroup'
                      checked={ this.state.value === 'gravatar' }
                      onChange={ this.handleChange }
                      label={ <FormattedMessage
                        id='checkbox.use.gavatar'
                        description='use gavatar'
                        defaultMessage='Avatar public Gravatar' /> } />

                    <Form.Input size='mini'
                      label={ <FormattedMessage id='input.address.gavatar'
                        description='Adresse Gravatar' defaultMessage='Adresse Gravatar' /> } />

                  </Form.Group>
                 </Grid.Column>
              </Grid.Row>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column textAlign='center'>
              <Segment>
                  <Header as='h2'>
                    <FormattedMessage id='title.profile.informations'
                      description='title profile' defaultMessage='INFORMATIONS DU PROFIL' />
                  </Header>
                  <Form widths='equal'>
                    <Form.Input width={ 14 }
                      disabled={ this.state.UserByOpen }
                      label={ <FormattedMessage id='input.first.name'
                        description='first name' defaultMessage='First name' /> }
                      // value={ user.signIn && user.signIn.data && user.signIn.data.first_name }
                      />
                    <Form.Input width={ 14 } label={ <FormattedMessage id='input.last.name'
                      description='last name' defaultMessage='Last name' /> }
                      disabled={ this.state.UserByOpen }
                      // value={ user.signIn && user.signIn.data && user.signIn.data.last_name }
                      />
                    <Form.Input width={ 14 } label={ <FormattedMessage id='input.email.address'
                      description='e-mail address' defaultMessage='E-mail address' /> } disabled
                      />
                    <Form.Input width={ 14 } label={ <FormattedMessage id='input.ssh.key'
                      description='SSH key' defaultMessage='SSH key' /> }
                      // value={ user.signIn && user.signIn.data && user.signIn.data.ssh_key }
                      />
                  </Form>
                </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='right'>
              <Button.Group floated='right' >
                <Button>{ <FormattedMessage id='button.cancel'
                  description='button cancel' defaultMessage='Cancel' /> }</Button>
                <Button.Or />
                <Button positive>{ <FormattedMessage id='button.save'
                  description='button save' defaultMessage='Save' /> }</Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
}





Bordereau.propTypes = {}

const mapStateToProps = ({ search }) => ({ search })

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export { Bordereau }
export default connect(mapStateToProps, mapDispatchToProps)(Bordereau)
