import React from 'react'
import { connect } from 'react-redux'
import { Grid, Header, Image, Table, Select, Form, Button, Message, Divider } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import TableApprove from 'COMPONENTS/Utils/TableApprove'

class BordereauList extends React.Component {
  render() {
  const test = { cell_1:'BORDEREAU ID', cell_2:'CLIENT',  cell_3:'DATE', cell_4:'ÉCHÉANCE', cell_5:'REMISE', cell_6:'TOTAL', cell_7:'ACTIONS'}
  return (

    <Grid divided container>
       <Grid.Row>
               <Message
         attached
         header='Recherche'
        />
        <Form className='attached fluid segment'>
         <Form.Group widths='equal'>
           <Form.Input fluid label='Client' placeholder='reference client' type='text' />
           <Form.Input fluid label='Bordereau' placeholder='ID' type='text' />
         </Form.Group>
         <Form.Input label='A partir de ' placeholder='01/01/2018' type='text' />
         <Form.Input label="Jusqu'au" placeholder='01/01/2018' type='text' />
         <Button onClick={this.props.addTab} color='blue'>Rechercher</Button>
        </Form>
        </Grid.Row>
       <Grid.Row>
          <Header dividing as='h3'>Liste des bordereaux</Header>
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
