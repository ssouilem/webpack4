import React from 'react'
import _ from 'lodash'
import { Search } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const InternalSearch = ({  search, onResultSelect, onSearchChange }) => (
  <Search
    loading={search.isLoading}
    onResultSelect={onResultSelect}
    onSearchChange={_.debounce(onSearchChange, 500, { leading: true })}
    results={search.results}
    value={search.value} />
)
InternalSearch.propTypes = {
  search: PropTypes.object.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default InternalSearch
