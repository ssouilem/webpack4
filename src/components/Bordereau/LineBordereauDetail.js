import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const LineBordereauDetail = ({ onClick, line }) => (
  <Table.Row>
    <Table.HeaderCell>{ line.reference }</Table.HeaderCell>
    <Table.HeaderCell>{ line.description }</Table.HeaderCell>
    <Table.HeaderCell>{ line.qte }</Table.HeaderCell>
    <Table.HeaderCell>{ line.reduction }</Table.HeaderCell>
    <Table.HeaderCell>{ line.unit }</Table.HeaderCell>
    <Table.HeaderCell>{ line.total }</Table.HeaderCell>
    <Table.HeaderCell><Button
      onClick={ onClick }
      icon='delete'
      color='red'
      floated='right' /></Table.HeaderCell>
  </Table.Row>

)

LineBordereauDetail.propTypes = {
  onClick: PropTypes.func.isRequired,
  line: PropTypes.object.isRequired,
}
export default LineBordereauDetail
