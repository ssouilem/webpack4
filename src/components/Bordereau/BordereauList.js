import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Form, Button, Divider, Segment } from 'semantic-ui-react'
import TableApprove from 'COMPONENTS/Utils/TableApprove'
import {
  DateInput,
} from 'semantic-ui-calendar-react'

class BordereauList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      datedebut: '',
      datefin: '',
      time: '',
      dateTime: '',
      datesRange: '',
    }
  }

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      console.log('add Bordereau', name, value)
      this.setState({ [name]: value })
    }
  }
  render () {
    const test = { cell_1:'BORDEREAU ID', cell_2:'CLIENT',  cell_3:'DATE', cell_4:'ÉCHÉANCE', cell_5:'REMISE', cell_6:'TOTAL', cell_7:'ACTIONS'}
    return (
      <Grid divided container>
        <Grid.Row>
          <Header content='Rechercher' as='h5' />
        </Grid.Row>
        <Grid.Row >
          <Form className='attached fluid segment'>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Client' placeholder='reference client' type='text' />
              <Form.Input fluid label='Bordereau' placeholder='ID' type='text' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>A partir de </label>
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
            </Form.Group>
            <Button floated='right' onClick={ this.props.addTab } color='blue'>Rechercher</Button>
          </Form>
        </Grid.Row>
        <Grid.Row>
          <Header dividing as='h5'>Liste des bordereaux</Header>
        </Grid.Row>
        <Grid.Row stretched>
          <Divider hidden />
          <TableApprove title={test} />
        </Grid.Row>
      </Grid>
    )
}
}


BordereauList.propTypes = {}

const mapStateToProps = ({ search }) => ({ search })

const mapDispatchToProps = dispatch => ({
  dispatch,
})

export { BordereauList }
export default connect(mapStateToProps, mapDispatchToProps)(BordereauList)
