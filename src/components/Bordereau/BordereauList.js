import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Header, Form, Button, Divider, Segment, Responsive, Icon } from 'semantic-ui-react'
import TableApprove from 'COMPONENTS/Utils/TableApprove'
import { actions as bordereauActions } from 'ACTIONS/bordereauActions'
import {
  DateInput,
} from 'semantic-ui-calendar-react'

class BordereauList extends React.Component {
  state = {
    checkedItems: {},
    'datedebut': (new Date()).toLocaleString(),
    'datefin': (new Date()).toLocaleString(),
  }
  constructor (props) {
    super(props)
    this.props.fetchSlips()
  }
  // les probleme il est au niveau de constructor pour init la liste

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      console.log('add Bordereau', name, value)
      this.setState({ [name]: value })
    }
    this.props.handleChange({ [name]: value })
  }
  toggle = (event, {name, checked}) => {
    // if (this.state.hasOwnProperty(name)) {
    //   console.log('hasOwnProperty', name, checked)
    // }

    // event.preventDefault()
    const node = document.forms.bordereau.elements

    // console.log('toggle', event, name, checked, node)
    if (name === 'all') {
      for (let i = 0; i < node.length; i++) {
        if (node[i].nodeName === 'INPUT' && node[i].type === 'checkbox') {
          // node[i].value.toLocaleUpperCase();  // update text input
          let nameBox = node[i].name
          this.setState({ [nameBox]: !this.state.allChecked })
          // console.log('Item ', nameBox, this.state[nameBox])
          // console.log('Event => ', event.target, [name])
        }
      }
      this.setState({ allChecked: !this.state.allChecked })
    } else {
    //   var partialState = {}
    //   partialState[name] = checked
      this.setState({ [name]: !this.state[name] })
    //   this.setState(partialState)
    //   // this.setState({
    //   //   checkedItems: this.state.checkedItems.map(item => item.name === name ? { name, checked: !checked } : item)
    //   // })
    //   // this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(name, checked) }))
    }
  }

  render () {
    const test = {
      cell_1: 'BORDEREAU ID', cell_2: 'CLIENT', cell_3: 'DATE', cell_4: 'ÉCHÉANCE', cell_5: 'REMISE', cell_6: 'TOTAL', cell_7: 'ACTIONS',
    }
    const state = this.state
    return (

      <Form name='bordereau' as={ this.state.form }>
        <Grid columns={ 2 } >
          <Grid.Column width={ 16 }>
            <Header dividing as='h4'>
              <Icon name='search' />
              <Header.Content>Rechercher</Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group>
              <Responsive as={ Segment }>
                Rechercher par client
              </Responsive>
              <Responsive as={ Segment } >
                <Form.Input fluid label='Client' placeholder='reference client' type='text' />
                <Form.Input fluid label='Bordereau' placeholder='ID' type='text' />
              </Responsive>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column>
            <Segment.Group>
              <Responsive as={ Segment }>
                Rechercher par date
              </Responsive>
              <Responsive as={ Segment } >
                <Form.Field>
                  <label as='h5'>A partir de </label>
                  <DateInput
                    name='datedebut'
                    placeholder='Date de debut'
                    value={ this.state.datedebut }
                    iconPosition='left'
                    onChange={ this.handleChange } />
                </Form.Field>

                <Form.Field>
                  <label>Jusqu'au</label>
                  <DateInput
                    name='datefin'
                    placeholder='Date de fin'
                    value={ this.state.datefin }
                    iconPosition='left'
                    onChange={ this.handleChange } />
                </Form.Field>
              </Responsive>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column width={ 16 }>
            <Button floated='right' color='blue'>Rechercher</Button>
          </Grid.Column>
          <Grid.Column width={ 16 }>
            <Header dividing as='h5'>Liste des bordereaux</Header>
            <Divider hidden />
            <TableApprove onClick={ this.toggle } state={ state } title={ test } bordereaux={ this.props.bordereau } fetchSlips={ this.props.fetchSlips } />
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

BordereauList.propTypes = {
  datedebut: PropTypes.object,
  datefin: PropTypes.object,
  slips: PropTypes.object,
  handleChange: PropTypes.func,
  fetchSlips: PropTypes.func,
}

const mapStateToProps = state => ({
  datedebut: state.datedebut,
  datefin: state.datefin,
  bordereau: state.bordereau,
  fetchSlips: state.fetchSlips,
})

const mapDispatchToProps = dispatch => ({
  handleChange: bordereauActions.handleChange(dispatch),
  fetchSlips: bordereauActions.fetchSlips(dispatch),
  dispatch,
})

export { BordereauList }
export default connect(mapStateToProps, mapDispatchToProps)(BordereauList)
