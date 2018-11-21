import React from 'react'
import _ from 'lodash'
import { Table, Form, Button, Search, Input } from 'semantic-ui-react'

class AddBordereauDetail extends React.Component {
  state={ qte: 1, total: 0 }
  componentWillMount () {
    this.resetComponent()
  }

  // function search
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '', items: this.props.products })
  handleResultSelect = (e, { result }) => {
    let reduction = 20 // @TODO mettre a jour la reduction avec sa valeur réel
    let totalHT = (parseInt(this.state.qte) * parseFloat(result.price)) * ((100 - parseInt(reduction)) / 100)
    this.setState({ value: result.description, ...result, reduction: reduction, total: totalHT.toFixed(3), productUid: result.uid })
  }
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      let re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      let isMatch = result => re.test(result.reference)
      this.setState({
        isLoading: false,
        results: _.filter(this.props.products, isMatch),
      })
    }, 300)
  }
  // gestion de modification
  _handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
    switch (name) {
      case 'qte': {
        this.state.qte = value
        let total = (parseInt(value) * this.state.price) * ((100 - this.state.reduction) / 100)
        this.setState({ total: total.toFixed(3) })
        break
      }
      case 'reduction': {
        let total = (parseInt(this.state.qte) * this.state.price) * ((100 - value) / 100)
        this.setState({ total: total.toFixed(3) })
        break
      }
    }
  }

  // add bordereau detail
  _addLinebordereauDetail = () => {
    this.props.onClick({
      reference: this.state.reference,
      description: this.state.description,
      qte: this.state.qte,
      reduction: this.state.reduction,
      unit: this.state.unit,
      total: this.state.total,
      productUid: this.state.productUid,
    })
    // this.resetForm()
    document.getElementById('myform').reset()
  }
  resetForm = () => {
    this.setState({}) // Ooops!
  }

  render = ({isLoading, results, value} = this.state, { products, active } = this.props) => (
    <Table.Row disabled={ active } key='add'>
      <Table.HeaderCell>
        <Search
          disabled={ active }
          name='reference'
          loading={ isLoading }
          onResultSelect={ this.handleResultSelect }
          onSearchChange={ _.debounce(this.handleSearchChange, 500, { leading: true }) }
          results={ results }
          value={ value }
        />
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Form.Input fluid disabled={ active } name='description' onChange={ this._handleInputChange } placeholder='description'
          defaultValue={ this.state && this.state.description } />
      </Table.HeaderCell>
      <Table.HeaderCell><Form.Input fluid disabled={ active } name='qte' type='number' onChange={ this._handleInputChange } placeholder='Qte' defaultValue={ this.state && this.state.qte } /></Table.HeaderCell>
      <Table.HeaderCell><Form.Input as={ Input } disabled={ active } name='reduction' onChange={ this._handleInputChange } fluid placeholder='Reduction'
        defaultValue={ this.state && this.state.reduction }
        label={ { basic: true, content: '%' } }
        labelPosition='right' />
      </Table.HeaderCell>
      <Table.HeaderCell><Form.Input name='unit' disabled onChange={ this._handleInputChange } fluid placeholder='unit' defaultValue={ this.state && this.state.unit } /></Table.HeaderCell>
      <Table.HeaderCell><Form.Input name='total' disabled onChange={ this._handleInputChange } fluid placeholder='Total' value={ this.state && this.state.total } /></Table.HeaderCell>
      <Table.HeaderCell><Button
        disabled={ active }
        onClick={ this._addLinebordereauDetail }
        icon='add'
        // color='red'
        floated='right' /></Table.HeaderCell>
    </Table.Row>
  )
}

export default AddBordereauDetail
