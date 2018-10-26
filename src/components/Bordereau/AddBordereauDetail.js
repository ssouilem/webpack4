import React from 'react'
import { Table, Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const AddBordereauDetail = ({ id, onClick, onChange, bordereauDetailForm }) => (
  <Table.Row>
    <Table.HeaderCell><Form.Input name='reference' id={ id } onBlur={ onChange } icon='search' fluid placeholder='ref produit' defaultValue={ bordereauDetailForm && bordereauDetailForm.reference } /></Table.HeaderCell>
    <Table.HeaderCell><Form.Input name='description' id={ id } onBlur={ onChange } fluid placeholder='description' defaultValue={ bordereauDetailForm && bordereauDetailForm.description } /></Table.HeaderCell>
    <Table.HeaderCell><Form.Input name='qte' id={ id } onBlur={ onChange } fluid placeholder='Qte' defaultValue={ bordereauDetailForm && bordereauDetailForm.qte } /></Table.HeaderCell>
    <Table.HeaderCell><Form.Input name='reduction' id={ id } onBlur={ onChange } fluid placeholder='Reduction' defaultValue={ bordereauDetailForm && bordereauDetailForm.reduction } /></Table.HeaderCell>
    <Table.HeaderCell><Form.Input name='unit' id={ id } onBlur={ onChange } fluid placeholder='Unit' defaultValue={ bordereauDetailForm && bordereauDetailForm.unit } /></Table.HeaderCell>
    <Table.HeaderCell><Form.Input name='total' id={ id } onBlur={ onChange } fluid placeholder='Total' defaultValue={ bordereauDetailForm && bordereauDetailForm.total } /></Table.HeaderCell>
    <Table.HeaderCell><Button id={ id }
      onClick={ onClick }
      icon='add'
      // color='red'
      floated='right' /></Table.HeaderCell>
  </Table.Row>
)

AddBordereauDetail.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default AddBordereauDetail
