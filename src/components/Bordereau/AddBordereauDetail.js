import React from 'react'
import _ from 'lodash'
import { Table, Form, Button, Search } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const AddBordereauDetail = (props) => {
  const { id, onClick, onChange, bordereauDetailForm, isLoading, handleResultSelect, handleSearchChange, results, value } = props
  return (
    <Table.Row>
      <Table.HeaderCell><Search
        name='reference'
        id={ id }
        loading={ isLoading }
        onResultSelect={ handleResultSelect }
        onSearchChange={ _.debounce(handleSearchChange, 500, { leading: true }) }
        results={ results }
        value={ value }
      />
      </Table.HeaderCell>
      <Table.HeaderCell><Form.Input name='description' id={ id } onBlur={ onChange } fluid placeholder='description' defaultValue={ bordereauDetailForm && bordereauDetailForm.description } /></Table.HeaderCell>
      <Table.HeaderCell><Form.Input name='qte' type='number' id={ id } onBlur={ onChange } fluid placeholder='Qte' /></Table.HeaderCell>
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
}

AddBordereauDetail.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
}

export default AddBordereauDetail
