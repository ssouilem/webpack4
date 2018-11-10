import React from 'react'
import _ from 'lodash'
import { Table, Form, Button, Search, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const AddBordereauDetail = (props) => {
  const { id, active, onClick, onChange, bordereauDetailForm, isLoading, handleResultSelect, handleSearchChange, results, value } = props
  return (
    <Table.Row disabled={ active } key={ id }>
      <Table.HeaderCell><Search
        disabled={ active }
        name='reference'
        id={ id }
        loading={ isLoading }
        onResultSelect={ handleResultSelect }
        onSearchChange={ _.debounce(handleSearchChange, 500, { leading: true }) }
        results={ results }
        value={ value }
      />
      </Table.HeaderCell>
      <Table.HeaderCell><Form.Input fluid disabled={ active } name='description' id={ id } onBlur={ onChange } placeholder='description' defaultValue={ bordereauDetailForm && bordereauDetailForm.description } /></Table.HeaderCell>
      <Table.HeaderCell><Form.Input fluid disabled={ active } name='qte' type='number' id={ id } onBlur={ onChange } placeholder='Qte' defaultValue={ bordereauDetailForm && bordereauDetailForm.qte } /></Table.HeaderCell>
      <Table.HeaderCell><Form.Input as={ Input } disabled={ active } name='reduction' id={ id } onBlur={ onChange } fluid placeholder='Reduction'
        defaultValue={ bordereauDetailForm && bordereauDetailForm.reduction }
        label={ { basic: true, content: '%' } }
        labelPosition='right' />
      </Table.HeaderCell>
      <Table.HeaderCell><Form.Input name='unit' disabled={ active } id={ id } onBlur={ onChange } fluid placeholder='Unit' defaultValue={ bordereauDetailForm && bordereauDetailForm.unit } /></Table.HeaderCell>
      <Table.HeaderCell><Form.Input name='total' disabled={ active } id={ id } onBlur={ onChange } fluid placeholder='Total' value={ bordereauDetailForm && bordereauDetailForm.total } /></Table.HeaderCell>
      <Table.HeaderCell><Button id={ id }
        disabled={ active }
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
