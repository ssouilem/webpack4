import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'


class AddBordereauDetail extends React.Component {
  render() {
    return (
      <Form.Group widths='equal'>
        <Form.Input icon='search' fluid placeholder='ref produit' />
        <Form.Input fluid  placeholder='description' />
        <Form.Input fluid placeholder='Qte' />
        <Form.Input fluid placeholder='Reduction' />
        <Form.Input fluid placeholder='Unit' />
        <Form.Input fluid placeholder='Total' />
        <Button
          onClick={ this.props.addLineInvoice }
          icon='user delete'
          // color='red'
          floated='right' />
      </Form.Group>
    )
  }
}
export default AddBordereauDetail
