import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Image, Table, Select, Button } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
// import { push } from 'react-router-redux'
import styles from './Campany.less'

const members = [
    { id: 50, avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Souilem', username:'samir' },
    { id: 51, avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'switch', username:'test' },
    { id: 55, avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Souilem', username:'samir' },
    { id: 52, avatar_url: 'https://react.semantic-ui.com//images/avatar/large/matthew.png', name: 'Khaled', username:'samir' },
    { id: 57, avatar_url: 'https://react.semantic-ui.com/images/avatar/large/matthew.png', name: 'Saleh', username:'ouf' }
]

const ROLES = [
  { key: 50, value: 50, text: 'Owner' },
  { key: 40, value: 40, text: 'Scrum Master' },
  { key: 30, value: 30, text: 'Developper' },
  { key: 10, value: 10, text: 'Guest' },
]

class Campany extends React.Component {
  state = {
      avatar: undefined,
      files: [],
      UserByOpen: false,
      members: [],
  }

  componentWillMount() {
    // console.log(members);
    this.setState({
      members : members,
    });
    console.log(this.state.members);
  }

  // _handleButtonClick = to => {
  //   this.props.dispatch(push(to))
  // }
  // handleChange = (e, { value }) => this.setState({ value })
  // componentWillMount = () => {}


  render() {
  const { members } = this.state;

  return (
    <Grid divided container>
        <Grid.Row stretched>
          <Table sortable celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            {( this.state.members && this.state.members.length > 0 && this.state.members.map(member => (
              <Table.Row key={ member.id }>
                <Table.Cell><Image  size='mini' avatar src={ member.avatar_url } />{ member.name }</Table.Cell>
                <Table.Cell>{ member.username }</Table.Cell>
                <Table.Cell>
                  <Select
                    value={ member.access_level }
                    selectOnBlur={ false }
                    options= { ROLES }/>

                  <Button
                    icon='user delete'
                    // color='red'
                    floated='right' />
                  <Button primary
                      icon='sign out'
                      content='leave'
                      // color='red'
                      floated='right' />
                </Table.Cell>
              </Table.Row>)))}
              {
              /*
              <Table.Row>
                <Table.HeaderCell textAlign='center' colSpan='3'>
                  There's no members for selected entity, Or you don't have enought permissions
                  You can try using the form "Add user" to add new users
                </Table.HeaderCell>
              </Table.Row>
              */
            }
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan='3' />
              </Table.Row>
            </Table.Footer>
          </Table>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='right'>
            <Button.Group floated='right' >
              <Button>{ <FormattedMessage id='button.cancel'
                description='button cancel' defaultMessage='Cancel' /> }</Button>
              <Button.Or />
              <Button positive><FormattedMessage id='button.save'
                description='button save' defaultMessage='Save' /></Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}


Campany.propTypes = {}

const mapStateToProps = ({ search }) => ({ search })

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export { Campany }
export default connect(mapStateToProps, mapDispatchToProps)(Campany)
