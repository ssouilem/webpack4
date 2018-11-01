import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from 'COMPONENTS/Search/InternalSearch'
import { actions as searchActions } from 'ACTIONS/search'
import PropTypes from 'prop-types'

class SearchSimple extends Component {

  componentWillMount() {
    this.props.initialize()
    this.props.setSourceProps({ source: this.props.source })
  }

  handleResultSelect = (e, { result }) => {
    this.props.setValueProps({ value: result.title })
  }
  handleSearchChange = (e, { value }) => {
    this.props.setLoadingProps({isLoading: true})
    this.props.setValueProps({ value: value })
    setTimeout(() => {
      if (value.length < 1) return this.props.reinitialize()
        this.props.setResultsProps({ value })
      }, 300)
  }

  render = () => (
    <Search
      search={ this.props.search}
      onResultSelect={this.handleResultSelect}
      onSearchChange={ this.handleSearchChange }
    />
  )
}

SearchSimple.propTypes = {
  search: PropTypes.object.isRequired,
  source: PropTypes.array,
  reinitialize: PropTypes.func.isRequired,
  setSourceProps: PropTypes.func.isRequired,
  setValueProps: PropTypes.func.isRequired,
  setResultsProps: PropTypes.func.isRequired,
  setLoadingProps: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  search: state.search,
})

const mapDispatchToProps = dispatch => ({
  initialize: searchActions.initialize(dispatch),
  reinitialize: searchActions.reinitialize(dispatch),
  setSourceProps: searchActions.setSourceProps(dispatch),
  setValueProps: searchActions.setValueProps(dispatch),
  setResultsProps: searchActions.setResultsProps(dispatch),
  setLoadingProps: searchActions.setLoadingProps(dispatch),
  dispatch,
})
export { SearchSimple }
export default connect(mapStateToProps, mapDispatchToProps)(SearchSimple)
